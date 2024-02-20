import '@/styles/globals.css'

import localFont from 'next/font/local'

import NotificationToaster from '@/components/NotificationToaster'

import type { Metadata } from 'next'

const ailerons = localFont({
  variable: '--font-ailerons',
  src: '../assets/fonts/Ailerons.otf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Console - Metastore',
  description: 'Post and manage you game in Metastore with our tools and services.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        rel: 'icon',
        sizes: '48x48',
      },
      {
        url: '/favicon.svg',
        rel: 'icon',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        url: '/apple-touch-icon.png',
        rel: 'apple-touch-icon',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${ailerons.variable}`}>
      <body className='bg-gray-950'>
        <NotificationToaster />
        {children}
      </body>
    </html>
  )
}
