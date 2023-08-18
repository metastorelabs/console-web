'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

const usePathfinder = (path: number): null | string => {
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState<null | string>(null)

  useEffect(() => {
    const pathfinder = pathname.split('/')[path] || ''

    if (pathfinder === '') {
      setCurrentPath('/')
    } else {
      setCurrentPath(pathfinder)
    }
  }, [pathname, path])

  return currentPath
}

export default usePathfinder
