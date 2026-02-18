# Quick Start Guide — Valet AI Strategic Planner

Get Valet running in 5 minutes.

## Prerequisites

- Node.js 18+ (`node --version`)
- npm 9+ (`npm --version`)
- OpenAI or Anthropic API key

## Step 1: Get an API Key (2 minutes)

### Option A: OpenAI (Recommended)

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (save it safely)
5. Set monthly limit in billing settings

### Option B: Anthropic

1. Go to https://console.anthropic.com/account/keys
2. Sign up or log in
3. Click "Create Key"
4. Copy the key (save it safely)

## Step 2: Install Valet (1 minute)

```bash
cd /path/to/Valet
npm install
```

## Step 3: Configure Environment (1 minute)

### For OpenAI:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_LLM_PROVIDER=openai
OPENAI_API_KEY=sk_your_actual_key_here
EOF
```

### For Anthropic:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant_your_actual_key_here
EOF
```

## Step 4: Run Valet (1 minute)

```bash
npm run dev
```

Output:
```
  ▲ Next.js 15.1.0
  - Local:        http://localhost:3000
✓ Ready in 2.3s
```

## Step 5: Use Valet (1 minute)

1. Open browser: **http://localhost:3000**
2. Fill out the form:
   - **Target Role**: e.g., "Backend Engineer"
   - **Skill Level**: e.g., "Intermediate"
   - **Weekly Hours**: e.g., "20"
   - **Timeframe**: e.g., "6 months"
   - **Learning Style**: e.g., "project-based"
3. Click "Generate Strategic Plan"
4. Wait 2-8 seconds for AI to generate your plan
5. Scroll to see your complete strategic plan

---

## That's it! 🎉

Your personalized career development plan is ready.

---

## What You Get

Your plan includes:

📋 **Strategic Overview**
- Current position assessment
- Target goal clarity
- Feasibility analysis
- Timeline expectations
- Key success factors

🗺️ **Learning Roadmap**
- 4 structured phases
- Clear objectives for each phase
- Success criteria
- Key learnings

📅 **Weekly Breakdown**
- Week-by-week action items
- Measurable objectives
- Estimated time per week

💼 **Recommended Projects**
- Portfolio projects to build
- Skills each project reinforces
- Difficulty level
- Portfolio value

🛠️ **Tool Stack**
- Free tools to use
- Paid options (if applicable)
- Why each tool

✅ **Milestone Checkpoints**
- Progress evaluation points
- Evaluation criteria
- Success indicators

---

## Troubleshooting

### "OPENAI_API_KEY not found"

Make sure `.env.local` file exists in the root directory:

```bash
ls -la .env.local
```

If missing, recreate it with your API key.

### "Port 3000 already in use"

Use a different port:

```bash
npm run dev -- -p 3001
# Visit http://localhost:3001
```

### "API Key invalid"

1. Check your key is correct (no spaces, complete)
2. Verify it's from the right provider (openai.com or anthropic.com)
3. Verify it has credits/hasn't expired
4. Verify you set the correct NEXT_PUBLIC_LLM_PROVIDER

### "Rate limit exceeded"

Default: 5 plans per hour per IP address.

Wait an hour, or use a different IP address.

---

## Next Steps

### Deploy to Production

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/valet
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repo
   - Set environment variables (API key)
   - Click Deploy

3. **Share your plan**
   - Your site is live!
   - Share the URL with others

### Customize Valet

- Edit `SYSTEM_PROMPT` in `src/lib/llm/prompts.ts` to change how plans are generated
- Customize colors in `tailwind.config.ts`
- Edit text/messaging in React components

### Add Features

See **STRATEGY.md** for roadmap ideas:
- User authentication
- Plan storage
- PDF export
- Progress tracking
- Email notifications

---

## Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server
npm run type-check         # Check TypeScript errors
npm run lint               # Run ESLint

# Environment
echo $OPENAI_API_KEY       # Check API key is set
cat .env.local             # View environment variables
```

---

## Documentation

For more details, see:

- **README.md** — Full overview
- **ARCHITECTURE.md** — System design
- **SETUP.md** — Detailed setup guide
- **EXAMPLES.md** — Use case examples
- **STRATEGY.md** — Product roadmap

---

## Key Features

✅ Generates personalized plans in seconds
✅ Structured, actionable output
✅ Works offline after first load
✅ No sign-up required
✅ Free to use
✅ Professional design
✅ Mobile responsive

---

## Architecture

```
User Input → Server Validation → LLM API → Response Parsing → Beautiful Output
```

- **All API keys stay on server** (secure)
- **Input is validated** both client and server side
- **Rate limited** to prevent abuse
- **Plans are optimized** for actionability

---

## What's Next?

You're now running a production-grade AI strategic planning system.

**Next steps:**

1. Try generating different types of plans
2. Customize the messaging/branding
3. Deploy to Vercel for free hosting
4. Add user authentication if you want to store plans
5. Share with friends who need career plans

---

## Questions?

- Check **SETUP.md** for troubleshooting
- Review **ARCHITECTURE.md** for technical details
- See **EXAMPLES.md** for use cases and sample outputs
- Read **STRATEGY.md** for the product vision

---

**Ready? Start at http://localhost:3000** 🚀

Transform ambition into execution.
