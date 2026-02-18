# Valet — Setup & Configuration Guide

## Prerequisites

- **Node.js**: 18+ (Check with `node --version`)
- **npm**: 9+ (Check with `npm --version`)
- **OpenAI API Key** or **Anthropic API Key**
- **Git** (for version control)

## 1. Installation

### Clone or Initialize the Project

```bash
cd /path/to/Valet
npm install
```

This installs all dependencies:
- Next.js 15
- React 18
- Tailwind CSS 3
- TypeScript 5
- ESLint

## 2. API Key Configuration

### Option A: OpenAI (Default)

1. **Get API Key**:
   - Visit https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key (you won't be able to see it again)

2. **Set Environment Variable**:
   ```bash
   # Create .env.local in root directory
   NEXT_PUBLIC_LLM_PROVIDER=openai
   OPENAI_API_KEY=sk_your_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```

3. **Verify Setup**:
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # Try generating a plan
   ```

### Option B: Anthropic (Claude)

1. **Get API Key**:
   - Visit https://console.anthropic.com/account/keys
   - Create a new API key
   - Copy the key

2. **Set Environment Variable**:
   ```bash
   # In .env.local
   NEXT_PUBLIC_LLM_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant_your_key_here
   ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
   ```

3. **Verify Setup**:
   ```bash
   npm run dev
   ```

## 3. Environment Variables

### Complete .env.local Example

```env
# LLM Configuration
NEXT_PUBLIC_LLM_PROVIDER=openai

# OpenAI Settings
OPENAI_API_KEY=sk_test_your_key_here
OPENAI_MODEL=gpt-4o-mini

# Alternative: Anthropic Settings
# ANTHROPIC_API_KEY=sk-ant_your_key_here
# ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Application
NEXT_PUBLIC_APP_NAME=Valet
NEXT_PUBLIC_APP_DESCRIPTION=AI Strategic Planner
NODE_ENV=development
```

### Production Environment Variables

For deployment to Vercel or similar:

1. Set `NEXT_PUBLIC_LLM_PROVIDER` (public)
2. Set `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` (private - in dashboard)
3. Set `NODE_ENV=production`

**Never commit `.env.local` to git** — it's in `.gitignore`

## 4. Development Server

### Start Development Server

```bash
npm run dev
```

Output:
```
  ▲ Next.js 15.1.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.3s
```

### Access the Application

1. Open browser: http://localhost:3000
2. Fill out the planner form
3. Click "Generate Strategic Plan"
4. View the AI-generated plan

### File Watching

- Automatic hot reload on file changes
- No need to restart server
- CSS/JS changes reflect immediately

## 5. Building for Production

### Production Build

```bash
npm run build
```

This:
- Compiles TypeScript
- Bundles and optimizes code
- Generates static assets
- Performs type checking

### Starting Production Server

```bash
npm run start
```

This runs the optimized, compiled application.

### Type Checking

```bash
npm run type-check
```

Validates all TypeScript without building.

## 6. Testing the API

### Using curl

```bash
curl -X POST http://localhost:3000/api/plan \
  -H "Content-Type: application/json" \
  -d '{
    "targetRole": "Backend Engineer",
    "skillLevel": "Intermediate",
    "existingSkills": "Python, JavaScript",
    "weeklyHours": 20,
    "timeframe": "6 months",
    "budget": "medium",
    "learningStyle": "project-based"
  }'
```

### Using JavaScript (Fetch)

```javascript
const response = await fetch('/api/plan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    targetRole: "Backend Engineer",
    skillLevel: "Intermediate",
    existingSkills: "Python, JavaScript",
    weeklyHours: 20,
    timeframe: "6 months",
    budget: "medium",
    learningStyle: "project-based"
  })
});

const data = await response.json();
console.log(data);
```

## 7. Deployment to Vercel

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Environment variables set
- [ ] API key working locally
- [ ] README.md up to date

### Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: Valet AI Strategic Planner"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Visit https://vercel.com/new
   - Import your GitHub repository
   - Select "Next.js" framework

3. **Configure Environment Variables**:
   - In Vercel Dashboard → Settings → Environment Variables
   - Add: `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
   - Add: `NEXT_PUBLIC_LLM_PROVIDER`

4. **Deploy**:
   - Click "Deploy"
   - Wait for build completion
   - Visit your production URL

### Vercel Configuration File (Optional)

Create `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_LLM_PROVIDER": "@openai_provider",
    "OPENAI_API_KEY": "@openai_key"
  }
}
```

## 8. Troubleshooting

### "OPENAI_API_KEY is not set"

**Problem**: Environment variable not found

**Solution**:
```bash
# Check .env.local exists
cat .env.local

# Verify API key is set
echo $OPENAI_API_KEY

# Restart dev server
npm run dev
```

### "Cannot find module '@/types'"

**Problem**: TypeScript path alias not working

**Solution**:
```bash
# This usually means node_modules are not installed
npm install

# Verify tsconfig.json has paths configured
cat tsconfig.json | grep -A5 '"paths"'

# Restart TypeScript server in your editor
```

### "Rate limit exceeded"

**Problem**: Too many requests in short time

**Solution**:
```typescript
// Built-in: 5 requests per hour per IP
// Wait 1 hour or deploy with Redis for higher limits

// For local testing, modify:
// src/lib/llm/client.ts → checkRateLimit()
```

### "LLM service error"

**Problem**: OpenAI/Anthropic API not responding

**Solution**:
```bash
# Check API status
# OpenAI: https://status.openai.com
# Anthropic: https://status.anthropic.com

# Verify API key is valid
# Try a simple test with API provider's CLI

# Check your API quota
# OpenAI Dashboard: https://platform.openai.com/account/billing/overview
```

### "Port 3000 is already in use"

**Problem**: Another process using port 3000

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

## 9. Project Structure Walkthrough

### Key Directories

```
/src/app
├── layout.tsx          ← Root layout with metadata
├── page.tsx            ← Main planner interface
├── globals.css         ← Global Tailwind CSS
└── /api/plan/route.ts  ← API endpoint

/src/components
├── /ui/form.tsx        ← Reusable form components
├── /planner/form.tsx   ← Planner form component
└── /planner/output.tsx ← Plan display component

/src/lib
├── /llm/client.ts      ← LLM integration
├── /llm/prompts.ts     ← System prompt & parsing
└── /validation/index.ts ← Input validation

/src/hooks
└── usePlan.ts          ← Custom React hook

/src/types
└── index.ts            ← TypeScript type definitions
```

### Important Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS theme |
| `next.config.js` | Next.js configuration |
| `.env.local` | Environment variables (local) |
| `.gitignore` | Files to exclude from git |

## 10. Performance Tips

### Optimize Build Time

```bash
# Use Turbopack for faster development
npm run dev -- --turbopack
```

### Optimize Production

```bash
# Build with optimizations
npm run build

# Analyze bundle
npm run build -- --analyze
```

### Monitor LLM Costs

**OpenAI gpt-4o-mini**:
- Input: $0.00015 per 1K tokens
- Output: $0.0006 per 1K tokens
- Typical plan: ~500-1000 tokens out = ~$0.30-0.60

**Anthropic Claude 3.5 Sonnet**:
- Input: $0.003 per 1K tokens
- Output: $0.015 per 1K tokens
- Typical plan: ~500-1000 tokens out = ~$0.0075-0.015

Monitor usage in your API provider's dashboard.

## 11. Next Steps

### Immediate Tasks

1. ✅ Install dependencies
2. ✅ Configure API key
3. ✅ Run locally
4. ✅ Test plan generation
5. ✅ Deploy to Vercel

### Enhancement Ideas

1. **User Authentication**: Add email/OAuth login
2. **Plan Storage**: Save and retrieve past plans
3. **PDF Export**: Export plans as PDF
4. **Multiple LLMs**: Compare OpenAI vs Anthropic
5. **Progress Tracking**: Track user progress against plan
6. **Refinement**: Iterative plan improvement

### Monitoring Setup

```bash
# Recommended tools for production
- Sentry (error tracking)
- LogRocket (session replay)
- Vercel Analytics (built-in)
```

## 12. Support & Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)

### Community

- GitHub Issues: Report bugs and feature requests
- Discussions: Share ideas and get help

### Getting Help

1. Check error messages carefully
2. Review ARCHITECTURE.md for system details
3. Check logs in console/terminal
4. Verify API keys and configuration

---

**Ready to generate strategic plans?** 🚀

Start the dev server and visit http://localhost:3000
