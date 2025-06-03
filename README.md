# 🧬 生物学クイズアプリ

大学院試験対策のための生物学クイズアプリケーションです。ユーザー認証、学習進捗の記録、習慣トラッキング機能を備えた本格的な学習支援ツールです。

## ✨ 主要機能

### 📚 学習機能
- **分野別学習**: 細胞生物学、分子生物学、遺伝学、生化学、進化生物学
- **難易度別問題**: 基礎、標準、発展の3段階
- **詳細な解説**: 各問題に丁寧な解説付き
- **レスポンシブデザイン**: PC・タブレット・スマートフォン対応

### 🔐 ユーザー管理
- **Google OAuth認証**: 安全で簡単なログイン
- **学習データの永続化**: クラウドに学習記録を保存
- **プロフィール管理**: ユーザー情報の管理

### 📊 学習トラッキング
- **リアルタイム進捗管理**: 学習状況をリアルタイムで記録
- **詳細な統計**: 分野別正答率、学習時間、問題数などの統計
- **学習履歴**: 過去の学習セッションの詳細記録
- **間違えた問題の追跡**: 復習が必要な問題の自動管理

### 🏆 習慣トラッカー
- **連続学習日数**: 学習の継続性を追跡
- **達成バッジシステム**: 学習の成果を可視化
- **学習目標の設定**: 個人的な学習目標の管理
- **モチベーション維持**: 継続的な学習をサポート

### 🎯 高度な機能
- **復習システム**: 間違えた問題の自動復習リスト
- **学習分析**: 弱点分析と学習提案
- **パーソナライズされたダッシュボード**: 個人の学習状況に応じた情報表示

## 🚀 技術スタック

### フロントエンド
- **Next.js 14** - App Router使用
- **React 18** - 最新のReact機能
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **Lucide React** - アイコンライブラリ

### 認証・バックエンド
- **NextAuth.js** - 認証システム
- **Google OAuth** - ソーシャルログイン
- **Supabase** - バックエンドサービス
- **PostgreSQL** - データベース（Supabase）

### デプロイメント
- **Vercel** - ホスティングプラットフォーム
- **Supabase** - データベース・認証サービス

## 📋 学習分野

### 🔬 細胞生物学
- 細胞の構造と機能
- 細胞内小器官の役割
- 細胞分裂と細胞周期

### 🧬 分子生物学
- DNA・RNA・タンパク質
- 転写・翻訳の仕組み
- 遺伝子発現の制御

### 🧮 遺伝学
- メンデルの法則
- 遺伝の仕組み
- オペロンモデル

### ⚗️ 生化学
- 代謝経路
- 酵素反応
- エネルギー代謝

### 🦕 進化生物学
- 自然選択説
- 系統分類
- 分子進化

## 🛠️ セットアップ

### 前提条件
- Node.js 18.0以上
- npm または yarn
- Supabaseアカウント
- Google Cloud Platform アカウント（OAuth用）

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd biology-quiz-app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定：

```bash
# NextAuth設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth設定
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Google OAuth設定

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成または選択
3. "APIs & Services"→"Credentials"→"Create Credentials"→"OAuth 2.0 Client IDs"
4. Authorized redirect URIs に `http://localhost:3000/api/auth/callback/google` を追加

### 5. Supabaseセットアップ

1. [Supabase](https://supabase.com/)でプロジェクトを作成
2. SQL Editorで `docs/supabase-setup.sql` を実行してテーブルを作成
3. 必要に応じて `docs/supabase-rls-fix.sql` を実行してRLSポリシーを調整

### 6. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションが `http://localhost:3000` で起動します。

## 🗄️ データベース設計

### 主要テーブル

- **users**: ユーザー情報
- **user_progress**: 問題ごとの回答履歴
- **study_sessions**: 学習セッション記録
- **study_streaks**: 連続学習日数
- **achievements**: 達成バッジ

詳細なスキーマは `docs/supabase-setup.sql` を参照してください。

## 🚀 本番デプロイ

### Vercelデプロイ

1. GitHubにプロジェクトをプッシュ
2. [Vercel](https://vercel.com)でプロジェクトをインポート
3. 環境変数を設定
4. デプロイ実行

### 環境変数（本番用）

```bash
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📁 プロジェクト構造

```
biology-quiz-app/
├── app/                      # Next.js App Router
│   ├── api/                  # APIルート
│   │   ├── auth/             # NextAuth設定
│   │   └── debug/            # デバッグAPI
│   ├── auth/                 # 認証ページ
│   ├── dashboard/            # ダッシュボード
│   ├── progress/             # 学習進捗
│   ├── achievements/         # 達成バッジ
│   ├── review/              # 復習リスト
│   ├── quiz/                # クイズ関連
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # ホームページ
├── components/              # 再利用可能コンポーネント
│   ├── SessionProvider.tsx  # セッション管理
│   └── UserMenu.tsx         # ユーザーメニュー
├── data/                    # 静的データ
│   └── questions.ts         # 問題データ
├── docs/                    # ドキュメント
│   ├── supabase-setup.sql   # データベースセットアップ
│   └── supabase-rls-fix.sql # RLSポリシー修正
├── lib/                     # ユーティリティ
│   └── supabase.ts          # Supabase設定
├── types/                   # TypeScript型定義
│   ├── quiz.ts              # クイズ関連の型
│   └── next-auth.d.ts       # NextAuth型拡張
└── public/                  # 静的ファイル
```

## 🎯 使い方

### 基本的な学習フロー

1. **ログイン**: Googleアカウントでログイン
2. **分野選択**: 学習したい分野を選択
3. **問題解答**: 問題に回答し、詳細な解説を確認
4. **結果確認**: スコアと学習分析を確認
5. **進捗管理**: ダッシュボードで学習状況を把握

### 高度な機能の活用

- **復習システム**: 間違えた問題を重点的に復習
- **達成バッジ**: 学習の継続でバッジを獲得
- **学習統計**: 詳細な分析で弱点を把握
- **習慣トラッキング**: 連続学習日数を記録

## 🔧 カスタマイズ

### 問題の追加

`data/questions.ts`に新しい問題を追加：

```typescript
{
  id: 'unique-id',
  category: 'category-name',
  question: '問題文',
  options: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
  correctAnswer: 0,
  explanation: '詳細な解説',
  difficulty: 'easy' | 'medium' | 'hard'
}
```

### 新しい分野の追加

`data/questions.ts`の`categories`配列に追加：

```typescript
{
  id: 'new-category',
  name: '新しい分野',
  description: '分野の説明',
  icon: '🔬',
  questionCount: 10
}
```

## 📈 現在の開発状況

### ✅ 完成済み機能
- 基本クイズシステム
- Google OAuth認証
- ユーザー管理
- 学習進捗記録
- ダッシュボード
- 達成バッジシステム（基本版）
- データベース設計・構築

### 🚧 開発中機能
- 詳細な学習進捗表示
- 復習システムの実装
- リアルタイム学習記録
- 高度な統計機能

### 📋 今後の機能追加予定
- [ ] 学習履歴の詳細分析
- [ ] 弱点分析とパーソナライズ提案
- [ ] 問題のお気に入り機能
- [ ] ランキング機能
- [ ] 学習リマインダー
- [ ] 画像付き問題
- [ ] 制限時間機能
- [ ] エクスポート機能（学習データ）
- [ ] オフライン対応
- [ ] PWA（Progressive Web App）化

## 🤝 貢献

プルリクエストやIssueの投稿を歓迎します。

### 開発に参加する場合

1. フォーク
2. フィーチャーブランチを作成
3. 変更を実装
4. テストを実行
5. プルリクエストを作成

## 🔒 セキュリティ

- NextAuth.jsによる安全な認証
- Supabase Row Level Security (RLS)
- 環境変数による機密情報の保護
- CSRFプロテクション

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📞 サポート

質問や問題がありましたら、GitHubのIssueを作成してください。

## 🎓 学習のコツ

- **継続は力なり**: 毎日少しずつでも継続して学習
- **解説をしっかり読む**: 正解・不正解に関わらず解説を確認
- **弱点を把握**: 統計機能を活用して苦手分野を特定
- **復習を重視**: 間違えた問題は必ず復習
- **目標設定**: 達成バッジを目標に学習を継続

---

**大学院試験に向けて頑張ってください！🎓**

> 継続的な学習と効果的な復習で、必ず目標を達成できます。このアプリがあなたの学習をサポートします。