import { PlannerInput, FormState } from '@/types';

/**
 * Validation rules for planner input
 */

export const validateTargetRole = (role: string): string | null => {
  if (!role || role.trim().length === 0) {
    return 'Target role is required';
  }
  if (role.trim().length < 3) {
    return 'Target role must be at least 3 characters';
  }
  if (role.trim().length > 100) {
    return 'Target role must be less than 100 characters';
  }
  return null;
};

export const validateWeeklyHours = (hours: number): string | null => {
  if (hours < 1 || hours > 168) {
    return 'Weekly hours must be between 1 and 168';
  }
  if (!Number.isInteger(hours)) {
    return 'Weekly hours must be a whole number';
  }
  return null;
};

export const validateExistingSkills = (skills: string): string | null => {
  if (skills && skills.trim().length > 1000) {
    return 'Existing skills description must be less than 1000 characters';
  }
  return null;
};

export const validateSkillLevel = (
  level: string
): level is 'Beginner' | 'Intermediate' | 'Advanced' => {
  return ['Beginner', 'Intermediate', 'Advanced'].includes(level);
};

export const validateTimeframe = (
  timeframe: string
): timeframe is '3 months' | '6 months' | '1 year' => {
  return ['3 months', '6 months', '1 year'].includes(timeframe);
};

export const validateLearningStyle = (
  style: string
): style is 'self-paced' | 'guided' | 'project-based' => {
  return ['self-paced', 'guided', 'project-based'].includes(style);
};

export function validatePlannerInput(input: Partial<PlannerInput>): FormState {
  const errors: Partial<Record<keyof PlannerInput, string>> = {};
  let isValid = true;

  // Validate target role
  const roleError = validateTargetRole(input.targetRole || '');
  if (roleError) {
    errors.targetRole = roleError;
    isValid = false;
  }

  // Validate skill level
  if (!input.skillLevel || !validateSkillLevel(input.skillLevel)) {
    errors.skillLevel = 'Please select a valid skill level';
    isValid = false;
  }

  // Validate weekly hours
  if (input.weeklyHours === undefined || input.weeklyHours === null) {
    errors.weeklyHours = 'Weekly hours is required';
    isValid = false;
  } else {
    const hoursError = validateWeeklyHours(input.weeklyHours);
    if (hoursError) {
      errors.weeklyHours = hoursError;
      isValid = false;
    }
  }

  // Validate timeframe
  if (!input.timeframe || !validateTimeframe(input.timeframe)) {
    errors.timeframe = 'Please select a valid timeframe';
    isValid = false;
  }

  // Validate learning style
  if (!input.learningStyle || !validateLearningStyle(input.learningStyle)) {
    errors.learningStyle = 'Please select a valid learning style';
    isValid = false;
  }

  // Validate existing skills if provided
  if (input.existingSkills) {
    const skillsError = validateExistingSkills(input.existingSkills);
    if (skillsError) {
      errors.existingSkills = skillsError;
      isValid = false;
    }
  }

  return {
    errors,
    isValid,
    isSubmitting: false,
  };
}
