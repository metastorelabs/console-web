'use client'

import { Fragment, useState } from 'react'

import { HiOutlineXMark } from 'react-icons/hi2'

import { Dialog, Transition } from '@headlessui/react'

import Footer from '../../_components/Footer'
import Topbar from '../../_components/Topbar'
import Sidebar from './Sidebar'

const NavLayout = ({ children, orgId }: { children: React.ReactNode; orgId: string }) => {
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
                <Sidebar orgId={orgId} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div>
        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component*/}
          <Sidebar orgId={orgId} />
        </div>

        <div className='lg:pl-72'>
          <Topbar orgId={orgId} setSidebarOpen={setSidebarOpen} />

          <main className='pt-10 pb-40 min-h-screen bg-gray-900'>
            <div className='px-4 sm:px-6 lg:px-20'>{children}</div>
          </main>

          <Footer orgId={orgId} />
        </div>
      </div>
    </>
  )
}

export default NavLayout
