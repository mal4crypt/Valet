'use client';

import React, { useState } from 'react';
import { PlannerInput } from '@/types';
import { usePlan } from '@/hooks/usePlan';
import { PlannerForm } from '@/components/planner/form';
import { PlanOutput } from '@/components/planner/output';
import { Button } from '@/components/ui/form';

export default function PlannerPage() {
  const { isLoading, error, plan, processingTime, generatePlan, resetPlan, clearError } =
    usePlan();
  const [showForm, setShowForm] = useState(!plan);

  const handleGeneratePlan = async (input: PlannerInput) => {
    await generatePlan(input);
    setShowForm(false);
  };

  const handleRegenerateOrRefine = () => {
    resetPlan();
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-neutral-900">Valet</h1>
          <p className="text-base text-neutral-600 mt-2">
            Transform your career ambition into a structured execution roadmap.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {showForm && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-6">
                    {plan ? 'Refine Your Plan' : 'Your Information'}
                  </h2>
                  <PlannerForm
                    onSubmit={handleGeneratePlan}
                    isLoading={isLoading}
                    error={error}
                    onClearError={clearError}
                  />
                </div>
              )}

              {plan && !showForm && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-700 mb-2">Plan Generated</h3>
                    <p className="text-sm text-neutral-600">
                      Your strategic plan is ready. Scroll to see all details.
                    </p>
                  </div>
                  <Button
                    onClick={handleRegenerateOrRefine}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Regenerate / Refine
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-2">
            {plan && <PlanOutput plan={plan} processingTime={processingTime} />}

            {isLoading && (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <span className="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-neutral-600">Analyzing your trajectory...</span>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Generating a personalized strategic plan based on your inputs.
                  </p>
                </div>
              </div>
            )}

            {!plan && !isLoading && (
              <div className="border-2 border-dashed border-neutral-200 rounded-lg p-12 text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Generate Your Strategic Plan
                  </h3>
                  <p className="text-neutral-600">
                    Complete the form to the left to create a personalized, milestone-driven career
                    development plan.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-sm text-neutral-600">
            Valet AI Strategic Planner — From goal to execution plan in seconds.
          </p>
        </div>
      </footer>
    </div>
  );
}
