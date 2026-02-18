/**
 * LLM Client - Handles communication with OpenAI or Anthropic APIs
 * Server-side only - API keys never exposed to client
 */

import { PlannerInput, StrategicPlan } from '@/types';
import { parseLLMResponse, buildPlanningPrompt, SYSTEM_PROMPT } from './prompts';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

interface LLMConfig {
  provider: 'openai' | 'anthropic';
  apiKey: string;
  model: string;
}

/**
 * Get LLM configuration from environment variables
 */
export function getLLMConfig(): LLMConfig {
  const provider = (process.env.NEXT_PUBLIC_LLM_PROVIDER ||
    'openai') as 'openai' | 'anthropic';

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    return {
      provider: 'openai',
      apiKey,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    };
  } else if (provider === 'anthropic') {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set');
    }
    return {
      provider: 'anthropic',
      apiKey,
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
    };
  }

  throw new Error(`Unknown LLM provider: ${provider}`);
}

/**
 * Call OpenAI API for plan generation
 */
async function callOpenAI(
  config: LLMConfig & { provider: 'openai' },
  prompt: string
): Promise<string> {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No content in OpenAI response');
  }

  return content;
}

/**
 * Call Anthropic API for plan generation
 */
async function callAnthropic(
  config: LLMConfig & { provider: 'anthropic' },
  prompt: string
): Promise<string> {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Anthropic API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;

  if (!content) {
    throw new Error('No content in Anthropic response');
  }

  return content;
}

/**
 * Main function to generate strategic plan using LLM
 */
export async function generateStrategicPlan(input: PlannerInput): Promise<StrategicPlan> {
  const startTime = Date.now();

  try {
    const config = getLLMConfig();
    const prompt = buildPlanningPrompt(input);

    let llmResponse: string;

    if (config.provider === 'openai') {
      llmResponse = await callOpenAI(
        config as LLMConfig & { provider: 'openai' },
        prompt
      );
    } else {
      llmResponse = await callAnthropic(
        config as LLMConfig & { provider: 'anthropic' },
        prompt
      );
    }

    const plan = parseLLMResponse(llmResponse);

    if (!plan) {
      throw new Error('Failed to parse LLM response into valid plan');
    }

    const processingTime = Date.now() - startTime;
    console.log(`Plan generation completed in ${processingTime}ms`);

    return plan;
  } catch (error) {
    console.error('Plan generation error:', error);
    throw error;
  }
}

/**
 * Rate limiting helper (simple in-memory tracking)
 * For production, use Redis or similar
 */
const rateLimitStore = new Map<string, number[]>();

export function checkRateLimit(clientId: string, limit: number = 5, windowMs: number = 3600000): boolean {
  const now = Date.now();
  const timestamps = rateLimitStore.get(clientId) || [];

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= limit) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimitStore.set(clientId, validTimestamps);
  return true;
}
