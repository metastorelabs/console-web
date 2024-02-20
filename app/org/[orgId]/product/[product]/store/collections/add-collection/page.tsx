'use client'

import { useRef, useState } from 'react'

import { HiOutlineDownload, HiOutlineX } from 'react-icons/hi'
//icons
import { HiCheckCircle, HiExclamationCircle, HiOutlineFolderPlus } from 'react-icons/hi2'

import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/button'
import { PolygonaLogo } from '@/components/Icons'
import ResizableTextarea from '@/components/ResizableTextarea'

const CollectionTypes = [
  {
    name: 'create',
    icon: HiOutlineFolderPlus,
    description: 'Create a new collection',
  },
  {
    name: 'import',
    icon: HiOutlineDownload,
    description: 'Import an existing collection',
  },
]

const Chains = [
  {
    name: 'polygon',
    logo: PolygonaLogo,
    disabled: false,
  },
]

type formData = {
  name: string
  description: string
  collectionType: 'create' | 'import'
  chain: 'polygon' | 'solana' | 'ethereum'
  logo: File | null
  collectionAddress: string
}

const AddCollection = ({
  params,
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  const [formData, setFormData] = useState<formData>({
    name: '',
    description: '',
    collectionType: 'create',
    chain: 'polygon',
    logo: null,
    collectionAddress: '',
  })

  // useState for all form errors
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    name: '',
    description: '',
    logo: '',
    collectionAddress: '',
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

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
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
      collectionAddress: '',
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

    if (formData.collectionType === 'import' && formData.collectionAddress === '') {
      errors.collectionAddress = 'Collection address is required'
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
      href: `#`,
      name: 'Add Collection',
    },
  ]

  return (
    <div className='max-w-2xl'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='mt-6'>
        <h1 className='text-white text-2xl md:text-3xl font-bold'>
          {formData.collectionType === 'create' ? 'Create New Collection' : 'Import Collection'}
        </h1>
        <p className='mt-2 text-sm text-slate-400'>This information will be displayed on Metastore marketplace.</p>
      </div>

      <div className='mt-10 space-y-10'>
        {/* collection type */}
        <div>
          <div>
            <h4 className='text-sm font-medium text-gray-400 leading-6'>Collection Type</h4>
          </div>

          <RadioGroup
            value={formData.collectionType}
            onChange={(collectionType: string) => handleRadioChange('collectionType', collectionType)}
          >
            <RadioGroup.Label className='sr-only'>Choose a Collection Type</RadioGroup.Label>

            <div className='mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
              {CollectionTypes.map((type) => (
                <RadioGroup.Option
                  key={type.name}
                  value={type.name}
                  className={({ checked, active }) =>
                    clsx(
                      checked ? 'border-transparent' : 'border-gray-700',
                      active ? 'border-white ring-2 ring-white' : '',
                      'relative flex rounded-2xl border p-4 shadow-sm focus:outline-none cursor-pointer'
                    )
                  }
                >
                  {({ checked, active }) => (
                    <>
                      <span className='flex flex-1'>
                        <span className='flex flex-col'>
                          <RadioGroup.Label
                            as='span'
                            className='text-base font-semibold text-gray-100 flex items-center'
                          >
                            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                          </RadioGroup.Label>
                          <RadioGroup.Description as='span' className='mt-1 flex items-center text-sm text-gray-400'>
                            {type.description}
                          </RadioGroup.Description>
                          <RadioGroup.Description as='span' className='mt-6 text-2xl font-medium text-gray-100'>
                            <type.icon />
                          </RadioGroup.Description>
                        </span>
                      </span>
                      <HiCheckCircle
                        className={clsx(!checked ? 'invisible' : '', 'h-5 w-5 text-white')}
                        aria-hidden='true'
                      />
                      <span
                        className={clsx(
                          active ? 'border' : 'border-2',
                          checked ? 'border-white' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-2xl'
                        )}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

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

        {/* Chain */}
        <div>
          <div>
            <h4 className='text-sm font-medium text-gray-400 leading-6'>Choose a chain</h4>
          </div>
          <RadioGroup value={formData.chain} onChange={(chain: string) => handleRadioChange('chain', chain)}>
            <RadioGroup.Label className='sr-only'> Choose a category </RadioGroup.Label>
            <div className='mt-2 grid grid-cols-4 gap-4'>
              {Chains.map((chain) => (
                <RadioGroup.Option
                  key={chain.name}
                  value={chain.name}
                  disabled={chain.disabled}
                  className={({ active }) =>
                    clsx(
                      !chain.disabled
                        ? 'primary-bg shadow-sm primary-text cursor-pointer'
                        : ' primary-hover secondary-text cursor-not-allowed opacity-40',
                      active ? 'ring-2 ring-stone-700 dark:ring-white ' : '',
                      'group relative border primary-border rounded-2xl p-4 flex items-center justify-center text-sm font-medium uppercase hover:primary-hover focus:outline-none sm:flex-1 truncate'
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <RadioGroup.Label as='span'>
                        <div className='flex flex-col items-center justify-center'>
                          <div className='py-2'>
                            <chain.logo className='h-10 w-10' iconSize={20} />
                          </div>
                          <p
                            className={clsx(
                              checked ? 'text-stone-700 dark:text-white' : 'text-gray-400',
                              'text-xs sm:text-sm font-medium mt-1'
                            )}
                          >
                            {chain.name}
                          </p>
                        </div>
                      </RadioGroup.Label>
                      {!chain.disabled && (
                        <span
                          className={clsx(
                            active ? 'border' : 'border-2',
                            checked ? 'border-stone-700 dark:border-white' : 'border-transparent',
                            'pointer-events-none absolute -inset-px rounded-2xl'
                          )}
                          aria-hidden='true'
                        />
                      )}
                      <HiCheckCircle
                        className={clsx(!checked ? 'invisible' : '', 'h-5 w-5 text-white absolute top-2 right-2')}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* collection Address */}
        {formData.collectionType === 'import' && (
          <div>
            <label htmlFor='collectionAddress' className='block text-sm font-medium leading-6 text-gray-400'>
              Collection Address
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='collectionAddress'
                id='collectionAddress'
                value={formData.collectionAddress}
                onChange={handleChange}
                className='input-ui'
                placeholder='Enter your collection address (0x...)'
              />
            </div>
            {formErrors.collectionAddress && (
              <p className='mt-2 text-sm text-red-600 flex items-center' id='email-error'>
                <HiExclamationCircle className='h-5 w-5 text-red-500 mr-1' aria-hidden='true' />
                {formErrors.collectionAddress}
              </p>
            )}
          </div>
        )}

        {/* Create Button */}
        <Button className='w-full' onClick={handleSubmit}>
          {formData.collectionType === 'import' ? 'Import Collection' : 'Create Collection'}
        </Button>
      </div>
    </div>
  )
}

export default AddCollection
