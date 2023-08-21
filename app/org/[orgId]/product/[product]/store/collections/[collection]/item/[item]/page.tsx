import { HiCube, HiUsers } from 'react-icons/hi'

import Link from 'next/link'

import MediaLoader from '../../_components/MediaLoader'

const product = {
  name: 'Forza Car red',
  price: '220',
  description:
    'The popular racing game Forza Motorsport 7 cars are now available as mods in GTA V. This is a limited edition car. Only 1000 cars will be available.',
  mediaSrc: 'https://forzatune.com/wp-content/uploads/tuning-guide-intro.jpg',
  previewImage: 'https://forzatune.com/wp-content/uploads/tuning-guide-intro.jpg',
  totalOwners: 1224,
  totalItems: 2000,
  game: 'GTA V',
  gameSlug: 'gta-v',
  gameDescription:
    'Wanderer is a multiplayer survival game where you can explore the world, collect resources, craft items, and fight against other players.',
  currency: 'USDT',
}

type Product = typeof product

const ItemPage = () => {
  return (
    <>
      <div className='lg:col-span-4 lg:row-end-1 max-lg:max-w-2xl max-lg:mx-auto'>
        <div className='block lg:hidden mb-4'>
          <BasicInfo product={product} />
        </div>

        <div className='aspect-square overflow-hidden rounded-lg bg-black relative'>
          <MediaLoader url={product.mediaSrc} previewImage={product.previewImage} />
        </div>
      </div>

      <div className='mx-auto mt-8 max-w-2xl sm:mt-10 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none'>
        <div className='hidden lg:block'>
          <BasicInfo product={product} />
        </div>

        <div className='flex items-center space-x-4 lg:mt-6'>
          <div className='flex items-center gap-1 text-slate-500'>
            <HiUsers className='text-xl' />
            <p className='text-sm'>{product.totalOwners} Owners</p>
          </div>

          <div className='flex items-center gap-1 text-slate-500'>
            <HiCube className='text-xl' />
            <p className='text-sm'>{product.totalItems} Items</p>
          </div>
        </div>

        <div className='p-4 rounded-lg bg-gray-950 mt-10'>
          <p className='text-slate-500'>Best price</p>
          <p className='text-2xl font-bold tracking-tight text-slate-200 sm:text-3xl'>
            {product.price} {product.currency}
          </p>
        </div>

        <div className='mt-10'>
          <button
            type='button'
            className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus-ring'
          >
            Buy Now
          </button>
        </div>

        <div className='mt-10 border-t border-gray-700 pt-10'>
          <h3 className='text-sm font-medium text-gray-200'>Description</h3>
          <p className='mt-4 text-sm text-gray-500'>{product.description}</p>
        </div>

        <div className='mt-10 border-t border-gray-700 pt-10'>
          <h3 className='text-sm font-medium text-gray-200'>About this game</h3>
          <p className='mt-4 text-sm text-gray-500'>{product.gameDescription}</p>
        </div>
      </div>
    </>
  )
}

const BasicInfo = ({ product }: { product: Product }) => {
  return (
    <div className='flex flex-col'>
      <span>
        <Link
          className='text-indigo-500 focus-visible-ring px-2 -mx-2 py-1 -my-1 rounded'
          href={`/app/${product.gameSlug}`}
        >
          {product.game}
        </Link>
      </span>

      <div className='mt-2'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl'>{product.name}</h1>

        <p className='text-sm sm:text-base tracking-tight text-gray-100 mt-2'>
          Owned by{' '}
          <span>
            <Link href='#' className='text-indigo-500 hover:text-indigo-400 focus-visible-ring p-1 -m-1 rounded'>
              Santhaug
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default ItemPage
