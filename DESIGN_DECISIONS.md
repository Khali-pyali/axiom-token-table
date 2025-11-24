# Design Decisions - Axiom Token Discovery Table

This document explains the key design decisions made during the development of this project.

## Architecture

### Separation of Concerns
- **Backend and Frontend Separation**: Chose to build separate backend and frontend services for:
  - Clear separation of concerns
  - Independent scaling
  - Easier testing and maintenance
  - Ability to add mobile apps or other clients in the future

### Atomic Design
- **Component Organization**: Implemented atomic design pattern (atoms → molecules → organisms)
  - **Atoms**: Basic building blocks (Button, Typography, Skeleton)
  - **Molecules**: Compound components (TokenRow, SectionHeader)
  - **Organisms**: Complex sections (TokenSection, TokenTable)
  - **Benefits**: Maximum reusability, consistent design, easier testing

## Backend

### Technology Choices

#### Express.js
- **Why**: Lightweight, flexible, well-documented
- **Alternatives considered**: Fastify (more performant but less familiar)
- **Trade-off**: Chose developer experience and ecosystem over marginal performance gains

#### WebSocket (ws library)
- **Why**: Native WebSocket implementation, low overhead
- **Alternatives considered**: Socket.io (heavier but with fallbacks)
- **Trade-off**: Modern browsers support WebSockets natively; don't need Socket.io fallbacks

#### TypeScript Strict Mode
- **Why**: Catch errors at compile time, better IDE support
- **Benefits**: Reduced runtime errors, better code documentation, easier refactoring

### Data Generation

#### Faker.js
- **Why**: Realistic mock data without a database
- **Benefits**: Easy to generate varied, realistic token data
- **Production note**: Would be replaced with real blockchain data sources

### API Design

#### RESTful Endpoints
- Separate endpoints for each section (`/new-pairs`, `/final-stretch`, `/migrated`)
- Query parameter support for filtering and sorting
- Consistent response format with `{ success, data, total }`

#### Price Updates via WebSocket
- **Push model**: Server pushes updates rather than polling
- **Benefits**: Reduces server load, more responsive UI, scalable
- **Update frequency**: 3 seconds (configurable)
- **Batch updates**: 3-5 random tokens per update to simulate realistic trading

## Frontend

### Technology Choices

#### Next.js 14 with App Router
- **Why**: 
  - Latest Next.js features (Server Components, improved routing)
  - Built-in optimizations (Image, Font optimization)
  - Great developer experience
  - Production-ready out of the box

#### Redux Toolkit
- **Why**: Needed for complex state (3 sections × filters × presets)
- **Alternatives considered**: 
  - Zustand (lighter but less structured)
  - Context API (insufficient for this complexity)
- **Trade-off**: More boilerplate but better scalability and DevTools

#### React Query (TanStack Query)
- **Why**: Best-in-class data fetching library
- **Benefits**:
  - Automatic caching and background refetching
  - Loading and error states handled automatically
  - Optimistic updates support
  - Deduplication of requests

#### Tailwind CSS
- **Why**: Utility-first, highly customizable, great developer experience
- **Custom theme**: Matched Axiom's dark theme with custom colors
- **Benefits**: Rapid development, consistent design, small bundle size

### State Management Strategy

#### Redux for UI State
- Token data persistence
- Active filters and presets per section
- Modal states
- Loading and error states

#### React Query for Server State
- Data fetching and caching
- Background refetching
- Synchronization with backend

#### Local Component State
- Search input values
- Hover states
- Temporary UI state

### Performance Optimizations

####Component Memoization
- Used `React.memo()` on `TokenRow` to prevent unnecessary re-renders
- Price updates only re-render affected rows

#### Skeleton Loaders
- Show immediate feedback while data loads
- Shimmer effect for polish

#### Virtual Scrolling (Future Enhancement)
- Current implementation shows all tokens
- For production with 1000+ tokens, would implement react-window

### Real-time Updates

#### WebSocket Integration
- Custom `useWebSocket` hook with automatic reconnection
- Updates Redux store directly
- Graceful fallback on connection loss

#### Price Change Animations
- CSS animations for performance
- Green flash for price increases
- Red flash for price decreases
- 500ms duration for smooth transitions

## UI/UX Decisions

### Dark Theme
- Matches Axiom's design
- Reduces eye strain for extended use
- Professional appearance for trading apps

### Three-Column Layout
- Desktop: Side-by-side sections for easy comparison
- Tablet: Two columns
- Mobile: Stacked vertically

### Preset Buttons (P1, P2, P3)
- **P1**: High volume tokens (>500K)
- **P2**: High transaction count (>5000 TX)
- **P3**: Recent launches (<1 hour)
- Clear visual feedback on active preset

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px (tablet), 1024px (desktop)
- Touch-friendly buttons (minimum 44×44px)

## Testing Strategy (Future)

### Unit Tests
- Utility functions (formatNumber, formatPrice, etc.)
- Redux sl ices (actions and reducers)
- Custom hooks

### Integration Tests
- API endpoints
- WebSocket connection
- Component interactions

### E2E Tests
- User flows (filtering, sorting, searching)
- Real-time updates
- Responsive behavior

### Performance Tests
- Lighthouse audits (target: ≥90)
- Bundle size monitoring
- Render performance

## Security Considerations

### CORS Configuration
- Whitelist specific origins
- No wildcard (`*`) in production

### Input Validation
- Sanitize search queries
- Validate query parameters
- Type-safe with TypeScript

### WebSocket Security
- In production, would use WSS (WebSocket Secure)
- Authentication tokens for connections
- Rate limiting on updates

## Scalability

### Backend
- Stateless design (easy to horizontal scale)
- WebSocket server can be separated
- Add Redis for caching in production

### Frontend
- Static generation where possible
- CDN deployment via Vercel
- Code splitting for large components

## Future Enhancements

1. **Sorting**: Click column headers to sort
2. **Pagination**: Server-side pagination for large datasets
3. **Charts**: Price history charts using Chart.js or Recharts
4. **Notifications**: Browser notifications for price alerts
5. **Themes**: Light/dark mode toggle
6. **Favorites**: Save favorite tokens
7. **Advanced Filters**: Price range, market cap range, date filters
8. **Analytics**: Trading volume trends, top movers
9. **Mobile App**: React Native version using same backend

## Lessons Learned

1. **Plan state structure early**: Redux structure changes are costly
2. **Type everything**: Strict TypeScript saves debugging time
3. **Component reusability**: Atomic design pays off quickly
4. **Performance budgets**: Set targets early (Lighthouse ≥90)
5. **Mock data quality**: Realistic data exposes edge cases

## Conclusion

This project prioritizes:
- **Clean architecture**: Clear separation, reusable components
- **Developer experience**: TypeScript, modern tooling, clear structure
- **Performance**: Memoization, efficient updates, optimized builds
- **Scalability**: Stateless design, modular architecture

The result is a maintainable, performant, and scalable application that can grow with user needs.
