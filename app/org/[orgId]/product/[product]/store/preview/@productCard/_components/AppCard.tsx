'use client'

import { useState } from 'react'

import Image from 'next/image'

export type AppCardProps = {
  imageSizes: string
  thumbnailVideo: string
  thumbnailImage: string
  offer: number | null
  offerExpiresAt: string | null
  price: number | null
  currency: string | null
  title: string
}

const AppCard = ({
  title,
  currency,
  offer,
  price,
  offerExpiresAt,
  thumbnailImage,
  thumbnailVideo,
  imageSizes,
}: AppCardProps) => {
  const [hover, setHover] = useState(false)

  return (
    <div draggable={false}>
      <div className='outline-gray-300 cursor-pointer'>
        <div
          className='bg-gray-900 aspect-video rounded-md overflow-hidden max-w-xl relative duration-300 ease-in-out transform md:hover:scale-105'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {!hover ? (
            <Image src={thumbnailImage} alt={title} fill className='object-cover' sizes={imageSizes} />
          ) : (
            <video
              src={thumbnailVideo}
              autoPlay
              loop
              muted
              playsInline
              poster={thumbnailImage}
              className='object-cover select-none pointer-events-none'
              draggable={false}
            />
          )}
        </div>
      </div>
      <div className='mt-2 text-white text-sm font-semibold'>
        <div className='flex items-center'>
          {offer && price && (
            <div className='py-1 px-2 bg-emerald-700 rounded-md mr-2 text-xs'>
              <p>-{Math.floor((1 - offer / price) * 100)}%</p>
            </div>
          )}
          <p
            className={offer ? 'line-through decoration-1 decoration-gray-300 text-gray-400  mr-1' : 'text-white py-1'}
          >
            {price ?? 'Free to play'}
          </p>
          <p>{offer}</p>
          <p className='ml-1'>{price && currency}</p>
        </div>
      </div>
    </div>
  )
}

export const AppCardSkeleton = () => {
  return (
    <div>
      <div className='bg-gray-900 aspect-video rounded-md max-w-xl' />
      <p className='mt-2 text-white text-sm font-semibold py-1 opacity-0'>#</p>
    </div>
  )
}

export default AppCard
