const features = [
  { name: 'Publisher', description: '505 Games' },
  { name: 'Developer', description: 'KOJIMA PRODUCTIONS' },
  { name: 'Release Date', description: '03/30/22' },
  { name: 'Platform', description: 'Windows, Mac' },
  {
    name: 'Age Restriction (18+)',
    description: 'Strong Violence, Foul Language',
  },
]

const AdditionalInfo = () => {
  return (
    <div className='relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8 py-10 md:py-20'>
      <div className='mx-auto max-w-2xl text-center lg:max-w-4xl'>
        <h2 className='text-3xl font-bold tracking-tight text-slate-300 sm:text-4xl'>Additional information</h2>
      </div>
      <dl className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8'>
        {features.map((feature) => (
          <div key={feature.name} className='border-t border-gray-700 pt-4'>
            <dt className='font-medium text-slate-200'>{feature.name}</dt>
            <dd className='mt-2 text-sm text-slate-400'>{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default AdditionalInfo
