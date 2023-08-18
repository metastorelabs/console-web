'use client'

import { Fragment } from 'react'

import { HiCog6Tooth } from 'react-icons/hi2'

import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

const notifications = [
  {
    id: 1,
    title: 'Review completed. Product is ready to publish.',
    href: '#',
    date: '2h',
    datetime: '2020-12-09T11:43',
    imageUrl: '/temp/dslogo.jpeg',
    imageAlt: 'Jane Cooper',
    read: false,
  },
  {
    id: 2,
    title: 'Joe mama. New member joined the team.',
    href: '#',
    date: '2h',
    datetime: '2020-12-09T11:43',
    imageUrl: '/temp/kojima.png',
    imageAlt: 'Jane Cooper',
    read: false,
  },
  {
    id: 3,
    title: 'Review completed. Product is ready to publish.',
    href: '#',
    date: '2h',
    datetime: '2020-12-09T11:43',
    imageUrl: '/temp/dslogo.jpeg',
    imageAlt: 'Jane Cooper',
    read: true,
  },
  {
    id: 4,
    title: 'Review completed. Product is ready to publish.',
    href: '#',
    date: '2h',
    datetime: '2020-12-09T11:43',
    imageUrl: '/temp/dslogo.jpeg',
    imageAlt: 'Jane Cooper',
    read: true,
  },
  {
    id: 5,
    title: 'Joe mama. New member joined the team.',
    href: '#',
    date: '2h',
    datetime: '2020-12-09T11:43',
    imageUrl: '/temp/kojima.png',
    imageAlt: 'Jane Cooper',
    read: true,
  },
]

export default function NotificationBar({ children, orgId }: { children: React.ReactNode; orgId: string }) {
  return (
    <Popover className='ml-4 flow-root text-sm lg:relative lg:ml-8'>
      <Popover.Button className='group -m-2 flex items-center p-2 focus-visible-ring rounded-md'>
        {children}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Popover.Panel className='absolute inset-x-0 top-16 mt-px bg-gray-950 pb-4 shadow-lg lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-96 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
          <div className='flex items-center justify-between px-4 pt-6 pb-4 border-b border-gray-800'>
            <h2 className='font-semibold text-gray-100'>Notifications</h2>
            <button type='button' className='text-gray-400 hover:text-gray-300 hover:underline text-xs '>
              Mark all as read
            </button>
          </div>
          <div className='mx-auto max-w-2xl max-h-96 lg:max-h-72 overflow-x-hidden'>
            <ul role='list' className='divide-y divide-gray-800'>
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <Link
                    href={notification.href}
                    className={clsx(
                      notification.read
                        ? 'bg-transparent hover:bg-white/5'
                        : 'bg-gray-700 hover:bg-opacity-30 bg-opacity-20',
                      'flex p-4 justify-between'
                    )}
                  >
                    <div className='flex items-start'>
                      <Image
                        src={notification.imageUrl}
                        alt={notification.imageAlt}
                        width={40}
                        height={40}
                        className='flex-none rounded aspect-square'
                      />
                      <h3 className='ml-4 text-left font-medium text-[13px] text-gray-100 line-clamp-2'>
                        {notification.title}
                      </h3>
                    </div>
                    <p>
                      <time dateTime={notification.datetime} className='text-xs pl-1 font-medium text-gray-400'>
                        {notification.date}
                      </time>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex items-center justify-between text-white px-4 pt-4 border-t border-gray-800'>
            <p className='hover:underline'>View all notification ...</p>
            <Link href={`/${orgId}/settings/notification`}>
              <HiCog6Tooth className='ml-2 h-5 w-5 hover:scale-110' />
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
