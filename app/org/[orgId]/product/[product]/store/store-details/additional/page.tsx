'use client'

import { useState } from 'react'

import { toast } from 'react-hot-toast'

import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/button'
import ListBox from '@/components/Listbox'
import MultiSelect from '@/components/MultiSelect'
import ResizableTextarea from '@/components/ResizableTextarea'

const pegiAgeRatingOptions = [
  { name: '12+', value: '12' },
  { name: '16+', value: '16' },
  { name: '18+', value: '18' },
]

const contentDescriptorsOptions = [
  { name: 'Strong Violence', value: 'strong-violence' },
  { name: 'Foul Language', value: 'foul-language' },
  { name: 'Nudity', value: 'nudity' },
  { name: 'Sexual Content', value: 'sexual-content' },
  { name: 'Drug Use', value: 'drug-use' },
  { name: 'Alcohol Use', value: 'alcohol-use' },
  { name: 'Gambling', value: 'gambling' },
  { name: 'Blood and Gore', value: 'blood-and-gore' },
  { name: 'Discrimination', value: 'discrimination' },
]

type formData = {
  developerName: string
  publisherName: string
  ageRating: string
  contentDescriptors: string[]
  supportPageLink: string
  supportEmailAddress: string
  releaseDate: string
  privacyLink: string
  legalInfo: string
}

const Additional = ({
  params,
}: {
  params: {
    orgId: string
    product: string
  }
}) => {
  const [formData, setFormData] = useState<formData>({
    developerName: '',
    publisherName: '',
    ageRating: '18',
    contentDescriptors: [],
    supportPageLink: '',
    supportEmailAddress: '',
    releaseDate: '',
    privacyLink: '',
    legalInfo: '',
  })

  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/store-details`,
      name: 'Store Details',
    },
    {
      href: '#',
      name: 'Additional Information',
    },
  ]

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = () => {
    if (!formData.developerName) {
      toast.error('Developer name is required')
      return
    }

    if (!formData.publisherName) {
      toast.error('Publisher name is required')
      return
    }

    if (!formData.supportPageLink && !formData.supportEmailAddress) {
      toast.error('Support page link or support email address is required')
      return
    }

    if (formData.contentDescriptors.length === 0) {
      toast.error('Content descriptors is required')
      return
    }

    toast.success('Additional information saved successfully')
  }

  return (
    <div className='max-w-6xl'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='mt-6'>
        <h1 className='text-white text-2xl md:text-3xl font-bold'>Additional Information</h1>
        <p className='mt-2 text-sm text-slate-400'>Provide additional information about your store.</p>
      </div>

      <div className='mt-7 grid grid-cols-1 gap-x-6 gap-y-8 md:gap-y-12 sm:grid-cols-6'>
        <div className='sm:col-span-3'>
          <label htmlFor='developerName' className='block text-sm font-medium leading-6 text-white'>
            Developer Name *
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='developerName'
              id='developerName'
              onChange={handleChange}
              value={formData.developerName}
              className='input-ui'
              placeholder='Enter developer name'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label htmlFor='publisherName' className='block text-sm font-medium leading-6 text-white'>
            Publisher Name *
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='publisherName'
              id='publisherName'
              value={formData.publisherName}
              onChange={handleChange}
              className='input-ui'
              placeholder='Enter publisher name'
            />
          </div>
          <p className='mt-2 text-xs text-slate-500 ml-1'>It can be the same as developer name.</p>
        </div>

        <div className='sm:col-span-1'>
          <label htmlFor='ageRating' className='block text-sm font-medium leading-6 text-white'>
            Age Rating *
          </label>
          <div className='mt-2'>
            <ListBox
              options={pegiAgeRatingOptions}
              value={formData.ageRating}
              setValue={(value) => {
                setFormData({ ...formData, ageRating: value })
              }}
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label htmlFor='releaseDate' className='block text-sm font-medium leading-6 text-white'>
            Release Date *
          </label>
          <div className='mt-2'>
            <input
              type='date'
              name='releaseDate'
              id='releaseDate'
              value={formData.releaseDate}
              onChange={handleChange}
              className='input-ui'
              placeholder='Enter date'
            />
          </div>
          <p className='mt-2 text-xs text-slate-500 ml-1'>
            If never released before, leave blank. We will take the date of the first release.
          </p>
        </div>

        <div className='sm:col-span-3'>
          <div>
            <MultiSelect
              data={contentDescriptorsOptions}
              label='Content Descriptors *'
              emptyText='Select content descriptors'
              showImage={false}
              onSelectionChange={(selected: string[]) => setFormData({ ...formData, contentDescriptors: selected })}
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label htmlFor='ageRating' className='block text-sm font-medium leading-6 text-white'>
            User support *
          </label>
          <div className='isolate -space-y-px rounded-md shadow-sm mt-2 bg-white/5'>
            <div
              className={`relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-700 focus-within:z-10 focus-within:ring-2 focus-within:ring-gray-300`}
            >
              <div className='text-xs font-medium text-gray-500'>
                <label htmlFor='supportPageLink'>Support page link</label>
              </div>
              <input
                type='text'
                name='supportPageLink'
                id='supportPageLink'
                value={formData.supportPageLink}
                onChange={handleChange}
                className='block w-full border-0 p-0 text-gray-100 bg-transparent placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
            <div
              className={`relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-700 focus-within:z-10 focus-within:ring-2 focus-within:ring-gray-300`}
            >
              <div className='text-xs font-medium text-gray-500'>
                <label htmlFor='supportEmailAddress'>Support email address</label>
              </div>
              <input
                type='text'
                name='supportEmailAddress'
                id='supportEmailAddress'
                value={formData.supportEmailAddress}
                onChange={handleChange}
                className='block w-full border-0 p-0 text-gray-100 bg-transparent placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <p className='mt-2 text-xs text-slate-500 ml-1'>
            Provide atleast one of the above. It will be shared with users in need of assistance with your app.
          </p>
        </div>

        <div className='sm:col-span-3'>
          <label htmlFor='privacyLink' className='block text-sm font-medium leading-6 text-white'>
            Privacy link (optional)
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='privacyLink'
              id='privacyLink'
              onChange={handleChange}
              value={formData.privacyLink}
              className='input-ui'
              placeholder='Enter privacy link'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label htmlFor='legalInfo' className='block text-sm font-medium leading-6 text-white'>
            Legal Info (optional)
          </label>
          <div className='mt-2'>
            <ResizableTextarea
              id='legalInfo'
              name='legalInfo'
              value={formData.legalInfo}
              onChange={handleChange}
              rows={3}
              className='min-h-[128px] resize-none input-ui'
              placeholder='Enter legal info like Copyright, Trademark Information etc.'
            />
          </div>
          <p className='mt-2 text-xs text-slate-500 ml-1'>This will be displayed at the footer of your product page.</p>
        </div>
      </div>

      <div className='mt-14 flex items-center border-t-2 py-3 border-gray-800 justify-end gap-x-6'>
        <Button onClick={onSubmit}>Save Changes</Button>
      </div>
    </div>
  )
}

export default Additional
