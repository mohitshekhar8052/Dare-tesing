"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

interface UserData {
  name: string
  email: string
  college: string
  bio: string
  joinDate: string
  profileImage?: string
  stats: {
    daresCompleted: number
    rank: number
    coins: number
    streak: number
  }
}

interface UserContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  refreshUserData: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  userData: null,
  loading: true,
  refreshUserData: async () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserData = async (currentUser: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
      if (userDoc.exists()) {
        const data = userDoc.data()
        setUserData({
          name: data.name || currentUser.displayName || 'User',
          email: data.email || currentUser.email || '',
          college: data.college || '',
          bio: data.bio || 'Dare enthusiast | Challenge seeker | Always up for an adventure 🔥',
          joinDate: data.joinDate || 'Recently',
          profileImage: data.profileImage || '',
          stats: data.stats || { daresCompleted: 0, rank: 0, coins: 0, streak: 0 }
        })
      } else {
        setUserData({
          name: currentUser.displayName || 'User',
          email: currentUser.email || '',
          college: '',
          bio: 'Dare enthusiast | Challenge seeker | Always up for an adventure 🔥',
          joinDate: 'Recently',
          profileImage: '',
          stats: { daresCompleted: 0, rank: 0, coins: 0, streak: 0 }
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUserData({
        name: currentUser.displayName || 'User',
        email: currentUser.email || '',
        college: '',
        bio: 'Dare enthusiast | Challenge seeker | Always up for an adventure 🔥',
        joinDate: 'Recently',
        profileImage: '',
        stats: { daresCompleted: 0, rank: 0, coins: 0, streak: 0 }
      })
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      
      if (currentUser) {
        await fetchUserData(currentUser)
      } else {
        setUserData(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user)
    }
  }

  return (
    <UserContext.Provider value={{ user, userData, loading, refreshUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
