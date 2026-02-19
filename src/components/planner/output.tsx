'use client';

import React from 'react';
import { StrategicPlan, Phase, Project, ToolRecommendation, MilestoneCheckpoint } from '@/types';
import { clsx } from 'clsx';

interface PlanOutputProps {
  plan: StrategicPlan;
  processingTime: number | null;
}

export function PlanOutput({ plan, processingTime }: PlanOutputProps) {
  return (
    <div className="space-y-12 animate-in pb-20">
      {/* Strategic Header */}
      <div className="relative p-8 rounded-2xl bg-slate-900 text-white overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-widest">
            Strategic Master Plan
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Roadmap for <span className="text-blue-400">{plan.overview.targetGoal}</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            {plan.overview.currentPosition}
          </p>
        </div>

        {/* Background Accent */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute right-10 bottom-10 opacity-20">
          <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 00-2-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>

      {/* Strategic Insights Grid */}
      <section className="animate-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          Execution Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InsightCard
            title="Feasibility"
            content={plan.overview.feasibilityInsight}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <InsightCard
            title="Timeline Projection"
            content={plan.overview.timelineReality}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <InsightCard
            title="Success Factors"
            isList
            items={plan.overview.keySuccessFactors}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
        </div>
      </section>

      {/* Structured Roadmap */}
      <section className="animate-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          Phase-Based Roadmap
        </h2>
        <div className="space-y-6 relative">
          <div className="absolute left-[27px] top-10 bottom-10 w-0.5 bg-slate-100 hidden md:block" />
          {plan.phases.map((phase, idx) => (
            <PhaseCard key={idx} phase={phase} phaseNumber={idx + 1} />
          ))}
        </div>
      </section>

      {/* Recommended Projects */}
      <section className="animate-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          Practical Execution Units
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plan.recommendedProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </section>

      {/* Tool Stack */}
      <section className="animate-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          Resource Matrix
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {plan.toolStack.map((category, idx) => (
            <ToolCategory key={idx} category={category} />
          ))}
        </div>
      </section>

      {/* Milestone Checkpoints */}
      <section className="animate-in pb-12" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          Strategic Milestones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plan.milestoneCheckpoints.map((checkpoint, idx) => (
            <MilestoneCard key={idx} milestone={checkpoint} />
          ))}
        </div>
      </section>

      {processingTime && (
        <div className="text-center pt-8 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Analysis optimized in {processingTime}ms
          </p>
        </div>
      )}
    </div>
  );
}

function InsightCard({ title, content, items, icon, isList = false }: { title: string, content?: string, items?: string[], icon: React.ReactNode, isList?: boolean }) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-50 text-blue-600 rounded-xl">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase">{title}</h3>
      </div>
      {isList && items ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-600 leading-relaxed font-medium">{content}</p>
      )}
    </div>
  );
}

interface PhaseCardProps {
  phase: Phase;
  phaseNumber: number;
}

function PhaseCard({ phase, phaseNumber }: PhaseCardProps) {
  return (
    <div className="relative pl-0 md:pl-16 group">
      {/* Timeline Indicator */}
      <div className="absolute left-0 top-0 w-14 h-14 bg-white border-2 border-slate-100 rounded-2xl hidden md:flex items-center justify-center z-10 shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 transition-colors">
        <span className="text-lg font-bold">{phaseNumber}</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm group-hover:shadow-lg group-hover:border-slate-300 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Phase {phaseNumber}</span>
            <h3 className="text-xl font-bold text-slate-900">{phase.name}</h3>
          </div>
          <div className="px-4 py-1.5 bg-slate-50 text-slate-600 border border-slate-100 rounded-full text-xs font-bold whitespace-nowrap">
            {phase.duration}
          </div>
        </div>

        <p className="text-slate-600 text-base leading-relaxed mb-8 border-l-4 border-slate-100 pl-4">
          {phase.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Objectives</h4>
            <ul className="space-y-3">
              {phase.objectives.map((obj, idx) => (
                <li key={idx} className="text-sm text-slate-700 font-medium flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Strategic Learnings</h4>
            <ul className="space-y-3">
              {phase.keyLearnings.map((learning, idx) => (
                <li key={idx} className="text-sm text-slate-700 font-medium flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Success Threshold</h4>
            <ul className="space-y-3">
              {phase.successCriteria.map((criteria, idx) => (
                <li key={idx} className="text-xs text-slate-600 font-bold flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{criteria}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900 leading-tight pr-4">{project.title}</h3>
        <span className={clsx(
          "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter",
          project.difficulty === 'Advanced' ? "bg-red-50 text-red-700 border border-red-100" :
            project.difficulty === 'Intermediate' ? "bg-amber-50 text-amber-700 border border-amber-100" :
              "bg-emerald-50 text-emerald-700 border border-emerald-100"
        )}>
          {project.difficulty}
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3">{project.description}</p>

      <div className="space-y-4 pt-4 border-t border-slate-50">
        <div className="flex flex-wrap gap-1.5">
          {project.skillsFocused.map((skill, idx) => (
            <span key={idx} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase italic">Est. {project.duration}</span>
          <span className="text-[10px] font-bold text-blue-600 uppercase hover:underline cursor-help">Value Insight</span>
        </div>
      </div>
    </div>
  );
}

function ToolCategory({ category }: { category: ToolRecommendation }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{category.category}</h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {category.tools.map((tool, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-slate-200 transition-colors">
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">{tool.name}</p>
              <p className="text-xs text-slate-500 line-clamp-1">{tool.reason}</p>
            </div>
            <span className={clsx(
              "text-[10px] font-bold px-2 py-0.5 rounded-md",
              tool.cost === 'Free' ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
            )}>
              {tool.cost}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: MilestoneCheckpoint }) {
  return (
    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 relative overflow-hidden group">
      <div className="absolute right-[-10px] top-[-10px] w-20 h-20 bg-white/40 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />

      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{milestone.phase}</span>
        <h3 className="text-base font-bold text-slate-900 leading-tight">{milestone.checkpoint}</h3>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Assessment Metrics</p>
          <ul className="space-y-1.5">
            {milestone.evaluationCriteria.map((criterion, idx) => (
              <li key={idx} className="text-xs text-slate-600 font-medium flex items-center gap-2">
                <div className="w-1 h-1 bg-slate-400 rounded-full" />
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
