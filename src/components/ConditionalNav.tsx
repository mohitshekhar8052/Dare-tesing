"use client"

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BottomNav } from './BottomNav'

export function ConditionalNav() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Hide navbar on auth page
  if (pathname === '/auth') {
    return null
  }

  // Prevent hydration mismatch by only rendering on client
  if (!isMounted) {
    return <div className="h-20" /> // Placeholder to maintain layout
  }
  
  return <BottomNav />
}
