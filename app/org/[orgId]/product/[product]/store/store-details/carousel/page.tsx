'use client'

import { useEffect, useState } from 'react'

import { createThumbnail, validateAspectRatio } from '@/utils/mediaUtils'
import toast from 'react-hot-toast'

import Breadcrumb from '@/components/Breadcrumb'

import MediaPanel from './_components/MediaPanel'
import MediaUploader from './_components/MediaUploader'
import Previewer from './_components/Previewer'

export interface FileData {
  id: string
  file: File
  thumbnail?: File
  fileUrl: string
  thumbnailUrl?: string
  isVideo?: boolean
  order: number
}

const Carousel = ({
  params,
}: {
  params: {
    orgId: string
    product: string
  }
}) => {
  const [files, setFiles] = useState<FileData[]>([])
  const [displayPreview, setDisplayPreview] = useState<FileData | null>(null)

  useEffect(() => {
    if (files.length > 0 && !displayPreview) {
      setDisplayPreview(files[0])
    }
  }, [files, displayPreview])

  const onDrop = async (acceptedFiles: File[]) => {
    const maxFiles = 10
    const newFiles: FileData[] = []
    const acceptedFilesLength = acceptedFiles.length

    // If the total number of files is already 10 or more, display a warning and return
    if (files.length >= maxFiles) {
      toast.error('You can upload up to 10 files only')
      return
    }

    // Calculate the number of files that can still be accepted
    const remainingFiles = maxFiles - files.length

    if (remainingFiles === 0 || remainingFiles < acceptedFilesLength) {
      toast.error(`You can upload up to 10 files only. Removed ${acceptedFilesLength - remainingFiles} files`)
    }

    acceptedFiles = acceptedFiles.slice(0, remainingFiles)

    let orderCount = files.length - 1
    for (const file of acceptedFiles) {
      // create random id
      const id = Math.random().toString(36).substring(2, 15)
      orderCount += 1
      const isVideo = file.type.startsWith('video/')
      const limit = isVideo ? 50 : 10

      // check for file size limit
      if (file.size > limit * 1024 * 1024) {
        toast.error(`File size should be less than ${limit}MB`, {
          id: 'carousel-file-size-limit',
        })

        continue
      }

      const isValid = await validateAspectRatio(file, '16:9')

      if (!isValid) {
        toast.error('Improper aspect ratio. Make sure the media looks good in the preview.', {
          id: 'invalid-aspect-ratio',
        })
      }

      let previewUrl = ''
      let thumbnailUrl = ''
      let thumbnail: File | undefined = undefined

      if (isVideo) {
        try {
          previewUrl = URL.createObjectURL(file)
          const thumbnailResult = await createThumbnail(file)
          thumbnailUrl = thumbnailResult.url
          thumbnail = thumbnailResult.file
        } catch (error: any) {
          if (error.message === 'Cannot play video format') {
            toast.error('Cannot play video. Video might be corrupted')
            continue
          } else if (error.message === 'Thumbnail generation failed') {
            toast.error('Thumbnail generation failed')
            thumbnailUrl = '/default/video-thumbnail.png'
          } else {
            toast.error('Something went wrong')
            continue
          }
        }
      } else {
        previewUrl = URL.createObjectURL(file)
      }

      // optimize image
      const fileData: FileData = {
        id,
        file,
        fileUrl: previewUrl,
        thumbnail,
        thumbnailUrl,
        isVideo,
        order: orderCount,
      }

      newFiles.push(fileData)
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const onSubmit = () => {
    // removing thumbnailUrl and fileUrl from file as it is not needed
    const filesToSubmit = files.map((file) => {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { thumbnailUrl, fileUrl, ...rest } = file
      return rest
    })

    console.log(filesToSubmit)
    toast.success('Carousel updated successfully')
  }

  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/store-details`,
      name: 'Store Details',
    },
    {
      href: '#',
      name: 'Carousel',
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className='mt-6'>
        <h1 className='text-white text-2xl md:text-3xl font-bold'>Carousel</h1>
        <p className='mt-2 text-sm text-slate-400'>
          Upload images and videos to be displayed on your store&apos;s homepage.
        </p>
      </div>
      <div className='mt-10'>
        {files.length === 0 && (
          <div className='max-w-4xl'>
            <MediaUploader onDrop={onDrop} />
          </div>
        )}

        {files.length > 0 && (
          <>
            <Previewer previewData={displayPreview} />

            <MediaPanel
              files={files}
              setFiles={setFiles}
              onDrop={onDrop}
              displayPreview={displayPreview}
              setDisplayPreview={setDisplayPreview}
            />
          </>
        )}
      </div>
      <div className='mt-10 flex items-center border-t-2 py-3 max-w-7xl border-gray-800 justify-end gap-x-6'>
        <button type='button' onClick={onSubmit} className='button-indigo'>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Carousel
