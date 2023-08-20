'use client'

import { useRef, useState } from 'react'

import { HiOutlineDuplicate } from 'react-icons/hi'

import { copyToClipboard } from '@/utils/common'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import DeleteCheckModal from '@/components/DeleteCheckModal'

const Settings = ({
  params: { orgId, product },
}: {
  params: {
    orgId: string
    product: string
  }
}) => {
  const [productName, setProductName] = useState(product)
  const [avatar, setAvatar] = useState<File | null>(null)
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleNameChange = () => {
    setProductName(productName)
    router.replace(`/org/${orgId}/product/${productName}/settings`)
  }

  return (
    <div className='divide-y divide-white/5'>
      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-12 md:grid-cols-3'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-white'>Product Information</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>Basic information about your product.</p>
        </div>

        <form className='md:col-span-2'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
            <div className='col-span-full flex items-center gap-x-8'>
              <Image
                src={avatar ? URL.createObjectURL(avatar) : '/temp/dslogo.jpeg'}
                alt=''
                className='rounded-lg bg-gray-800 object-cover aspect-square'
                width={96}
                height={96}
              />
              <div>
                <button
                  type='button'
                  onClick={() => fileUploadRef.current?.click()}
                  className='rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible-ring ring-offset-2'
                >
                  Change logo
                </button>
                <p className='mt-2 text-xs leading-5 text-gray-400'>JPG, GIF or PNG. 10MB max.</p>
              </div>

              <input
                id='file-upload'
                ref={fileUploadRef}
                name='file-upload'
                type='file'
                className='hidden'
                onChange={(e) => {
                  if (e.target.files) {
                    setAvatar(e.target.files[0])
                  }
                }}
                accept='image/*'
              />
            </div>

            <div className='col-span-full'>
              <span className='block text-sm font-medium leading-6 text-white'>Product ID</span>
              <div className='mt-2 flex items-center justify-between max-w-md rounded-md border-0 focus:outline-none bg-black/30 py-2 px-4 text-white shadow-sm sm:text-sm sm:leading-6'>
                <p className='truncate select-none'>1d32sdad17dsadasdas0dsa2</p>
                <HiOutlineDuplicate
                  className='text-white/50 hover:text-white/80 cursor-pointer text-lg'
                  onClick={() => copyToClipboard('1d32sdad17dsadasdas0dsa2')}
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor='product-name' className='block text-sm font-medium leading-6 text-white'>
                Product name
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='product-name'
                  id='product-name'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className='input-ui'
                />
              </div>
              <span className='mt-1 text-xs leading-5 text-gray-400'>
                Product name can&apos;t be changed after publishing.
              </span>
            </div>

            <div className='col-span-full'>
              <span className='block text-sm font-medium leading-6 text-white'>Product URL</span>
              <div className='mt-2 block rounded-md border-0 focus:outline-none bg-black/30 py-2 px-4 text-white shadow-sm sm:text-sm sm:leading-6'>
                <p className='truncate select-none'>metastore.to/app/{productName}</p>
              </div>
              <span className='mt-1 text-xs leading-5 text-gray-400'>
                Product URL is auto generated based on product name. It can&apos;t be changed.
              </span>
            </div>
          </div>

          <div className='mt-8 flex'>
            <button
              onClick={handleNameChange}
              type='button'
              disabled={productName === product}
              className={clsx('button-indigo', productName === product ? 'opacity-50' : '')}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>

      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-white'>Delete product</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            This action is not reversible. All game information will be deleted permanently. Live product will be
            reviewed by our team before deletion.
          </p>
        </div>

        <div className='flex items-start md:col-span-2'>
          <DeleteCheckModal keyword='product' captchaText={productName}>
            <button className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible-ring ring-offset-2 !ring-red-700'>
              Yes, delete my product
            </button>
          </DeleteCheckModal>
        </div>
      </div>
    </div>
  )
}

export default Settings
