'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/data/questions'

interface ResultPageProps {
  params: {
    category: string
  }
}

export default function ResultPage({ params }: ResultPageProps) {
  const searchParams = useSearchParams()
  const { category } = params
  
  const score = parseInt(searchParams.get('score') || '0')
  const total = parseInt(searchParams.get('total') || '0')
  const percentage = Math.round((score / total) * 100)
  
  const categoryInfo = categories.find(c => c.id === category)

  const getScoreMessage = () => {
    if (percentage >= 90) return '素晴らしい！完璧な理解です。'
    if (percentage >= 80) return 'よくできました！高い理解度です。'
    if (percentage >= 70) return 'まずまずの成果です。'
    if (percentage >= 60) return '基本は理解できています。復習を続けましょう。'
    return '基礎からもう一度学習することをお勧めします。'
  }

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* 結果カード */}
      <div className="card mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            クイズ結果
          </h1>
          <p className="text-gray-600">
            {categoryInfo?.name} の学習が完了しました
          </p>
        </div>

        {/* スコア表示 */}
        <div className="mb-8">
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {percentage}%
          </div>
          <div className="text-xl text-gray-700 mb-2">
            {score} / {total} 問正解
          </div>
          <p className={`text-lg font-medium ${getScoreColor()}`}>
            {getScoreMessage()}
          </p>
        </div>

        {/* 円グラフ風の表示 */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={percentage >= 80 ? 'text-green-500' : percentage >= 60 ? 'text-yellow-500' : 'text-red-500'}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-700">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* 詳細統計 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {score}
            </div>
            <div className="text-sm text-green-700">正解数</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {total - score}
            </div>
            <div className="text-sm text-red-700">不正解数</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {total}
            </div>
            <div className="text-sm text-blue-700">総問題数</div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/quiz/${category}`}
            className="btn-primary"
          >
            もう一度挑戦
          </Link>
          <Link
            href="/"
            className="btn-secondary"
          >
            他の分野を学習
          </Link>
        </div>
      </div>

      {/* 学習提案 */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          📚 次のステップ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-left">
            <h3 className="font-medium text-gray-900 mb-2">
              {percentage >= 80 ? '🎯 さらなる挑戦' : '📖 復習のすすめ'}
            </h3>
            <p className="text-gray-600 text-sm">
              {percentage >= 80 
                ? '他の分野にも挑戦して、生物学の理解を深めましょう。'
                : '間違った問題を中心に、もう一度復習することをお勧めします。'
              }
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900 mb-2">
              💡 学習のポイント
            </h3>
            <p className="text-gray-600 text-sm">
              解説をしっかり読んで、なぜその答えになるのかを理解することが大切です。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 