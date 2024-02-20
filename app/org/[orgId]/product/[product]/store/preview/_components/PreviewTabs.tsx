'use client'

import { useEffect } from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const PreviewTabs = ({
  tabs,
  params,
}: {
  tabs: {
    name: string
    slug: string | null
    content: React.ReactNode
  }[]
  params: {
    product: string
    orgId: string
  }
}) => {
  const searchParams = useSearchParams()
  const selected = searchParams.get('tab')

  // prevent scrolling in x direction
  useEffect(() => {
    const body = document.querySelector('body')
    if (body) {
      body.style.overflow = 'hidden'
    }
    return () => {
      if (body) {
        body.style.overflow = 'auto'
      }
    }
  }, [])

  return (
    <>
      <nav className='flex space-x-4 mt-6 overflow-x-scroll no-scrollbar' aria-label='Tabs'>
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={`/org/${params.orgId}/product/${params.product}/store/preview${tab.slug ? `?tab=${tab.slug}` : ''}`}
            className={clsx(
              selected === tab.slug
                ? 'bg-gray-900 text-gray-200'
                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900',
              'rounded-md px-3 py-2 text-sm font-medium shrink-0'
            )}
            aria-current={selected === tab.slug ? 'page' : undefined}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
      <div className='my-20'>
        {tabs.map((tab) => (
          <div key={tab.name} className={clsx(selected === tab.slug ? 'block' : 'hidden')}>
            {tab.content}
          </div>
        ))}
      </div>
    </>
  )
}

export default PreviewTabs
