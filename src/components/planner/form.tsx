'use client';

import React, { useState } from 'react';
import { PlannerInput } from '@/types';
import { validatePlannerInput } from '@/lib/validation';
import {
  InputField,
  SelectField,
  TextAreaField,
  Button,
  Alert,
  SkeletonLoader,
} from '@/components/ui/form';

interface PlannerFormProps {
  onSubmit: (input: PlannerInput) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  onClearError?: () => void;
}

export function PlannerForm({ onSubmit, isLoading, error, onClearError }: PlannerFormProps) {
  const [formData, setFormData] = useState<Partial<PlannerInput>>({
    targetRole: '',
    skillLevel: undefined,
    existingSkills: '',
    weeklyHours: 0,
    timeframe: undefined,
    budget: 'medium',
    learningStyle: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PlannerInput, string>>>({});

  const handleFieldChange = (field: keyof PlannerInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validatePlannerInput(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Submit form
    try {
      await onSubmit(formData as PlannerInput);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={onClearError}
        />
      )}

      {/* Target Role */}
      <InputField
        id="targetRole"
        label="What is your target role?"
        placeholder="e.g., Backend Engineer, Data Scientist, Product Manager"
        value={formData.targetRole || ''}
        onChange={(value) => handleFieldChange('targetRole', value)}
        error={errors.targetRole}
        required
      />

      {/* Skill Level */}
      <SelectField
        id="skillLevel"
        label="Current skill level"
        value={formData.skillLevel || ''}
        onChange={(value) => handleFieldChange('skillLevel', value)}
        options={[
          { value: 'Beginner', label: 'Beginner — Less than 1 year experience' },
          { value: 'Intermediate', label: 'Intermediate — 1-3 years experience' },
          { value: 'Advanced', label: 'Advanced — 3+ years experience' },
        ]}
        error={errors.skillLevel}
        required
      />

      {/* Existing Skills */}
      <TextAreaField
        id="existingSkills"
        label="What skills do you already have? (optional)"
        placeholder="e.g., Python, JavaScript, SQL, problem-solving..."
        value={formData.existingSkills || ''}
        onChange={(value) => handleFieldChange('existingSkills', value)}
        error={errors.existingSkills}
        rows={3}
      />

      {/* Weekly Hours */}
      <InputField
        id="weeklyHours"
        label="How many hours per week can you dedicate?"
        type="number"
        placeholder="e.g., 10, 20, 40"
        value={formData.weeklyHours || ''}
        onChange={(value) => handleFieldChange('weeklyHours', value)}
        error={errors.weeklyHours}
        required
      />

      {/* Timeframe */}
      <SelectField
        id="timeframe"
        label="What is your target timeframe?"
        value={formData.timeframe || ''}
        onChange={(value) => handleFieldChange('timeframe', value)}
        options={[
          { value: '3 months', label: '3 months — Quick transition' },
          { value: '6 months', label: '6 months — Moderate pace' },
          { value: '1 year', label: '1 year — Steady progression' },
        ]}
        error={errors.timeframe}
        required
      />

      {/* Learning Style */}
      <SelectField
        id="learningStyle"
        label="What is your preferred learning style?"
        value={formData.learningStyle || ''}
        onChange={(value) => handleFieldChange('learningStyle', value)}
        options={[
          { value: 'self-paced', label: 'Self-paced — Independent learning' },
          { value: 'guided', label: 'Guided — Structured courses & mentorship' },
          { value: 'project-based', label: 'Project-based — Learning by building' },
        ]}
        error={errors.learningStyle}
        required
      />

      {/* Budget */}
      <SelectField
        id="budget"
        label="Budget constraints (optional)"
        value={formData.budget || 'medium'}
        onChange={(value) => handleFieldChange('budget', value)}
        options={[
          { value: 'low', label: 'Low — Free resources only' },
          { value: 'medium', label: 'Medium — Up to $50/month' },
          { value: 'high', label: 'High — No budget limit' },
        ]}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading}
        isLoading={isLoading}
        className="w-full"
      >
        {isLoading ? 'Generating Plan...' : 'Generate Strategic Plan'}
      </Button>

      <p className="text-xs text-neutral-500 text-center">
        Your plan will be generated using AI analysis of your inputs.
      </p>
    </form>
  );
}
