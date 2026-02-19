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
} from '@/components/ui'; // Consolidated import

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
    return (
      <div className="space-y-6">
        <div className="p-1 bg-slate-100/50 rounded-xl overflow-hidden">
          <SkeletonLoader />
        </div>
        <p className="text-center text-sm text-slate-400 animate-pulse">
          Crafting your strategic roadmap...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in">
      {/* Error Alert */}
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={onClearError}
        />
      )}

      <div className="space-y-6">
        {/* Target Role */}
        <InputField
          id="targetRole"
          label="What is your target role?"
          placeholder="e.g., Backend Engineer, Data Scientist"
          helperText="The specific career position you are aiming for."
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
            { value: 'Beginner', label: 'Beginner — Entry level' },
            { value: 'Intermediate', label: 'Intermediate — 1-3 years' },
            { value: 'Advanced', label: 'Advanced — Senior level' },
          ]}
          error={errors.skillLevel}
          required
        />

        {/* Weekly Hours */}
        <InputField
          id="weeklyHours"
          label="Weekly commitment (Hours)"
          type="number"
          placeholder="e.g., 20"
          helperText="How many hours can you dedicate to execution?"
          value={formData.weeklyHours || ''}
          onChange={(value) => handleFieldChange('weeklyHours', value)}
          error={errors.weeklyHours}
          required
        />

        {/* Timeframe */}
        <SelectField
          id="timeframe"
          label="Engagement Timeframe"
          value={formData.timeframe || ''}
          onChange={(value) => handleFieldChange('timeframe', value)}
          options={[
            { value: '3 months', label: '3 months — Accelerated' },
            { value: '6 months', label: '6 months — Standard' },
            { value: '1 year', label: '1 year — Deep mastery' },
          ]}
          error={errors.timeframe}
          required
        />

        {/* Learning Style */}
        <SelectField
          id="learningStyle"
          label="Preferred Strategy"
          value={formData.learningStyle || ''}
          onChange={(value) => handleFieldChange('learningStyle', value)}
          options={[
            { value: 'self-paced', label: 'Self-paced — Independent' },
            { value: 'guided', label: 'Guided — Mentorship focused' },
            { value: 'project-based', label: 'Project-based — Build focused' },
          ]}
          error={errors.learningStyle}
          required
        />

        {/* Existing Skills */}
        <TextAreaField
          id="existingSkills"
          label="Current Core Competencies"
          placeholder="e.g., Python, SQL, Project Scoping..."
          helperText="Briefly list your existing relevant skills."
          value={formData.existingSkills || ''}
          onChange={(value) => handleFieldChange('existingSkills', value)}
          error={errors.existingSkills}
          rows={3}
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          isLoading={isLoading}
          className="w-full shadow-lg shadow-blue-500/20"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        >
          Generate Strategic Plan
        </Button>

        <p className="mt-4 text-[11px] text-slate-400 text-center uppercase tracking-widest font-medium">
          Powered by Advanced Strategy Engine
        </p>
      </div>
    </form>
  );
}

