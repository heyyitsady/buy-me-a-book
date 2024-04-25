import './globals.css'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Buy me a book | Aditya',
  description: 'Buy me a coffee clone by Atharva Pardeshi (Sazed) built in Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
