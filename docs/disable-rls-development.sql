-- 開発環境用：RLSを一時的に無効化する
-- 注意：本番環境では絶対に実行しないでください！

-- 既存のポリシーをすべて削除
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow user creation" ON users;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own sessions" ON study_sessions;
DROP POLICY IF EXISTS "Users can insert own streaks" ON study_streaks;
DROP POLICY IF EXISTS "Users can insert own achievements" ON achievements;
DROP POLICY IF EXISTS "Allow progress creation" ON user_progress;
DROP POLICY IF EXISTS "Allow session creation" ON study_sessions;
DROP POLICY IF EXISTS "Allow streak creation" ON study_streaks;
DROP POLICY IF EXISTS "Allow achievement creation" ON achievements;

-- RLSを一時的に無効化
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_streaks DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievements DISABLE ROW LEVEL SECURITY;

-- 成功メッセージ
SELECT 'RLS disabled for development. Remember to re-enable for production!' as message; 