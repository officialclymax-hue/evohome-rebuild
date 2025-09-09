import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import * as nodemailer from 'nodemailer';

const prisma = new PrismaClient();

async function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null; // email optional
  const transporter = nodemailer.createTransport({ host, port, secure: false, auth: { user, pass } });
  try {
    await transporter.verify();
    return transporter;
  } catch {
    return null;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(express.json({ limit: '1mb' }));

  // ---------- SHIM AUTH ENDPOINTS (no conflict) ----------
  // (1) Bootstrap admin user from envs (one-time usage)
  app.get('/x/auth/bootstrap', async (req, res) => {
    const expected = process.env.BOOTSTRAP_TOKEN || '';
    const token = String(req.query.token || '');
    if (!expected) return res.status(400).json({ message: 'BOOTSTRAP_TOKEN not set' });
    if (!token || token !== expected) return res.status(403).json({ message: 'Invalid bootstrap token' });

    const email = process.env.ADMIN_EMAIL || 'office@evohomeimprovements.co.uk';
    const password = process.env.ADMIN_PASSWORD;
    if (!password) return res.status(400).json({ message: 'ADMIN_PASSWORD not set' });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash: hash, role: 'admin' },
      create: { email, passwordHash: hash, role: 'admin' },
    });

    return res.json({ ok: true, email: user.email });
  });

  // (2) Plain login returning JWT
  app.post('/x/auth/login-plain', async (req, res) => {
    try {
      const { email, username, password } = req.body || {};
      const idVal = email || username;
      if (!idVal || !password) return res.status(401).json({ message: 'Missing credentials' });

      const user = await prisma.adminUser.findFirst({ where: { email: idVal } });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

      const secret = process.env.JWT_SECRET || 'evohome-dev-secret';
      const token = jwt.sign({ sub: user.id, email: user.email, role: user.role || 'admin' }, secret, { expiresIn: '7d' });
      return res.json({ token });
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Login error' });
    }
  });

  // ---------- SHIM LEADS (store + email) ----------
  // GET latest leads (optional auth check)
  app.get('/x/form-submissions', async (req, res) => {
    const limit = Math.max(1, Math.min(100, Number(req.query.limit || 20)));
    const items = await prisma.formSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: { id: true, name: true, email: true, phone: true, postcode: true, service: true, createdAt: true },
    });
    return res.json(items);
  });

  // POST a new lead (and email it if SMTP envs set)
  app.post('/x/form-submissions', async (req, res) => {
    try {
      const { name, email, phone, postcode, service, message, marketingConsent, dataConsent } = req.body || {};
      if (!name || !email) return res.status(400).json({ message: 'Name and Email are required' });

      const saved = await prisma.formSubmission.create({
        data: {
          name: String(name),
          email: String(email),
          phone: String(phone || ''),
          postcode: String(postcode || ''),
          service: String(service || ''),
          message: String(message || ''),
          marketingConsent: Boolean(marketingConsent || false),
          dataConsent: Boolean(dataConsent || true),
        },
      });

      // Send email (optional)
      const to = process.env.LEADS_TO || process.env.ADMIN_EMAIL || 'office@evohomeimprovements.co.uk';
      const transporter = await createTransport();
      if (transporter) {
        const html = `
          <h2>New Lead</h2>
          <p><strong>Name:</strong> ${saved.name}</p>
          <p><strong>Email:</strong> ${saved.email}</p>
          <p><strong>Phone:</strong> ${saved.phone}</p>
          <p><strong>Postcode:</strong> ${saved.postcode}</p>
          <p><strong>Service:</strong> ${saved.service}</p>
          <p><strong>Message:</strong><br/>${(saved.message||'').replace(/\n/g,'<br/>')}</p>
          <p><small>Consents — Marketing: ${saved.marketingConsent ? 'yes' : 'no'}, Data: ${saved.dataConsent ? 'yes' : 'no'}</small></p>
          <p><small>Submitted: ${new Date(saved.createdAt).toLocaleString()}</small></p>
        `;
        try {
          await transporter.sendMail({
            from: `EvoHome Leads <${process.env.SMTP_FROM || 'no-reply@evohome.local'}>`,
            to,
            subject: `New Lead: ${saved.name} (${saved.service || 'N/A'})`,
            html,
          });
        } catch {
          // ignore email errors to not block lead storage
        }
      }

      return res.status(201).json({ ok: true, id: saved.id });
    } catch (e: any) {
      return res.status(500).json({ message: e.message || 'Submit error' });
    }
  });

  // ---------- START ----------
  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
}
bootstrap();
