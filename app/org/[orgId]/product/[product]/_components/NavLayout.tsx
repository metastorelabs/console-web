'use client'

import { Fragment, useState } from 'react'

import { HiOutlineXMark } from 'react-icons/hi2'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'

import Footer from '../../../_components/Footer'
import Topbar from '../../../_components/Topbar'
import Sidebar from './Sidebar'

const NavLayout = ({ children, orgId, product }: { children: React.ReactNode; orgId: string; product: string }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900/80' />
          </Transition.Child>

          <div className='fixed inset-0 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                    <button
                      type='button'
                      className='-m-2.5 p-2.5 focus-visible-ring rounded-md'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <HiOutlineXMark className='h-6 w-6 text-white' aria-hidden='true' />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component */}
                <Sidebar orgId={orgId} product={product} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div>
        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component*/}
          <Sidebar orgId={orgId} product={product} />
        </div>

        <div className='lg:pl-72'>
          <Topbar orgId={orgId} setSidebarOpen={setSidebarOpen}>
            <div className='flex gap-x-3 rounded-md p-2 leading-6 font-semibold text-gray-200 items-center'>
              <Image
                className='rounded-lg bg-gray-800 aspect-square'
                src='/temp/dslogo.jpeg'
                alt=''
                width={34}
                height={34}
              />
              <span className='line-clamp-1 uppercase max-sm:hidden'> {product}</span>
            </div>
          </Topbar>

          <main className='pt-10 pb-40 min-h-screen bg-gray-900 relative'>
            <div className='px-4 sm:px-6 lg:px-20'>{children}</div>
          </main>

          <div className={clsx('mt-20')}>
            <Footer orgId={orgId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default NavLayout
