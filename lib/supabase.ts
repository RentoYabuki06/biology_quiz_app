import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          image?: string | null
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          question_id: string
          category: string
          is_correct: boolean
          attempts: number
          first_attempt_correct: boolean
          last_attempted_at: string
          time_taken: number
        }
        Insert: {
          id?: string
          user_id: string
          question_id: string
          category: string
          is_correct: boolean
          attempts?: number
          first_attempt_correct: boolean
          last_attempted_at?: string
          time_taken: number
        }
        Update: {
          id?: string
          user_id?: string
          question_id?: string
          category?: string
          is_correct?: boolean
          attempts?: number
          first_attempt_correct?: boolean
          last_attempted_at?: string
          time_taken?: number
        }
      }
      study_sessions: {
        Row: {
          id: string
          user_id: string
          category: string
          start_time: string
          end_time: string
          total_questions: number
          correct_answers: number
          score: number
          time_spent: number
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          start_time: string
          end_time: string
          total_questions: number
          correct_answers: number
          score: number
          time_spent: number
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          start_time?: string
          end_time?: string
          total_questions?: number
          correct_answers?: number
          score?: number
          time_spent?: number
        }
      }
      study_streaks: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_study_date: string
          total_study_days: number
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_study_date: string
          total_study_days?: number
        }
        Update: {
          id?: string
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_study_date?: string
          total_study_days?: number
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          description: string
          earned_at: string
          metadata: any | null
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          description: string
          earned_at?: string
          metadata?: any | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          description?: string
          earned_at?: string
          metadata?: any | null
        }
      }
    }
  }
} 