# FoodRush

A full-stack food delivery platform monorepo.

## Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS v4
- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Database:** PostgreSQL
- **Package Manager:** npm workspaces

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup Backend Database:
```bash
cd apps/backend
# Configure your .env file with DATABASE_URL
npx prisma generate
npx prisma db push
```

3. Run Development Servers:
```bash
# In the root directory
npm run dev
```

