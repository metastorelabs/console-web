import '@/styles/globals.css'

import NotificationToaster from '@/components/NotificationToaster'

export const metadata = {
  title: 'Console - Metastore',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-950'>
        <NotificationToaster />
        {children}
      </body>
    </html>
  )
}
