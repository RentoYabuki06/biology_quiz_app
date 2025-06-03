'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Review() {
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
          📝 復習リスト
        </h1>
        <p className="text-gray-600">
          間違えた問題や復習が必要な問題を確認して、理解を深めましょう
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          🚧 開発中
        </h2>
        <p className="text-gray-600 mb-4">
          この機能は現在開発中です。近日中に以下の機能を追加予定です：
        </p>
        
        <ul className="text-gray-600 space-y-2 mb-6">
          <li>• 間違えた問題の一覧表示</li>
          <li>• 問題ごとの間違い回数と理解度の表示</li>
          <li>• 復習優先度の自動判定</li>
          <li>• 復習専用のクイズモード</li>
          <li>• 理解度に基づく問題の再出題</li>
        </ul>
        
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            ダッシュボードに戻る
          </button>
          <button
            onClick={() => router.push('/')}
            className="btn-secondary"
          >
            クイズを続ける
          </button>
        </div>
      </div>

      {/* 学習のヒント */}
      <div className="card bg-green-50 border-green-200">
        <h3 className="font-bold text-green-900 mb-3">💡 効果的な復習方法</h3>
        <ul className="text-green-800 space-y-2">
          <li>• 間違えた問題は解説をしっかり読んで理解する</li>
          <li>• 定期的に復習して記憶を定着させる</li>
          <li>• 関連する分野の問題も合わせて復習する</li>
          <li>• 間違いの原因を分析して同じミスを避ける</li>
        </ul>
      </div>
    </div>
  )
} 