'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export const useVisibilityChange = (
  containerRef: React.RefObject<HTMLDivElement>,
  visibilityPercentage: number
): [boolean, () => void] => {
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isVisibleRef = useRef(false)

  const checkVisibility = useCallback(() => {
    if (observerRef.current && containerRef.current) {
      const entries = observerRef.current.takeRecords()
      isVisibleRef.current = entries.some((entry) => entry.target === containerRef.current && entry.isIntersecting)
      setIsVisible(isVisibleRef.current && !document.hidden)
    }
  }, [containerRef])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: visibilityPercentage / 100,
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
      setIsVisible(entry.isIntersecting && !document.hidden)
    }, options)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [visibilityPercentage])

  useEffect(() => {
    const currentRef = containerRef.current

    if (currentRef && observerRef.current) {
      observerRef.current.observe(currentRef)
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef)
      }
    }
  }, [containerRef])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(isVisibleRef.current && !document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return [isVisible, checkVisibility]
}
