'use client'

import React, { useState } from 'react'

import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/button'
import LinkButton from '@/components/button/LinkButton'
import ResizableTextarea from '@/components/ResizableTextarea'

const NewVersion = ({
  params,
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/build-and-version`,
      name: 'Build and version',
    },
    {
      href: `/org/${params.orgId}/product/${params.product}/store/build-and-version/browser`,
      name: 'Browser',
    },
    {
      href: '#',
      name: 'New version',
    },
  ]

  const [formData, setFormData] = useState({
    version: '',
    description: '',
    url: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <h1 className='text-white text-xl md:text-2xl font-semibold mt-4'>Create new version</h1>

      <p className='mt-1 text-sm leading-6 text-gray-400'>It won&apos;t be visible to users until you publish it.</p>

      <form>
        <div className='border-b border-white/10 pb-12 max-w-2xl'>
          <div className='mt-8 space-y-8'>
            <div className='max-w-xs'>
              <label htmlFor='version' className='block text-sm font-medium leading-6 text-white'>
                Version
              </label>
              <div className='relative mt-2'>
                <span className='absolute bottom-1/2 select-none translate-y-1/2 left-4 text-gray-500 text-sm leading-6'>
                  v
                </span>
                <input
                  type='text'
                  name='version'
                  value={formData.version}
                  onChange={handleChange}
                  id='version'
                  className='input-ui !pl-7'
                  placeholder='1.0.0'
                />
              </div>
              <p className='mt-2 text-sm leading-6 text-gray-500'>Semantic versioning is recommended.</p>
            </div>

            <div>
              <label htmlFor='description' className='block text-sm font-medium leading-6 text-white'>
                Version description
              </label>
              <div className='mt-2'>
                <ResizableTextarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className='min-h-[128px] resize-none input-ui'
                  defaultValue={''}
                />
              </div>
              <p className='mt-2 text-sm leading-6 text-gray-500'>
                Briefly describe this version. It will be displayed in the what&apos;s new section.
              </p>
            </div>

            <div className='max-w-md'>
              <label htmlFor='url' className='block text-sm font-medium leading-6 text-white'>
                Browser game URL
              </label>
              <div className='relative mt-2'>
                <span className='absolute bottom-1/2 select-none translate-y-1/2 left-4 text-gray-500 text-sm leading-6'>
                  https://
                </span>
                <input
                  type='url'
                  name='url'
                  id='url'
                  value={formData.url}
                  onChange={handleChange}
                  className='input-ui !pl-16'
                  placeholder='www.example.com'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6 max-w-2xl'>
          <LinkButton
            href={`/org/${params.orgId}/product/${params.product}/store/build-and-version/browser`}
            variant='underline'
            size='md'
          >
            Go Back
          </LinkButton>
          <Button size='md'>Create version</Button>
        </div>
      </form>
    </div>
  )
}

export default NewVersion
