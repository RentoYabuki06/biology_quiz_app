-- 生物学クイズアプリのSupabaseデータベース設定
-- このSQLファイルをSupabaseのSQL Editorで実行してください

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table (individual question attempts)
CREATE TABLE user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    category TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempts INTEGER DEFAULT 1,
    first_attempt_correct BOOLEAN NOT NULL,
    last_attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    time_taken INTEGER NOT NULL, -- in milliseconds
    UNIQUE(user_id, question_id)
);

-- Study sessions table (quiz sessions)
CREATE TABLE study_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    score NUMERIC(5,2) NOT NULL,
    time_spent INTEGER NOT NULL -- in milliseconds
);

-- Study streaks table
CREATE TABLE study_streaks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_study_date DATE NOT NULL,
    total_study_days INTEGER DEFAULT 0
);

-- Achievements table
CREATE TABLE achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('streak', 'score', 'category', 'time')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB
);

-- Indexes for better performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_category ON user_progress(category);
CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_category ON study_sessions(category);
CREATE INDEX idx_achievements_user_id ON achievements(user_id);
CREATE INDEX idx_achievements_type ON achievements(type);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own sessions" ON study_sessions FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own sessions" ON study_sessions FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own streaks" ON study_streaks FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own streaks" ON study_streaks FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own streaks" ON study_streaks FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own achievements" ON achievements FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own achievements" ON achievements FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 