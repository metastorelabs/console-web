import React from 'react'

import { HiChevronRight, HiPlus } from 'react-icons/hi'

import clsx from 'clsx'
import Link from 'next/link'

import Breadcrumb from '@/components/Breadcrumb'

type Versions = {
  version: string
  status: string
  createdOn: string
}

const versions: Versions[] = [
  {
    version: 'v1.2.0',
    status: 'In Review',
    createdOn: '1h ago',
  },
  {
    version: 'v1.4.0',
    status: 'Live',
    createdOn: '2d ago',
  },
]

const statuses: { [key: string]: string } = {
  Draft: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  'In Review': 'bg-rose-400/10 text-rose-400 ring-rose-400/20',
  Live: 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/20',
}

const Browser = ({
  params,
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/build-and-version`,
      name: 'Build and version',
    },
    {
      href: '#',
      name: 'Browser',
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <h1 className='text-white text-xl md:text-2xl font-semibold mt-4'>Browser Artifact</h1>

      <div className='mt-6 max-w-4xl bg-gray-950 px-10 py-8 rounded-lg'>
        <div>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-slate-300 font-bold text-sm'>Versions</h2>
            <Link
              href={`/org/${params.orgId}/product/${params.product}/store/build-and-version/browser/new-version`}
              className='focus-visible-ring rounded-md'
            >
              <div className='flex items-center hover:bg-gray-800 py-2 px-2 cursor-pointer rounded-md text-slate-300 font-bold text-xs'>
                <HiPlus className='h-4 w-4 mr-1' />
                <p>New version</p>
              </div>
            </Link>
          </div>
          <ul role='list' className='divide-y divide-white/5'>
            {versions.map((version) => (
              <li key={version.version}>
                <Link
                  href={`/org/${params.orgId}/product/${params.product}/store/build-and-version/browser/${version.version}`}
                  className='outline-gray-300'
                >
                  <div className='relative flex items-center space-x-4 py-4 -mx-4 px-4 md:rounded-md cursor-pointer hover:bg-gray-800 '>
                    <div className='min-w-0 flex-auto'>
                      <div className='flex items-center gap-x-3'>
                        <h2 className='min-w-0 font-semibold leading-6 text-white flex gap-x-2'>
                          <span className='truncate'>{version.version}</span>
                        </h2>
                      </div>
                      <p className='text-xs leading-5 text-gray-400 mt-2'>Created {version.createdOn}</p>
                    </div>
                    <div
                      className={clsx(
                        statuses[version.status],
                        'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {version.status}
                    </div>
                    <HiChevronRight className='h-5 w-5 flex-none text-gray-400' aria-hidden='true' />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Browser
