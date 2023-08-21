import React from 'react'

import { HiChevronRight } from 'react-icons/hi'

import clsx from 'clsx'
import Link from 'next/link'

const Breadcrumb = ({
  items,
}: {
  items: {
    name: string
    href: string
  }[]
}) => {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol role='list' className='flex items-center space-x-4'>
        {items.map((item, index) => (
          <li key={index}>
            <div className='flex items-center'>
              {index > 0 && <HiChevronRight className='h-5 w-5 flex-shrink-0 text-gray-500' aria-hidden='true' />}
              <div
                className={clsx(
                  index === items.length - 1
                    ? 'text-sm font-medium text-slate-200'
                    : 'text-sm font-medium text-slate-400 hover:text-white hover:underline',
                  index > 0 ? 'ml-4' : ''
                )}
              >
                {index === items.length - 1 ? (
                  item.name
                ) : (
                  <Link href={item.href} className=' focus-visible-ring -m-1 p-1'>
                    {item.name}
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
