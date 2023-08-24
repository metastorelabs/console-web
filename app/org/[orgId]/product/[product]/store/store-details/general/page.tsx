'use client'

import { useRef, useState } from 'react'

import { AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { HiOutlineVolumeOff, HiOutlineVolumeUp, HiOutlineX } from 'react-icons/hi'

import { validateAspectRatio } from '@/utils/mediaUtils'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast'

import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/button'
import ConfirmationModal from '@/components/ConfirmationModal'
import ResizableTextarea from '@/components/ResizableTextarea'

type formData = {
  name: string
  summary: string
  logo: File | null
  quickLaunchImage: File | null
  productImage: File | null
  productVideo: File | null
  trailer: File | null
}

const General = ({
  params,
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  const initialFormData = {
    name: '',
    summary: '',
    logo: null,
    quickLaunchImage: null,
    productImage: null,
    productVideo: null,
    trailer: null,
  }

  const [formData, setFormData] = useState<formData>(initialFormData)
  const [logoUrl, setLogoUrl] = useState('')
  const [quickLaunchImageUrl, setQuickLaunchImageUrl] = useState('')
  const [productImageUrl, setProductImageUrl] = useState('')
  const [productVideoUrl, setProductVideoUrl] = useState('')
  const [isProductVideoMuted, setIsProductVideoMuted] = useState(true)
  const [trailerUrl, setTrailerUrl] = useState('')
  const [isTrailerMuted, setIsTrailerMuted] = useState(true)
  const trailerVideoRef = useRef<HTMLVideoElement>(null)
  const productVideoRef = useRef<HTMLVideoElement>(null)

  const toggleTrailerMute = () => {
    if (trailerVideoRef.current) {
      trailerVideoRef.current.muted = !trailerVideoRef.current.muted

      if (productVideoRef.current) {
        productVideoRef.current.muted = true
        setIsProductVideoMuted(true)
      }

      setIsTrailerMuted(trailerVideoRef.current.muted)
    }
  }

  const toggleProductVideoMute = () => {
    if (productVideoRef.current) {
      productVideoRef.current.muted = !productVideoRef.current.muted

      if (trailerVideoRef.current) {
        trailerVideoRef.current.muted = true
        setIsTrailerMuted(true)
      }

      setIsProductVideoMuted(productVideoRef.current.muted)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, limit?: number) => {
    const { name, value } = e.target

    if (limit && value.length > limit) return

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleItemUpload = async (
    file: File,
    key: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    ratio: string, // 1:1, 16:9, 4:3
    limit: number = 10 // 10MB default limit in MB
  ) => {
    if (file.size > limit * 1024 * 1024) {
      toast.error(`File size should be less than ${limit}MB`, {
        id: 'store-details-file-size-limit',
      })
      return
    }

    const isValid = await validateAspectRatio(file, ratio)

    if (!isValid) {
      toast.error('Improper aspect ratio. Make sure the media looks good in the preview.', {
        id: 'invalid-aspect-ratio',
      })
    }

    setFormData((prevState) => ({
      ...prevState,
      [key]: file,
    }))

    setState(URL.createObjectURL(file))
  }

  const revertChanges = () => {
    setFormData(initialFormData)
    setLogoUrl('')
    setQuickLaunchImageUrl('')
    setProductImageUrl('')
    setProductVideoUrl('')
    setTrailerUrl('')
  }

  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/store-details`,
      name: 'Store Details',
    },
    {
      href: '#',
      name: 'General Information',
    },
  ]

  return (
    <div className='max-w-7xl'>
      <Breadcrumb items={breadcrumbItems} />

      <div className='min-w-0 flex-1  mt-6'>
        <h1 className='text-white text-2xl md:text-3xl font-bold'>General Information</h1>
        <p className='mt-2 text-sm text-slate-400'>General information about your store.</p>
      </div>

      <div className='mt-10'>
        <form>
          <div className='space-y-12'>
            {/* About Section. */}
            <div className='border-b border-white/10 pb-12'>
              <h2 className='text-base font-semibold leading-7 text-white'>About</h2>
              <p className='text-sm leading-6 text-gray-400'>Basic information about your product.</p>
              <div className='mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-4'>
                  <label htmlFor='name' className='block text-sm font-medium leading-6 text-white'>
                    Product Name
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='input-ui'
                      placeholder='Enter your product name'
                    />
                  </div>
                </div>

                <div className='sm:col-span-4'>
                  <label htmlFor='name' className='block text-sm font-medium leading-6 text-white'>
                    Store URL
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={`beta.meta-store.in/app/${formData.name}`}
                      disabled
                      className='block w-full rounded-lg pl-5 border-2 border-slate-800 bg-black/10 py-2 text-slate-400 text-sm leading-6'
                    />
                  </div>
                  <p className='mt-2 text-xs text-gray-500'>
                    Store URL is autogenerated based on your store name. It cannot be changed.
                  </p>
                </div>

                <div className='sm:col-span-4'>
                  <label htmlFor='summary' className='block text-sm font-medium leading-6 text-white'>
                    Summary
                  </label>
                  <div className='mt-2'>
                    <ResizableTextarea
                      name='summary'
                      id='summary'
                      value={formData.summary}
                      onChange={(e) => handleChange(e, 150)}
                      className='min-h-[128px] resize-none input-ui'
                      placeholder='Enter your product summary'
                    />
                  </div>
                  <p className='mt-2 text-xs text-gray-500'>
                    {`Provide short description about your product within ${150 - formData.summary.length} characters.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Logo & Trailer Section. */}
            <div className='border-b border-white/10 pb-12'>
              <h2 className='text-base font-semibold leading-7 text-white'>Logo & Trailer</h2>
              <p className='text-sm leading-6 text-gray-400'>
                These images and video will appear in multiple instances on the storefront.{' '}
                <Link
                  href='https://docs.metastore.to/store-details#logo-and-trailer'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:text-blue-400 font-semibold focus-visible-ring'
                >
                  Learn More.
                </Link>
              </p>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                {/* logo */}
                <div className='col-span-2'>
                  <label className='block text-sm font-medium leading-6 text-white mb-3'>Upload Logo</label>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleItemUpload(acceptedFiles[0], 'logo', setLogoUrl, '1:1')
                    }}
                    accept={{
                      'image/*': ['.png', '.jpg', '.jpeg'],
                    }}
                    maxFiles={1}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                      <div className='relative'>
                        <div
                          className={clsx(
                            'flex focus-ring justify-center items-center rounded-2xl border-2 border-dashed border-gray-700 w-full aspect-square cursor-pointer relative',
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
                          {logoUrl !== '' ? (
                            <Image src={logoUrl} alt='item' fill className='object-cover object-center rounded-2xl' />
                          ) : (
                            <div className='space-y-1 text-center'>
                              <svg
                                className='mx-auto h-12 w-12 text-gray-400'
                                stroke='currentColor'
                                fill='none'
                                viewBox='0 0 48 48'
                                aria-hidden='true'
                              >
                                <path
                                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <div className='flex text-sm text-gray-600 justify-center'>
                                <label htmlFor='file-upload' className='relative font-medium text-gray-200'>
                                  {isDragActive ? 'Drop the Logo here ...' : 'Upload Logo'}
                                </label>
                              </div>
                              <p className='text-xs text-gray-500'>
                                PNG, JPG up to 10MB. <br /> Recommended ratio: 1:1
                              </p>
                            </div>
                          )}
                          <input {...getInputProps()} />
                        </div>
                        {logoUrl !== '' && (
                          <button
                            className='absolute top-0 right-0 p-2 rounded-full m-3 bg-gray-800 hover:scale-110 focus-visible-ring'
                            onClick={() => {
                              setFormData({ ...formData, logo: null })
                              setLogoUrl('')
                            }}
                          >
                            <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                          </button>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  <p className='m-2 text-xs text-gray-500'>
                    For transparent image, upload light variant logo with dark shadow.
                  </p>
                </div>

                {/* quick launch image */}
                <div className='col-span-2'>
                  <label className='block text-sm font-medium leading-6 text-white mb-3'>
                    Upload Quick Launch Image
                  </label>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleItemUpload(acceptedFiles[0], 'quickLaunchImage', setQuickLaunchImageUrl, '1:1')
                    }}
                    accept={{
                      'image/*': ['.png', '.jpg', '.jpeg'],
                    }}
                    maxFiles={1}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                      <div className='relative'>
                        <div
                          className={clsx(
                            'flex focus-ring justify-center items-center rounded-2xl border-2 border-dashed border-gray-700 w-full aspect-square cursor-pointer relative',
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
                          {quickLaunchImageUrl !== '' ? (
                            <Image
                              src={quickLaunchImageUrl}
                              alt='item'
                              fill
                              className='object-cover object-center rounded-2xl'
                            />
                          ) : (
                            <div className='space-y-1 text-center'>
                              <svg
                                className='mx-auto h-12 w-12 text-gray-400'
                                stroke='currentColor'
                                fill='none'
                                viewBox='0 0 48 48'
                                aria-hidden='true'
                              >
                                <path
                                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <div className='flex text-sm text-gray-600 justify-center'>
                                <label htmlFor='file-upload' className='relative font-medium text-gray-200'>
                                  {isDragActive ? 'Drop the Logo here ...' : 'Upload Quick Launch Image'}
                                </label>
                              </div>
                              <p className='text-xs text-gray-500'>
                                PNG, JPG up to 10MB. <br /> Recommended ratio: 1:1
                              </p>
                            </div>
                          )}
                          <input {...getInputProps()} />
                        </div>
                        {quickLaunchImageUrl !== '' && (
                          <button
                            className='absolute top-0 right-0 p-2 rounded-full m-3 bg-gray-800 hover:scale-110 focus-visible-ring'
                            onClick={() => {
                              setFormData({ ...formData, logo: null })
                              setQuickLaunchImageUrl('')
                            }}
                          >
                            <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                          </button>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  <p className='m-2 text-xs text-gray-500'>Transparent image is not allowed.</p>
                </div>

                {/* product image */}
                <div className='col-span-3'>
                  <label className='block text-sm font-medium leading-6 text-white mb-3'>Upload Product Image</label>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleItemUpload(acceptedFiles[0], 'productImage', setProductImageUrl, '16:9')
                    }}
                    accept={{
                      'image/*': ['.png', '.jpg', '.jpeg'],
                    }}
                    maxFiles={1}
                    multiple={false}
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
                          {productImageUrl !== '' ? (
                            <Image
                              src={productImageUrl}
                              alt='item'
                              fill
                              className='object-cover object-center rounded-2xl'
                            />
                          ) : (
                            <div className='space-y-1 text-center'>
                              <svg
                                className='mx-auto h-12 w-12 text-gray-400'
                                stroke='currentColor'
                                fill='none'
                                viewBox='0 0 48 48'
                                aria-hidden='true'
                              >
                                <path
                                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <div className='flex text-sm text-gray-600 justify-center'>
                                <label htmlFor='file-upload' className='relative font-medium text-gray-200'>
                                  {isDragActive ? 'Drop the Product Image here ...' : 'Upload Product Image'}
                                </label>
                              </div>
                              <p className='text-xs text-gray-500'>
                                Image up to 10MB <br /> Required ratio: 16:9 aspect ratio
                              </p>
                            </div>
                          )}
                          <input {...getInputProps()} />
                        </div>

                        {productImageUrl !== '' && (
                          <button
                            className='absolute top-0 right-0 p-2 rounded-full m-3 focus-visible-ring bg-gray-800 hover:scale-110'
                            onClick={() => {
                              setFormData({ ...formData, productImage: null })
                              setProductImageUrl('')
                            }}
                          >
                            <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                          </button>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>

                {/* product video  */}
                <div className='col-span-3'>
                  <label className='block text-sm font-medium leading-6 text-white mb-3'>Upload Product Video</label>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleItemUpload(acceptedFiles[0], 'productVideo', setProductVideoUrl, '16:9', 50)
                    }}
                    accept={{
                      'video/*': ['.mp4', '.webm'],
                    }}
                    maxFiles={1}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                      <div className='relative'>
                        <div
                          className={clsx(
                            'flex focus-ring justify-center items-center border-gray-700 rounded-2xl border-2 border-dashed w-full aspect-video cursor-pointer relative',
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
                          {productVideoUrl !== '' ? (
                            <video
                              src={productVideoUrl}
                              ref={productVideoRef}
                              autoPlay
                              loop
                              muted
                              className='object-cover object-center rounded-2xl aspect-video'
                            />
                          ) : (
                            <div className='space-y-1 text-center'>
                              <AiOutlineVideoCameraAdd className='mx-auto h-12 w-12 text-gray-400' />
                              <div className='flex text-sm text-gray-600 justify-center'>
                                <label htmlFor='file-upload' className='relative font-medium text-gray-200'>
                                  <span>{isDragActive ? 'Drop the video here ...' : 'Upload Product Video'}</span>
                                </label>
                              </div>
                              <p className='text-xs text-gray-500'>
                                video up to 50MB <br /> Recommended ratio: 16:9 aspect ratio
                              </p>
                            </div>
                          )}
                          <input {...getInputProps()} />
                        </div>

                        {productVideoUrl !== '' && (
                          <div className='absolute top-0 right-0 m-3 flex items-center'>
                            <button
                              className='p-2 rounded-full focus-visible-ring bg-gray-800/80 hover:scale-110 ml-2'
                              onClick={toggleProductVideoMute}
                              type='button'
                            >
                              {isProductVideoMuted ? (
                                <HiOutlineVolumeOff className={`h-4 w-4 text-gray-400 stroke-2`} />
                              ) : (
                                <HiOutlineVolumeUp className={`h-4 w-4 text-gray-400 stroke-2`} />
                              )}
                            </button>

                            <button
                              className='p-2 rounded-full focus-visible-ring bg-gray-800/80 hover:scale-110 ml-3'
                              onClick={() => {
                                setFormData({ ...formData, productVideo: null })
                                setProductVideoUrl('')
                                setIsProductVideoMuted(true)
                              }}
                            >
                              <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>

                {/* trailer */}
                <div className='col-span-3'>
                  <label className='block text-sm font-medium leading-6 text-white mb-3'>Upload Trailer</label>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleItemUpload(acceptedFiles[0], 'trailer', setTrailerUrl, '2.35:1', 50)
                    }}
                    accept={{
                      'video/*': ['.mp4', '.webm'],
                    }}
                    maxFiles={1}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                      <div className='relative'>
                        <div
                          className={clsx(
                            'flex focus-ring justify-center items-center border-gray-700 rounded-2xl border-2 border-dashed w-full aspect-[2.35/1] cursor-pointer relative',
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
                          {trailerUrl !== '' ? (
                            <video
                              src={trailerUrl}
                              ref={trailerVideoRef}
                              autoPlay
                              loop
                              muted
                              className='object-cover object-center rounded-2xl aspect-[2.35/1]'
                            />
                          ) : (
                            <div className='space-y-1 text-center'>
                              <AiOutlineVideoCameraAdd className='mx-auto h-12 w-12 text-gray-400' />
                              <div className='flex text-sm text-gray-600 justify-center'>
                                <label htmlFor='file-upload' className='relative font-medium text-gray-200'>
                                  <span>
                                    {isDragActive ? 'Drop the Trailer Video here ...' : 'Upload Trailer Video'}
                                  </span>
                                </label>
                              </div>
                              <p className='text-xs text-gray-500'>
                                video up to 50MB <br /> Required ratio: 2.35:1 aspect ratio
                              </p>
                            </div>
                          )}
                          <input {...getInputProps()} />
                        </div>

                        {trailerUrl !== '' && (
                          <div className='absolute top-0 right-0 m-3 flex items-center'>
                            <button
                              className='p-2 rounded-full focus-visible-ring bg-gray-800/80 hover:scale-110 ml-2'
                              onClick={toggleTrailerMute}
                              type='button'
                            >
                              {isTrailerMuted ? (
                                <HiOutlineVolumeOff className={`h-4 w-4 text-gray-400 stroke-2`} />
                              ) : (
                                <HiOutlineVolumeUp className={`h-4 w-4 text-gray-400 stroke-2`} />
                              )}
                            </button>

                            <button
                              className='p-2 rounded-full focus-visible-ring bg-gray-800/80 hover:scale-110 ml-3'
                              onClick={() => {
                                setFormData({ ...formData, trailer: null })
                                setTrailerUrl('')
                                setIsTrailerMuted(true)
                              }}
                            >
                              <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <ConfirmationModal
              title='Revert Changes'
              description='Are you sure you want to revert all changes?'
              onConfirm={revertChanges}
            >
              <Button
                type='reset'
                variant='ghost'
                // disabled={initialFormData === formData}
              >
                Revert Changes
              </Button>
            </ConfirmationModal>
            <Button>Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default General
