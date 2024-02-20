'use client'

import { useState } from 'react'

import { AiFillApple, AiFillWindows } from 'react-icons/ai'
import { HiOutlineGlobeAlt } from 'react-icons/hi'

import { toast } from 'react-hot-toast'

import Breadcrumb from '@/components/Breadcrumb'
import Button from '@/components/button'
import { PolygonaLogo } from '@/components/Icons'
import MultiSelect from '@/components/MultiSelect'

type formData = {
  platform: string[]
  genre: string[]
  feature: string[]
  chains: string[]
}

const platformOptions = [
  {
    name: 'Browser',
    value: 'browser',
    icon: HiOutlineGlobeAlt,
  },
  {
    name: 'Macos',
    value: 'macos',
    icon: AiFillApple,
    disabled: true,
  },
  {
    name: 'Windows',
    value: 'windows',
    icon: AiFillWindows,
    disabled: true,
  },
]

const featuresOptions = [
  {
    name: 'Cloud Saves',
    value: 'cloud-saves',
  },
  {
    name: 'Co-op',
    value: 'co-op',
  },
  {
    name: 'Controller Support',
    value: 'controller-support',
  },
  {
    name: 'Cross Platform',
    value: 'cross-platform',
  },
  {
    name: 'Multiplayer',
    value: 'multiplayer',
  },
  {
    name: 'NFT',
    value: 'nft-support',
  },
  {
    name: 'Single Player',
    value: 'singleplayer',
  },
  {
    name: 'VR',
    value: 'vr-support',
  },
]

const genreOptions = [
  {
    name: 'Action',
    value: 'action',
  },
  {
    name: 'Adventure',
    value: 'adventure',
  },
  {
    name: 'Card Game',
    value: 'card-game',
  },
  {
    name: 'Casual',
    value: 'casual',
  },
  {
    name: 'Fantasy',
    value: 'fantasy',
  },
  {
    name: 'Indie',
    value: 'indie',
  },
  {
    name: 'Open World',
    value: 'open-world',
  },
  {
    name: 'Puzzle',
    value: 'puzzle',
  },
  {
    name: 'RPG',
    value: 'rpg',
  },
  {
    name: 'Racing',
    value: 'racing',
  },
  {
    name: 'Shooter',
    value: 'shooter',
  },
  {
    name: 'Simulation',
    value: 'simulation',
  },
  {
    name: 'Sports',
    value: 'sports',
  },
  {
    name: 'Strategy',
    value: 'strategy',
  },
  {
    name: 'Survival',
    value: 'survival',
  },
]

const supportedChainsOptions = [
  {
    name: 'Polygon',
    value: 'polygon',
    icon: PolygonaLogo,
  },
]

const Attributes = ({
  params,
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  const initialFormData = {
    platform: [],
    genre: [],
    feature: [],
    chains: [],
  }

  const [formData, setFormData] = useState<formData>(initialFormData)

  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/store-details`,
      name: 'Store Details',
    },
    {
      href: '#',
      name: 'Attributes',
    },
  ]

  const handleSubmit = () => {
    // check if all the fields has at least one value
    if (formData.platform.length === 0) {
      toast.error('Please select at least one platform')
      return
    }

    if (formData.genre.length === 0) {
      toast.error('Please select at least one genre')
      return
    }

    if (formData.feature.length === 0) {
      toast.error('Please select at least one feature')
      return
    }

    if (formData.chains.length === 0) {
      toast.error('Please select at least one chain')
      return
    }

    toast.success('Attributes saved successfully')
  }

  return (
    <div className='max-w-5xl'>
      <Breadcrumb items={breadcrumbItems} />

      <div className='min-w-0 flex-1 mt-6'>
        <h1 className='text-white text-2xl md:text-3xl font-bold'>Attributes</h1>
        <p className='mt-2 text-sm text-slate-400'>Your game attributes to make it easier to find on the store.</p>
      </div>

      <div className='mt-10'>
        <div className='border-b border-white/10 pb-12'>
          <div className='mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-2'>
              <MultiSelect
                data={platformOptions}
                label='Supported platforms'
                emptyText='Select platforms'
                onSelectionChange={(selected: string[]) => setFormData({ ...formData, platform: selected })}
              />
            </div>

            <div className='sm:col-span-4'>
              <MultiSelect
                data={featuresOptions}
                label='Features'
                emptyText='Select features'
                showImage={false}
                onSelectionChange={(selected: string[]) => setFormData({ ...formData, feature: selected })}
              />
            </div>

            <div className='sm:col-span-2'>
              <MultiSelect
                data={supportedChainsOptions}
                label='Supported Chains'
                emptyText='Select chains'
                onSelectionChange={(selected: string[]) => setFormData({ ...formData, chains: selected })}
              />
            </div>

            <div className='sm:col-span-4'>
              <MultiSelect
                data={genreOptions}
                label='Genre'
                emptyText='Select genre'
                showImage={false}
                onSelectionChange={(selected: string[]) => setFormData({ ...formData, genre: selected })}
              />
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

export default Attributes
