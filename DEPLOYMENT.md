# Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** - [Sign up](https://github.com/signup) if you don't have one
2. **Vercel Account** - [Sign up](https://vercel.com/signup) (can use GitHub login)
3. **Git installed** - [Download](https://git-scm.com/) and install

## Quick Start (3 Steps)

### Step 1: Create GitHub Repository

```bash
# Navigate to project folder
cd d:\order_execution_engine_Eterna\axiom-token-table

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Axiom Token Discovery Table"

# Create repository on GitHub
# Go to: https://github.com/new
# Name: axiom-token-table
# Don't initialize with README (we already have code)

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/axiom-token-table.git

# Push code
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Vercel

**Option A: Using Vercel CLI** (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to backend
cd backend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - "Set up and deploy?" → Yes
# - "Which scope?" → Your account
# - "Link to existing project?" → No
# - "Project name?" → axiom-token-backend
# - "Directory?" → ./ (press Enter)
# - "Override settings?" → No

# Deploy to production
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select `backend` folder as root directory
4. Click "Deploy"

**After Deployment:**
- Copy the deployment URL (e.g., `https://axiom-token-backend.vercel.app`)
- Note down this URL for frontend environment variables

### Step 3: Deploy Frontend to Vercel

```bash
# Navigate to frontend
cd ../frontend

# Deploy
vercel

# Follow prompts (same as backend)
# Project name: axiom-token-frontend

# Set environment variables during deployment:
# NEXT_PUBLIC_API_URL = https://axiom-token-backend.vercel.app
# NEXT_PUBLIC_WS_URL = wss://axiom-token-backend.vercel.app

# Deploy to production
vercel --prod
```

---

## Alternative: Deploy Backend to Railway (Better for WebSocket)

> **Note**: Vercel has limitations with WebSocket connections. For full WebSocket support, consider Railway or Render.

### Railway Deployment (Recommended for Backend)

1. **Sign up** at [railway.app](https://railway.app/)
2. **Create New Project** → Deploy from GitHub
3. **Select Repository** → `axiom-token-table`
4. **Select Service** → `backend`
5. **Environment Variables**:
   ```
   PORT=3001
   WS_PORT=3002
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```
6. **Deploy** → Railway will auto-deploy
7. **Get URL** → Copy the Railway app URL

Then update frontend:
```bash
cd frontend
vercel env add NEXT_PUBLIC_API_URL
# Paste Railway URL

vercel env add NEXT_PUBLIC_WS_URL  
# Paste Railway WebSocket URL (wss://)

vercel --prod
```

---

## Detailed Instructions

### 1. Environment Variables Setup

**Backend** (Railway/Vercel):
```env
PORT=3001
WS_PORT=3002
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

**Frontend** (Vercel):
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app
NEXT_PUBLIC_WS_URL=wss://your-backend-domain.railway.app
```

### 2. Update Environment Variables After Deployment

```bash
# Backend on Vercel
vercel env add PORT
vercel env add WS_PORT
vercel env add CORS_ORIGINS

# Frontend on Vercel
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_WS_URL

# Redeploy to apply changes
vercel --prod
```

### 3. Verify Deployment

**Check Backend:**
```
https://your-backend.vercel.app/health
```

Should return:
```json
{
  "success": true,
  "message": "Axiom Token Table Backend is running"
}
```

**Check Frontend:**
```
https://your-frontend.vercel.app
```

Should display the token discovery table.

---

## Troubleshooting

### WebSocket Connection Fails

**Problem**: Vercel has limited WebSocket support (60s timeout).

**Solution**: Deploy backend to Railway or Render:

**Railway** (Recommended):
1. Go to [railway.app](https://railway.app/)
2. New Project → Deploy from GitHub
3. Select `backend` folder
4. Add environment variables
5. Deploy

**Render**:
1. Go to [render.com](https://render.com/)
2. New Web Service → Connect GitHub
3. Select `backend` folder
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add environment variables
7. Deploy

### CORS Errors

Update `CORS_ORIGINS` in backend environment variables:
```
CORS_ORIGINS=https://your-frontend.vercel.app,https://axiom-token-frontend.vercel.app
```

Redeploy backend:
```bash
vercel --prod
```

### Build Fails

**Check logs:**
```bash
vercel logs your-deployment-url
```

Common issues:
- Missing dependencies → Run `npm install` locally first
- TypeScript errors → Run `npm run type-check`
- Environment variables missing → Add via Vercel dashboard

---

## Recommended Architecture

For production, use this setup:

```
Frontend (Vercel)
    ↓
Backend REST API (Vercel or Railway)
    ↓
WebSocket Server (Railway or Render)
```

**Why?**
- Vercel excellent for Next.js frontend (free tier)
- Railway/Render better for WebSocket connections
- Separate services = independent scaling

---

## Cost

- **Vercel**: Free tier includes:
  - 100GB bandwidth/month
  - Unlimited deployments
  - Custom domains

- **Railway**: Free tier includes:
  - $5 credit/month
  - Good for WebSocket
  - After credit: ~$5-10/month

- **Render**: Free tier includes:
  - 750 hours/month
  - Auto-sleep after 15 min inactivity

---

## Next Steps After Deployment

1. ✅ Test all features on live URL
2. ✅ Run Lighthouse audit
3. ✅ Record demo video
4. ✅ Update README with live URLs
5. ✅ Create responsive screenshots
6. ✅ Share project!

---

## Quick Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from frontend or backend folder)
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel remove [deployment-name]
```

---

## Support

If you encounter issues:
1. Check Vercel logs: `vercel logs`
2. Check Railway/Render logs in dashboard
3. Verify environment variables
4. Test API endpoint directly: `/health`
5. Check browser console for errors

---

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed (Vercel/Railway/Render)
- [ ] Backend health check working (`/health`)
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] WebSocket connection working
- [ ] Real-time updates functioning
- [ ] All 3 sections loading
- [ ] P1/P2/P3 filters working
- [ ] Search functionality working
- [ ] Responsive on mobile tested
- [ ] Demo video recorded
- [ ] README updated with live URLs

Good luck with your deployment! 🚀
