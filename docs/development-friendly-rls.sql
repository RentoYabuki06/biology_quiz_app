-- 開発環境用：柔軟なRLSポリシー
-- NextAuthとの互換性を最優先にした設定

-- 既存ポリシーをクリーンアップ
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow authenticated user creation" ON users;
DROP POLICY IF EXISTS "Allow user creation" ON users;
DROP POLICY IF EXISTS "Allow user creation for NextAuth" ON users;

-- RLSを有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- 開発用：非常に柔軟なポリシー
-- ユーザー作成は誰でも可能（開発用）
CREATE POLICY "Allow all user creation" ON users 
  FOR INSERT WITH CHECK (true);

-- ユーザーは誰でも見ることができる（開発用）
CREATE POLICY "Allow all user reads" ON users 
  FOR SELECT USING (true);

-- ユーザーは誰でも更新できる（開発用）
CREATE POLICY "Allow all user updates" ON users 
  FOR UPDATE USING (true);

-- 学習データも同様に柔軟に
CREATE POLICY "Allow all progress operations" ON user_progress 
  FOR ALL USING (true);

CREATE POLICY "Allow all session operations" ON study_sessions 
  FOR ALL USING (true);

CREATE POLICY "Allow all streak operations" ON study_streaks 
  FOR ALL USING (true);

CREATE POLICY "Allow all achievement operations" ON achievements 
  FOR ALL USING (true);

-- 成功メッセージ
SELECT 'Development-friendly RLS policies created (INSECURE - for development only)!' as message; 