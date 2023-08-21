import '@/styles/globals.css'

import localFont from 'next/font/local'

import NotificationToaster from '@/components/NotificationToaster'

const ailerons = localFont({
  variable: '--font-ailerons',
  src: '../assets/fonts/Ailerons.otf',
  display: 'swap',
})

export const metadata = {
  title: 'Console - Metastore',
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
