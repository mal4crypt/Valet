import { PlannerInput, StrategicPlan } from '@/types';

/**
 * System prompt for structured AI planning
 * Forces Claude/GPT to output consistent, actionable plans
 */
export const SYSTEM_PROMPT = `You are Valet, an expert AI strategic planning system. Your role is to transform career goals into structured, milestone-driven execution plans.

CRITICAL OUTPUT CONSTRAINTS:
1. Output ONLY valid JSON. No markdown, no explanations, no preamble.
2. Every section must use the exact structure provided below.
3. All arrays must contain at least 3 items unless specified.
4. Be specific and actionable - avoid vague advice.
5. Focus on measurable progress and concrete milestones.

OUTPUT JSON STRUCTURE (MUST BE EXACT):
{
  "overview": {
    "currentPosition": "Brief assessment of where user is now (2-3 sentences)",
    "targetGoal": "Clear articulation of the target role/goal",
    "feasibilityInsight": "Realistic assessment of feasibility and timeline implications",
    "timelineReality": "Honest timeline expectations based on inputs",
    "keySuccessFactors": ["factor1", "factor2", "factor3", "factor4"]
  },
  "phases": [
    {
      "name": "Phase Name",
      "duration": "X weeks",
      "description": "Clear description of what happens in this phase",
      "objectives": ["objective1", "objective2", "objective3"],
      "keyLearnings": ["learning1", "learning2", "learning3"],
      "successCriteria": ["criteria1", "criteria2", "criteria3"]
    }
  ],
  "weeklyBreakdown": [
    {
      "week": 1,
      "phase": "Phase Name",
      "actionItems": ["action1", "action2", "action3"],
      "measurableObjectives": ["objective1", "objective2"],
      "estimatedHours": 15
    }
  ],
  "recommendedProjects": [
    {
      "title": "Project Title",
      "description": "What this project teaches",
      "skillsFocused": ["skill1", "skill2", "skill3"],
      "duration": "X weeks",
      "difficulty": "Intermediate",
      "portfolioValue": "Why this matters for the portfolio"
    }
  ],
  "toolStack": [
    {
      "category": "Category Name",
      "tools": [
        {
          "name": "Tool Name",
          "reason": "Why this specific tool",
          "cost": "Free"
        }
      ]
    }
  ],
  "milestoneCheckpoints": [
    {
      "phase": "Phase Name",
      "checkpoint": "Specific checkpoint name",
      "evaluationCriteria": ["criterion1", "criterion2"],
      "successIndicators": ["indicator1", "indicator2"]
    }
  ]
}

REQUIREMENTS:
- Generate exactly 4 phases for structured learning progression
- First phase is always Foundation, last phase is always Optimization/Interview Prep
- Provide 8-12 weeks of detailed weekly breakdown
- Include 4-6 recommended projects
- Include 3-4 tool categories with 3+ tools each
- Include 4-5 milestone checkpoints
- All durations and timelines must be realistic
- Action items must be specific, not generic
- Success criteria must be measurable
- Adapt all recommendations based on skill level, timeframe, learning style, and budget`;

/**
 * Transforms user input into a structured prompt for the LLM
 */
export function buildPlanningPrompt(input: PlannerInput): string {
  return `
Create a strategic career development plan with these specifications:

TARGET ROLE: ${input.targetRole}
CURRENT SKILL LEVEL: ${input.skillLevel}
EXISTING SKILLS: ${input.existingSkills || 'None specified'}
WEEKLY AVAILABILITY: ${input.weeklyHours} hours
TOTAL TIMEFRAME: ${input.timeframe}
BUDGET CONSTRAINT: ${input.budget || 'No specified budget limit'}
LEARNING PREFERENCE: ${input.learningStyle}

Requirements for this plan:
1. Be realistic about what can be accomplished in ${input.timeframe}
2. Tailor intensity based on ${input.weeklyHours} weekly hours availability
3. Adapt to ${input.learningStyle} learning style preference
4. Consider ${input.skillLevel} skill level for pace and depth
5. Recommend budget-appropriate resources for ${input.budget || 'unrestricted'} budget
6. Include concrete, measurable milestones
7. Focus on immediate actions and quick wins for momentum
8. Provide portfolio-building opportunities
9. Include interview preparation strategies
10. Create checkpoints for progress evaluation

Generate the strategic plan now in the exact JSON format specified.`;
}

/**
 * Validates LLM response is valid JSON and has expected structure
 */
export function validateLLMResponse(response: string): {
  valid: boolean;
  data?: StrategicPlan;
  error?: string;
} {
  try {
    const parsed = JSON.parse(response);

    // Validate required top-level keys
    const requiredKeys = [
      'overview',
      'phases',
      'weeklyBreakdown',
      'recommendedProjects',
      'toolStack',
      'milestoneCheckpoints',
    ];

    for (const key of requiredKeys) {
      if (!(key in parsed)) {
        return {
          valid: false,
          error: `Missing required field: ${key}`,
        };
      }
    }

    // Validate phases is an array with at least 4 items
    if (!Array.isArray(parsed.phases) || parsed.phases.length < 4) {
      return {
        valid: false,
        error: 'Expected at least 4 phases',
      };
    }

    // Validate overview structure
    const overview = parsed.overview;
    if (!overview.currentPosition || !overview.targetGoal) {
      return {
        valid: false,
        error: 'Invalid overview structure',
      };
    }

    return {
      valid: true,
      data: parsed as StrategicPlan,
    };
  } catch (error) {
    return {
      valid: false,
      error: `Invalid JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Parses structured LLM response into typed StrategicPlan
 */
export function parseLLMResponse(response: string): StrategicPlan | null {
  const validation = validateLLMResponse(response);

  if (!validation.valid || !validation.data) {
    console.error('LLM Response validation failed:', validation.error);
    return null;
  }

  return validation.data;
}
