import React from 'react'

import { AiFillApple, AiFillWindows } from 'react-icons/ai'
import { HiChevronRight, HiOutlineGlobeAlt } from 'react-icons/hi'

import clsx from 'clsx'
import Link from 'next/link'

type Build1 = {
  platform: string
  version: string
  status: string
  lastUpdated: string
  isSupported: true
}

type Build2 = {
  platform: string
  isSupported: false
}

const builds: (Build1 | Build2)[] = [
  {
    platform: 'Browser',
    version: 'v1.2.0',
    status: 'Live',
    lastUpdated: '1h ago',
    isSupported: true,
  },
  {
    platform: 'Macos',
    isSupported: false,
  },
  {
    platform: 'Windows',
    isSupported: false,
  },
]

const statuses: { [key: string]: string } = {
  Draft: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  'In Review': 'bg-rose-400/10 text-rose-400 ring-rose-400/20',
  Live: 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/20',
}

const platformIcons: { [key: string]: React.ReactNode } = {
  Browser: <HiOutlineGlobeAlt className='h-5 w-5' aria-hidden='true' />,
  Macos: <AiFillApple className='h-5 w-5' aria-hidden='true' />,
  Windows: <AiFillWindows className='h-5 w-5 ' aria-hidden='true' />,
}

const BuildNVersion = ({
  params,
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  return (
    <div>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Build and version</h1>
      <p className='mt-2 text-sm text-slate-400'>Manage your builds and versions for your product.</p>
      <div className='mt-6 max-w-4xl bg-gray-950 p-10 rounded-lg'>
        <ul role='list' className='divide-y divide-white/5'>
          {builds.map((build) => (
            <li key={build.platform}>
              {build.isSupported ? (
                <Link
                  href={`/org/${params.orgId}/product/${
                    params.product
                  }/store/build-and-version/${build.platform.toLowerCase()}`}
                  className='focus:outline-gray-300'
                >
                  <div className='relative flex items-center space-x-4 py-4 -mx-4 px-4 md:rounded-md cursor-pointer hover:bg-gray-800 '>
                    <div className='min-w-0 flex-auto'>
                      <div className='flex items-center gap-x-3'>
                        <div className='flex-shrink-0 text-gray-400'>{platformIcons[build.platform]}</div>
                        <h2 className='min-w-0 text-sm font-semibold leading-6 text-white flex gap-x-2'>
                          <span className='truncate'>{build.platform}</span>
                          <span className='text-gray-400'>/</span>
                          <span className='whitespace-nowrap'>{build.version}</span>
                          <span className='absolute inset-0' />
                        </h2>
                      </div>
                      <p className='text-xs leading-5 text-gray-400 mt-3'>Last updated {build.lastUpdated}</p>
                    </div>
                    <div
                      className={clsx(
                        statuses[build.status],
                        'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {build.status}
                    </div>
                    <HiChevronRight className='h-5 w-5 flex-none text-gray-400' aria-hidden='true' />
                  </div>
                </Link>
              ) : (
                <div className='relative flex items-center space-x-4 py-4 cursor-default opacity-50'>
                  <div className='min-w-0 flex-auto'>
                    <div className='flex items-center gap-x-3'>
                      <div className='flex-shrink-0 text-gray-400'>{platformIcons[build.platform]}</div>
                      <h2 className='min-w-0 text-sm font-semibold leading-6 text-white flex gap-x-2'>
                        <span className='truncate'>{build.platform}</span>
                      </h2>
                    </div>
                    {/* <p className='text-xs leading-5 text-gray-400 mt-3'>
                      Not supported. Change{' '}
                      <Link
                        className='text-white underline'
                        href={`org/${params.orgId}/product/${params.product}/store/store-details`}
                      >
                        supported platforms
                      </Link>{' '}
                      in store details to enable.
                    </p> */}
                    <p className='text-xs leading-5 text-gray-400 mt-3'>{build.platform} is not supported yet.</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BuildNVersion
