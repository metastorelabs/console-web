'use client'

import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

const tabs = [
  { name: 'Overview', href: '', active: true },
  { name: 'Store', href: 'store', active: false },
  { name: 'Reviews', href: 'reviews', active: false },
  { name: 'Faq', href: 'faq', active: false },
]

const AppTabs = () => {
  const [isAtTop, setIsAtTop] = useState(false)
  const tabsRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    if (tabsRef.current) {
      const tabTop = tabsRef.current.getBoundingClientRect().top
      setIsAtTop(tabTop === 0)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={tabsRef}
      className={clsx('border-b border-gray-900 z-[39] w-full sticky top-0 lg:-mt-14', isAtTop ? 'bg-gray-950' : '')}
    >
      <nav
        className='-mb-px flex space-x-8 px-4 sm:px-8 lg:px-14 xl:px-40 overflow-x-scroll no-scrollbar'
        aria-label='Tabs'
      >
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={clsx(
              tab.active ? 'border-white text-white' : 'border-transparent text-gray-500',
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm md:text-base font-medium tracking-wide max-md:w-full max-md:text-center cursor-default'
            )}
            aria-current={tab.active ? 'page' : undefined}
          >
            {tab.name}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default AppTabs
