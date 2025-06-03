import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabase } from '@/lib/supabase'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          console.log('Attempting to sign in user:', user.email)
          
          // Check if user exists in Supabase
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          console.log('Fetch result:', { existingUser, fetchError })

          // If table doesn't exist, log but allow sign in
          if (fetchError?.code === '42P01') {
            console.error('Users table does not exist. Please run the Supabase setup SQL first.')
            console.log('Allowing sign in without database record for now...')
            return true // Allow sign in even without database
          }

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching user:', fetchError)
            return true // Allow sign in even with errors for now
          }

          // If user doesn't exist, create new user
          if (!existingUser) {
            console.log('Creating new user...')
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert({
                email: user.email!,
                name: user.name!,
                image: user.image,
              })
              .select()
              .single()

            if (insertError) {
              console.error('Error creating user:', insertError)
              return true // Allow sign in even if user creation fails
            }

            console.log('User created successfully:', newUser)

            // Initialize user streak
            const { error: streakError } = await supabase
              .from('study_streaks')
              .insert({
                user_id: newUser.id,
                current_streak: 0,
                longest_streak: 0,
                last_study_date: new Date().toISOString().split('T')[0],
                total_study_days: 0,
              })

            if (streakError) {
              console.error('Error creating user streak:', streakError)
              // Don't fail sign in for streak creation error
            }
          } else {
            console.log('Existing user found:', existingUser.email)
            // Update user info if changed
            const { error: updateError } = await supabase
              .from('users')
              .update({
                name: user.name!,
                image: user.image,
                updated_at: new Date().toISOString(),
              })
              .eq('email', user.email)

            if (updateError) {
              console.error('Error updating user:', updateError)
              // Don't fail sign in for update error
            }
          }

          return true
        } catch (error) {
          console.error('SignIn error:', error)
          return true // Allow sign in even with errors for now
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user?.email) {
        try {
          // Fetch user data from Supabase
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email)
            .single()

          if (!error && userData) {
            session.user.id = userData.id
          } else {
            // If no user found in database, use email as temporary ID
            session.user.id = session.user.email
          }
        } catch (error) {
          console.error('Session callback error:', error)
          // Use email as fallback ID
          session.user.id = session.user.email!
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  debug: true, // Enable debug logs
})

export { handler as GET, handler as POST } 