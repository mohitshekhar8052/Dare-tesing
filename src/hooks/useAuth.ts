"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

interface AuthState {
  user: User | null
  loading: boolean
  hasProfile: boolean
}

// Cache to avoid repeated Firestore calls
const profileCache = new Map<string, boolean>()

export function useAuth(requireAuth = false, requireProfile = false) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    hasProfile: false,
  })
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setAuthState({ user: null, loading: false, hasProfile: false })
        
        if (requireAuth) {
          router.push('/auth')
        }
        return
      }

      // Check cache first
      const cached = profileCache.get(currentUser.uid)
      if (cached !== undefined) {
        setAuthState({
          user: currentUser,
          loading: false,
          hasProfile: cached,
        })

        if (requireProfile && !cached) {
          router.push('/auth')
        }
        return
      }

      // Check if user has a profile in Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const hasProfile = userDoc.exists()
        
        // Cache the result
        profileCache.set(currentUser.uid, hasProfile)

        setAuthState({
          user: currentUser,
          loading: false,
          hasProfile,
        })

        // If profile is required but doesn't exist, redirect to auth to complete stepper
        if (requireProfile && !hasProfile) {
          router.push('/auth')
        }
      } catch (error) {
        console.error('Error checking user profile:', error)
        setAuthState({
          user: currentUser,
          loading: false,
          hasProfile: false,
        })
      }
    })

    return () => unsubscribe()
  }, [requireAuth, requireProfile, router])

  return authState
}
