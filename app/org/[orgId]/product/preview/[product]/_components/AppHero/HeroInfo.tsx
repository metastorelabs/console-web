'use client'

import React from 'react'

import Image from 'next/image'

const HeroInfo = () => {
  const offer = 59.99
  const price = 149.99
  const currency = 'STORE'

  return (
    <div className='lg:absolute bottom-10 left-0 text-white z-20 mb-10 max-lg:flex max-lg:items-center flex-col px-4 sm:px-8 lg:px-14 xl:px-40'>
      <div className='w-52 xl:w-60 2xl:w-80 aspect-video relative'>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/2/22/Red_Dead_Redemption_2_Logo.png'
          alt='Game Logo'
          fill
          className='object-contain object-left-bottom'
          sizes='33.3vw'
        />
      </div>

      <div className='mt-6 text-lg w-full flex flex-col max-lg:items-center'>
        <div className='flex items-center text-sm 2xl:text-base'>
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
        <p className='text-sm mt-3'>Sale ends 7/25/2023 at 10:30 PM</p>
        <button className='bg-white hover:bg-white/90 py-2 text-sm md:text-base rounded-md text-black mt-6 lg:mt-3 w-full md:max-w-xs focus-ring ring-offset-2'>
          BUY NOW
        </button>
      </div>
    </div>
  )
}

export default HeroInfo
