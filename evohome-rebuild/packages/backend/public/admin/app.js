const API = window.location.origin; // same-origin to backend
const $ = (id) => document.getElementById(id);
const tokenKey = 'evohome_token';

function setAuthHeader(init={}) {
  const t = localStorage.getItem(tokenKey);
  if (!init.headers) init.headers = {};
  if (t) init.headers['Authorization'] = `Bearer ${t}`;
  return init;
}

async function api(path, init={}) {
  const res = await fetch(API + path, setAuthHeader({
    ...init,
    headers: { 'Content-Type':'application/json', ...(init.headers||{}) }
  }));
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const data = await res.json(); if (data?.message) msg = data.message; } catch {}
    throw new Error(msg);
  }
  try { return await res.json(); } catch { return null; }
}

// UI helpers
function show(id, on=true){ const el=$(id); if(!el) return; el.classList[on?'remove':'add']('hidden'); }
function text(id, t){ const el=$(id); if(el) el.textContent=t||''; }
function val(id, v){ const el=$(id); if(!el) return ''; if(v!==undefined) el.value=v; return el.value; }
function setForm(data){ for(const [k,v] of Object.entries(data||{})){ const el=$('c_'+k); if(el) el.value = v ?? ''; } }
function getForm(keys){ const o={}; for(const k of keys) o[k]=val('c_'+k); return o; }
function isoToShort(s){ try{ return new Date(s).toLocaleString() } catch{ return s } }

// Auth
async function tryLoadMe(){
  try {
    await api('/health'); // proves server is up
    const t = localStorage.getItem(tokenKey);
    if (!t) return false;
    return true;
  } catch { return false; }
}

async function login(email, password){
  // Use non-conflicting shim endpoints under /x/*
  try {
    const data = await api('/x/auth/login-plain',{ method:'POST', body: JSON.stringify({ email, password }) });
    if (!data?.token) throw new Error('No token');
    localStorage.setItem(tokenKey, data.token);
    return;
  } catch (e) {}
  // Fallback: try your existing /auth/login if present
  try {
    const data = await api('/auth/login',{ method:'POST', body: JSON.stringify({ email, password }) });
    if (!data?.token) throw new Error('No token');
    localStorage.setItem(tokenKey, data.token);
    return;
  } catch {}
  throw new Error('Login failed');
}

// Company info
async function loadCompany(){
  text('companyErr',''); text('companyMsg','');
  try {
    const data = await api('/company-info');
    setForm({
      name: data?.name || 'EvoHome Improvements',
      email: data?.email || 'office@evohomeimprovements.co.uk',
      phone: data?.phone || '',
      website: data?.website || '',
      address: data?.address || '',
      openingHours: data?.openingHours || '',
      facebook: data?.facebook || '',
      instagram: data?.instagram || '',
      twitter: data?.twitter || '',
      youtube: data?.youtube || '',
    });
  } catch(e){ text('companyErr', e.message || 'Load failed'); }
}

async function saveCompany(){
  text('companyErr',''); text('companyMsg','');
  const payload = getForm(['name','email','phone','website','address','openingHours','facebook','instagram','twitter','youtube']);
  try {
    const data = await api('/company-info', { method:'PUT', body: JSON.stringify(payload) });
    text('companyMsg','Saved ✔');
  } catch(e){ text('companyErr', e.message || 'Save failed'); }
}

// Leads
async function loadLeads(){
  const tbody = $('leadsTable').querySelector('tbody');
  tbody.innerHTML = '';
  try {
    const items = await api('/x/form-submissions?limit=20').catch(()=>[]);
    for(const it of (items||[])){
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${isoToShort(it.createdAt||'')}</td>
                      <td>${it.name||''}</td>
                      <td>${it.email||''}</td>
                      <td>${it.phone||''}</td>
                      <td>${it.postcode||''}</td>
                      <td>${it.service||''}</td>`;
      tbody.appendChild(tr);
    }
  } catch(e){
    text('leadsErr', e.message || 'Failed to load leads');
  }
}

// Wire up UI
function bind(){
  $('loginForm').addEventListener('submit', async (e)=>{
    e.preventDefault();
    text('loginErr','');
    const email = val('email'), password = val('password');
    try {
      await login(email, password);
      show('loginCard', false);
      show('logoutBtn', true);
      show('companyCard', true);
      show('leadsCard', true);
      await loadCompany();
      await loadLeads();
    } catch(err){ text('loginErr', err.message || 'Login failed'); }
  });

  $('logoutBtn').addEventListener('click', ()=>{
    localStorage.removeItem(tokenKey);
    location.reload();
  });

  $('reloadCompanyBtn').addEventListener('click', async ()=>{ await loadCompany(); });

  $('companyForm').addEventListener('submit', async (e)=>{
    e.preventDefault();
    await saveCompany();
  });
}

// Boot
(async function(){
  bind();
  const authed = await tryLoadMe();
  if (authed){
    show('loginCard', false);
    show('logoutBtn', true);
    show('companyCard', true);
    show('leadsCard', true);
    await loadCompany();
    await loadLeads();
  } else {
    show('loginCard', true);
    show('logoutBtn', false);
    show('companyCard', false);
    show('leadsCard', false);
  }
})();
