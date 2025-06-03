-- RLSポリシーを修正して、NextAuthからのユーザー作成を許可する
-- Supabase SQL Editorでこのスクリプトを実行してください

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

-- より柔軟なポリシーを作成（開発・テスト用）
-- 本番環境では、より厳格なポリシーに変更することを推奨

-- ユーザーは自分のプロフィールを見ることができる
CREATE POLICY "Users can view own profile" ON users 
  FOR SELECT USING (true); -- 一時的に全ユーザーが閲覧可能

-- ユーザーは自分のプロフィールを更新できる  
CREATE POLICY "Users can update own profile" ON users 
  FOR UPDATE USING (true); -- 一時的に全ユーザーが更新可能

-- 新しいユーザーを作成できる（NextAuth用）
CREATE POLICY "Allow user creation" ON users 
  FOR INSERT WITH CHECK (true); -- 一時的に全員が作成可能

-- 他のテーブルも同様に修正
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own sessions" ON study_sessions;
DROP POLICY IF EXISTS "Users can insert own streaks" ON study_streaks;
DROP POLICY IF EXISTS "Users can insert own achievements" ON achievements;

-- より柔軟なポリシーを再作成
CREATE POLICY "Allow progress creation" ON user_progress 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow session creation" ON study_sessions 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow streak creation" ON study_streaks 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow achievement creation" ON achievements 
  FOR INSERT WITH CHECK (true); 