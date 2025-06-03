'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Achievements() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // サンプルバッジデータ
  const sampleAchievements = [
    {
      id: 1,
      title: '初回ログイン',
      description: 'アプリに初めてログインしました',
      icon: '🎉',
      earned: true,
      earnedAt: '2024-01-31'
    },
    {
      id: 2,
      title: '連続学習3日',
      description: '3日間連続で学習を行いました',
      icon: '🔥',
      earned: true,
      earnedAt: '2024-01-31'
    },
    {
      id: 3,
      title: '正答率80%達成',
      description: '1回のクイズで80%以上の正答率を達成',
      icon: '🎯',
      earned: false,
      earnedAt: null
    },
    {
      id: 4,
      title: '学習マスター',
      description: '100問以上の問題を解答',
      icon: '🏆',
      earned: false,
      earnedAt: null
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🏆 達成バッジ
        </h1>
        <p className="text-gray-600">
          学習の成果を確認して、新しいバッジの獲得を目指しましょう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`card transition-all duration-200 ${
              achievement.earned
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                : 'bg-gray-50 border-gray-200 opacity-75'
            }`}
          >
            <div className="text-center">
              <div className={`text-6xl mb-4 ${achievement.earned ? '' : 'grayscale'}`}>
                {achievement.icon}
              </div>
              <h3 className={`font-bold mb-2 ${
                achievement.earned ? 'text-yellow-800' : 'text-gray-600'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm mb-4 ${
                achievement.earned ? 'text-yellow-700' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
              {achievement.earned ? (
                <div className="text-xs text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full inline-block">
                  {achievement.earnedAt}に獲得
                </div>
              ) : (
                <div className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full inline-block">
                  未獲得
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-bold text-blue-900 mb-3">💡 バッジ獲得のヒント</h3>
        <ul className="text-blue-800 space-y-2">
          <li>• 毎日少しずつでも学習を継続してストリークバッジを獲得しよう</li>
          <li>• 各分野で高い正答率を目指してマスタリーバッジを目指そう</li>
          <li>• 多くの問題に挑戦して学習時間バッジを集めよう</li>
        </ul>
      </div>
    </div>
  )
} 