'use client'

import { useRef, useState } from 'react'

import { HiOutlineX } from 'react-icons/hi'
import { HiExclamationCircle } from 'react-icons/hi2'

import Image from 'next/image'
import { toast } from 'react-hot-toast'

import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/button'
import ResizableTextarea from '@/components/ResizableTextarea'

type formData = {
  name: string
  description: string
  logo: File | null
}

const EditCollection = ({
  params,
}: {
  params: {
    product: string
    orgId: string
    collection: string
  }
}) => {
  const [formData, setFormData] = useState<formData>({
    name: '',
    description: '',
    logo: null,
  })

  // useState for all form errors
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    name: '',
    description: '',
    logo: '',
  })

  const [logoUrl, setLogoUrl] = useState('')
  const logoInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    // clear error if user starts typing
    if (formErrors[name] !== '') {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: '',
      }))
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 5000000) {
        toast.error('File size should be less than 5MB', {
          id: 'collection-logo-size',
        })
        return
      }

      setFormData((prevState) => ({
        ...prevState,
        logo: e.target.files && e.target.files[0],
      }))

      setLogoUrl(URL.createObjectURL(e.target.files[0]))

      // clear error if user starts typing
      if (formErrors.logo !== '') {
        setFormErrors((prevState) => ({
          ...prevState,
          logo: '',
        }))
      }

      e.target.value = ''
    }
  }

  const validate = () => {
    let errors = {
      name: '',
      description: '',
      logo: '',
    }

    if (formData.name === '') {
      errors.name = 'Name is required'
    }

    if (formData.description === '') {
      errors.description = 'Description is required'
    }

    if (formData.logo === null) {
      errors.logo = 'Logo is required'
    }

    if (Object.values(errors).some((error) => error !== '')) {
      setFormErrors(errors)
      return false
    }

    return true
  }

  const handleSubmit = () => {
    // check if all fields are filled
    if (!validate()) {
      return
    }

    toast.success('Collection created successfully')
  }

  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/collections`,
      name: 'Collections',
    },
    {
      href: `/org/${params.orgId}/product/${params.product}/store/collections/${params.collection}`,
      name: params.collection,
    },
    {
      href: `#`,
      name: 'Edit Collection',
    },
  ]

  return (
    <div className='max-w-2xl'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='mt-6'>
        <h1 className='text-white text-2xl md:text-3xl font-bold'>Edit Collection</h1>
        <p className='mt-2 text-sm text-slate-400'>Edit your collection details</p>
      </div>

      <div className='mt-10 space-y-10'>
        {/* logo image */}
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-400 mb-3'>Upload Logo</label>
          <div className='relative max-w-xs'>
            <button
              className='flex justify-center items-center rounded-2xl border-2 border-dashed border-gray-700 hover:bg-gray-800 w-full aspect-square relative focus-visible-ring'
              onClick={() => logoInputRef.current?.click()}
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
                      <span>Upload Logo</span>
                    </label>
                  </div>
                  <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
              <input
                id='file-upload'
                ref={logoInputRef}
                name='file-upload'
                type='file'
                className='hidden'
                onChange={handleLogoUpload}
                accept={'image/*'}
              />
            </button>
            {logoUrl !== '' && (
              <button
                className='absolute top-0 right-0 p-2 rounded-full m-3 cursor-pointer bg-gray-800 hover:scale-110 focus-visible-ring'
                onClick={() => {
                  setFormData({ ...formData, logo: null })
                  setLogoUrl('')
                }}
              >
                <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
              </button>
            )}
          </div>
          {formErrors.logo && (
            <p className='mt-2 text-sm text-red-600 flex items-center' id='email-error'>
              <HiExclamationCircle className='h-5 w-5 text-red-500 mr-1' aria-hidden='true' />
              {formErrors.logo}
            </p>
          )}
        </div>

        {/* collection name */}
        <div>
          <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-400'>
            Collection Name
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='name'
              id='name'
              value={formData.name}
              onChange={handleChange}
              className='input-ui'
              placeholder='Enter your collection name'
            />
          </div>
          {formErrors.name && (
            <p className='mt-2 text-sm text-red-600 flex items-center' id='email-error'>
              <HiExclamationCircle className='h-5 w-5 text-red-500 mr-1' aria-hidden='true' />
              {formErrors.name}
            </p>
          )}
        </div>

        {/* collection description */}
        <div>
          <label htmlFor='description' className='block text-sm font-medium leading-6 text-gray-400'>
            Description
          </label>
          <div className='mt-2'>
            <ResizableTextarea
              name='description'
              id='description'
              value={formData.description}
              onChange={handleChange}
              className='min-h-[128px] resize-none input-ui'
              placeholder='Enter your collection description'
            />
          </div>
          {formErrors.description && (
            <p className='mt-2 text-sm text-red-600 flex items-center' id='email-error'>
              <HiExclamationCircle className='h-5 w-5 text-red-500 mr-1' aria-hidden='true' />
              {formErrors.description}
            </p>
          )}
        </div>

        {/* Create Button */}
        <Button className='w-full' onClick={handleSubmit}>
          Edit Collection
        </Button>
      </div>
    </div>
  )
}

export default EditCollection
