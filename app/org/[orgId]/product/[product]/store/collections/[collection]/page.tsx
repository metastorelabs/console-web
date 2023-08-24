import React from 'react'

import { HiPencil } from 'react-icons/hi'
import { HiRectangleStack } from 'react-icons/hi2'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import Breadcrumb from '@/components/Breadcrumb'
import LinkButton from '@/components/button/LinkButton'

import ItemCard, { ItemCardProps } from './_components/ItemCard'
import PublishButton from './PublishButton'

import './collection.css'

import { PolygonaLogo } from '@/components/Icons'

const ItemData: ItemCardProps[] = [
  {
    id: '1',
    name: 'Juggernaut Arcana - Bladeform Legacy',
    currency: 'MATIC',
    price: '100',
    rarity: 'EPIC',
    game: 'DOTA 2',
    image:
      'https://cdna.artstation.com/p/assets/covers/images/012/385/060/large/vadim-kosarev-screenshot008.jpg?1534516287',
    totalItems: '10K',
  },
  {
    id: '2',
    name: 'BB Pod',
    currency: 'USDT',
    price: '80',
    rarity: 'RARE',
    game: 'Death Stranding',
    image: 'https://i.redd.it/xzyzzpcp7hw31.png',
    totalItems: '20K',
  },
]

const page = ({
  params,
}: {
  params: {
    collection: string
    product: string
    orgId: string
  }
}) => {
  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/collections`,
      name: 'Collections',
    },
    {
      href: '#',
      name: params.collection,
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <Image
        className='rounded-lg aspect-square mt-6'
        src='/temp/kojima.png'
        alt='Your Company'
        width={102}
        height={102}
      />
      <div className='lg:flex lg:items-center lg:justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='mt-2 text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight'>
            {params.collection}
          </h2>
          <div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
            <div className='mt-2 flex items-center text-sm text-gray-300'>
              <div className={clsx('flex-none rounded-full p-1.5 mr-1.5', 'bg-emerald-500/20')}>
                <div className={clsx('h-2 w-2 rounded-full', 'bg-emerald-500')} />
              </div>
              Live
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-300'>
              <PolygonaLogo className='mr-1.5 w-5 h-5' />
              Polygon
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-300'>
              <HiRectangleStack className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500' aria-hidden='true' />
              124 Items
            </div>
          </div>
        </div>
        <div className='mt-5 flex lg:ml-4 lg:mt-0'>
          <span className='block'>
            <LinkButton
              href={`/org/${params.orgId}/product/${params.product}/store/collections/${params.collection}/edit`}
              className='inline-flex items-center'
              size='sm'
              variant='fade'
            >
              <HiPencil className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
              Edit
            </LinkButton>
          </span>
          <span className='ml-3'>
            <PublishButton />
          </span>
        </div>
      </div>
      <div className='border-b border-slate-800 pb-4 flex items-center justify-between mt-12'>
        <h3 className='text-base font-semibold leading-6 text-slate-100'>Items</h3>
        <div className='mt-3 sm:ml-4 sm:mt-0'>
          <LinkButton
            href={`/org/${params.orgId}/product/${params.product}/store/collections/${params.collection}/add-item`}
            size='sm'
            variant='fade'
          >
            Create Item
          </LinkButton>
        </div>
      </div>

      <div className='collection-grid gap-x-2 gap-y-4 md:gap-x-4 lg:gap-6 mt-4'>
        {ItemData.map((item) => (
          <Link
            key={item.id}
            href={`/org/${params.orgId}/product/${params.product}/store/collections/${params.collection}/item/item-1`}
            className='focus-visible-ring rounded-md'
          >
            <ItemCard
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              rarity={item.rarity}
              imageSizes='(max-width: 768px) 50vw, (max-width: 1536px) 33.3vw, 25vw'
              currency={item.currency}
              game={item.game}
              totalItems={item.totalItems}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default page
