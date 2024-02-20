import { BiTransfer } from 'react-icons/bi'
import { BsStars } from 'react-icons/bs'
import { FaHandHolding } from 'react-icons/fa'
import { HiOutlineShoppingCart, HiTag } from 'react-icons/hi2'

import clsx from 'clsx'

const ActivityTypes = {
  Offer: {
    icon: FaHandHolding,
    bg: 'bg-rose-500',
  },
  Transfer: {
    icon: BiTransfer,
    bg: 'bg-indigo-500',
  },
  List: {
    icon: HiTag,
    bg: 'bg-amber-600',
  },
  Sale: {
    icon: HiOutlineShoppingCart,
    bg: 'bg-blue-500',
  },
  Minted: {
    icon: BsStars,
    bg: 'bg-emerald-500',
  },
}

type activity = {
  id: number
  type: 'Offer' | 'Transfer' | 'List' | 'Sale' | 'Minted'
  from?: string
  to?: string
  price?: string
  date: string
  datetime: string
}

const activities: activity[] = [
  {
    id: 1,
    type: 'Offer',
    from: '0x1234567890',
    price: '0.1 ETH',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: 'Transfer',
    from: '0x1234567890',
    to: '0x1234567890',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: 'Sale',
    from: '0x1234567890',
    price: '0.1 ETH',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: 'Minted',
    from: '0x1234567890',
    price: '0.1 ETH',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: 'List',
    from: '0x1234567890',
    price: '0.1 ETH',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
]

export default function Activity() {
  return (
    <div className='flow-root'>
      <ul role='list' className='-mb-8'>
        {activities.map((event, eventIdx) => (
          <li key={event.id}>
            <div className='relative pb-8'>
              {eventIdx !== activities.length - 1 ? (
                <span className='absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-800' aria-hidden='true' />
              ) : null}
              <div className='relative flex space-x-3'>
                <div>
                  <span
                    className={clsx(
                      ActivityTypes[event.type].bg,
                      'h-8 w-8 rounded-full flex items-center justify-center'
                    )}
                  >
                    {event.type === 'Offer' ? (
                      <FaHandHolding className='h-5 w-5 text-white' aria-hidden='true' />
                    ) : event.type === 'Transfer' ? (
                      <BiTransfer className='h-5 w-5 text-white' aria-hidden='true' />
                    ) : event.type === 'List' ? (
                      <HiTag className='h-5 w-5 text-white' aria-hidden='true' />
                    ) : event.type === 'Sale' ? (
                      <HiOutlineShoppingCart className='h-5 w-5 text-white' aria-hidden='true' />
                    ) : event.type === 'Minted' ? (
                      <BsStars className='h-5 w-5 text-white' aria-hidden='true' />
                    ) : null}
                  </span>
                </div>
                <div className='flex min-w-0 flex-1 justify-between space-x-4 pt-1.5'>
                  <div>
                    <p className='text-sm text-gray-500'>
                      {event.type} {event.from && `from ${event.from}`} {event.to && `to ${event.to}`}{' '}
                      {event.price && `for ${event.price}`}
                    </p>
                  </div>
                  <div className='whitespace-nowrap text-right text-sm text-gray-500'>
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
