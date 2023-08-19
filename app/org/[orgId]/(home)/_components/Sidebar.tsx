'use client'

import { useState } from 'react'

import { FiArrowUpRight } from 'react-icons/fi'
import { HiCheck, HiOutlineSupport } from 'react-icons/hi'
import {
  HiChevronDown,
  HiOutlineCog6Tooth,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlinePlusCircle,
  HiOutlineUsers,
  HiPlus,
} from 'react-icons/hi2'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import CreateOrgModal from '../../_components/CreateOrgModal'
import CreateProductModal from './CreateProductModal'

const navigation = [
  { name: 'Dashboard', href: '', icon: HiOutlineHome, activeSegment: '(dashboard)' },
  { name: 'Members', href: 'members', icon: HiOutlineUsers, activeSegment: 'members' },
  {
    name: 'Settings',
    href: 'settings',
    icon: HiOutlineCog6Tooth,
    activeSegment: 'settings',
  },
]

const products = [
  { id: 1, name: 'Death Stranding' },
  { id: 2, name: 'Death Stranding 2' },
  { id: 3, name: 'Metal Gear Solid' },
]

const Sidebar = ({ orgId }: { orgId: string }) => {
  const [organizationOpen, setOrganizationOpen] = useState(false)
  const navSegment = useSelectedLayoutSegment()

  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-950 px-6 ring-1 ring-white/5 pb-4 min-h-screen'>
      <button
        className='flex h-16 shrink-0 items-center text-gray-100 mt-4 px-2 hover:bg-gray-900 rounded-md -mx-2 focus-visible-ring'
        onClick={() => setOrganizationOpen(!organizationOpen)}
      >
        <Image
          className='rounded-lg aspect-square'
          src='/temp/kojima.png'
          alt='Your Company'
          width={32}
          height={32}
          quality={60}
        />
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
          <li>
            <ul role='list' className='-mx-2 space-y-1'>
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/org/${orgId}/${item.href}`}
                    className={clsx(
                      navSegment === item.activeSegment
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold focus-visible-ring'
                    )}
                  >
                    <item.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className='text-xs font-semibold leading-6 text-gray-400'>Products</div>
            <ul role='list' className='-mx-2 mt-2 space-y-1'>
              <li>
                <CreateProductModal orgId={orgId}>
                  <button className='flex w-full gap-x-3 cursor-pointer rounded-md p-2 text-sm items-center leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-900 focus-visible-ring'>
                    <div className='h-8 w-8 bg-white/5 rounded-lg flex items-center justify-center'>
                      <HiPlus className='h-5 w-5' aria-hidden='true' />
                    </div>
                    <span className='line-clamp-1'>Create Product</span>
                  </button>
                </CreateProductModal>
              </li>

              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    href={`/org/${orgId}/product/${product.name}`}
                    className='flex gap-x-3 rounded-md p-2 text-sm items-center leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-900 focus-visible-ring'
                  >
                    <Image
                      className='rounded-lg bg-gray-900 aspect-square'
                      src='/temp/dslogo.jpeg'
                      alt=''
                      width={32}
                      height={32}
                    />
                    <span className='line-clamp-1'>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className='mt-auto space-y-1'>
            <Link
              href='https://docs.metastore.to'
              target='_blank'
              rel='noopener'
              className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm items-center font-semibold leading-6 text-gray-400 hover:bg-gray-900 hover:text-white focus-visible-ring'
            >
              <HiOutlineDocumentText className='h-6 w-6 shrink-0' aria-hidden='true' />
              Documentation
              <FiArrowUpRight className='h-5 w-5 ml-auto' aria-hidden='true' />
            </Link>
            <Link
              href='https://support.metastore.to'
              target='_blank'
              rel='noopener'
              className='group -mx-2 flex gap-x-3 rounded-md p-2 items-center text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-900 hover:text-white focus-visible-ring'
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
