import React from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import QuickLinkGrid from '@/components/QuickLinkGrid'

const stats = [
  { name: 'Number of products', value: '3' },
  { name: 'Number of users', value: '142' },
  { name: 'Active users', value: '64' },
  { name: 'Average play time', value: '3', unit: 'hours' },
]

const statuses: { [key: string]: string } = {
  Draft: 'bg-yellow-400/10 text-yellow-500 ring-yellow-400/20',
  'In Review': 'bg-rose-400/10 text-rose-400 ring-rose-400/20',
}

const productItems = [
  {
    game: {
      name: 'Death Stranding',
      imageUrl: '/temp/dslogo.jpeg',
    },
    chain: 'Solana',
    status: 'Draft',
    items: '3',
    onSale: '1',
  },
  {
    game: {
      name: 'Death Stranding 2',
      imageUrl: '/temp/dslogo.jpeg',
    },
    chain: 'Polygon',
    status: 'In Review',
    items: '10',
    onSale: '4',
  },
]

const Dashboard = ({
  params,
}: {
  params: {
    orgId: string
  }
}) => {
  return (
    <div>
      <Image className='rounded-lg aspect-square' src='/temp/kojima.png' alt='Your Company' width={102} height={102} />
      <h1 className='text-white text-3xl md:text-4xl font-bold mt-4'>{params.orgId}</h1>
      <div className='bg-gray-950 rounded-lg my-10'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div key={stat.name} className='bg-gray-950 px-4 py-6 sm:px-6 lg:px-8'>
                <p className='text-sm font-medium leading-6 text-gray-400'>{stat.name}</p>
                <p className='mt-2 flex items-baseline gap-x-2'>
                  <span className='text-4xl font-semibold tracking-tight text-white'>{stat.value}</span>
                  {stat.unit ? <span className='text-sm text-gray-400'>{stat.unit}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className='pt-11'>
        <h2 className='text-xl font-semibold leading-7 text-white'>Your Products</h2>

        <div className='mt-4 flow-root'>
          <div className='overflow-x-auto'>
            <div className='inline-block min-w-full py-2 align-middle'>
              <table className='min-w-full'>
                <thead className='border-b border-white/10 text-sm leading-6 text-white'>
                  <tr>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0'>
                      Name
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                      Chain
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                      Items
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                      On Sale
                    </th>
                    <th scope='col' className='text-left text-sm font-semibold text-white py-3.5 pl-3 pr-4 sm:pr-0'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-800'>
                  {productItems.map((item) => (
                    <tr key={item.game.name}>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                        <div className='flex items-center gap-x-4'>
                          <Image
                            src={item.game.imageUrl}
                            alt=''
                            className='rounded-lg aspect-square bg-gray-800'
                            width={32}
                            height={32}
                          />
                          <Link
                            href={`/${params.orgId}/products/${item.game.name}`}
                            className='truncate text-sm font-medium leading-6 text-white hover:underline cursor-pointer'
                          >
                            {item.game.name}
                          </Link>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 font-mono text-sm leading-6 text-gray-300'>
                        {item.chain}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>{item.items}</td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>{item.onSale}</td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                        <div className='flex items-center justify-end gap-x-2 sm:justify-start'>
                          <span
                            className={clsx(
                              statuses[item.status],
                              'inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset'
                            )}
                          >
                            {item.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Link Grid */}
        <div className='mt-10'>
          <QuickLinkGrid gridLayout='grid-cols-1 lg:max-w-none md:grid-cols-2 xl:grid-cols-3' />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
