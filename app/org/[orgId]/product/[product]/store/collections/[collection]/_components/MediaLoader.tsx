import React from 'react'

import { HiCubeTransparent } from 'react-icons/hi'

import dynamic from 'next/dynamic'
import Image from 'next/image'

const ThreeDLoader = dynamic(() => import('./ThreeDLoader'), {
  loading: () => (
    <div className='flex justify-center items-center h-full w-full animate-pulse'>
      <HiCubeTransparent className='w-12 h-12 text-gray-400' />
      <span className='sr-only'>Loading</span>
    </div>
  ),
})

type MediaLoaderProps = {
  url: string
  previewImage?: string
  extension?: string
}

const MediaLoader = ({ url, previewImage, extension }: MediaLoaderProps) => {
  const fileExtension = extension || url.split('.').pop()?.toLowerCase()

  const threeDFormats = ['gltf', 'glb']
  const imageFormats = ['jpg', 'png', 'gif']
  const audioFormats = ['mp3', 'wav', 'ogg']
  const videoFormats = ['mp4', 'webm']

  if (threeDFormats.includes(fileExtension || '')) {
    return (
      <div className='w-full h-full'>
        <ThreeDLoader
          modelUrl={url}
          loader={
            <div className='flex justify-center items-center h-full w-full animate-pulse'>
              <HiCubeTransparent className='w-12 h-12 text-gray-400' />
              <span className='sr-only'>Loading</span>
            </div>
          }
        />
      </div>
    )
  } else if (imageFormats.includes(fileExtension || '')) {
    return <Image src={url} alt='Item Image' fill className='object-cover' sizes='(max-width: 1024px) 100vw, 50vw' />
  } else if (audioFormats.includes(fileExtension || '')) {
    return (
      <div className='relative w-full h-full'>
        {previewImage && (
          <Image
            src={previewImage}
            alt='Item Image'
            fill
            className='object-cover'
            sizes='(max-width: 1024px) 100vw, 50vw'
          />
        )}
        <div className='absolute bottom-0 w-full p-4'>
          <audio className='w-full' controls controlsList='nodownload noplaybackrate'>
            <source src={url} />
          </audio>
        </div>
      </div>
    )
  } else if (videoFormats.includes(fileExtension || '')) {
    return (
      <video className='w-full h-full' controls controlsList='nodownload noplaybackrate' disablePictureInPicture>
        <source src={url} />
      </video>
    )
  } else {
    return (
      <div className='flex justify-center items-center h-full w-full text-white'>
        No preview available for this file type.
      </div>
    )
  }
}

export default MediaLoader
