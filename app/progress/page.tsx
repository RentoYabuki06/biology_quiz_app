'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Progress() {
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          📈 学習進捗
        </h1>
        <p className="text-gray-600">
          あなたの学習の詳細な進捗状況を確認できます
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          🚧 開発中
        </h2>
        <p className="text-gray-600">
          この機能は現在開発中です。近日中に詳細な学習進捗の表示機能を追加予定です。
        </p>
        <div className="mt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            ダッシュボードに戻る
          </button>
        </div>
      </div>
    </div>
  )
} 