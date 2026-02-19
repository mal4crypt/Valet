'use client';

import React, { useState } from 'react';
import { PlannerInput } from '@/types';
import { usePlan } from '@/hooks/usePlan';
import { PlannerForm } from '@/components/planner/form';
import { PlanOutput } from '@/components/planner/output';
import { Button } from '@/components/ui';

export default function PlannerPage() {
  const { isLoading, error, plan, processingTime, generatePlan, resetPlan, clearError } =
    usePlan();
  const [showForm, setShowForm] = useState(!plan);

  const handleGeneratePlan = async (input: PlannerInput) => {
    await generatePlan(input);
    setShowForm(false);
    // Scroll to top of output on mobile or start of right panel
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegenerateOrRefine = () => {
    resetPlan();
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Navigation / Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-200/60 transition-all">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Valet</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">Strategy Engine</Button>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">Roadmaps</Button>
            </nav>
            <div className="h-4 w-[1px] bg-slate-200" />
            <Button variant="outline" size="sm" className="rounded-full px-5">Feedback</Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* LEFT PANEL — Input Form / Hero */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-12">

            {/* Hero Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100 animate-in">
                Next-Gen Career Architect
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] animate-in" style={{ animationDelay: '0.1s' }}>
                Strategic <span className="text-blue-600">Planning</span> for Peak Execution.
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-md animate-in" style={{ animationDelay: '0.2s' }}>
                Valet transforms your professional ambitions into a structured, milestone-driven roadmap. Guided by AI, executed by you.
              </p>
            </div>

            {/* Input Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 animate-in" style={{ animationDelay: '0.3s' }}>
              <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-none">System Input</h2>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium italic">Define your trajectory below</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
              </div>

              {showForm || !plan ? (
                <PlannerForm
                  onSubmit={handleGeneratePlan}
                  isLoading={isLoading}
                  error={error}
                  onClearError={clearError}
                />
              ) : (
                <div className="space-y-8 py-4 text-center animate-in">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Strategy Compiled</h3>
                    <p className="text-sm text-slate-500 leading-relaxed px-4">
                      Your execution roadmap has been successfully architected. Review the details in the output panel.
                    </p>
                  </div>
                  <Button
                    onClick={handleRegenerateOrRefine}
                    variant="secondary"
                    className="w-full"
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
                  >
                    Modify Trajectory
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL — AI Output Display */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="min-h-[600px] flex flex-col">
              {plan ? (
                <PlanOutput plan={plan} processingTime={processingTime} />
              ) : isLoading ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="text-center space-y-6 bg-white border border-slate-100 rounded-3xl p-12 shadow-sm w-full">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full" />
                      <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">Analyzing Trajectory</h3>
                      <p className="text-slate-400 font-medium">Synthesizing optimal strategic path...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center bg-slate-100/30 border-4 border-dashed border-slate-200/50 rounded-[40px] text-center p-12">
                  <div className="max-w-md space-y-8 animate-in">
                    <div className="w-24 h-24 bg-white text-slate-300 rounded-[32px] flex items-center justify-center mx-auto shadow-sm ring-1 ring-slate-100">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight">Waiting for System Input</h3>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed">
                        Complete your career profile and goals to the left to generate your custom strategic execution plan.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

