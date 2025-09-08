# EvoHome Rebuild – Quickstart

## Backend
```
cd packages/backend
cp .env.example .env
npm i
npm run prisma:generate
npm run db:push
# Place your Bolt export Word doc in this folder as bolt-export.docx
npm run seed
npm run start:dev
```

Admin UI is served from `/admin` when you build the admin and copy its `dist` into `packages/backend/public/admin/`.

## Admin
```
cd packages/admin
npm i
npm run build
# copy dist -> ../backend/public/admin
```

## Frontend
```
cd packages/frontend
npm i
VITE_API_BASE=http://localhost:8080 npm run dev
```
