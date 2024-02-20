import React from 'react'

import { AiOutlineNumber } from 'react-icons/ai'
import { HiChevronRight, HiOutlineChip, HiOutlineDocumentAdd, HiOutlineDocumentReport } from 'react-icons/hi'
import { TbCarouselHorizontal } from 'react-icons/tb'

import clsx from 'clsx'
import Link from 'next/link'

const details = [
  {
    name: 'General Information',
    href: 'general',
    icon: HiOutlineDocumentReport,
    theme: 'bg-blue-900/50 text-blue-500',
    stage: 'Dev',
  },
  {
    name: 'Attributes',
    href: 'attributes',
    icon: AiOutlineNumber,
    theme: 'bg-teal-900/50 text-teal-500',
    stage: 'Dev',
  },
  {
    name: 'Carousel',
    href: 'carousel',
    icon: TbCarouselHorizontal,
    theme: 'bg-pink-900/50 text-pink-500',
    stage: 'Dev',
  },
  {
    name: 'Specification',
    href: 'specification',
    icon: HiOutlineChip,
    theme: 'bg-violet-900/50 text-violet-500',
    stage: 'In Review',
  },
  {
    name: 'Additional Information',
    href: 'additional',
    icon: HiOutlineDocumentAdd,
    theme: 'bg-cyan-900/50 text-cyan-500',
    stage: 'Live',
  },
]

const stages: { [key: string]: string } = {
  Dev: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Live: 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/20',
  'In Review': 'bg-rose-400/10 text-rose-400 ring-rose-400/20',
}

const StoreDetails = ({
  params,
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  return (
    <div>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Store Details</h1>
      <p className='mt-2 text-sm text-slate-400'>Manage the store details for your product storefront.</p>
      <div className='mt-6 max-w-4xl bg-gray-950 p-10 rounded-lg'>
        <ul role='list' className='divide-y divide-white/5'>
          {details.map((detail) => (
            <li key={detail.name}>
              <Link
                href={`/org/${params.orgId}/product/${params.product}/store/store-details/${detail.href}`}
                className='focus:outline-gray-300'
              >
                <div className='relative flex items-center space-x-4 py-4 -mx-4 px-4 md:rounded-md cursor-pointer hover:bg-white/5'>
                  <div className='min-w-0 flex-auto'>
                    <div className='flex items-center gap-x-3'>
                      <div className='flex-shrink-0 text-gray-400'>
                        <div className={clsx('flex h-10 w-10 items-center justify-center rounded-md', detail.theme)}>
                          <detail.icon className='h-6 w-6' aria-hidden='true' />
                        </div>
                      </div>
                      <h2 className='min-w-0 text-sm font-semibold leading-6 text-white flex gap-x-2'>{detail.name}</h2>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      stages[detail.stage],
                      'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                    )}
                  >
                    {detail.stage}
                  </div>
                  <HiChevronRight className='h-5 w-5 flex-none text-gray-400' aria-hidden='true' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StoreDetails
