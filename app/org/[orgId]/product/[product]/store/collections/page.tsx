import React from 'react'

import { HiChevronRight } from 'react-icons/hi2'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import LinkButton from '@/components/button/LinkButton'

const collections = [
  {
    name: 'BT Collection',
    chain: 'polygon',
    items: '143',
    imageUrl: '/temp/dslogo.jpeg',
    status: 'live',
  },
  {
    name: 'BTs Collection',
    chain: 'polygon',
    items: '40',
    imageUrl: '/temp/dslogo.jpeg',
    status: 'draft',
  },
  {
    name: 'Gun Collection',
    chain: 'polygon',
    items: '21',
    imageUrl: '/temp/dslogo.jpeg',
    status: 'hidden',
  },
]

const statusColors: {
  [key: string]: {
    outerbg: string
    innerbg: string
  }
} = {
  live: {
    outerbg: 'bg-emerald-500/20',
    innerbg: 'bg-emerald-500',
  },
  draft: {
    outerbg: 'bg-yellow-500/20',
    innerbg: 'bg-yellow-500',
  },
  hidden: {
    outerbg: 'bg-gray-500/20',
    innerbg: 'bg-gray-500',
  },
}

const Collections = ({
  params,
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  return (
    <div className='max-w-4xl'>
      <div className='flex items-center'>
        <div className='flex-auto'>
          <h1 className='text-white text-3xl md:text-4xl font-bold'>Collections</h1>
          <p className='mt-2 text-sm text-slate-400'>
            Set up NFT marketplace to let players mint and trade your in-game assets.
          </p>
        </div>
        <div className='ml-16 mt-0 flex-none'>
          <LinkButton
            href={`/org/${params.orgId}/product/${params.product}/store/collections/add-collection`}
            size='md'
          >
            Add Collection
          </LinkButton>
        </div>
      </div>

      <div className='mt-6 bg-gray-950 p-10 rounded-lg'>
        <ul role='list' className='divide-y divide-white/5'>
          {collections.map((collection) => (
            <li key={collection.name}>
              <Link
                href={`/org/${params.orgId}/product/${params.product}/store/collections/${collection.name}`}
                className='flex justify-between gap-x-6 py-5 hover:bg-white/5 -mx-4 px-4 rounded-lg focus:outline-gray-300'
              >
                <div className='flex gap-x-4'>
                  <Image
                    className='flex-none rounded-lg bg-gray-800'
                    src={collection.imageUrl}
                    alt=''
                    width={48}
                    height={48}
                  />
                  <div className='min-w-0 flex-auto'>
                    <p className='text-sm font-semibold leading-6 text-white'>{collection.name}</p>
                    <p className='truncate text-xs leading-5 text-gray-400'>
                      {collection.chain.charAt(0).toUpperCase() + collection.chain.slice(1)}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-x-6'>
                  <div className='hidden sm:flex sm:flex-col sm:items-end'>
                    <p className='text-sm leading-6 text-white'>{collection.items} Items</p>
                    <div className='mt-1 flex items-center gap-x-1.5'>
                      <div className={clsx('flex-none rounded-full p-1', statusColors[collection.status].outerbg)}>
                        <div className={clsx('h-1.5 w-1.5 rounded-full', statusColors[collection.status].innerbg)} />
                      </div>
                      <p className='text-xs leading-5 text-gray-400'>
                        {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                      </p>
                    </div>
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

export default Collections
