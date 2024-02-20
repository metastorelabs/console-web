'use client'

import { useRef, useState } from 'react'

import { HiOutlineVolumeOff, HiOutlineVolumeUp } from 'react-icons/hi'

import Image from 'next/image'

import { FileData } from '../page'

const Previewer = ({ previewData }: { previewData: FileData | null }) => {
  const displayVideoRef = useRef<HTMLVideoElement>(null)
  const [isDisplayMuted, setIsDisplayMuted] = useState(true)

  const togglePreviewMute = () => {
    if (displayVideoRef.current) {
      displayVideoRef.current.muted = !displayVideoRef.current.muted
      setIsDisplayMuted(displayVideoRef.current.muted)
    }
  }

  if (!previewData) return <div className='max-w-4xl rounded-2xl bg-gray-800 w-full aspect-video' />

  return (
    <div className='max-w-4xl rounded-2xl bg-gray-800 w-full aspect-video relative overflow-hidden'>
      {previewData.isVideo ? (
        <>
          <video
            src={previewData.fileUrl}
            autoPlay
            loop
            muted
            ref={displayVideoRef}
            className='object-cover object-center'
          />
          <div className='absolute top-0 right-0 m-3'>
            <button
              className='p-2 rounded-full bg-gray-800/80 hover:scale-110 focus-visible-ring'
              onClick={togglePreviewMute}
            >
              {isDisplayMuted ? (
                <HiOutlineVolumeOff className={`h-4 w-4 text-gray-400 stroke-2`} />
              ) : (
                <HiOutlineVolumeUp className={`h-4 w-4 text-gray-400 stroke-2`} />
              )}
            </button>
          </div>
        </>
      ) : (
        <Image src={previewData.fileUrl} alt='item' fill className='object-cover object-center' />
      )}
      <div className='h-8 w-8 flex items-center justify-center rounded-full bg-gray-800/80 text-white absolute top-0 left-0 m-3 select-none'>
        <p>{previewData.order}</p>
      </div>
    </div>
  )
}

export default Previewer
