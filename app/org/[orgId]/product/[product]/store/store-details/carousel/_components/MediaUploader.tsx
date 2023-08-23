'use client'

import { HiOutlineUpload } from 'react-icons/hi'

import clsx from 'clsx'
import Dropzone from 'react-dropzone'

const MediaUploader = ({ onDrop }: { onDrop: (_files: File[]) => void }) => {
  return (
    <Dropzone
      accept={{
        'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
        'video/*': ['.mp4', '.webm'],
      }}
      multiple
      maxFiles={10}
      onDrop={onDrop}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
        <div className='relative'>
          <div
            className={clsx(
              'flex focus-ring justify-center items-center rounded-2xl border-2 border-dashed border-gray-700 w-full aspect-video cursor-pointer relative',
              isDragActive
                ? isDragAccept
                  ? 'bg-green-900/25'
                  : isDragReject
                  ? 'bg-red-900/25'
                  : 'bg-gray-800'
                : 'hover:bg-gray-800 '
            )}
            {...getRootProps()}
          >
            <div className='space-y-1 text-center'>
              <HiOutlineUpload className='mx-auto h-12 w-12 text-gray-400' />
              <div className='flex text-sm text-gray-600 justify-center'>
                <label htmlFor='file-upload' className='relative font-medium text-gray-200'>
                  <span>{isDragActive ? 'Drop it here ...' : 'Upload multiple gameplays and trailers'}</span>
                </label>
              </div>
              <p className='text-xs text-gray-500'>
                video up to 50MB & Image up to 10MB <br /> Recommended ratio: 16:9 aspect ratio and Limit: 10 files{' '}
                <br />
              </p>
            </div>
            <input {...getInputProps()} />
          </div>
        </div>
      )}
    </Dropzone>
  )
}

export default MediaUploader
