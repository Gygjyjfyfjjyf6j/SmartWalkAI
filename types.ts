
export enum ActivityLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum GoalType {
  WEIGHT_LOSS = 'Weight Loss',
  FITNESS = 'Fitness',
  GENERAL_HEALTH = 'General Health'
}

export interface UserProfile {
  name: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  goal: GoalType;
  activityLevel: ActivityLevel;
  dailyStepGoal: number;
  onboarded: boolean;
}

export interface ActivityDay {
  date: string;
  steps: number;
  distance: number; // km
  calories: number; // kcal
  activeMinutes: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  icon: string;
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedAt?: string;
}

export interface AIAdvice {
  message: string;
  motivation: string;
  tip: string;
}
