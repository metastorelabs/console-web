'use client'

import { Fragment } from 'react'

import { HiChevronDown, HiOutlineBars3, HiOutlineBell } from 'react-icons/hi2'

import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'

import NotificationBar from './NotificationBar'

type UserNavigationItem1 = {
  name: string
  href: string
  type: 'link'
  external?: boolean
}

type UserNavigationItem2 = {
  name: string
  onClick: () => void
  type: 'button'
}

const userNavigation: (UserNavigationItem1 | UserNavigationItem2)[] = [
  {
    name: 'Manage account',
    href: 'https://metastore.to/account',
    type: 'link',
    external: true,
  },
  { name: 'Sign out', onClick: () => {}, type: 'button' },
]

const Topbar = ({
  setSidebarOpen,
  children,
  orgId,
}: {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
  orgId: string
}) => {
  return (
    <>
      <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
        <button
          type='button'
          className='-m-2.5 p-2.5 text-gray-400 lg:hidden focus-visible-ring rounded-md'
          onClick={() => setSidebarOpen(true)}
        >
          <span className='sr-only'>Open sidebar</span>
          <HiOutlineBars3 className='h-6 w-6' aria-hidden='true' />
        </button>

        <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
          <div className='flex items-center w-full justify-between'>
            {children ? children : <div></div>}
            <div className='flex items-center gap-x-4 lg:gap-x-6 shrink-0'>
              <NotificationBar orgId={orgId}>
                <HiOutlineBell className='h-6 w-6 text-gray-400 hover:text-gray-300 ' aria-hidden='true' />
              </NotificationBar>

              {/* Separator */}
              <div className='hidden lg:block lg:h-6 lg:w-px lg:bg-white/20' aria-hidden='true' />

              {/* Profile dropdown */}
              <Menu as='div' className='relative'>
                <Menu.Button className='-m-1.5 flex items-center p-1.5 focus-visible-ring rounded-md'>
                  <span className='sr-only'>Open user menu</span>
                  <Image
                    className='rounded-full bg-gray-50 aspect-square'
                    src='https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                    alt=''
                    width={32}
                    height={32}
                  />
                  <span className='hidden lg:flex lg:items-center'>
                    <span className='ml-4 text-sm font-semibold leading-6 text-gray-100' aria-hidden='true'>
                      Kojima
                    </span>
                    <HiChevronDown className='ml-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-gray-950 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) =>
                          item.type === 'button' ? (
                            <button
                              onClick={item.onClick}
                              className={clsx(
                                active ? 'bg-gray-800' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-100 w-full text-left'
                              )}
                            >
                              {item.name}
                            </button>
                          ) : (
                            <a
                              href={item.href}
                              className={clsx(
                                active ? 'bg-gray-800' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-100'
                              )}
                              target={item.external ? '_blank' : '_self'}
                              rel='noreferrer noopener'
                            >
                              {item.name}
                            </a>
                          )
                        }
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar
