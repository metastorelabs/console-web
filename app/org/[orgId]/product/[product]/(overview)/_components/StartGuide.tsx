import React from 'react'

import { HiCheckCircle, HiChevronRight } from 'react-icons/hi2'

import Link from 'next/link'

const quickGuides = [
  {
    id: 'step-1',
    name: 'PRODUCT DETAILS',
    steps: [
      { name: 'Populate store details', status: 'complete' },
      {
        name: 'Set pricing and offer',
        href: 'store/pricing',
        status: 'upcoming',
      },
      {
        name: 'Create collections and NFTs',
        href: 'store/collections',
        status: 'upcoming',
      },
    ],
  },
  {
    id: 'step-2',
    name: 'PRODUCT LAUNCH',
    steps: [
      {
        name: 'Upload build',
        href: 'store/build-and-version',
        status: 'upcoming',
      },
      { name: 'Preview changes', href: 'store/preview', status: 'upcoming' },
      { name: 'Generate access codes', href: '/settings', status: 'upcoming' },
      {
        name: 'Submit for review',
        href: 'store/launchpad',
        status: 'upcoming',
      },
    ],
  },
]

const StartGuide = ({
  params,
}: {
  params: {
    orgId: string
    product: string
  }
}) => {
  return (
    <div className='xl:h-screen xl:overflow-y-hidden bg-black/30'>
      <header className='flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 xl:px-8'>
        <h2 className='text-base font-semibold leading-7 text-white'>Quick start guide</h2>
      </header>
      <nav className='p-4' aria-label='Progress'>
        {quickGuides.map((guide) => (
          <div key={guide.id} className='mb-6'>
            <h4 className='text-slate-400 text-[10px] font-bold mb-2'>{guide.name}</h4>
            <ol role='list' className='space-y-1'>
              {guide.steps.map((step) => (
                <li key={step.name}>
                  {step.status === 'complete' ? (
                    <span className='flex items-center bg-gray-950 px-2 py-3 rounded'>
                      <>
                        <span className='relative flex h-5 w-5 flex-shrink-0 items-center justify-center'>
                          <HiCheckCircle className='h-full w-full text-indigo-600' aria-hidden='true' />
                        </span>
                        <span className='ml-3 text-sm font-medium text-indigo-500'>{step.name}</span>
                      </>
                    </span>
                  ) : (
                    <Link
                      href={`/org/${params.orgId}/product/${params.product}/${step.href}` || '#'}
                      className='outline-gray-400'
                    >
                      <div className='flex items-center group bg-gray-950 hover:bg-black px-2 py-3 rounded'>
                        <div
                          className='relative flex h-5 w-5 flex-shrink-0 items-center justify-center'
                          aria-hidden='true'
                        >
                          <div className='h-2 w-2 rounded-full bg-gray-300 group-hover:bg-white' />
                        </div>
                        <p className='ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-200'>{step.name}</p>
                        <div className='text-slate-200 ml-auto'>
                          <HiChevronRight className='h-5 w-5' />
                        </div>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default StartGuide
