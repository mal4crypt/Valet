/**
 * Type definitions for Valet AI Strategic Planner
 */

// User Input Types
export interface PlannerInput {
  targetRole: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  existingSkills: string;
  weeklyHours: number;
  timeframe: '3 months' | '6 months' | '1 year';
  budget?: 'low' | 'medium' | 'high';
  learningStyle: 'self-paced' | 'guided' | 'project-based';
}

// Strategic Plan Output Types
export interface StrategicPlan {
  overview: StrategicOverview;
  phases: Phase[];
  weeklyBreakdown: WeeklyItem[];
  recommendedProjects: Project[];
  toolStack: ToolRecommendation[];
  milestoneCheckpoints: MilestoneCheckpoint[];
}

export interface StrategicOverview {
  currentPosition: string;
  targetGoal: string;
  feasibilityInsight: string;
  timelineReality: string;
  keySuccessFactors: string[];
}

export interface Phase {
  name: string;
  duration: string;
  description: string;
  objectives: string[];
  keyLearnings: string[];
  successCriteria: string[];
}

export interface WeeklyItem {
  week: number;
  phase: string;
  actionItems: string[];
  measurableObjectives: string[];
  estimatedHours: number;
}

export interface Project {
  title: string;
  description: string;
  skillsFocused: string[];
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  portfolioValue: string;
}

export interface ToolRecommendation {
  category: string;
  tools: {
    name: string;
    reason: string;
    cost: 'Free' | 'Paid' | 'Optional';
  }[];
}

export interface MilestoneCheckpoint {
  phase: string;
  checkpoint: string;
  evaluationCriteria: string[];
  successIndicators: string[];
}

// API Request/Response Types
export interface GeneratePlanRequest {
  input: PlannerInput;
}

export interface GeneratePlanResponse {
  success: boolean;
  plan?: StrategicPlan;
  error?: string;
  processingTime: number;
}

// UI State Types
export interface PlannerState {
  isLoading: boolean;
  error: string | null;
  plan: StrategicPlan | null;
  input: PlannerInput | null;
}

export interface FormState {
  errors: Partial<Record<keyof PlannerInput, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}
