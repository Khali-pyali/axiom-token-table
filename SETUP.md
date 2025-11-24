# Development Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Package manager (comes with Node.js)
- **Git**: Version control ([Download](https://git-scm.com/))

Check your installations:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be 8 or higher
```

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd axiom-token-table
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

This will install:
- express (REST API framework)
- ws (WebSocket server)
- cors (Cross-Origin Resource Sharing)
- @faker-js/faker (Mock data generation)
- TypeScript and development tools

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

This will install:
- Next.js 14 (React framework)
- Redux Toolkit (State management)
- React Query (Data fetching)
- Radix UI (Accessible components)
- Tailwind CSS (Styling)
- And more...

### 4. Configure Environment Variables

**Backend:**
```bash
cd ../backend
cp .env.example .env
```

Edit `.env` if you want to change default ports:
```env
PORT=3001
WS_PORT=3002
CORS_ORIGINS=http://localhost:3000
```

**Frontend:**
```bash
cd ../frontend
cp .env.example .env.local
```

Edit `.env.local` if backend is on different ports:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3002
```

## Running the Application

You need TWO terminals - one for backend, one for frontend.

### Terminal 1: Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
==================================================
🚀 Axiom Token Table Backend Started
==================================================
📡 REST API Server: http://localhost:3001
🔌 WebSocket Server: ws://localhost:3002
==================================================
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## Verifying Everything Works

### 1. Check Backend Health
Open a browser or use curl:
```bash
curl http://localhost:3001/health
```

Should return:
```json
{
  "success": true,
  "message": "Axiom Token Table Backend is running",
  "timestamp": "2024-..."
}
```

### 2. Check Token Data
```bash
curl http://localhost:3001/api/tokens/new-pairs
```

Should return JSON with token data.

### 3. Check WebSocket
Open browser console on `http://localhost:3000` and look for:
```
WebSocket connected
```

### 4. Verify Real-time Updates
- Keep the app open
- Watch the price percentages
- They should change every few seconds (with color flash animations)

## Troubleshooting

### Port Already in Use
If you see `EADDRINUSE` error:

**Option 1**: Kill the process using the port
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3001
kill -9 <PID>
```

**Option 2**: Change the port in `.env` files

### Dependencies Installation Fails
Try clearing caches:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### WebSocket Connection Fails
1. Check backend is running
2. Check browser console for errors
3. Verify `WS_URL` in frontend `.env.local` matches backend `WS_PORT`

### CORS Errors
1. Make sure `CORS_ORIGINS` in backend `.env` includes `http://localhost:3000`
2. Restart backend after changing `.env`

### TypeScript Errors
If you see TypeScript errors:
```bash
# Check types
npm run type-check

# Rebuild
rm -rf .next
npm run dev
```

## Development Commands

### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm run start        # Run compiled production build
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run Next.js linter
npm run type-check   # Check TypeScript types
```

## Project Structure

```
axiom-token-table/
├── backend/
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── data/           # Mock data generation
│   │   ├── middleware/     # Express middleware
│   │   ├── server.ts       # Main server file
│   │   ├── types.ts        # TypeScript types
│   │   └── config.ts       # Configuration
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── atoms/          # Basic components
│   │   ├── molecules/      # Compound components
│   │   ├── organisms/      # Complex sections
│   │   └── Providers.tsx
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Redux store
│   ├── lib/                # Utilities
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.example
│
├── README.md
├── DESIGN_DECISIONS.md
└── SETUP.md (this file)
```

## Next Steps

1. **Explore the Code**: Start with `frontend/app/page.tsx` and `backend/src/server.ts`
2. **Modify Mock Data**: Edit `backend/src/data/mockDataGenerator.ts`
3. **Customize Styling**: Edit `frontend/tailwind.config.js` and `frontend/app/globals.css`
4. **Add Features**: Check `DESIGN_DECISIONS.md` for future enhancement ideas

## Getting Help

- Check `DESIGN_DECISIONS.md` for architecture questions
- Review code comments for implementation details
- Check browser console and backend logs for runtime issues

## Production Deployment

See `README.md` for deployment instructions to Vercel (frontend) and your preferred Node.js host (backend).
