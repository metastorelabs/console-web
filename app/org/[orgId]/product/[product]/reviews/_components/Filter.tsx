'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import { HiChevronDown, HiXMark } from 'react-icons/hi2'

import useFilter from '@/hooks/useFilter'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const sortOptions = [
  { label: 'Recent Reviews', value: 'recent' },
  { label: 'Oldest Reviews', value: 'oldest' },
  { label: 'Highest Rated', value: 'highest' },
  { label: 'Lowest Rated', value: 'lowest' },
]
const filters = [
  {
    id: 'rating',
    name: 'Rating',
    options: [
      { value: '5', label: '5 stars' },
      { value: '4', label: '4 stars' },
      { value: '3', label: '3 stars' },
      { value: '2', label: '2 stars' },
      { value: '1', label: '1 star' },
    ],
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'verified', label: 'Verified Purchases' },
      { value: 'standard', label: 'Standard Reviews' },
    ],
  },
  {
    id: 'hasReview',
    name: 'Has Review',
    options: [
      { value: 'true', label: 'Has Review' },
      { value: 'false', label: 'No Review' },
    ],
  },
]

const Filter = () => {
  const tabsRef = useRef<HTMLDivElement | null>(null)

  const [open, setOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [filterState, handleChange] = useFilter([...filters])
  const sortBy = searchParams.get('sort') || 'recent'

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleScroll = () => {
    if (tabsRef.current) {
      const tabTop = tabsRef.current.getBoundingClientRect().top
      // 64 is the height of the top bar
      setIsAtTop(tabTop <= 64)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50 sm:hidden' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-70' />
          </Transition.Child>

          <div className='fixed inset-0 z-50 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-900 py-4 pb-6 shadow-xl'>
                <div className='flex items-center justify-between px-4'>
                  <h2 className='text-lg font-medium text-slate-300'>Filters</h2>
                  <button
                    type='button'
                    className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-slate-400 focus-visible-ring'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <HiXMark className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Filters */}
                <form className='mt-4'>
                  {filters.map((filter) => (
                    <Disclosure as='div' key={filter.name} className='border-t border-slate-700 px-4 py-6'>
                      {({ open }) => (
                        <>
                          <h3 className='-mx-2 -my-3 flow-root'>
                            <Disclosure.Button className='flex w-full items-center justify-between px-2 py-3 text-sm text-slate-400 focus-visible-ring'>
                              <span className='font-medium text-slate-300'>{filter.name}</span>
                              <span className='ml-6 flex items-center'>
                                <HiChevronDown
                                  className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden='true'
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className='pt-6'>
                            <div className='space-y-6'>
                              {filter.options.map((option, optionIdx) => (
                                <div key={option.value} className='flex items-center'>
                                  <input
                                    id={`filter-mobile-${filter.id}-${optionIdx}`}
                                    name={`${filter.id}[]`}
                                    type='checkbox'
                                    checked={(filterState[filter.id] || []).includes(option.value)}
                                    onChange={() => handleChange(filter.id, option.value)}
                                    className='h-4 w-4 rounded border-slate-800 bg-slate-800 text-indigo-600 focus-ring ring-offset-gray-900 focus:ring-indigo-500'
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${filter.id}-${optionIdx}`}
                                    className='ml-3 text-sm text-slate-400'
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <section
        ref={tabsRef}
        className={clsx(
          'py-4 mt-8 sticky top-16 -mx-4 sm:-mx-6 lg:-mx-20 px-4 sm:px-6 lg:px-20 z-10',
          isAtTop ? 'bg-gray-950' : 'bg-gray-900'
        )}
      >
        <h2 id='filter-heading' className='sr-only'>
          Reviews Filters
        </h2>

        <div className='flex items-center justify-between'>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='group inline-flex justify-center text-sm font-medium text-slate-400 hover:text-slate-300 focus-visible-ring -m-1 p-1'>
                Sort By
                <p className='text-slate-200 ml-2'>{sortOptions.find((option) => option.value === sortBy)?.label}</p>
                <HiChevronDown
                  className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-slate-400'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute left-0 z-30 mt-2 w-52 origin-top-left rounded-md bg-gray-900 shadow-2xl focus:outline-none'>
                <div className='py-1'>
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.label}>
                      {({ active }) => (
                        <Link
                          href={pathname + '?' + createQueryString('sort', option.value)}
                          className={clsx(
                            active || option.value === sortBy ? 'bg-gray-800 text-slate-200' : '',
                            'block px-4 py-2 text-sm font-medium text-slate-400'
                          )}
                        >
                          {option.label}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <button
            type='button'
            className='inline-block text-sm font-medium text-slate-400 hover:text-slate-300 sm:hidden focus-visible-ring -m-1 p-1'
            onClick={() => setOpen(true)}
          >
            Filters
          </button>

          <Popover.Group className='hidden sm:flex sm:items-baseline sm:space-x-8'>
            {filters.map((filter, filterIdx) => (
              <Popover
                as='div'
                key={filter.name}
                id={`desktop-menu-${filterIdx}`}
                className='relative inline-block text-left'
              >
                <div>
                  <Popover.Button className='group inline-flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-300 focus-visible-ring -m-1 p-1'>
                    <span>{filter.name}</span>
                    {filterState[filter.id]?.length > 0 && (
                      <span
                        className={clsx(
                          'ml-1.5 rounded px-1.5 py-0.5 text-xs font-semibold tabular-nums text-slate-300',
                          isAtTop ? 'bg-gray-900' : 'bg-gray-800'
                        )}
                      >
                        {filterState[filter.id]?.length || ''}
                      </span>
                    )}
                    <HiChevronDown
                      className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-slate-400'
                      aria-hidden='true'
                    />
                  </Popover.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Popover.Panel className='absolute right-0 z-30 mt-2 origin-top-right rounded-md bg-gray-900 p-4 shadow-2xl focus:outline-none'>
                    <div className='space-y-4'>
                      {filter.options.map((option, optionIdx) => (
                        <div key={option.value} className='flex items-center'>
                          <input
                            id={`filter-${filter.id}-${optionIdx}`}
                            name={`${filter.id}[]`}
                            type='checkbox'
                            checked={(filterState[filter.id] || []).includes(option.value)}
                            onChange={() => handleChange(filter.id, option.value)}
                            className='h-4 w-4 rounded border-slate-800 text-indigo-600 bg-slate-800 focus-ring focus:ring-offset-gray-900 focus:ring-indigo-500'
                          />
                          <label
                            htmlFor={`filter-${filter.id}-${optionIdx}`}
                            className='ml-3 whitespace-nowrap pr-6 text-sm font-medium text-slate-400'
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ))}
          </Popover.Group>
        </div>
      </section>
    </>
  )
}

export default Filter
