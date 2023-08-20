import { useEffect, useMemo, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type FilterOption = {
  value: string
  label: string
}

type Filter = {
  id: string
  name: string
  options: FilterOption[]
}

type FilterState = {
  [key: string]: string[]
}

type ChangeFilter = (_id: string, _value: string) => void

type Reset = () => void

function useFilter(filterData: Filter[]): [FilterState, ChangeFilter, Reset] {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  // Initialize filter state based on the current search params
  const initialFilterState: FilterState = {}
  filterData.forEach((filter) => {
    const filterValues = searchParams.get(filter.id)?.split(',') || []
    if (filterValues.length > 0) {
      initialFilterState[filter.id] = filterValues
    }
  })

  const [filterState, setFilterState] = useState<FilterState>(initialFilterState)

  // Parse the search string into filter state
  useEffect(() => {
    const newFilterState: FilterState = {}
    filterData.forEach((filter) => {
      const filterValues = searchParams.get(filter.id)?.split(',') || []
      if (filterValues.length > 0) {
        newFilterState[filter.id] = filterValues
      }
    })
    setFilterState(newFilterState)
  }, [searchParams, JSON.stringify(filterData)])

  // Construct the search string from filter state
  const search = useMemo(() => {
    // From search params, find query params that are not in filterData and add them to the new search params
    const newSearchParams = new URLSearchParams()
    searchParams.forEach((value, key) => {
      if (!filterData.some((filter) => filter.id === key)) {
        newSearchParams.append(key, value)
      }
    })

    // From filter state, find filter values that are not in search params and add them to the new search params
    Object.entries(filterState).forEach(([id, values]) => {
      if (filterData.some((filter) => filter.id === id)) {
        // Only add filter values that are defined in filterData
        const valueString = values.join(',')
        newSearchParams.append(id, valueString)
      }
    })

    return newSearchParams.toString()
  }, [filterState, JSON.stringify(filterData)])

  // Update the URL when the search string changes
  useEffect(() => {
    const newUrl = `${pathname}${search ? `?${search}` : ''}`
    router.push(newUrl)
  }, [search, pathname, router])

  // Function to handle changing a filter
  const handleChange: ChangeFilter = (id, value): void => {
    setFilterState((prevState) => {
      const newValues = [...(prevState[id] || [])]
      const index = newValues.indexOf(value)
      if (index === -1) {
        newValues.push(value)
      } else {
        newValues.splice(index, 1)
        if (newValues.length === 0) {
          const newState = { ...prevState }
          delete newState[id]
          return newState
        }
      }
      return { ...prevState, [id]: newValues }
    })
  }

  const reset: Reset = () => {
    setFilterState({})
  }

  return [filterState, handleChange, reset]
}

export default useFilter
