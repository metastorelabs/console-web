'use client'

import { useState } from 'react'

import { RxDesktop, RxMobile } from 'react-icons/rx'

import clsx from 'clsx'

import PreviewTabs from './_components/PreviewTabs'

const Layout = ({
  storePage,
  quickLaunchButton,
  productCard,
  params,
}: {
  storePage: React.ReactNode
  quickLaunchButton: React.ReactNode
  productCard: React.ReactNode
  params: {
    product: string
    orgId: string
  }
}) => {
  const [isMobile, setIsMobile] = useState(false)

  const tabs = [
    { name: 'Store Page', slug: null, content: storePage },
    { name: 'Product Card', slug: 'product-card', content: productCard },
    { name: 'Quick Launch Button', slug: 'quick-launch-button', content: quickLaunchButton },
  ]

  return (
    <div className='h-screen w-full bg-black text-white absolute top-0 left-0 pt-10 px-4 sm:px-6 lg:px-20 overflow-y-scroll'>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Preview</h1>
      <PreviewTabs tabs={tabs} params={params} />

      {/* <div className='bg-red-900 w-1/2 mx-auto my-20'>
        <iframe
          className='h-screen w-full'
          src='https://store-web-git-develop-metastore.vercel.app/app/destiny-2'
          title='YouTube video player'
        />
      </div> */}
    </div>
  )

  return (
    <div className='bg-black text-white absolute top-0 left-0 w-full max-h-screen py-20 px-4 sm:px-6 lg:px-20 overflow-y-scroll custom-scrollbar'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-semibold'>Preview</h1>
        <div className='isolate rounded-md shadow-sm hidden md:block'>
          <button
            type='button'
            className={clsx(
              'relative inline-flex items-center rounded-l-md px-3 py-2 ring-1 ring-inset focus:z-10 text-gray-300',
              isMobile ? 'bg-gray-900  ring-gray-800 hover:bg-gray-800' : 'bg-slate-600 ring-gray-800'
            )}
            onClick={() => setIsMobile(false)}
          >
            <span className='sr-only'>Desktop</span>
            <RxDesktop className='h-5 w-5' aria-hidden='true' />
          </button>
          <button
            type='button'
            className={clsx(
              'relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-gray-300 ring-1 ring-inset focus:z-10',
              !isMobile ? 'bg-gray-900  ring-gray-800 hover:bg-gray-800' : 'bg-slate-600 ring-gray-800'
            )}
            onClick={() => setIsMobile(true)}
          >
            <span className='sr-only'>Mobile</span>
            <RxMobile className='h-5 w-5' aria-hidden='true' />
          </button>
        </div>
      </div>
      <div className={clsx('my-20 bg-gray-900 mx-auto', isMobile ? 'md:w-96' : 'md:w-11/12')}></div>
    </div>
  )
}

export default Layout
