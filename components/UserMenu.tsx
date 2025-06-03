'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function UserMenu() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (status === 'loading') {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => signIn('google')}
          className="btn-primary text-sm"
        >
          ログイン
        </button>
      </div>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-2"
      >
        <img
          src={session.user?.image || '/default-avatar.png'}
          alt="プロフィール"
          className="h-8 w-8 rounded-full"
        />
        <span className="text-sm font-medium hidden sm:block">
          {session.user?.name}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {session.user?.name}
            </p>
            <p className="text-sm text-gray-500">
              {session.user?.email}
            </p>
          </div>
          
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            📊 ダッシュボード
          </Link>
          
          <Link
            href="/progress"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            📈 学習進捗
          </Link>
          
          <Link
            href="/achievements"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            🏆 達成バッジ
          </Link>
          
          <Link
            href="/review"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            📝 復習リスト
          </Link>
          
          <div className="border-t border-gray-100 mt-1">
            <button
              onClick={() => {
                setIsOpen(false)
                signOut()
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 