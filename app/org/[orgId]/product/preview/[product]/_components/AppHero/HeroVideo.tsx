'use client'

import { useEffect, useRef, useState } from 'react'

import { HiOutlineVolumeOff, HiOutlineVolumeUp } from 'react-icons/hi'

import { useVisibilityChange } from '@/hooks/useVisibilityChange'

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible] = useVisibilityChange(containerRef, 40)
  const [manualMute, setManualMute] = useState(true)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (isVisible && !manualMute) {
      setMuted(false)
    } else {
      setMuted(true)
    }
  }, [isVisible, manualMute])

  return (
    <div className='w-full h-full relative bg-black' ref={containerRef}>
      <video
        src={'https://cdn.akamai.steamstatic.com/steam/apps/256768371/movie_max.webm?t=1574881352'}
        autoPlay
        playsInline
        muted={muted}
        loop
        ref={videoRef}
        className='h-full w-full object-cover'
      />

      {/* video controls */}
      <div className='absolute bottom-2 lg:bottom-20 right-0 z-30 px-4 sm:px-8 lg:px-14 xl:px-40'>
        <button
          onClick={() => {
            setMuted(!muted)
            setManualMute(!manualMute)
          }}
          className='flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 border-2 border-white/10 bg-gray-950 bg-opacity-20 rounded-full focus-visible-ring'
        >
          {muted ? (
            <HiOutlineVolumeOff className='text-white text-base lg:text-xl' />
          ) : (
            <HiOutlineVolumeUp className='text-white text-base lg:text-xl' />
          )}
        </button>
      </div>

      {/* top shadow */}
      <div className='absolute top-0 w-full h-1/4 bg-gradient-to-t from-transparent to-gray-950 opacity-90 z-10' />

      {/* bottom shadow */}
      <div className='absolute bottom-0 w-full h-2/4 bg-gradient-to-b from-transparent to-gray-950 z-10' />
    </div>
  )
}

export default HeroVideo
