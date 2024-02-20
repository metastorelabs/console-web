import React from 'react'

const details = [
  {
    name: 'Contract Address',
    value: '0xA9F328e8DFCee83b3E7F812a019cBc34c27cEf21',
  },
  {
    name: 'Token ID',
    value: '2',
  },
  {
    name: 'Token Standard',
    value: 'TNT-721',
  },
  {
    name: 'chain',
    value: 'Theta',
  },
]

const Details = () => {
  return (
    <dl className='mt-6 space-y-4'>
      {details.map((detail) => (
        <div key={detail.name} className='grid grid-cols-2'>
          <dt className='text-sm font-medium text-slate-200 col-span-1'>{detail.name}</dt>
          <dd className='text-sm text-slate-500 col-span-1'>{detail.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default Details
