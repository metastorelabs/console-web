'use client'

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { usePagination } from '@/hooks/usePagination'
import clsx from 'clsx'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Pagination = ({ itemsPerPage, totalItems }: { itemsPerPage: number; totalItems: number }) => {
  const searchParams = useSearchParams()!
  const page = Number(searchParams.get('page')) || 1

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const { displayedPages, nextAllowed, nextLink, previousAllowed, previousLink, specificPageLink } = usePagination(
    page,
    totalPages
  )

  const startItem = (page - 1) * itemsPerPage + 1
  const endItem = Math.min(page * itemsPerPage, totalItems)

  return (
    <div className='flex items-center justify-between border-t border-gray-800 bg-gray-950 px-4 py-3 sm:px-6 -mx-4 sm:-mx-0'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <Link
          href={previousLink}
          className={clsx(
            'relative inline-flex items-center rounded-md border border-gray-700 bg-gray-950 px-4 py-2 text-sm font-medium text-gray-300 focus:outline-none',
            previousAllowed ? 'hover:bg-gray-900 focus-visible-ring' : 'opacity-50 cursor-not-allowed'
          )}
        >
          Previous
        </Link>
        <Link
          href={nextLink}
          className={clsx(
            'relative ml-3 inline-flex items-center rounded-md border border-gray-700 bg-gray-950 px-4 py-2 text-sm font-medium text-gray-300 focus:outline-none',
            nextAllowed ? 'hover:bg-gray-900 focus-visible-ring' : 'opacity-50 cursor-not-allowed'
          )}
        >
          Next
        </Link>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-300'>
            Showing <span className='font-medium'>{startItem}</span> to <span className='font-medium'>{endItem}</span>{' '}
            of <span className='font-medium'>{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
            <Link
              href={previousLink}
              className={clsx(
                'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-600 border border-gray-700 focus:outline-none',
                previousAllowed ? 'hover:bg-gray-950 focus:z-20 focus-visible-ring' : 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className='sr-only'>Previous</span>
              <HiChevronLeft className='h-5 w-5' aria-hidden='true' />
            </Link>

            {displayedPages.map((pageNum, idx) => {
              if (pageNum === '#') {
                return (
                  <span
                    key={idx}
                    className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 border border-gray-700 cursor-default'
                  >
                    ...
                  </span>
                )
              }

              return (
                <Link
                  key={idx}
                  href={specificPageLink(pageNum)}
                  className={clsx(
                    'relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-semibold focus-visible-ring ring-offset-2 focus:z-20',
                    pageNum === page ? 'bg-indigo-600 text-white !ring-indigo-600' : 'text-gray-300'
                  )}
                >
                  {pageNum}
                </Link>
              )
            })}

            <Link
              href={nextLink}
              className={clsx(
                'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-600 border border-gray-700 focus:outline-none',
                nextAllowed ? 'hover:bg-gray-950 focus:z-20 focus-visible-ring' : 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className='sr-only'>Next</span>
              <HiChevronRight className='h-5 w-5' aria-hidden='true' />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
