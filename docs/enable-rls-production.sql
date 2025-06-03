-- 本番環境用：型の問題を修正したRLSポリシーを設定する

-- RLSを有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- 適切なポリシーを作成（型キャストを修正）
-- ユーザー関連
CREATE POLICY "Users can view own profile" ON users 
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users 
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Allow authenticated user creation" ON users 
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- 学習進捗関連
CREATE POLICY "Users can manage own progress" ON user_progress 
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own sessions" ON study_sessions 
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own streaks" ON study_streaks 
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own achievements" ON achievements 
  FOR ALL USING (auth.uid()::text = user_id::text);

-- 成功メッセージ
SELECT 'RLS enabled with proper security policies for production (type-fixed)!' as message;