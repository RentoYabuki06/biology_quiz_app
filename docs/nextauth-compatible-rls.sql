-- NextAuth対応のRLSポリシー設定
-- NextAuthからのユーザー作成を許可する特別なポリシー

-- 既存ポリシーをクリーンアップ
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow authenticated user creation" ON users;
DROP POLICY IF EXISTS "Allow user creation" ON users;

-- RLSを有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- NextAuth対応のユーザー作成ポリシー
-- 認証されたユーザーまたはサービスロールからの作成を許可
CREATE POLICY "Allow user creation for NextAuth" ON users 
  FOR INSERT WITH CHECK (
    auth.role() = 'service_role' OR 
    auth.role() = 'authenticated' OR
    auth.uid() IS NOT NULL
  );

-- ユーザーは自分のプロフィールを見ることができる
CREATE POLICY "Users can view own profile" ON users 
  FOR SELECT USING (
    auth.uid()::text = id OR 
    auth.role() = 'service_role'
  );

-- ユーザーは自分のプロフィールを更新できる
CREATE POLICY "Users can update own profile" ON users 
  FOR UPDATE USING (
    auth.uid()::text = id OR 
    auth.role() = 'service_role'
  );

-- 学習データのポリシー
CREATE POLICY "Users can manage own progress" ON user_progress 
  FOR ALL USING (
    auth.uid()::text = user_id OR 
    auth.role() = 'service_role'
  );

CREATE POLICY "Users can manage own sessions" ON study_sessions 
  FOR ALL USING (
    auth.uid()::text = user_id OR 
    auth.role() = 'service_role'
  );

CREATE POLICY "Users can manage own streaks" ON study_streaks 
  FOR ALL USING (
    auth.uid()::text = user_id OR 
    auth.role() = 'service_role'
  );

CREATE POLICY "Users can manage own achievements" ON achievements 
  FOR ALL USING (
    auth.uid()::text = user_id OR 
    auth.role() = 'service_role'
  );

-- 成功メッセージ
SELECT 'NextAuth-compatible RLS policies created successfully!' as message; 