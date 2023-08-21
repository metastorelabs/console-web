'use client'

import { Fragment, useState } from 'react'

import { HiCheck, HiChevronDown } from 'react-icons/hi2'

import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'

const publishingOptions = [
  {
    title: 'Publish',
    description: 'Anyone can view and trade this collection in the Metastore',
    current: true,
  },
  {
    title: 'Hide',
    description: 'Collection is hidden from the Metastore and cannot be viewed or traded',
    current: false,
  },
]

export default function PublishButton() {
  const [selected, setSelected] = useState(publishingOptions[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className='sr-only'>Change published status</Listbox.Label>
          <div className='relative'>
            <div className='inline-flex divide-x divide-indigo-700 rounded-md shadow-sm'>
              <button className='inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 hover:bg-indigo-700 px-3 py-2 text-white shadow-sm focus-visible-ring ring-inset'>
                <HiCheck className='-ml-0.5 h-5 w-5' aria-hidden='true' />
                <p className='text-sm font-semibold'>{selected.title}</p>
              </button>
              <Listbox.Button className='inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700  focus-visible-ring ring-inset'>
                <span className='sr-only'>Change published status</span>
                <HiChevronDown className='h-5 w-5 text-white' aria-hidden='true' />
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute lg:right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-slate-700 overflow-hidden rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {publishingOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-indigo-600 text-white' : 'text-slate-100',
                        'cursor-default select-none p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className='flex flex-col'>
                        <div className='flex justify-between'>
                          <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                          {selected ? (
                            <span className={active ? 'text-white' : 'text-indigo-600'}>
                              <HiCheck className='h-5 w-5' aria-hidden='true' />
                            </span>
                          ) : null}
                        </div>
                        <p className={clsx(active ? 'text-indigo-200' : 'text-slate-400', 'mt-2')}>
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
