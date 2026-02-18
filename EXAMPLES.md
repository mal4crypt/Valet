# Valet — Example Use Cases & Sample Output

This document demonstrates the types of outputs Valet produces and how the system handles different user inputs.

## Use Case 1: Career Transition - Beginner

### Input

```json
{
  "targetRole": "Junior Data Scientist",
  "skillLevel": "Beginner",
  "existingSkills": "Basic Python, Excel, Statistics fundamentals",
  "weeklyHours": 15,
  "timeframe": "6 months",
  "budget": "low",
  "learningStyle": "self-paced"
}
```

### Expected Output Structure

```
STRATEGIC OVERVIEW
├─ Current Position: "Career changer with foundational skills looking to transition..."
├─ Target Goal: "Secure junior data scientist role within 6 months"
├─ Feasibility: "Realistic with dedicated effort. You'll need to build..."
├─ Timeline Reality: "6 months is aggressive but achievable with..."
└─ Key Success Factors:
   • Build a portfolio of 3-4 real datasets
   • Master pandas, scikit-learn, visualization libraries
   • Practice SQL fundamentals
   • Complete at least 2 end-to-end projects

LEARNING ROADMAP
├─ Phase 1: Foundation (Weeks 1-2)
│  ├─ Objectives:
│  │  • Python proficiency (NumPy, Pandas basics)
│  │  • Statistics refresher
│  │  • Development environment setup
│  └─ Duration: 2 weeks
│
├─ Phase 2: Core Skills (Weeks 3-12)
│  ├─ Objectives:
│  │  • Master Pandas, Scikit-learn
│  │  • SQL fundamentals
│  │  • Data visualization (Matplotlib, Seaborn)
│  ├─ Duration: 10 weeks
│  └─ Weekly breakdown:
│     - Week 3-4: Data manipulation
│     - Week 5-6: ML algorithms intro
│     - Week 7-8: SQL + visualization
│     - Week 9-12: Applied practice
│
├─ Phase 3: Applied Projects (Weeks 13-20)
│  ├─ Objectives:
│  │  • Complete 2 portfolio projects
│  │  • GitHub presence
│  │  • Document your work
│  └─ Duration: 8 weeks
│
└─ Phase 4: Interview Prep (Weeks 21-26)
   ├─ Objectives:
   │  • Mock interviews
   │  • Case study practice
   │  • Resume optimization
   └─ Duration: 6 weeks

RECOMMENDED PROJECTS
├─ Project 1: House Price Prediction
│  ├─ Skills: Data cleaning, EDA, regression, evaluation
│  ├─ Duration: 3-4 weeks
│  ├─ Difficulty: Beginner → Intermediate
│  └─ Portfolio Value: "Classic ML project, strong signal to employers"
│
├─ Project 2: Customer Churn Analysis
│  ├─ Skills: Classification, feature engineering, business context
│  ├─ Duration: 4-5 weeks
│  ├─ Difficulty: Intermediate
│  └─ Portfolio Value: "Shows business acumen, real-world applicability"
│
└─ Project 3: Time Series Analysis
   ├─ Skills: Time series methods, forecasting
   ├─ Duration: 3-4 weeks
   ├─ Difficulty: Intermediate
   └─ Portfolio Value: "Specialized skill, valuable in many domains"

TOOL STACK
├─ Programming & Data Science
│  ├─ Python 3.9+ (Free)
│  ├─ Jupyter Notebook (Free)
│  ├─ Pandas (Free)
│  ├─ NumPy (Free)
│  ├─ Scikit-learn (Free)
│  ├─ Matplotlib (Free)
│  └─ Seaborn (Free)
│
├─ Databases
│  ├─ PostgreSQL (Free, self-hosted)
│  └─ SQLite (Free, local)
│
└─ Learning & Community
   ├─ Kaggle (Free datasets & competitions)
   ├─ GitHub (Free repositories)
   ├─ Medium (Free articles)
   └─ Stack Overflow (Free Q&A)

MILESTONE CHECKPOINTS
├─ Checkpoint 1 (Week 4): Python & Statistics Mastery
│  ├─ Can write clean, efficient Python
│  ├─ Understand statistical distributions
│  └─ Complete 3 small exercises independently
│
├─ Checkpoint 2 (Week 12): Core ML Skills
│  ├─ Build and evaluate ML models
│  ├─ Write SQL queries for data extraction
│  └─ Create publication-quality visualizations
│
├─ Checkpoint 3 (Week 20): Portfolio Strength
│  ├─ 2+ published projects on GitHub
│  ├─ 500+ views on projects
│  └─ Can explain your work to non-technical people
│
└─ Checkpoint 4 (Week 26): Interview Ready
   ├─ Pass mock interview questions
   ├─ Solve real data science problems in <2 hours
   └─ Network with 5+ data scientists

WEEKLY BREAKDOWN (Sample Weeks)
├─ Week 1: Foundation
│  ├─ Action Items:
│  │  • Install Python, Jupyter, required libraries
│  │  • Complete Python basics refresher
│  │  • Understand NumPy arrays and operations
│  │  • Set up GitHub account, learn git basics
│  ├─ Measurable Objectives:
│  │  • Can import and manipulate NumPy arrays
│  │  • Create first Jupyter notebook
│  │  • First commit to GitHub
│  └─ Estimated Hours: 12
│
├─ Week 5: Core Pandas
│  ├─ Action Items:
│  │  • Master DataFrame operations
│  │  • Practice data cleaning techniques
│  │  • Work with real dataset
│  │  • Review & consolidate
│  ├─ Measurable Objectives:
│  │  • Clean dataset with 500+ rows independently
│  │  • Perform exploratory data analysis
│  │  • Create informative visualizations
│  └─ Estimated Hours: 15
│
└─ Week 15: First Project Start
   ├─ Action Items:
   │  • Select project: House Price Prediction
   │  • Gather and explore data
   │  • Data preprocessing
   │  • Feature engineering start
   ├─ Measurable Objectives:
   │  • Dataset loaded and explored
   │  • Data quality issues identified
   │  • Initial features engineered
   └─ Estimated Hours: 18
```

## Use Case 2: Skill Deepening - Advanced

### Input

```json
{
  "targetRole": "Staff Backend Engineer",
  "skillLevel": "Advanced",
  "existingSkills": "10 years backend development, Go, Java, PostgreSQL, distributed systems",
  "weeklyHours": 10,
  "timeframe": "1 year",
  "budget": "high",
  "learningStyle": "guided"
}
```

### Expected Focus Areas

For advanced practitioners, the plan focuses on:

1. **Architecture & System Design**
   - Advanced distributed systems patterns
   - High-scale infrastructure design
   - Cloud-native architecture

2. **Leadership & Soft Skills**
   - Technical mentoring
   - Architecture decision-making
   - Cross-functional collaboration

3. **Emerging Technologies**
   - Rust for systems programming
   - Advanced Kubernetes orchestration
   - Edge computing patterns

4. **Strategic Projects**
   - Design a microservices migration
   - Build a high-performance library
   - Lead architecture review process

## Use Case 3: Time-Constrained Professional

### Input

```json
{
  "targetRole": "Product Manager",
  "skillLevel": "Intermediate",
  "existingSkills": "5 years software engineering, analytics, user research basics",
  "weeklyHours": 5,
  "timeframe": "3 months",
  "budget": "high",
  "learningStyle": "guided"
}
```

### Expected Adaptation

System would adapt plan for:

- **Intensity**: Heavily curated resources, no fluff
- **Timeframe**: 12-week intensive instead of leisurely
- **Budget**: High-quality mentorship, structured bootcamp
- **Learning Style**: Guided → structured course + 1:1 coaching
- **Projects**: 1-2 focused projects instead of many
- **Milestones**: Every 3 weeks instead of monthly

## Input Validation Examples

### Valid Inputs

✅ All examples above are valid inputs that generate complete plans

### Invalid Inputs & Error Messages

```json
{
  "targetRole": "",  // ❌ Empty
  // Error: "Target role is required"
}

{
  "targetRole": "X",  // ❌ Too short
  // Error: "Target role must be at least 3 characters"
}

{
  "skillLevel": "Expert"  // ❌ Invalid option
  // Error: "Please select a valid skill level"
}

{
  "weeklyHours": 200  // ❌ More than 168 (hours in week)
  // Error: "Weekly hours must be between 1 and 168"
}

{
  "timeframe": "2 months"  // ❌ Invalid option
  // Error: "Please select a valid timeframe"
}

{
  "existingSkills": "x".repeat(1001)  // ❌ Too long
  // Error: "Existing skills description must be less than 1000 characters"
}
```

## Rate Limiting Behavior

### Scenario 1: Within Limit

```
User makes 3 requests in 1 hour
→ All succeed with 200 status
→ Each generates a plan
```

### Scenario 2: At Limit

```
User makes 5 requests in 1 hour
→ 6th request → 429 Too Many Requests
→ Error: "Rate limit exceeded. Maximum 5 requests per hour."
→ User must wait until next hour window
```

## API Response Examples

### Successful Response (200)

```json
{
  "success": true,
  "plan": {
    "overview": { ... },
    "phases": [ ... ],
    "weeklyBreakdown": [ ... ],
    "recommendedProjects": [ ... ],
    "toolStack": [ ... ],
    "milestoneCheckpoints": [ ... ]
  },
  "processingTime": 3425
}
```

### Validation Error Response (400)

```json
{
  "success": false,
  "error": "Validation failed: Target role must be at least 3 characters, Weekly hours must be between 1 and 168",
  "processingTime": 45
}
```

### Rate Limit Response (429)

```json
{
  "success": false,
  "error": "Rate limit exceeded. Maximum 5 requests per hour.",
  "processingTime": 12
}
```

### LLM Service Error Response (503)

```json
{
  "success": false,
  "error": "LLM service error. Please try again later.",
  "processingTime": 8000
}
```

### Server Error Response (500)

```json
{
  "success": false,
  "error": "An unknown error occurred",
  "processingTime": 15
}
```

## UI Behavior Examples

### Loading State

```
┌─────────────────────────────────────────┐
│  ⟳ Analyzing your trajectory...         │
│                                          │
│  Generating a personalized strategic    │
│  plan based on your inputs.             │
└─────────────────────────────────────────┘
```

### Empty State

```
┌─────────────────────────────────────────┐
│              📋                          │
│  Generate Your Strategic Plan           │
│                                          │
│  Complete the form to the left to       │
│  create a personalized, milestone-      │
│  driven career development plan.        │
└─────────────────────────────────────────┘
```

### Error State

```
┌─────────────────────────────────────────┐
│  ⚠️ Validation failed: Target role      │
│     must be at least 3 characters       │
│                                      [×]│
└─────────────────────────────────────────┘
```

### Success State with Regenerate

```
┌─────────────────────────────────────────┐
│  ✓ Plan Generated                      │
│                                          │
│  Your strategic plan is ready. Scroll   │
│  to see all details.                    │
│                                          │
│  [ Regenerate / Refine ]                │
└─────────────────────────────────────────┘
```

## Customization Examples

### Budget Affects Tool Recommendations

**Low Budget Input**:
```
Tools:
• Free: Kaggle, Google Colab, Free Tier AWS
• No paid courses (use free YouTube)
• Community-driven learning
```

**High Budget Input**:
```
Tools:
• Paid: DataCamp, Coursera Premium, A Cloud Guru
• 1:1 Mentorship from industry expert
• Live cohort-based bootcamp
```

### Weekly Hours Affects Intensity

**5 Hours/Week Input**:
```
Phase 1: 4-6 weeks (slow pace)
Weekly breakdown: 5 action items
Projects: 1 focused project
Learning style: Structured courses
```

**40 Hours/Week Input** (immersive bootcamp:
```
Phase 1: 1-2 weeks (intensive)
Weekly breakdown: 12 action items
Projects: 2-3 concurrent projects
Learning style: Project-based + pair programming
```

### Learning Style Affects Content

**Self-Paced Input**:
```
Resources:
• YouTube: "Python for Data Science"
• Free books: "Intro to Statistical Learning"
• Kaggle competitions
• Self-directed projects
```

**Guided Input**:
```
Resources:
• Structured bootcamp: DataCamp, Coursera
• Online course: Udacity Nanodegree
• Weekly cohorts, deadlines
• 1:1 support available
```

**Project-Based Input**:
```
Resources:
• Learn-by-doing platforms: Exercism
• Real data + clients: Upwork, freelance
• Team collaboration: GitHub, pair programming
• Portfolio-first approach
```

## Performance Characteristics

### Typical Processing Times

```
Input validation:    25ms
Rate limit check:    8ms
Prompt building:     45ms
OpenAI API call:   2500-4000ms  ← dominant
Response parsing:    85ms
─────────────────────────────
Total:            2700-4200ms
```

### Example Plan Sizes

```
Overview: ~500 tokens
Phases (4): ~1200 tokens
Weekly breakdown (12 weeks): ~2000 tokens
Projects (4-6): ~1500 tokens
Tool stack (3-4 categories): ~800 tokens
Milestones: ~600 tokens
─────────────────────────────
Total: ~6600 tokens

Cost (OpenAI gpt-4o-mini): ~$0.39
Cost (Anthropic Claude): ~$0.010
```

## A/B Testing Ideas

### Version A: Aggressive Timeline
- "You can do this in 3 months"
- High intensity action items
- Challenge-focused language

### Version B: Realistic Timeline
- "This is a 6-month journey"
- Balanced intensity
- Sustainable pace language

### Measure:
- Completion rate
- User satisfaction
- Plans actually followed

---

This document demonstrates the flexibility and power of Valet's AI system to adapt to diverse user scenarios while maintaining consistent output quality and structure.
