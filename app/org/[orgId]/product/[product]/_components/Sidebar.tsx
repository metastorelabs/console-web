'use client'

import { useState } from 'react'

import { BiRocket } from 'react-icons/bi'
import { FiArrowUpRight } from 'react-icons/fi'
import {
  HiCheck,
  HiOutlineArrowSmLeft,
  HiOutlineDocumentText as HiOutlineDocumentText2,
  HiOutlineSupport,
  HiOutlineTag,
  HiOutlineViewGrid,
} from 'react-icons/hi'
import {
  HiChevronDown,
  HiChevronRight,
  HiOutlineCog6Tooth,
  HiOutlineCubeTransparent,
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlinePlusCircle,
  HiOutlineShoppingBag,
} from 'react-icons/hi2'
import { MdOutlineDiamond, MdOutlineReviews, MdOutlineStorefront } from 'react-icons/md'

import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

import CreateOrgModal from '../../../_components/CreateOrgModal'

const productNavigation = [
  { name: 'Overview', href: '', icon: HiOutlineViewGrid, activeSegment: '(overview)' },
  {
    name: 'Store',
    icon: MdOutlineStorefront,
    children: [
      {
        name: 'Store Details',
        href: 'store-details',
        icon: HiOutlineDocumentText2,
        activeSegment: 'store-details',
      },
      { name: 'Collections', href: 'collections', icon: MdOutlineDiamond, activeSegment: 'collections' },
      { name: 'Pricing', href: 'pricing', icon: HiOutlineTag, activeSegment: 'pricing' },
      {
        name: 'Build and version',
        href: 'build-and-version',
        icon: HiOutlineCubeTransparent,
        activeSegment: 'build-and-version',
      },
      { name: 'Preview', href: 'preview', icon: HiOutlineEye, activeSegment: 'preview' },
      {
        name: 'Launchpad',
        href: 'launchpad',
        icon: BiRocket,
        activeSegment: 'launchpad',
      },
    ],
  },
  { name: 'Reviews', href: 'reviews', icon: MdOutlineReviews, activeSegment: 'reviews' },
  { name: 'Sales', href: 'sales', icon: HiOutlineShoppingBag, activeSegment: 'sales' },
  {
    name: 'Settings',
    href: 'settings',
    icon: HiOutlineCog6Tooth,
    activeSegment: 'settings',
  },
]

const Sidebar = ({ orgId, product }: { orgId: string; product: string }) => {
  const [organizationOpen, setOrganizationOpen] = useState(false)
  const navSegments = useSelectedLayoutSegments()

  const productNav = navSegments[0]
  const subNav = navSegments[1]

  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-950 px-6 ring-1 ring-white/5 pb-4 min-h-screen'>
      <button
        className='flex h-16 shrink-0 items-center text-gray-100 mt-4 px-2 hover:bg-gray-900 rounded-md -mx-2 focus-visible-ring'
        onClick={() => setOrganizationOpen(!organizationOpen)}
      >
        <Image className='rounded-lg aspect-square' src='/temp/kojima.png' alt='Your Company' width={32} height={32} />
        <h2 className='ml-3 mr-1 line-clamp-1 text-sm font-semibold'>{orgId}</h2>
        <HiChevronDown className='h-4 w-4 ml-auto flex-shrink-0' aria-hidden='true' />
      </button>

      {organizationOpen && (
        <div className='text-gray-100 space-y-1 mb-4 -mx-2'>
          <CreateOrgModal>
            <button className='flex items-center hover:bg-gray-900 p-2 rounded-md w-full focus-visible-ring'>
              <HiOutlinePlusCircle className='h-6 w-6' aria-hidden='true' />
              <h2 className='ml-3 mr-1 line-clamp-1 text-xs font-semibold'>Add Organization</h2>
            </button>
          </CreateOrgModal>
          <button className='flex items-center hover:bg-gray-900 p-2 rounded-md w-full focus-visible-ring'>
            <Image
              className='rounded-lg aspect-square'
              src='/temp/kojima.png'
              alt='Your Company'
              width={24}
              height={24}
              quality={40}
            />
            <h2 className='ml-3 mr-1 line-clamp-1 text-xs font-semibold'>{orgId}</h2>
            <HiCheck className='h-4 w-4 ml-auto flex-shrink-0' aria-hidden='true' />
          </button>
        </div>
      )}

      <nav className='flex flex-1 flex-col'>
        <ul role='list' className='flex flex-1 flex-col gap-y-7'>
          <li className='-mx-2'>
            <Link
              href={`/org/${orgId}`}
              className='text-gray-400 items-center hover:text-white hover:bg-gray-900 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold focus-visible-ring'
            >
              <HiOutlineArrowSmLeft className='h-6 w-6 shrink-0' aria-hidden='true' />
              Back to organization
            </Link>
          </li>

          <li>
            <ul role='list' className='-mx-2 space-y-1'>
              {productNavigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <Link
                      href={`/org/${orgId}/product/` + product + '/' + item.href}
                      className={clsx(
                        productNav === item.activeSegment
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-900',
                        'flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold focus-visible-ring'
                      )}
                    >
                      <item.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                      {item.name}
                    </Link>
                  ) : (
                    <Disclosure
                      as='div'
                      defaultOpen={productNav === 'store'}
                      key={productNav === 'store' ? 'open' : 'closed'}
                    >
                      {({ open }) => (
                        <>
                          <Disclosure.Button className='flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-900 focus-visible-ring'>
                            <item.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                            {item.name}
                            <HiChevronRight
                              className={clsx(
                                open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                'ml-auto h-5 w-5 shrink-0'
                              )}
                              aria-hidden='true'
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel as='ul' className='mt-1 px-2'>
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={`/org/${orgId}/product/` + product + '/store/' + subItem.href}
                                  className={clsx(
                                    productNav === 'store' && subNav === subItem.activeSegment
                                      ? 'bg-gray-900 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-900',
                                    'py-2 pr-2 pl-9 flex gap-x-3 rounded-md text-sm leading-6 font-semibold focus-visible-ring'
                                  )}
                                >
                                  <subItem.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>

          <li className='mt-auto space-y-1'>
            <Link
              href='https://docs.meta-store.in'
              target='_blank'
              rel='noopener'
              className='-mx-2 flex gap-x-3 rounded-md p-2 text-sm items-center font-semibold leading-6 text-gray-400 hover:bg-gray-900 hover:text-white focus-visible-ring'
            >
              <HiOutlineDocumentText className='h-6 w-6 shrink-0' aria-hidden='true' />
              Documentation
              <FiArrowUpRight className='h-5 w-5 ml-auto' aria-hidden='true' />
            </Link>
            <Link
              href='https://support.meta-store.in'
              target='_blank'
              rel='noopener'
              className='-mx-2 flex gap-x-3 rounded-md p-2 items-center text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-900 hover:text-white focus-visible-ring'
            >
              <HiOutlineSupport className='h-6 w-6 shrink-0' aria-hidden='true' />
              Support
              <FiArrowUpRight className='h-5 w-5 ml-auto' aria-hidden='true' />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
