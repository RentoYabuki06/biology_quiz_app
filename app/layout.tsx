import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/SessionProvider'
import UserMenu from '@/components/UserMenu'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '生物学クイズアプリ',
  description: '大学院試験対策のための生物学クイズアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                      <h1 className="text-xl font-bold text-gray-900">
                        🧬 生物学クイズ
                      </h1>
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <UserMenu />
                  </div>
                </div>
              </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
} 