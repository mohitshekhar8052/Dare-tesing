import '../styles/globals.css'
import { ReactNode } from 'react'
import { ConditionalNav } from '@/components/ConditionalNav'

export const metadata = {
  title: 'Dare',
  description: 'Dare platform'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ConditionalNav />
      </body>
    </html>
  )
}
