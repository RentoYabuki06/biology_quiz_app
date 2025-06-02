'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { questions, categories } from '@/data/questions'
import { Question, QuizResult, QuizSession } from '@/types/quiz'

interface QuizPageProps {
  params: {
    category: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  const router = useRouter()
  const { category } = params
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null)
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date())

  // カテゴリーの問題を取得
  const categoryQuestions = questions.filter(q => q.category === category)
  const categoryInfo = categories.find(c => c.id === category)
  
  const currentQuestion = categoryQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === categoryQuestions.length - 1

  useEffect(() => {
    if (categoryQuestions.length > 0) {
      setQuizSession({
        id: `quiz-${Date.now()}`,
        category,
        questions: categoryQuestions,
        results: [],
        startTime: startTime,
        score: 0,
        totalQuestions: categoryQuestions.length
      })
    }
  }, [category, categoryQuestions, startTime])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const timeTaken = Date.now() - questionStartTime.getTime()
    
    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeTaken
    }

    setQuizResults(prev => [...prev, result])
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // クイズ終了
      const finalResults = [...quizResults]
      const score = finalResults.filter(r => r.isCorrect).length
      
      const finalSession: QuizSession = {
        id: quizSession?.id || '',
        category,
        questions: categoryQuestions,
        results: finalResults,
        startTime: startTime,
        endTime: new Date(),
        score,
        totalQuestions: categoryQuestions.length
      }

      // 結果ページに遷移
      router.push(`/quiz/${category}/result?score=${score}&total=${categoryQuestions.length}`)
    } else {
      // 次の問題へ
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setQuestionStartTime(new Date())
    }
  }

  if (!currentQuestion || !categoryInfo) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          問題が見つかりません
        </h1>
        <Link href="/" className="btn-primary">
          ホームに戻る
        </Link>
      </div>
    )
  }

  const progressPercentage = ((currentQuestionIndex + 1) / categoryQuestions.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* プログレスバー */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            問題 {currentQuestionIndex + 1} / {categoryQuestions.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {categoryInfo.name}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 問題カード */}
      <div className="card mb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQuestion.difficulty === 'easy' ? '基礎' :
               currentQuestion.difficulty === 'medium' ? '標準' : '発展'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 選択肢 */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-primary-500 bg-primary-50'
                  : showExplanation && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <span className="font-medium">
                {String.fromCharCode(65 + index)}. {option}
              </span>
            </button>
          ))}
        </div>

        {/* 解説 */}
        {showExplanation && (
          <div className="border-t pt-6">
            <h3 className="font-bold text-gray-900 mb-2">解説</h3>
            <p className="text-gray-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Link href="/" className="btn-secondary">
            ホームに戻る
          </Link>
          
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              回答する
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="btn-primary"
            >
              {isLastQuestion ? '結果を見る' : '次の問題'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 