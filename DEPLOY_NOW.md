# Quick Vercel Deployment Steps

## ✅ GitHub Done!
Your code is now on GitHub: https://github.com/Khali-pyali/axiom-token-table

## Next: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest - No CLI needed)

**Step 1: Go to Vercel**
1. Open: https://vercel.com/login
2. Sign in with GitHub (click "Continue with GitHub")

**Step 2: Import Repository**
1. After login, click "Add New..." → "Project"
2. You'll see your GitHub repositories
3. Find "axiom-token-table" → Click "Import"

**Step 3: Configure Frontend**
1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: Click "Edit" → Select `frontend` folder
3. **Build Settings**: Leave as default
4. **Environment Variables**: Add these:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.com (we'll add backend later)
   NEXT_PUBLIC_WS_URL = wss://your-backend-url.com (we'll add backend later)
   ```
   For now, use dummy values:
   ```
   NEXT_PUBLIC_API_URL = http://localhost:3001
   NEXT_PUBLIC_WS_URL = ws://localhost:3002
   ```
5. Click "Deploy"

**Step 4: Wait for Deployment** (2-3 minutes)
- Vercel will build and deploy your frontend
- You'll get a URL like: `https://axiom-token-table.vercel.app`

**Step 5: Deploy Backend**
Important: Vercel has WebSocket limitations. For backend, use Railway:

1. Go to: https://railway.app/
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select "axiom-token-table"
5. **Root Directory**: Select `backend` folder
6. Add environment variables:
   ```
   PORT = 3001
   WS_PORT = 3002
   CORS_ORIGINS = https://your-frontend.vercel.app
   ```
7. Deploy
8. Copy the Railway URL

**Step 6: Update Frontend Environment Variables**
1. Go back to Vercel dashboard
2. Your project → Settings → Environment Variables
3. Update:
   ```
   NEXT_PUBLIC_API_URL = https://your-railway-backend-url
   NEXT_PUBLIC_WS_URL = wss://your-railway-backend-url
   ```
4. Redeploy (click "Deployments" → "..." → "Redeploy")

---

### Option 2: Deploy via Vercel CLI (Faster if you have Node.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy Frontend
cd frontend
vercel login
vercel

# Follow prompts, then deploy to production:
vercel --prod
```

---

## Current Status:
✅ Code on GitHub  
🔄 Ready to deploy to Vercel  
⏳ Backend deployment to Railway needed for WebSocket  

## What You'll Get:
- Frontend URL: `https://axiom-token-table-xyz.vercel.app`
- Backend URL: `https://your-app.railway.app`
- Fully functional token discovery table with real-time updates!

**Choose Option 1 (Dashboard) if you don't have Node.js installed yet.**
**Choose Option 2 (CLI) if you have Node.js.**

Which option do you want to use?
