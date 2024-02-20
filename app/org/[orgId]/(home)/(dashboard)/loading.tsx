import React from 'react'

const loading = () => {
  return (
    <div>
      <div className='rounded-lg aspect-square w-28 h-28 animate-pulse bg-gray-800' />
      <div className='h-8 mt-4 w-56 animate-pulse bg-gray-800' />
      <div className='rounded-lg my-10 h-28 animate-pulse bg-gray-800' />
    </div>
  )
}

export default loading
