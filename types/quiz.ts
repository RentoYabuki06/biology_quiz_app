export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
}

export interface QuizSession {
  id: string;
  category: string;
  questions: Question[];
  results: QuizResult[];
  startTime: Date;
  endTime?: Date;
  score: number;
  totalQuestions: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  questionId: string;
  category: string;
  isCorrect: boolean;
  attempts: number;
  firstAttemptCorrect: boolean;
  lastAttemptedAt: Date;
  timeTaken: number;
}

export interface StudySession {
  id: string;
  userId: string;
  category: string;
  startTime: Date;
  endTime: Date;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
}

export interface StudyStreak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date;
  totalStudyDays: number;
}

export interface Achievement {
  id: string;
  userId: string;
  type: 'streak' | 'score' | 'category' | 'time';
  title: string;
  description: string;
  earnedAt: Date;
  metadata?: Record<string, any>;
}

export interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  averageScore: number;
  timeSpent: number;
  currentStreak: number;
  longestStreak: number;
  achievementsCount: number;
  categoryProgress: Record<string, {
    attempted: number;
    correct: number;
    averageScore: number;
  }>;
} 