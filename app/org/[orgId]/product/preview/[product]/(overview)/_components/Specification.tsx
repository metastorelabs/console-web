'use client'

import { Fragment } from 'react'

import { Tab } from '@headlessui/react'
import clsx from 'clsx'

const specs = [
  {
    platform: 'Windows',
    minimum: {
      os: 'Windows 10',
      Processor: 'Intel® Core™ i5-3470 or AMD Ryzen™ 3 1200',
      Memory: '8 GB RAM',
      Graphics: 'NVIDIA® GeForce® GTX 760 or AMD Radeon™ R7 260x with 2GB Video RAM',
      Storage: '50 GB available space',
      'Direct X': 'Version 12',
    },
    recommended: {
      os: 'Windows 10',
      Processor: 'Intel® Core™ i7-4790 or AMD Ryzen™ 5 1600',
      Memory: '16 GB RAM',
      Graphics: 'NVIDIA® GeForce® GTX 1060 or AMD Radeon™ RX 580 with 4GB Video RAM',
      Storage: '50 GB available space',
      'Direct X': 'Version 12',
    },
  },
]

export default function Specifications() {
  return (
    <div className='bg-gray-900 py-20 px-4 lg:px-10 xl:px-20 mt-10'>
      <section className='mx-auto max-w-7xl'>
        <div className='mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0'>
          <div className='max-w-3xl'>
            <h2 className='text-3xl font-bold tracking-tight text-slate-300 sm:text-4xl'>System Specifications</h2>
          </div>

          <Tab.Group as='div' className='mt-4'>
            <div className='flex overflow-x-auto'>
              <div className='flex-auto border-b border-gray-200'>
                <Tab.List className='-mb-px flex space-x-10'>
                  {specs.map((spec) => (
                    <Tab
                      key={spec.platform}
                      className={({ selected }) =>
                        clsx(
                          selected
                            ? 'border-white text-white'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-4 text-sm font-medium focus-visible-ring ring-inset'
                        )
                      }
                    >
                      {spec.platform}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
            </div>

            <Tab.Panels as={Fragment}>
              {specs.map((spec) => (
                <Tab.Panel key={spec.platform} className='space-y-16 pt-10 lg:pt-16'>
                  <div className='flex flex-col sm:flex-row sm: justify-between gap-6'>
                    <div className=''>
                      <h3 className='text-lg font-medium text-slate-200 mb-8'>Minimum</h3>
                      <dl className='mt-2 space-y-6'>
                        {Object.entries(spec.minimum).map(([key, value]) => (
                          <div key={key} className='text-sm'>
                            <dt className='font-medium text-slate-500'>{key}</dt>
                            <dd className='text-slate-300'>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className=''>
                      <h3 className='text-lg font-medium text-slate-200 mb-8'>Recommended</h3>
                      <dl className='mt-2 space-y-6'>
                        {Object.entries(spec.recommended).map(([key, value]) => (
                          <div key={key} className='text-sm'>
                            <dt className='font-medium text-slate-500'>{key}</dt>
                            <dd className='text-slate-300'>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  )
}
