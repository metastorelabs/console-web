import clsx from 'clsx'
import Image from 'next/image'

import QuickLinkGrid from '@/components/QuickLinkGrid'

import RecentData from './_components/RecentData'
import StartGuide from './_components/StartGuide'

const stats: { name: string; value: string; unit?: string }[] = [
  { name: 'Downloads', value: '405' },
  { name: 'Sales', value: '2,356' },
  { name: 'Total NFTs', value: '125' },
  { name: 'Sold NFTs', value: '46' },
]

const Overview = ({
  params,
}: {
  params: {
    orgId: string
    product: string
  }
}) => {
  return (
    <div className='xl:-mx-20 xl:-mt-10 xl:-mb-40'>
      <main className='flex flex-col xl:flex-row xl:space-x-20'>
        <div className='xl:pt-10 xl:pb-40 xl:pl-20'>
          {/* Heading */}
          <div className='flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-black/25 rounded-t-lg px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8'>
            <div>
              <div className='flex items-center gap-x-3'>
                <Image
                  className='rounded-lg bg-gray-800 aspect-square'
                  src='/temp/dslogo.jpeg'
                  alt=''
                  width={34}
                  height={34}
                />
                <h1 className='flex gap-x-3 text-base leading-7'>
                  <span className='font-semibold text-white'>{params.product}</span>
                </h1>
              </div>
              <p className='mt-2 text-xs leading-6 text-gray-400'>{params.orgId}</p>
            </div>
            <div className='order-first flex-none rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/30 sm:order-none'>
              Live
            </div>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-1 bg-black/20 sm:grid-cols-2 rounded-b-lg lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4'>
            {stats.map((stat, statIdx) => (
              <div
                key={stat.name}
                className={clsx(
                  statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                  'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'
                )}
              >
                <p className='text-sm font-medium leading-6 text-gray-400'>{stat.name}</p>
                <p className='mt-2 flex items-baseline gap-x-2'>
                  <span className='text-4xl font-semibold tracking-tight text-white'>{stat.value}</span>
                  {stat.unit ? <span className='text-sm text-gray-400'>{stat.unit}</span> : null}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Data */}
          <RecentData orgId={params.orgId} product={params.product} />

          {/* Link Grid */}
          <QuickLinkGrid gridLayout='grid-cols-1 lg:max-w-none md:grid-cols-2 xl:md:grid-cols-1 2xl:grid-cols-3' />
        </div>

        {/* Start Guide */}
        <aside className='mt-20 xl:mt-0 xl:w-96 xl:sticky xl:top-16 xl:self-start shrink-0 xl:border-l xl:border-white/5'>
          <StartGuide params={params} />
        </aside>
      </main>
    </div>
  )
}

export default Overview
