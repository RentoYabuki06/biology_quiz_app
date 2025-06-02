# 🧬 生物学クイズアプリ

大学院試験対策のための生物学クイズアプリケーションです。分野別の問題に挑戦して、理解度を確認できます。

## ✨ 機能

- **分野別学習**: 細胞生物学、分子生物学、遺伝学、生化学、進化生物学
- **難易度別問題**: 基礎、標準、発展の3段階
- **詳細な解説**: 各問題に丁寧な解説付き
- **進捗管理**: リアルタイムでの学習進捗表示
- **結果分析**: 詳細なスコア分析と学習提案
- **レスポンシブデザイン**: PC・タブレット・スマートフォン対応

## 🚀 技術スタック

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

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

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd biology-quiz-app

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

アプリケーションが `http://localhost:3000` で起動します。

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーを起動
npm start
```

## 🚀 Vercelデプロイ

### 1. Vercelアカウントの準備
[Vercel](https://vercel.com)でアカウントを作成

### 2. プロジェクトをGitHubにプッシュ
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. Vercelでデプロイ
1. Vercelダッシュボードで「New Project」をクリック
2. GitHubリポジトリを選択
3. フレームワークプリセットで「Next.js」を選択
4. 「Deploy」をクリック

### 4. カスタムドメイン（オプション）
Vercelダッシュボードでカスタムドメインを設定できます。

## 📁 プロジェクト構造

```
biology-quiz-app/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── quiz/             # クイズ関連ページ
│       └── [category]/    # 動的ルート
│           ├── page.tsx   # クイズページ
│           └── result/    # 結果ページ
├── components/            # 再利用可能コンポーネント
├── data/                 # クイズデータ
│   └── questions.ts      # 問題データ
├── types/                # TypeScript型定義
│   └── quiz.ts           # クイズ関連の型
├── public/               # 静的ファイル
└── README.md
```

## 🎯 使い方

1. **ホームページ**: 学習したい分野を選択
2. **クイズ画面**: 問題に回答し、解説を確認
3. **結果画面**: スコアと学習提案を確認
4. **復習**: 必要に応じて再挑戦

## 🔧 カスタマイズ

### 問題の追加
`data/questions.ts`ファイルに新しい問題を追加できます：

```typescript
{
  id: 'unique-id',
  category: 'category-name',
  question: '問題文',
  options: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
  correctAnswer: 0, // 正解のインデックス
  explanation: '解説文',
  difficulty: 'easy' | 'medium' | 'hard'
}
```

### 新しい分野の追加
`data/questions.ts`の`categories`配列に新しいカテゴリを追加：

```typescript
{
  id: 'new-category',
  name: '新しい分野',
  description: '分野の説明',
  icon: '🔬',
  questionCount: 10
}
```

## 📈 今後の機能追加予定

- [ ] ユーザー認証とプロフィール
- [ ] 学習履歴の保存
- [ ] 弱点分析機能
- [ ] 問題のお気に入り機能
- [ ] ランキング機能
- [ ] 問題の難易度調整
- [ ] 画像付き問題
- [ ] 制限時間機能

## 🤝 貢献

プルリクエストや Issue の投稿を歓迎します。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📞 サポート

質問や問題がありましたら、Issueを作成してください。

---

**大学院試験に向けて頑張ってください！🎓**