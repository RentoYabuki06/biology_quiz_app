'use client'

import { useState } from 'react'
import Link from 'next/link'
import { categories } from '@/data/questions'
import { Category } from '@/types/quiz'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          生物学クイズアプリ
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          大学院試験に向けて、生物学の理解度をクイズで確認しましょう。
          分野別に問題が用意されており、解説付きで学習できます。
        </p>
      </div>

      {/* 統計セクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {categories.reduce((total, cat) => total + cat.questionCount, 0)}
          </div>
          <div className="text-gray-600">総問題数</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {categories.length}
          </div>
          <div className="text-gray-600">学習分野</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            3
          </div>
          <div className="text-gray-600">難易度レベル</div>
        </div>
      </div>

      {/* カテゴリ選択 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          学習分野を選択してください
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/quiz/${category.id}`}
              className="card hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-600 font-medium">
                    {category.questionCount}問
                  </span>
                  <div className="btn-primary">
                    開始する
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 学習のヒント */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          🎯 効果的な学習のために
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">📚 段階的学習</h4>
            <p className="text-gray-600 text-sm">
              基礎的な分野から始めて、徐々に高度な内容に挑戦しましょう。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">🔄 反復練習</h4>
            <p className="text-gray-600 text-sm">
              間違った問題は解説を読んで、再度挑戦することが大切です。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">📝 メモ取り</h4>
            <p className="text-gray-600 text-sm">
              重要なポイントや覚えにくい内容はメモを取って整理しましょう。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">⏰ 時間管理</h4>
            <p className="text-gray-600 text-sm">
              本番を想定して、時間を意識しながら問題を解く練習をしましょう。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 