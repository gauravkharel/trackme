import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Track Me',
  description: 'Inspired by Toggl Tracker',
} 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-full" lang="en">
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  )
}
