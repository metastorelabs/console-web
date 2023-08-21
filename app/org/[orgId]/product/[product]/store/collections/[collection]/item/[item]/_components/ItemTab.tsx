'use client'

import React from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ItemTab = ({
  params,
  tabs,
}: {
  params: {
    collection: string
    product: string
    orgId: string
    item: string
  }
  tabs: {
    name: string
    slug: string | null
    content: React.ReactNode
  }[]
}) => {
  const searchParams = useSearchParams()
  const selected = searchParams.get('tab')

  return (
    <div>
      <div className='border-b border-slate-700 overflow-x-scroll no-scrollbar'>
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={`/org/${params.orgId}/product/${params.product}/store/collections/${params.collection}/item/${
                params.item
              }${tab.slug ? `?tab=${tab.slug}` : ''}`}
              className={clsx(
                selected === tab.slug
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-300',
                'whitespace-nowrap border-b-2 py-4 text-sm font-medium focus-visible-ring ring-inset px-1 -mx-1'
              )}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className='mt-4'>
        {tabs.map((tab) => (
          <div key={tab.name} className={clsx(selected === tab.slug ? 'block' : 'hidden')}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemTab
