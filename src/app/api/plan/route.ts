import { NextRequest, NextResponse } from 'next/server';
import { generateStrategicPlan, checkRateLimit, getLLMConfig } from '@/lib/llm/client';
import { validatePlannerInput } from '@/lib/validation';
import { PlannerInput, GeneratePlanResponse } from '@/types';

/**
 * POST /api/plan
 * Generates a strategic plan based on user input
 *
 * Request body:
 * {
 *   "targetRole": "string",
 *   "skillLevel": "Beginner" | "Intermediate" | "Advanced",
 *   "existingSkills": "string",
 *   "weeklyHours": number,
 *   "timeframe": "3 months" | "6 months" | "1 year",
 *   "budget": "low" | "medium" | "high" (optional),
 *   "learningStyle": "self-paced" | "guided" | "project-based"
 * }
 *
 * Response:
 * {
 *   "success": boolean,
 *   "plan": StrategicPlan | null,
 *   "error": string | null,
 *   "processingTime": number
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse<GeneratePlanResponse>> {
  const startTime = Date.now();

  try {
    // Get client IP for rate limiting
    const clientIp =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit (5 requests per hour per client)
    if (!checkRateLimit(clientIp, 5, 3600000)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Maximum 5 requests per hour.',
          processingTime: Date.now() - startTime,
        } as GeneratePlanResponse,
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const input = body as Partial<PlannerInput>;

    // Validate input
    const validation = validatePlannerInput(input);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: `Validation failed: ${Object.values(validation.errors).join(', ')}`,
          processingTime: Date.now() - startTime,
        } as GeneratePlanResponse,
        { status: 400 }
      );
    }

    // Verify LLM configuration
    try {
      getLLMConfig();
    } catch (error) {
      console.error('LLM configuration error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'LLM service is not properly configured',
          processingTime: Date.now() - startTime,
        } as GeneratePlanResponse,
        { status: 500 }
      );
    }

    // Generate strategic plan
    const plan = await generateStrategicPlan(input as PlannerInput);

    return NextResponse.json(
      {
        success: true,
        plan,
        processingTime: Date.now() - startTime,
      } as GeneratePlanResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Plan generation error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    // Check if it's an API error (e.g., OpenAI/Anthropic API failure)
    if (errorMessage.includes('API error')) {
      return NextResponse.json(
        {
          success: false,
          error: 'LLM service error. Please try again later.',
          processingTime: Date.now() - startTime,
        } as GeneratePlanResponse,
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        processingTime: Date.now() - startTime,
      } as GeneratePlanResponse,
      { status: 500 }
    );
  }
}

/**
 * GET /api/plan
 * Returns method not allowed
 */
export function GET(): NextResponse {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
