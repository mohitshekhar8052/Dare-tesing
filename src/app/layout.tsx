import '../styles/globals.css'
import { ReactNode } from 'react'
import { ConditionalNav } from '@/components/ConditionalNav'
import ClickSpark from '@/components/ClickSpark'
import { UserProvider } from '@/contexts/UserContext'

export const metadata = {
  title: 'Dare',
  description: 'Dare platform'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full">
        <UserProvider>
          <ClickSpark sparkColor="#6b86b0ff" sparkSize={12} sparkRadius={50} sparkCount={15} duration={500}>
            {children}
            <ConditionalNav />
          </ClickSpark>
        </UserProvider>
      </body>
    </html>
  )
}
