'use client';

import React from 'react';
import { StrategicPlan, Phase, Project, ToolRecommendation, MilestoneCheckpoint } from '@/types';

interface PlanOutputProps {
  plan: StrategicPlan;
  processingTime: number | null;
}

export function PlanOutput({ plan, processingTime }: PlanOutputProps) {
  return (
    <div className="space-y-8">
      {/* Processing Time */}
      {processingTime && (
        <div className="text-xs text-neutral-500">
          Generated in {processingTime}ms
        </div>
      )}

      {/* Strategic Overview */}
      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Strategic Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Current Position</h3>
            <p className="text-base text-neutral-600">{plan.overview.currentPosition}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Target Goal</h3>
            <p className="text-base text-neutral-600">{plan.overview.targetGoal}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Feasibility</h3>
            <p className="text-base text-neutral-600">{plan.overview.feasibilityInsight}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Timeline Reality</h3>
            <p className="text-base text-neutral-600">{plan.overview.timelineReality}</p>
          </div>
        </div>

        {/* Key Success Factors */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Key Success Factors</h3>
          <ul className="space-y-2">
            {plan.overview.keySuccessFactors.map((factor, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span className="text-neutral-600">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Phase-Based Roadmap */}
      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Learning Roadmap</h2>
        <div className="space-y-8">
          {plan.phases.map((phase, idx) => (
            <PhaseCard key={idx} phase={phase} phaseNumber={idx + 1} />
          ))}
        </div>
      </section>

      {/* Recommended Projects */}
      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Recommended Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plan.recommendedProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </section>

      {/* Tool Stack */}
      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Tool Stack & Resources</h2>
        <div className="space-y-6">
          {plan.toolStack.map((category, idx) => (
            <ToolCategory key={idx} category={category} />
          ))}
        </div>
      </section>

      {/* Milestone Checkpoints */}
      <section className="border-t border-neutral-200 pt-8 pb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Milestone Checkpoints</h2>
        <div className="space-y-6">
          {plan.milestoneCheckpoints.map((checkpoint, idx) => (
            <MilestoneCard key={idx} milestone={checkpoint} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface PhaseCardProps {
  phase: Phase;
  phaseNumber: number;
}

function PhaseCard({ phase, phaseNumber }: PhaseCardProps) {
  return (
    <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">
          Phase {phaseNumber} — {phase.name}
        </h3>
        <span className="text-sm text-neutral-500">{phase.duration}</span>
      </div>

      <p className="text-base text-neutral-600 mb-6">{phase.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Objectives</h4>
          <ul className="space-y-2">
            {phase.objectives.map((obj, idx) => (
              <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                <span className="text-neutral-400 mt-1">→</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Key Learnings</h4>
          <ul className="space-y-2">
            {phase.keyLearnings.map((learning, idx) => (
              <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                <span className="text-neutral-400 mt-1">→</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Success Criteria</h4>
          <ul className="space-y-2">
            {phase.successCriteria.map((criteria, idx) => (
              <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                <span className="text-neutral-400 mt-1">✓</span>
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border border-neutral-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-neutral-900">{project.title}</h3>
        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
          {project.difficulty}
        </span>
      </div>

      <p className="text-sm text-neutral-600 mb-4">{project.description}</p>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-neutral-600 mb-2">Duration</p>
          <p className="text-sm text-neutral-500">{project.duration}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-neutral-600 mb-2">Skills Focused</p>
          <div className="flex flex-wrap gap-2">
            {project.skillsFocused.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-neutral-600 mb-2">Portfolio Value</p>
          <p className="text-sm text-neutral-600">{project.portfolioValue}</p>
        </div>
      </div>
    </div>
  );
}

interface ToolCategoryProps {
  category: ToolRecommendation;
}

function ToolCategory({ category }: ToolCategoryProps) {
  return (
    <div>
      <h3 className="text-base font-semibold text-neutral-900 mb-4">{category.category}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.tools.map((tool, idx) => (
          <div key={idx} className="border border-neutral-200 rounded p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="font-medium text-neutral-900">{tool.name}</p>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  tool.cost === 'Free'
                    ? 'bg-green-100 text-green-700'
                    : tool.cost === 'Paid'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                {tool.cost}
              </span>
            </div>
            <p className="text-sm text-neutral-600">{tool.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MilestoneCardProps {
  milestone: MilestoneCheckpoint;
}

function MilestoneCard({ milestone }: MilestoneCardProps) {
  return (
    <div className="border-l-4 border-blue-500 pl-6 py-2">
      <div className="flex items-baseline gap-4 mb-3">
        <h3 className="text-base font-semibold text-neutral-900">{milestone.checkpoint}</h3>
        <span className="text-xs text-neutral-500">{milestone.phase}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-medium text-neutral-600 mb-2">Evaluation Criteria</p>
          <ul className="space-y-1">
            {milestone.evaluationCriteria.map((criterion, idx) => (
              <li key={idx} className="text-sm text-neutral-600">
                • {criterion}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-neutral-600 mb-2">Success Indicators</p>
          <ul className="space-y-1">
            {milestone.successIndicators.map((indicator, idx) => (
              <li key={idx} className="text-sm text-neutral-600">
                ✓ {indicator}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
