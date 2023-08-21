'use client'

import { Fragment, useRef, useState } from 'react'

//icons
import { AiOutlineCheck } from 'react-icons/ai'
import { HiChevronDown, HiOutlineX } from 'react-icons/hi'

import { CURRENCY } from '@/constants/enums'
import { toPositiveInteger } from '@/utils/common'
import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import toast from 'react-hot-toast'

import Breadcrumb from '@/components/Breadcrumb'

// components
import ItemCard from '../_components/ItemCard'
import MediaLoader from '../_components/MediaLoader'

const currencies = [
  { id: 1, name: 'MATIC', image: '/logo/polygon-logo.png' },
  { id: 2, name: 'USDT', image: '/logo/usdt-logo.png' },
]

type formData = {
  name: string
  price: string
  currency: keyof typeof CURRENCY
  item: File | null
  cover: File | null
  totalItems: string
}

export default function AddItem({
  params,
}: {
  params: {
    product: string
    orgId: string
    collection: string
  }
}) {
  // form data state
  const [formData, setFormData] = useState<formData>({
    name: '',
    price: '',
    currency: 'MATIC',
    item: null,
    cover: null,
    totalItems: '',
  })
  const itemInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const [itemUrl, setItemUrl] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [extension, setExtension] = useState('')
  const [isItemImage, setIsItemImage] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value)

    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleItemInputClick = () => {
    if (itemUrl !== '') {
      return
    }
    itemInputRef.current?.click()
  }

  const handleItemUpload = (e: React.ChangeEvent<HTMLInputElement>, isCover?: boolean) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 50000000) {
        toast.error('File size should be less than 50MB', {
          id: 'nft-3d-model-size',
        })
        return
      }

      if (!isCover) {
        const fileExtension = e.target.files[0].name.split('.').pop()

        if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
          setIsItemImage(true)
        } else {
          setIsItemImage(false)
        }

        setExtension(fileExtension || '')
      }

      if (isCover) {
        setFormData((prevState) => ({
          ...prevState,
          cover: e.target.files && e.target.files[0],
        }))
        setCoverUrl(URL.createObjectURL(e.target.files[0]))
      } else {
        setFormData((prevState) => ({
          ...prevState,
          item: e.target.files && e.target.files[0],
        }))
        setItemUrl(URL.createObjectURL(e.target.files[0]))
      }

      e.target.value = ''
    }
  }

  const validateForm = () => {
    const { name, price, item, cover } = formData

    if (name === '') {
      toast.error('Name is required', {
        id: 'nft-name',
      })
      return false
    }

    if (item === null) {
      toast.error('Item is required', {
        id: 'nft-item',
      })
      return false
    }

    if (!isItemImage && cover === null) {
      toast.error('Cover is required', {
        id: 'nft-cover',
      })
      return false
    }

    if (Number(price) <= 0) {
      toast.error('Price cannot be negative or zero', {
        id: 'nft-price',
      })
      return false
    }

    return true
  }

  const handleCreate = () => {
    if (validateForm()) {
      toast.success('Item created successfully')
    }
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
      href: '#',
      name: 'Add Item',
    },
  ]

  return (
    <main className='pb-10'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='mx-auto grid grid-cols-1 gap-6 xl:grid-cols-4 mt-6'>
        <div className='space-y-10 xl:col-span-2'>
          <h2 className='text-white text-3xl md:text-4xl font-bold'>Create New NFT</h2>

          {/* upload item */}
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-400 mb-3'>Upload Item</label>
            <div className='relative max-w-lg'>
              <button
                className={clsx(
                  'flex justify-center items-center rounded-2xl border-2 border-dashed border-gray-700  w-full aspect-square max-w-lg relative focus-visible-ring',
                  itemUrl !== '' ? '' : 'hover:bg-gray-800'
                )}
                onClick={handleItemInputClick}
              >
                {itemUrl !== '' ? (
                  <div className='w-full h-full rounded-md overflow-hidden relative'>
                    <MediaLoader url={itemUrl} extension={extension} previewImage={coverUrl} />
                  </div>
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
                      <label htmlFor='file-upload' className='relative font-medium text-gray-200 cursor-pointer'>
                        <span>Upload file</span>
                      </label>
                    </div>
                    <p className='text-xs text-gray-500'>glb, jpg, png, gif, mp3, wav, ogg, mp4, webm</p>
                    <p className='text-xs text-gray-500'>Max file size: 50MB</p>
                  </div>
                )}
                <input
                  id='file-upload'
                  ref={itemInputRef}
                  name='file-upload'
                  type='file'
                  className='hidden'
                  onChange={handleItemUpload}
                  accept='.glb,.jpg,.png,.gif,.mp3,.wav,.ogg,.mp4,.webm'
                />
              </button>
              {itemUrl !== '' && (
                <button
                  className='absolute top-0 right-0 p-2 rounded-full m-3 bg-gray-800 shadow-xl hover:scale-110 focus-visible-ring'
                  onClick={() => {
                    setFormData({ ...formData, item: null, cover: null })
                    setItemUrl('')
                    setExtension('')
                    setCoverUrl('')
                    setIsItemImage(true)
                  }}
                >
                  <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                </button>
              )}
            </div>
          </div>

          {/* cover image */}
          {!isItemImage && (
            <div>
              <label className='block text-sm font-medium leading-6 text-gray-400 mb-3'>Upload Cover</label>
              <div className='relative max-w-lg'>
                <button
                  className='flex justify-center items-center rounded-2xl border-2 border-dashed border-gray-700 hover:bg-gray-800 w-full aspect-square max-w-lg relative focus-visible-ring'
                  onClick={() => coverInputRef.current?.click()}
                >
                  {coverUrl !== '' ? (
                    <Image src={coverUrl} alt='item' fill className='object-cover object-center rounded-2xl' />
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
                          <span>Upload Cover</span>
                        </label>
                      </div>
                      <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                  <input
                    id='file-upload'
                    ref={coverInputRef}
                    name='file-upload'
                    type='file'
                    className='hidden'
                    onChange={(e) => handleItemUpload(e, true)}
                    accept={'image/*'}
                  />
                </button>
                {coverUrl !== '' && (
                  <button
                    className='absolute top-0 right-0 p-2 rounded-full m-3 cursor-pointer bg-gray-800 hover:scale-110 focus-visible-ring'
                    onClick={() => {
                      setFormData({ ...formData, cover: null })
                      setCoverUrl('')
                    }}
                  >
                    <HiOutlineX className={`h-4 w-4 text-gray-400 stroke-2`} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* item name */}
          <div>
            <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-400'>
              Item Name
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='name'
                id='name'
                value={formData.name}
                onChange={handleChange}
                className='input-ui'
                placeholder='Enter your item name'
              />
            </div>
          </div>

          {/* No of Items */}
          <div>
            <label htmlFor='totalItems' className='block text-sm font-medium leading-6 text-gray-400'>
              Number of Items
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='totalItems'
                id='totalItems'
                value={formData.totalItems}
                onChange={(e) => {
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      name: e.target.name,
                      value: toPositiveInteger(e.target.value, false, 1),
                    },
                  })
                }}
                className='input-ui'
                placeholder='Enter the number of items'
              />
            </div>
          </div>

          {/* price input */}
          <div className='my-10'>
            <label htmlFor='price' className='block text-sm font-medium leading-6 text-gray-400'>
              Price
            </label>
            <div className='relative mt-2 rounded-2xl'>
              <input
                type='text'
                name='price'
                value={formData.price}
                onChange={(e) => {
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      name: e.target.name,
                      value: toPositiveInteger(e.target.value, true),
                    },
                  })
                }}
                id='price'
                min='0'
                className='input-ui'
                placeholder='0.00'
              />
              <div className='absolute inset-y-0 right-0 flex items-center'>
                <Listbox
                  value={formData.currency}
                  onChange={(currency) => {
                    setFormData({ ...formData, currency })
                  }}
                >
                  <div className='relative'>
                    <div className='relative rounded-lg py-2 px-3 sm:text-sm text-gray-400 h-12 w-48 flex items-center justify-end'>
                      <Listbox.Button className='flex items-center -m-1 p-1 focus-visible-ring rounded-md'>
                        <p className='block truncate mr-1'>{formData.currency}</p>
                        <HiChevronDown className='h-5 w-5' aria-hidden='true' />
                      </Listbox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='absolute mt-1 z-40 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                        {currencies.map((currency) => (
                          <Listbox.Option
                            key={currency.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 px-4 ${
                                active ? 'bg-gray-900 text-gray-200' : 'text-gray-400'
                              }`
                            }
                            value={currency.name}
                          >
                            {({ selected }) => (
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                  <Image
                                    src={currency.image}
                                    width={28}
                                    height={28}
                                    alt={currency.name + 'currency image'}
                                    className='rounded-full'
                                  />
                                  <p
                                    className={`block ml-3 text-gray-200  truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {currency.name}
                                  </p>
                                </div>
                                {selected ? (
                                  <span className='flex items-center text-gray-400'>
                                    <AiOutlineCheck className='h-4 w-4' aria-hidden='true' />
                                  </span>
                                ) : null}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

            <div className='border border-gray-700 rounded-2xl mt-4 px-6 '>
              <div className='flex items-center justify-between w-full my-4 '>
                <p className='text-sm font-medium text-gray-400'>Service charges</p>
                <p className='text-sm font-medium text-gray-400'>
                  <span className='ml-2 text-gray-200'>
                    {formData.price && `${0.02 * parseFloat(formData.price)} ${formData.currency}`}
                  </span>
                  <span className='ml-2'>2 %</span>
                </p>
              </div>
              <div className='border-t border-gray-700 w-full'></div>
              <div className='flex items-center justify-between w-full my-4'>
                <p className='text-sm font-medium text-gray-400'>You will receive</p>
                <p className='text-sm font-medium text-gray-400'>
                  <span>{formData.price ? `${0.98 * parseFloat(formData.price)} ${formData.currency}` : '_'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Create Button */}
          <div className='my-20'>
            <button onClick={handleCreate} className='button-indigo w-full'>
              Create NFT
            </button>
          </div>
        </div>

        <section className='xl:col-span-2 flex xl:justify-center mt-4 xl:mt-16 relative'>
          <div className='w-full max-w-xs'>
            <p className='text-white py-2'>Preview</p>
            <ItemCard
              name={formData.name}
              price={formData.price}
              image={!isItemImage ? coverUrl : itemUrl}
              rarity='COMMON'
              currency={formData.currency}
              game={params.product}
              totalItems={formData.totalItems}
              imageSizes='w-48 h-48'
              id='1'
            />
          </div>
        </section>
      </div>
    </main>
  )
}
