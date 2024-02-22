import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from './navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'libri usati',
  description: 'Risparmia o guadagna comprando o vendendo libri scolastici usati',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
