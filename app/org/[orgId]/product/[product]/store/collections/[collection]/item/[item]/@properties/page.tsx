import React from 'react'

const properties = [
  {
    trait_type: 'Speed',
    value: 'Fast',
  },
  {
    trait_type: 'Attack',
    value: 'Low',
  },
  {
    trait_type: 'Defense',
    value: 'Low',
  },
  {
    trait_type: 'Rarity',
    value: 'RARE',
  },
]

const Properties = () => {
  return (
    <div>
      <dl className='mt-6 space-y-4'>
        {properties.map((property) => (
          <div key={property.trait_type} className='grid grid-cols-2'>
            <dt className='text-sm font-medium text-slate-200 col-span-1'>{property.trait_type}</dt>
            <dd className='text-sm text-slate-500 col-span-1'>{property.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default Properties
