import '../styles/globals.css'
import { ReactNode } from 'react'
import { BottomNav } from '@/components/BottomNav'

export const metadata = {
  title: 'Dare',
  description: 'Dare platform'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
