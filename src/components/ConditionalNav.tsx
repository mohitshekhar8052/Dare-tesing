"use client"

import { usePathname } from 'next/navigation'
import { BottomNav } from './BottomNav'

export function ConditionalNav() {
  const pathname = usePathname()
  
  // Hide navbar on auth page
  if (pathname === '/auth') {
    return null
  }
  
  return <BottomNav />
}
