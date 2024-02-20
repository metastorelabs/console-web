import React from 'react'

import { CURRENCY, ITEM_RARITY } from '@/constants/enums'
import { compactNumberFormat } from '@/utils/common'
import clsx from 'clsx'
import Image from 'next/image'

const rarityColors: Record<keyof typeof ITEM_RARITY, string> = {
  COMMON: 'bg-gradient-to-r from-slate-500 to-slate-600 text-slate-900',
  UNCOMMON: 'bg-gradient-to-r from-stone-500 to-stone-600 text-stone-900',
  RARE: 'bg-gradient-to-r from-rose-500 to-rose-600 text-rose-900',
  EPIC: 'bg-gradient-to-r from-violet-500 to-violet-600 text-violet-900',
  LEGENDARY: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900',
}

export type ItemCardProps = {
  id: string
  name: string
  image: string
  rarity: keyof typeof ITEM_RARITY
  price: string
  totalItems: string
  currency: keyof typeof CURRENCY
  game: string
  imageSizes?: string
}

const ItemCard = ({ id, name, image, currency, price, rarity, totalItems, imageSizes, game }: ItemCardProps) => {
  return (
    <div className='group md:hover:-translate-y-1 transition-all duration-300 ease-in-out bg-gray-800 max-w-xs rounded-md overflow-hidden'>
      <div className='h-12 flex items-center justify-between px-3'>
        <div className={clsx('rounded flex items-center justify-center', rarityColors[rarity])}>
          <p className='font-thin md:font-medium text-sm h-8 font-ailerons flex items-center justify-center px-2 min-w-[88px]'>
            {ITEM_RARITY[rarity]}
          </p>
        </div>

        <p className='text-gray-500 text-sm font-semibold'>
          {totalItems && 'x'} {totalItems && compactNumberFormat(totalItems)}
        </p>
      </div>

      <div className='aspect-square bg-black relative'>
        {image && (
          <Image
            src={image}
            fill
            className='object-cover group-hover:brightness-75 duration-300 ease-in-out'
            alt='NFT image'
            sizes={imageSizes}
          />
        )}
      </div>

      <div className='text-white p-3'>
        <h3 className='text-md line-clamp-1'>{name}</h3>

        <h4 className='text-gray-400 text-xs mt-0.5'>{game}</h4>
        <h4 className='text-sm md:text-base font-medium mt-4'>
          {price} {CURRENCY[currency]}
        </h4>
      </div>
    </div>
  )
}

export const ItemCardSkeleton = () => {
  return (
    <div className='bg-gray-900 rounded-md max-w-xs'>
      <div className='h-12' />
      <div className='aspect-square bg-black' />
      <div className='text-transparent p-3'>
        <h3 className='text-md line-clamp-1'>#</h3>

        <h4 className='text-xs mt-0.5'>#</h4>
        <h4 className='text-sm md:text-base font-medium mt-4'>#</h4>
      </div>
    </div>
  )
}

export default ItemCard
