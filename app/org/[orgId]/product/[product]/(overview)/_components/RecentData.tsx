import { BiReceipt } from 'react-icons/bi'
import { MdOutlineReviews } from 'react-icons/md'

import Image from 'next/image'
import Link from 'next/link'

const recentReviews = [
  {
    id: 1,
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content:
      'Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.',

    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  {
    id: 2,
    user: {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content:
      'Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.',

    date: '3h',
    dateTime: '2023-01-23T09:00',
  },
  {
    id: 3,
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content:
      'Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.',

    date: '12h',
    dateTime: '2023-01-23T00:00',
  },
]

const recentSales = [
  {
    id: 1,
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'Bought Mikasa #234 NFT',

    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  {
    id: 2,
    user: {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'Bought Death Stranding Game',

    date: '3h',
    dateTime: '2023-01-23T09:00',
  },
]

const data = [
  {
    id: 1,
    name: 'reviews',
    icon: MdOutlineReviews,
    link: '/reviews',
  },
  {
    id: 2,
    name: 'sales',
    icon: BiReceipt,
    link: '/sales',
  },
]

export default function RecentData({ orgId, product }: { orgId: string; product: string }) {
  return (
    <div>
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2'>
        {data.map((datum) => (
          <div
            key={datum.id}
            className='relative overflow-hidden rounded-lg bg-black/20 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6'
          >
            <dt className='flex items-center'>
              <div className='rounded-md bg-indigo-900/50 text-indigo-500 p-2'>
                <datum.icon className='h-5 w-5 ' aria-hidden='true' />
              </div>
              <p className='ml-3 font-medium text-gray-200 '>Recent {datum.name}</p>
            </dt>
            <dd className='pb-4 mt-4'>
              <ul role='list' className='divide-y divide-white/5'>
                {(datum.name === 'reviews' ? recentReviews : recentSales).map((item) => (
                  <li key={item.id} className='py-4'>
                    <div className='flex items-center gap-x-3'>
                      <Image
                        src={item.user.imageUrl}
                        alt=''
                        className='flex-none rounded-full bg-gray-800'
                        width={24}
                        height={24}
                      />
                      <h3 className='flex-auto truncate text-sm font-semibold leading-6 text-white'>
                        {item.user.name}
                      </h3>
                      <time dateTime={item.dateTime} className='flex-none text-xs text-gray-500'>
                        {item.date}
                      </time>
                    </div>
                    <p className='mt-3 text-sm text-gray-400 line-clamp-2'>{item.content}</p>
                  </li>
                ))}
              </ul>
              <div className='absolute inset-x-0 bottom-0 bg-black/40 px-4 py-4 sm:px-6'>
                <div className='text-sm'>
                  <Link
                    href={`/org/${orgId}/product/${product}/${datum.link}`}
                    className='font-medium text-indigo-600 hover:text-indigo-500 focus-visible-ring -m-1 p-1'
                  >
                    View all<span className='sr-only'> All {datum.name}</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
