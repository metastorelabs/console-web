'use client'

import { useCallback } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

export const usePagination = (page: number, totalPages: number) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const numbersToShow = 6

  const getDisplayedPageNumbers = useCallback(() => {
    const pages = []

    if (totalPages === 1) {
      return [1]
    }

    if (totalPages <= numbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    if (page < numbersToShow - 1) {
      for (let i = 1; i <= numbersToShow - 1; i++) {
        pages.push(i)
      }
      pages.push('#')
      pages.push(totalPages)
      return pages
    }

    if (page > totalPages - numbersToShow + 2) {
      pages.push(1)
      pages.push('#')
      for (let i = totalPages - (numbersToShow - 2); i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    pages.push(1)
    pages.push('#')
    const startMiddle = page - Math.floor((numbersToShow - 4) / 2)
    const endMiddle = page + Math.floor((numbersToShow - 4) / 2)
    for (let i = startMiddle; i <= endMiddle; i++) {
      pages.push(i)
    }
    pages.push('#')
    pages.push(totalPages)

    return pages
  }, [page, totalPages])

  const displayedPages = getDisplayedPageNumbers()

  const previousLink = page > 1 ? pathname + '?' + createQueryString('page', (page - 1).toString()) : '#'
  const nextLink = page < totalPages ? pathname + '?' + createQueryString('page', (page + 1).toString()) : '#'
  const specificPageLink = (pageNumber: string | number) =>
    pathname + '?' + createQueryString('page', pageNumber.toString())
  const previousAllowed = page > 1
  const nextAllowed = page < totalPages

  return {
    displayedPages,
    previousLink,
    nextLink,
    specificPageLink,
    previousAllowed,
    nextAllowed,
  }
}
