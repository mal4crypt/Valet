# Valet — System Architecture & Design Document

## Executive Summary

Valet is a production-grade AI strategic planning system that transforms unstructured career goals into structured, executable roadmaps. The system demonstrates professional software architecture with clear separation of concerns, secure API integration, and intelligent prompt engineering.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐      │
│  │ Landing Page │  │ Planner Form │  │ Plan Output      │      │
│  └──────────────┘  └──────────────┘  └──────────────────┘      │
│  (Next.js App Router - No sensitive data in JS)                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    POST /api/plan
                           │
┌──────────────────────────┴──────────────────────────────────────┐
│                    API LAYER (Server-Side)                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Route Handler (/api/plan/route.ts)                   │    │
│  │  - Rate limiting                                       │    │
│  │  - Input validation                                    │    │
│  │  - Error handling                                      │    │
│  │  - Request/Response management                         │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
┌───────┴──────────────┐         ┌───────────┴────────┐
│  PROCESSING LAYER    │         │  VALIDATION LAYER  │
│  - Prompt building   │         │  - Schema validate │
│  - LLM integration   │         │  - Type checking   │
│  - Response parsing  │         │  - Error messaging │
└──────┬───────────────┘         └────────────────────┘
       │
┌──────┴─────────────────────────────────────────┐
│          LLM SERVICE LAYER                      │
│  ┌─────────────────────────────────────────┐  │
│  │ OpenAI API         Anthropic API        │  │
│  │ (GPT-4o Mini)      (Claude 3.5 Sonnet) │  │
│  └─────────────────────────────────────────┘  │
│  - Structured prompts                          │
│  - JSON-only output                            │
│  - Validation & parsing                        │
└──────────────────────────────────────────────────┘
```

## Data Flow

### Request → Response Cycle

```
1. USER INPUT COLLECTION
   ↓
   PlannerForm Component
   └─ Captures: targetRole, skillLevel, existingSkills, 
               weeklyHours, timeframe, budget, learningStyle

2. CLIENT-SIDE VALIDATION
   ↓
   usePlan Hook
   └─ Prevents invalid submissions

3. API REQUEST
   ↓
   POST /api/plan
   └─ body: { PlannerInput }

4. SERVER-SIDE VALIDATION
   ↓
   validatePlannerInput()
   └─ Comprehensive input validation
   └─ Returns: FormState with errors or isValid: true

5. RATE LIMIT CHECK
   ↓
   checkRateLimit(clientIp)
   └─ 5 requests per hour per IP
   └─ Returns: 429 if exceeded

6. LLM CONFIGURATION
   ↓
   getLLMConfig()
   └─ Reads environment variables
   └─ Validates API keys exist

7. PROMPT ENGINEERING
   ↓
   buildPlanningPrompt(input)
   └─ Constructs contextual prompt with all input parameters
   └─ Forces LLM to adapt to user constraints

8. LLM CALL
   ↓
   generateStrategicPlan(input)
   ├─ OpenAI: /v1/chat/completions
   │  └─ Model: gpt-4o-mini
   │  └─ Response format: { type: 'json_object' }
   │
   └─ Anthropic: /v1/messages
      └─ Model: claude-3-5-sonnet-20241022
      └─ System: SYSTEM_PROMPT (structured constraints)

9. RESPONSE PARSING
   ↓
   validateLLMResponse()
   └─ Validates JSON structure
   └─ Checks required fields
   └─ Validates arrays have minimum items

10. DATA TRANSFORMATION
    ↓
    parseLLMResponse()
    └─ Returns: StrategicPlan (typed)

11. ERROR HANDLING
    ↓
    Returns: GeneratePlanResponse
    ├─ success: true → plan included
    └─ success: false → error message

12. CLIENT RECEIVES RESPONSE
    ↓
    usePlan Hook
    └─ Updates state: { plan, isLoading, error, processingTime }

13. UI RENDER
    ↓
    PlanOutput Component
    └─ Displays structured plan in sections
       ├─ Strategic Overview
       ├─ Learning Roadmap (Phases)
       ├─ Recommended Projects
       ├─ Tool Stack
       └─ Milestone Checkpoints
```

## Component Hierarchy

```
RootLayout (src/app/layout.tsx)
└── PlannerPage (src/app/page.tsx)
    ├── Header
    ├── Main Content Grid
    │   ├── Left Column (Sticky)
    │   │   ├── PlannerForm (src/components/planner/form.tsx)
    │   │   │   ├── InputField × 2
    │   │   │   ├── SelectField × 4
    │   │   │   ├── TextAreaField × 1
    │   │   │   └── Button (Submit)
    │   │   │
    │   │   └── Regenerate/Refine Card
    │   │
    │   └── Right Column (Scrollable)
    │       ├── Loading State (Skeleton)
    │       ├── PlanOutput (src/components/planner/output.tsx)
    │       │   ├── Strategic Overview Section
    │       │   ├── Phase Cards × 4
    │       │   ├── Project Cards × 4-6
    │       │   ├── Tool Stack Categories × 3-4
    │       │   └── Milestone Checkpoints × 4-5
    │       │
    │       └── Empty State
    │
    └── Footer
```

## State Management

### usePlan Hook

```typescript
// Local state in component
State: {
  isLoading: boolean;      // During plan generation
  error: string | null;    // API errors
  plan: StrategicPlan | null;
  processingTime: number | null;
}

// Actions
generatePlan(input: PlannerInput)
resetPlan()
clearError()
```

### Form State

```typescript
// Local state in PlannerForm
formData: Partial<PlannerInput>
errors: Partial<Record<keyof PlannerInput, string>>
```

## Validation Architecture

### Three-Layer Validation

#### 1. Client-Side (UX Feedback)
- Runs as user types
- Clears errors when field is edited
- Prevents submission of invalid data

#### 2. Server-Side (Security)
- Comprehensive input validation
- Type checking
- Range checking (weeklyHours: 1-168)
- String length validation
- Enum value validation

#### 3. LLM Response Validation
- JSON structure validation
- Required field validation
- Array length validation
- Type checking

### Validation Functions

```typescript
// Individual validators
validateTargetRole(role: string) → string | null
validateWeeklyHours(hours: number) → string | null
validateExistingSkills(skills: string) → string | null
validateSkillLevel(level: string) → boolean
validateTimeframe(timeframe: string) → boolean
validateLearningStyle(style: string) → boolean

// Comprehensive validator
validatePlannerInput(input: Partial<PlannerInput>) → FormState
```

## Prompt Engineering Strategy

### System Prompt Design

The system prompt is the most critical component for generating consistent, high-quality output.

**Key Principles**:

1. **Explicit JSON Schema**: Includes complete JSON structure in the prompt
2. **Constraint Enforcement**: Forces specific array lengths, field presence
3. **Quality Requirements**: "Be specific and actionable", "Avoid vague advice"
4. **Adaptation Instructions**: "Adapt all recommendations based on skill level, timeframe..."
5. **Format Requirements**: "Output ONLY valid JSON. No markdown."

### Prompt Personalization

The user input is dynamically inserted into the planning prompt:

```typescript
buildPlanningPrompt(input: PlannerInput) → string

// Constructs:
Create a strategic career development plan with these specifications:

TARGET ROLE: ${input.targetRole}
CURRENT SKILL LEVEL: ${input.skillLevel}
EXISTING SKILLS: ${input.existingSkills}
WEEKLY AVAILABILITY: ${input.weeklyHours} hours
TOTAL TIMEFRAME: ${input.timeframe}
BUDGET CONSTRAINT: ${input.budget}
LEARNING PREFERENCE: ${input.learningStyle}

Requirements for this plan:
1. Be realistic about what can be accomplished in ${input.timeframe}
2. Tailor intensity based on ${input.weeklyHours} weekly hours availability
3. Adapt to ${input.learningStyle} learning style preference
...
```

### Output Control

**Temperature**: 0.7 (balanced creativity & consistency)
**Max Tokens**: 4000 (sufficient for detailed 4-phase plans)
**Response Format**: `{ type: 'json_object' }` (GPT-4 only, ensures valid JSON)

## LLM Integration Details

### OpenAI API

```typescript
POST https://api.openai.com/v1/chat/completions

{
  "model": "gpt-4o-mini",
  "messages": [
    { "role": "system", "content": SYSTEM_PROMPT },
    { "role": "user", "content": buildPlanningPrompt(input) }
  ],
  "temperature": 0.7,
  "max_tokens": 4000,
  "response_format": { "type": "json_object" }
}
```

**Advantages**:
- JSON mode ensures valid JSON output
- Latest models available
- Excellent cost/performance ratio (gpt-4o-mini)

### Anthropic API

```typescript
POST https://api.anthropic.com/v1/messages

{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 4000,
  "system": SYSTEM_PROMPT,
  "messages": [
    { "role": "user", "content": buildPlanningPrompt(input) }
  ],
  "temperature": 0.7
}
```

**Advantages**:
- Strong reasoning capabilities
- Excellent at following instructions
- Good cost/performance

### Provider Selection

Set via `NEXT_PUBLIC_LLM_PROVIDER` environment variable:
- `openai` (default): Use OpenAI API
- `anthropic`: Use Anthropic API

## Error Handling Strategy

### Error Types & HTTP Status Codes

| Error | Status | Handling |
|-------|--------|----------|
| Validation Failed | 400 | Return validation errors to client |
| Rate Limited | 429 | "Too many requests" message |
| LLM API Error | 503 | "Service unavailable" message |
| Server Error | 500 | Log error, generic message to client |
| Config Error | 500 | Log details, notify ops |

### Error Messages Strategy

**User-Facing** (clear, actionable):
- "Validation failed: Target role must be at least 3 characters"
- "Rate limit exceeded. Maximum 5 requests per hour."
- "LLM service error. Please try again later."

**Server-Facing** (detailed, for debugging):
```typescript
console.error('Plan generation error:', error);
console.error('LLM Response validation failed:', validation.error);
```

## Rate Limiting

### Simple In-Memory Implementation

```typescript
const rateLimitStore = new Map<string, number[]>();

checkRateLimit(clientId: string, limit: number = 5, windowMs: number = 3600000)
// 5 requests per hour per client IP
// For production: use Redis or similar
```

### Production Recommendation

For production, replace in-memory store with Redis:

```typescript
// Redis implementation (pseudocode)
async function checkRateLimit(clientId: string) {
  const count = await redis.incr(`rate_limit:${clientId}`);
  if (count === 1) {
    await redis.expire(`rate_limit:${clientId}`, 3600);
  }
  return count <= 5;
}
```

## Security Architecture

### API Key Management

**Protected**:
- `OPENAI_API_KEY` - Never exposed
- `ANTHROPIC_API_KEY` - Never exposed

**Public OK**:
- `NEXT_PUBLIC_LLM_PROVIDER` - Can be public
- `NEXT_PUBLIC_APP_NAME` - Can be public

### Request Validation

1. **Input Validation**: All user inputs validated before LLM call
2. **Rate Limiting**: Prevents abuse
3. **Type Safety**: TypeScript prevents type confusion
4. **Error Handling**: No sensitive data in error messages

### HTTP Security Headers

```javascript
// next.config.js
headers: [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',  // Prevent clickjacking
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
]
```

## Database Considerations (Future)

For storing user plans and history:

### Recommended Schema

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- Plans Table
CREATE TABLE plans (
  id UUID PRIMARY KEY,
  userId UUID NOT NULL REFERENCES users(id),
  input JSONB NOT NULL,        -- Stored PlannerInput
  output JSONB NOT NULL,       -- Stored StrategicPlan
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Generations Table (for analytics)
CREATE TABLE generations (
  id UUID PRIMARY KEY,
  planId UUID REFERENCES plans(id),
  processingTime INT,
  provider VARCHAR(50),        -- 'openai' or 'anthropic'
  model VARCHAR(100),
  createdAt TIMESTAMP DEFAULT NOW()
);
```

## Deployment Architecture

### Local Development

```bash
npm run dev
# Runs on http://localhost:3000
# File watching enabled
# Hot reload enabled
```

### Production (Vercel)

```
Push to main → Vercel build → Deploy to Edge Network
└─ Automatic environment variable setup
└─ Built-in HTTPS
└─ Automatic scaling
└─ Analytics included
```

### Docker (Alternative)

```dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

## Performance Characteristics

### Expected Response Times

| Phase | Duration | Notes |
|-------|----------|-------|
| Input Validation | <50ms | Server-side validation |
| Rate Limit Check | <10ms | In-memory lookup |
| Prompt Building | <50ms | String concatenation |
| **LLM API Call** | **2-8 seconds** | Dominant factor |
| Response Parsing | <100ms | JSON parsing + validation |
| **Total** | **2-9 seconds** | Typical |

### Optimizations

1. **No unnecessary database calls** (MVP)
2. **Minimal external dependencies**
3. **Efficient validation** (early return on first error)
4. **Streaming responses** (not implemented yet, future)

## Monitoring & Logging

### Key Metrics

```typescript
// Log in generateStrategicPlan()
console.log(`Plan generation completed in ${processingTime}ms`);

// Log errors
console.error('Plan generation error:', error);
console.error('LLM Response validation failed:', validation.error);
```

### Recommended Monitoring (Production)

- Error rate tracking
- Average response time
- Rate limit hits
- API quota usage
- Failed LLM calls

## Scalability Considerations

### Current Limitations

- In-memory rate limiting (single instance)
- No caching (every request hits LLM)
- No plan storage (stateless)

### Scaling Strategy

1. **Caching**: Redis cache for common input patterns
2. **Distributed Rate Limiting**: Redis-based rate limiting
3. **Plan Storage**: PostgreSQL for user plans
4. **Queue System**: Bull or RabbitMQ for async generation
5. **CDN**: Vercel automatic CDN for static assets

## Testing Strategy

### Unit Tests (To Implement)

```typescript
// tests/validation.test.ts
describe('Input Validation', () => {
  test('rejects empty target role')
  test('validates hourly range')
  test('validates enum values')
})

// tests/prompts.test.ts
describe('Prompt Engineering', () => {
  test('builds valid prompt with all inputs')
  test('validates LLM response structure')
})
```

### Integration Tests (To Implement)

```typescript
// tests/api.test.ts
describe('POST /api/plan', () => {
  test('rejects invalid input with 400')
  test('returns valid plan with 200')
  test('enforces rate limit with 429')
})
```

### E2E Tests (To Implement)

```typescript
// tests/e2e.test.ts
describe('Complete User Flow', () => {
  test('fills form and generates plan')
  test('displays plan output')
  test('allows regeneration')
})
```

## Conclusion

Valet demonstrates production-grade architecture with:

- ✅ Clear separation of concerns
- ✅ Type-safe code (TypeScript)
- ✅ Secure API integration
- ✅ Intelligent prompt engineering
- ✅ Comprehensive validation
- ✅ Professional error handling
- ✅ Scalable design
- ✅ Deployment-ready

This is not a demo—it's a foundation for a real product.
