'use client'

import React, { useRef, useState } from 'react'

import Image from 'next/image'

import Button from '@/components/button'
import DeleteCheckModal from '@/components/DeleteCheckModal'

const Settings = ({
  params,
}: {
  params: {
    orgId: string
  }
}) => {
  const [userSetUrl, setuserSetUrl] = useState(false)
  const [orgName, setOrgName] = useState(params.orgId)
  const [orgUrl, setOrgUrl] = useState(params.orgId)
  const [avatar, setAvatar] = useState<File | null>(null)
  const fileUploadRef = useRef<HTMLInputElement>(null)

  return (
    <div className='divide-y divide-white/5'>
      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 pt-12 pb-16 md:grid-cols-3'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-white'>Organization Information</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>Provide basic information about your organization.</p>
        </div>

        <form className='md:col-span-2'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
            <div className='col-span-full flex items-center gap-x-8'>
              <Image
                src={avatar ? URL.createObjectURL(avatar) : '/temp/kojima.png'}
                alt=''
                className='rounded-lg bg-gray-800 object-cover aspect-square'
                width={96}
                height={96}
              />
              <div>
                <Button variant='fade' size='sm' onClick={() => fileUploadRef.current?.click()}>
                  Change logo
                </Button>
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
              <label htmlFor='org-name' className='block text-sm font-medium leading-6 text-white'>
                Organization name
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='org-name'
                  id='org-name'
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className='input-ui'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-white'>
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter your email address'
                  autoComplete='email'
                  className='input-ui'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor='org-url' className='block text-sm font-medium leading-6 text-white'>
                Organization URL
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md bg-white/5'>
                  <span className='flex select-none items-center pl-3 text-gray-400 sm:text-sm'>
                    console.meta-store.in/
                  </span>
                  <input
                    type='text'
                    name='org-url'
                    id='org-url'
                    value={userSetUrl ? orgUrl : orgName}
                    onChange={(e) => {
                      setOrgUrl(e.target.value)
                      setuserSetUrl(true)
                    }}
                    className='flex-1 border-0 bg-transparent focus:outline-none py-2 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='organization'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-8 flex'>
            <Button>Save changes</Button>
          </div>
        </form>
      </div>

      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-white'>Log out other sessions</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            Log out of your other sessions across all of your devices.
          </p>
        </div>

        <form className='flex items-start md:col-span-2'>
          <Button>Log out other sessions</Button>
        </form>
      </div>

      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-white'>Delete organization</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            This action is not reversible. All games and information related to this organization will be deleted
            permanently.
          </p>
        </div>

        <div className='flex items-start md:col-span-2'>
          <DeleteCheckModal keyword='organization' captchaText={params.orgId}>
            <Button variant='red'>Yes, delete my organization</Button>
          </DeleteCheckModal>
        </div>
      </div>
    </div>
  )
}

export default Settings
