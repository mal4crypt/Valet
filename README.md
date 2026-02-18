# Valet — AI Strategic Planner

A production-grade, intelligent AI-powered strategic planning system that transforms career goals into structured, milestone-driven execution plans.

## Vision

**Valet** is not a chatbot. It's a strategic planning platform that combines structured user input, advanced prompt engineering, and LLM intelligence to generate actionable career development roadmaps.

**Core Value Proposition**: "From goal to execution plan in seconds."

## Key Features

- **Structured Input Collection**: Captures goals, skill level, availability, timeframe, and learning preferences
- **AI-Powered Analysis**: Uses OpenAI or Anthropic APIs with carefully engineered prompts
- **Milestone-Driven Output**: Generates phases, weekly breakdowns, projects, tools, and checkpoints
- **Professional Design**: Minimal, clean UI with responsive layout
- **Secure Architecture**: Server-side API integration, no exposed API keys
- **Production-Ready**: Rate limiting, validation, error handling, type safety

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom, minimal component library
- **State Management**: React hooks (usePlan)

### Backend
- **Runtime**: Next.js API Routes
- **Authentication**: Environment-based API key management
- **LLM Integration**: OpenAI or Anthropic
- **Validation**: Structured input validation with clear error messages
- **Rate Limiting**: In-memory (Redis recommended for production)

### Infrastructure
- **Deployment**: Vercel (optimized)
- **Package Manager**: npm
- **Build Tool**: Next.js built-in

## Project Structure

```
/src
├── /app
│   ├── /api
│   │   └── /plan
│   │       └── route.ts          # POST /api/plan endpoint
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main planner interface
│   └── globals.css               # Global styles
├── /components
│   ├── /ui
│   │   └── form.tsx              # Form components (Input, Select, Button, Alert, etc.)
│   ├── /planner
│   │   ├── form.tsx              # PlannerForm component
│   │   └── output.tsx            # PlanOutput component
│   └── /layout
├── /lib
│   ├── /llm
│   │   ├── client.ts             # LLM integration (OpenAI/Anthropic)
│   │   └── prompts.ts            # System prompt & parsing logic
│   └── /validation
│       └── index.ts              # Input validation rules
├── /hooks
│   └── usePlan.ts                # Custom hook for plan generation
└── /types
    └── index.ts                  # TypeScript type definitions
```

## Type System

### Core Input Type
```typescript
interface PlannerInput {
  targetRole: string;              // e.g., "Backend Engineer"
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  existingSkills: string;          // Free text
  weeklyHours: number;             // 1-168
  timeframe: '3 months' | '6 months' | '1 year';
  budget?: 'low' | 'medium' | 'high';
  learningStyle: 'self-paced' | 'guided' | 'project-based';
}
```

### Strategic Plan Output
```typescript
interface StrategicPlan {
  overview: StrategicOverview;     // Current position → Goal analysis
  phases: Phase[];                  // 4-phase learning progression
  weeklyBreakdown: WeeklyItem[];   // Week-by-week action items
  recommendedProjects: Project[]; // Portfolio projects
  toolStack: ToolRecommendation[]; // Recommended tools & resources
  milestoneCheckpoints: MilestoneCheckpoint[]; // Progress evaluation points
}
```

## API Endpoint

### POST /api/plan

**Request**:
```json
{
  "targetRole": "Backend Engineer",
  "skillLevel": "Intermediate",
  "existingSkills": "Python, JavaScript, SQL",
  "weeklyHours": 20,
  "timeframe": "6 months",
  "budget": "medium",
  "learningStyle": "project-based"
}
```

**Response**:
```json
{
  "success": true,
  "plan": { /* StrategicPlan object */ },
  "processingTime": 3425
}
```

**Error Handling**:
- 400: Validation failed
- 429: Rate limit exceeded (5 requests/hour)
- 500: Server error
- 503: LLM service unavailable

## Prompt Engineering Strategy

The system uses a **structured system prompt** that forces the LLM to:

1. **Output valid JSON only** - No markdown, no explanations
2. **Follow exact structure** - Consistent, predictable output
3. **Be specific & actionable** - No vague advice
4. **Focus on measurable progress** - Clear success criteria
5. **Adapt to user context** - Tailor intensity to availability, skill level, learning style

**System Prompt Features**:
- Explicit JSON schema in the prompt
- Temperature: 0.7 (balanced creativity & consistency)
- Max tokens: 4000 (sufficient for detailed plans)
- Response format validation: `{ type: 'json_object' }` (GPT-4 only)

## Configuration

### Environment Variables

```bash
# LLM Provider (default: openai)
NEXT_PUBLIC_LLM_PROVIDER=openai

# OpenAI Configuration
OPENAI_API_KEY=sk_...
OPENAI_MODEL=gpt-4o-mini

# Alternative: Anthropic Configuration
# ANTHROPIC_API_KEY=sk_...
# ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

## Development

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

### Type Checking

```bash
npm run type-check
```

## Design Principles

### UI/UX
- **Minimal**: Only essential elements, no fluff
- **Professional**: Clear hierarchy, consistent spacing
- **Responsive**: Works on mobile, tablet, desktop
- **Accessible**: Proper form labels, semantic HTML, ARIA attributes

### Code
- **Modular**: Single responsibility, composable components
- **Type-Safe**: Full TypeScript, strict mode enabled
- **Testable**: Clear separation of concerns
- **Maintainable**: Consistent naming, clear logic flow

### Product
- **Practical**: Focused on execution, not entertainment
- **Intelligent**: Shows advanced understanding of career development
- **No Hype**: Honest about AI, realistic timelines
- **Strategic**: Output is actionable and specific

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with `npm run build`

**Vercel Configuration**:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Environment: Node.js 18+

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Optimizations

- **Code Splitting**: Automatic via Next.js
- **Image Optimization**: Built-in via Next.js Image component
- **CSS Purging**: Tailwind CSS production build
- **API Route Optimization**: Server-side only, minimal client bundle
- **Caching**: HTTP cache headers configured in next.config.js

## Security

- **API Key Protection**: Environment variables only, never exposed to client
- **Input Validation**: Server-side validation before LLM call
- **Rate Limiting**: Prevents abuse (5 requests/hour per IP)
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **No Third-Party Dependencies**: Minimal dependency footprint

## Roadmap

### Phase 1 (MVP)
- ✅ Core planner functionality
- ✅ OpenAI/Anthropic integration
- ✅ Structured output
- ✅ Basic UI

### Phase 2 (Enhancement)
- User authentication (email/OAuth)
- Plan storage & persistence
- Plan versioning & comparison
- Export to PDF/Markdown
- Email export functionality

### Phase 3 (Intelligence)
- Weekly progress tracking
- Plan adaptation based on progress
- Recommendation refinement
- Multi-model comparison (OpenAI vs Anthropic)
- Scheduled plan reviews

### Phase 4 (Scale)
- Collaborative planning (team features)
- Mentorship matching
- Resource marketplace
- Analytics dashboard
- API for third-party integrations

## Contributing

Guidelines for contributing to Valet:

1. Maintain TypeScript strict mode
2. Follow the existing component structure
3. Write clear, self-documenting code
4. Test API changes thoroughly
5. Update types when adding features

## License

MIT

## Support

For issues, questions, or feedback, please open a GitHub issue or contact the team.

---

**Valet: From goal to execution plan in seconds.**

Transform your career ambition into structured strategy.
