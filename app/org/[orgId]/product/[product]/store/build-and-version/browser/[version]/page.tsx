import React from 'react'

import { FiArrowUpRight } from 'react-icons/fi'
import { HiOutlineGlobeAlt } from 'react-icons/hi'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import Breadcrumb from '@/components/Breadcrumb'

const Version = ({
  params,
}: {
  params: {
    product: string
    orgId: string
    version: string
  }
}) => {
  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/build-and-version`,
      name: 'Build and version',
    },
    {
      href: `/org/${params.orgId}/product/${params.product}/store/build-and-version/browser`,
      name: 'Browser',
    },
    {
      href: '#',
      name: params.version,
    },
  ]

  return (
    <div className='max-w-4xl'>
      <Breadcrumb items={breadcrumbItems} />

      <div className='border border-white/10 rounded-lg p-6 mt-4'>
        <div className='md:flex md:items-center md:justify-between'>
          <div className='min-w-0 flex-1'>
            <h2 className='text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight'>
              {params.version}
            </h2>

            <div className='mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6'>
              <div className='mt-2 flex items-center text-xs text-gray-300'>
                <Image
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt='avatar'
                  width={20}
                  height={20}
                  className='rounded-full mr-1.5'
                />
                John Doe released this Mar 12
              </div>
              <div className='mt-2 flex items-center text-xs text-gray-300'>
                <div className={clsx('flex-none rounded-full p-1.5 mr-1.5', 'bg-emerald-500/20')}>
                  <div className={clsx('h-2 w-2 rounded-full', 'bg-emerald-500')} />
                </div>
                Live
              </div>
            </div>
          </div>
          <div className='mt-5 flex md:ml-4 md:mt-0'>
            <Link
              href={`/org/${params.orgId}/product/${params.product}/store/build-and-version/browser/${params.version}/edit`}
              className='inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible-ring ring-offset-2'
            >
              Edit
            </Link>
            <button
              type='button'
              className='ml-3 inline-flex items-center rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible-ring ring-offset-2 focus:ring-rose-500'
            >
              Delete
            </button>
          </div>
        </div>

        <div className='mt-6 border-t border-white/10'>
          <dl className='divide-y divide-white/10'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-white'>Description</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0'>
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-white'>Artifact</dt>
              <dd className='mt-2 text-sm text-white sm:col-span-2 sm:mt-0'>
                <div className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 rounded-md border border-white/20'>
                  <div className='flex w-0 flex-1 items-center'>
                    <HiOutlineGlobeAlt className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    <span className='ml-4 truncate font-medium'>https://demo.metastore.to</span>
                  </div>
                  <div className='ml-4 flex-shrink-0'>
                    <Link
                      href='https://demo.metastore.to'
                      className='font-medium tracking-wide text-indigo-400 hover:text-indigo-300 flex items-center focus-visible-ring -m-1 p-1'
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      Visit
                      <FiArrowUpRight className='ml-1 h-4 w-4' aria-hidden='true' />
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Version
