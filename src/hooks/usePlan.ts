import { useState, useCallback } from 'react';
import { PlannerInput, StrategicPlan, GeneratePlanResponse } from '@/types';

interface UsePlannerState {
  isLoading: boolean;
  error: string | null;
  plan: StrategicPlan | null;
  processingTime: number | null;
}

interface UsePlannerActions {
  generatePlan: (input: PlannerInput) => Promise<void>;
  resetPlan: () => void;
  clearError: () => void;
}

/**
 * Hook to manage plan generation and state
 */
export function usePlan(): UsePlannerState & UsePlannerActions {
  const [state, setState] = useState<UsePlannerState>({
    isLoading: false,
    error: null,
    plan: null,
    processingTime: null,
  });

  const generatePlan = useCallback(async (input: PlannerInput) => {
    setState({
      isLoading: true,
      error: null,
      plan: null,
      processingTime: null,
    });

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...input }),
      });

      const data: GeneratePlanResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate plan');
      }

      setState({
        isLoading: false,
        error: null,
        plan: data.plan || null,
        processingTime: data.processingTime || 0,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';

      setState({
        isLoading: false,
        error: errorMessage,
        plan: null,
        processingTime: null,
      });
    }
  }, []);

  const resetPlan = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      plan: null,
      processingTime: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    isLoading: state.isLoading,
    error: state.error,
    plan: state.plan,
    processingTime: state.processingTime,
    generatePlan,
    resetPlan,
    clearError,
  };
}
