# Axiom Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table with real-time price updates, built with Next.js 14, TypeScript, and Node.js backend.

## 🚀 Features

- **Three Token Sections**: New Pairs, Final Stretch, and Migrated
- **Real-time Updates**: WebSocket-powered live price changes with smooth color transitions
- **Interactive UI**: Hover effects, tooltips, popovers, modals, and sorting
- **Performance Optimized**: Lighthouse score ≥90, <100ms interactions
- **Fully Responsive**: Works flawlessly from 320px to desktop
- **Type-Safe**: Strict TypeScript throughout

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI / shadcn/ui
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **WebSocket**: ws library
- **Language**: TypeScript (strict mode)
- **Mock Data**: @faker-js/faker

## 📦 Installation

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd axiom-token-table
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on:
- REST API: http://localhost:3001
- WebSocket: ws://localhost:3002

### Start Frontend
```bash
cd frontend
npm run dev
```
The frontend will run on: http://localhost:3000

## 📡 API Endpoints

### REST API

- `GET /api/tokens/new-pairs` - Fetch new pairs tokens
- `GET /api/tokens/final-stretch` - Fetch final stretch tokens
- `GET /api/tokens/migrated` - Fetch migrated tokens
- `GET /api/tokens/all` - Fetch all tokens

Query parameters:
- `filter` - Filter by token name/symbol
- `preset` - Apply preset filter (P1, P2, P3)
- `sort` - Sort by field (mc, volume, tx, time)
- `limit` - Limit number of results

### WebSocket

Connect to `ws://localhost:3002` for real-time price updates.

Message format:
```json
{
  "type": "price_update",
  "data": {
    "tokenId": "string",
    "price": number,
    "change": number
  }
}
```

## 🏗 Project Structure

```
axiom-token-table/
├── backend/                 # Node.js backend service
│   ├── src/
│   │   ├── routes/         # REST API routes
│   │   ├── services/       # Business logic
│   │   ├── data/           # Mock data generation
│   │   ├── middleware/     # Express middleware
│   │   ├── server.ts       # Server entry point
│   │   ├── types.ts        # TypeScript types
│   │   └── config.ts       # Configuration
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Next.js frontend
│   ├── app/               # Next.js App Router
│   ├── components/        # React components (atomic design)
│   │   ├── atoms/        # Basic building blocks
│   │   ├── molecules/    # Compound components
│   │   └── organisms/    # Complex sections
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Redux store and slices
│   ├── lib/              # Utilities and helpers
│   ├── api/              # API client
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 🎨 Design Decisions

### Architecture
- **Atomic Design**: Components organized from atoms to organisms for maximum reusability
- **Separation of Concerns**: Backend and frontend as separate services
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Performance First**: Memoization, virtual scrolling, and optimized renders

### Backend
- **Mock Data Generation**: Realistic token data using faker.js
- **WebSocket Updates**: Simulated real-time price changes every 2-5 seconds
- **RESTful API**: Clean endpoint design with query parameter support

### Frontend
- **Component Memoization**: React.memo on frequently re-rendered components
- **Virtual Scrolling**: Only render visible rows for large datasets
- **Smooth Animations**: CSS transitions with color changes on price updates
- **Error Boundaries**: Graceful error handling throughout the app

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 639px (stacked layout)
- **Tablet**: 640px - 1023px (two-column layout)
- **Desktop**: 1024px+ (three-column layout)

## 🔍 Testing

### Performance Testing
```bash
# Run Lighthouse audit
npm run lighthouse
```

Target metrics:
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥90

## 🚢 Deployment

### Vercel (Frontend)
```bash
cd frontend
vercel --prod
```

### Backend Deployment
Deploy to any Node.js hosting platform (Heroku, Railway, Render, etc.)

## 📸 Screenshots

(Screenshots will be added here showing responsive layouts at different breakpoints)

## 🎥 Demo Video

[Link to YouTube demo video]

## 📄 License

MIT

## 👨‍💻 Author

Built as a frontend challenge to replicate Axiom Trade's token discovery table.
