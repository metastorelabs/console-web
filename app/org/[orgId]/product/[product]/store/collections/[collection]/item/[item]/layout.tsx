import React from 'react'

import Breadcrumb from '@/components/Breadcrumb'

import ItemTab from './_components/ItemTab'

const Layout = ({
  children,
  params,
  properties,
  listings,
  details,
  activity,
}: {
  children: React.ReactNode
  params: {
    collection: string
    product: string
    orgId: string
    item: string
  }
  properties: React.ReactNode
  listings: React.ReactNode
  details: React.ReactNode
  activity: React.ReactNode
}) => {
  const tabs = [
    { name: 'Properties', slug: null, content: properties },
    { name: 'Listings', slug: 'listings', content: listings },
    { name: 'Details', slug: 'details', content: details },
    { name: 'Activity', slug: 'activity', content: activity },
  ]

  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/collections`,
      name: 'Collections',
    },
    {
      href: `/org/${params.orgId}/product/${params.product}/store/collections/${params.collection}`,
      name: params.collection,
    },
    {
      href: '#',
      name: params.item,
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className='lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16 mt-6 max-w-6xl'>
        {children}

        <div className='mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none'>
          <ItemTab params={params} tabs={tabs} />
        </div>
      </div>
    </div>
  )
}

export default Layout
