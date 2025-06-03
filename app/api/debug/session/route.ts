import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        message: 'セッションが見つかりません' 
      })
    }

    // Check Supabase connection
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single()

    return NextResponse.json({
      success: true,
      session: {
        user: session.user,
        expires: session.expires
      },
      supabase: {
        connected: !error,
        user: userData,
        error: error?.message
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 