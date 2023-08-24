'use client'

import React from 'react'

import { HiBell, HiBuildingOffice, HiCreditCard } from 'react-icons/hi2'

import clsx from 'clsx'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

const tabs = [
  { name: 'Organization', href: '', icon: HiBuildingOffice, activeSegment: '(organization)' },
  { name: 'Notifications', href: 'notification', icon: HiBell, activeSegment: 'notification' },
  {
    name: 'Payment management',
    href: 'payment-management',
    icon: HiCreditCard,
    activeSegment: 'payment-management',
  },
]

const SettingsTab = ({ orgId }: { orgId: string }) => {
  const settingsSegment = useSelectedLayoutSegment()

  return (
    <div className='border-b border-gray-700 mt-10'>
      <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={`/org/${orgId}/settings/${tab.href}`}
            className={clsx(
              settingsSegment === tab.activeSegment
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-200',
              'group inline-flex w-full sm:w-auto justify-center items-center border-b-2 py-4 px-1 text-sm font-medium focus-visible-ring'
            )}
          >
            <tab.icon
              className={clsx(
                settingsSegment === tab.activeSegment ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-200',
                'sm:-ml-0.5 sm:mr-2 h-5 w-5'
              )}
              aria-hidden='true'
            />
            <span className='hidden sm:inline'>{tab.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default SettingsTab
