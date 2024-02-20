'use client'

import { useEffect, useRef } from 'react'

import AppHero from './_components/AppHero'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const sendHeightToParent = () => {
    if (contentRef.current) {
      const height = contentRef!.current!.scrollHeight
      window.parent.postMessage(
        {
          type: 'iframe_resize',
          height: height,
        },
        '*'
      )
    }
  }

  useEffect(() => {
    // Call sendHeightToParent on load
    sendHeightToParent()

    // Call sendHeightToParent every 1 second for up to 10 seconds
    const timeouts: NodeJS.Timeout[] = []
    for (let i = 1; i <= 10; i++) {
      const timeout = setTimeout(sendHeightToParent, i * 1000)
      timeouts.push(timeout)
    }

    window.addEventListener('resize', sendHeightToParent)

    return () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })

      window.removeEventListener('resize', sendHeightToParent)
    }
  }, [])

  return (
    <div ref={contentRef} className='relative'>
      <AppHero />
      <div className='px-4 sm:px-8 lg:px-14 xl:px-40 pt-10 md:pt-16 pb-24'>{children}</div>
    </div>
  )
}

export default Layout
