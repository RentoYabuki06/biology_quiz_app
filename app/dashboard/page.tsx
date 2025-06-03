'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserStats } from '@/types/quiz'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      // TODO: Fetch user stats from API
      // 現在はダミーデータを表示
      setStats({
        totalQuestions: 45,
        correctAnswers: 32,
        averageScore: 71.1,
        timeSpent: 1800, // 30分
        currentStreak: 3,
        longestStreak: 7,
        achievementsCount: 4,
        categoryProgress: {
          'cell-biology': { attempted: 15, correct: 12, averageScore: 80 },
          'genetics': { attempted: 20, correct: 14, averageScore: 70 },
          'ecology': { attempted: 10, correct: 6, averageScore: 60 }
        }
      })
      setLoading(false)
    }
  }, [session])

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* ウェルカムセクション */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              おかえりなさい、{session.user.name}さん！
            </h1>
            <p className="text-primary-100 mt-1">
              今日も学習を続けて、目標に向かって進みましょう
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats?.currentStreak || 0}</div>
            <div className="text-primary-100 text-sm">連続学習日数</div>
          </div>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {stats?.totalQuestions || 0}
          </div>
          <div className="text-gray-600">総問題数</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {stats?.averageScore.toFixed(1) || 0}%
          </div>
          <div className="text-gray-600">平均正答率</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {Math.floor((stats?.timeSpent || 0) / 60)}分
          </div>
          <div className="text-gray-600">学習時間</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {stats?.achievementsCount || 0}
          </div>
          <div className="text-gray-600">獲得バッジ</div>
        </div>
      </div>

      {/* 分野別進捗 */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">分野別学習進捗</h2>
        <div className="space-y-4">
          {Object.entries(stats?.categoryProgress || {}).map(([category, progress]) => (
            <div key={category} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">
                  {category === 'cell-biology' ? '細胞生物学' :
                   category === 'genetics' ? '遺伝学' :
                   category === 'ecology' ? '生態学' : category}
                </span>
                <span className="text-sm text-gray-600">
                  {progress.correct}/{progress.attempted} 問正解
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${progress.averageScore}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                正答率: {progress.averageScore}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/quiz/cell-biology" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="text-4xl mb-3">🧬</div>
            <h3 className="font-bold text-gray-900 mb-2">細胞生物学</h3>
            <p className="text-gray-600 text-sm">細胞の構造と機能を学習</p>
          </div>
        </Link>
        
        <Link href="/progress" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-bold text-gray-900 mb-2">学習進捗</h3>
            <p className="text-gray-600 text-sm">詳細な学習データを確認</p>
          </div>
        </Link>
        
        <Link href="/review" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-bold text-gray-900 mb-2">復習リスト</h3>
            <p className="text-gray-600 text-sm">間違えた問題を復習</p>
          </div>
        </Link>
      </div>

      {/* 学習のヒント */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-bold text-blue-900 mb-3">💡 今日の学習のヒント</h3>
        <p className="text-blue-800">
          継続的な学習が記憶の定着に重要です。毎日少しずつでも問題を解く習慣を身につけましょう。
          間違えた問題は復習リストで重点的に学習することをお勧めします。
        </p>
      </div>
    </div>
  )
} 