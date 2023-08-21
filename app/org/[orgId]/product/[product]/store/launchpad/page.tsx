'use client'

import React, { useState } from 'react'

import clsx from 'clsx'
import { toast } from 'react-hot-toast'

import ConfirmationModal from '@/components/ConfirmationModal'

interface CategoryStructure {
  [category: string]: string[]
}

interface DataStructure {
  [env: string]: CategoryStructure
}

const Launchpad = () => {
  const initialData: DataStructure = {
    Dev: {
      'Store Details': ['General Information', 'Specification', 'Carousel'],
      Pricing: ['Pricing', 'Offers'],
      'Build and version': ['Browser'],
    },
    Review: {
      'Store Details': [],
      Pricing: [],
      'Build and version': [],
    },
    Live: {
      'Store Details': [],
      Pricing: [],
      'Build and version': [],
    },
  }

  const FirstTimeRequiredItems: CategoryStructure = {
    'Store Details': ['General Information', 'Specification', 'Carousel'],
    Pricing: ['Pricing'],
    'Build and version': ['Browser'],
  }

  const [data, setData] = useState<DataStructure>(initialData)
  const [selectedItems, setSelectedItems] = useState<CategoryStructure>({})
  const [isFirstTimeToLive, setIsFirstTimeToLive] = useState<boolean>(
    Object.keys(initialData.Live).every((category) => initialData.Live[category].length === 0)
  )
  const [underReview, setUnderReview] = useState<boolean>(false)
  const [pushToLiveEnabled, setPushToLiveEnabled] = useState<boolean>(false)

  const handleSelect = (env: string, category: string, item: string) => {
    const newSelectedItems = { ...selectedItems }
    if (!newSelectedItems[category]) newSelectedItems[category] = []
    const itemIndex = newSelectedItems[category].indexOf(item)
    if (itemIndex === -1) {
      newSelectedItems[category].push(item)
    }
    setSelectedItems(newSelectedItems)
  }

  const submitForReview = () => {
    if (isFirstTimeToLive && !isDataReadyForFirstTimeToLive()) {
      toast.error('First time to live requires all items.')
      return
    }

    setUnderReview(true)
    setTimeout(() => {
      setPushToLiveEnabled(true)
      setUnderReview(false)
    }, 5000)
  }

  const pushToReview = () => {
    const newSelectedItems = { ...selectedItems }
    const newData = { ...data }

    Object.keys(newSelectedItems).forEach((category) => {
      newSelectedItems[category].forEach((item) => {
        newData.Review[category].push(item)
        const itemIndex = newData.Dev[category].indexOf(item)
        newData.Dev[category].splice(itemIndex, 1)
      })
      // Reset the selected items for the category after pushing them to the Review
      newSelectedItems[category] = []
    })

    setPushToLiveEnabled(false)
    setUnderReview(false)
    setData(newData)
    setSelectedItems({ ...newSelectedItems })
  }

  const pushToLive = () => {
    const newItems = { ...data.Review }
    Object.keys(data.Review).forEach((category) => {
      newItems[category] = [...data.Review[category], ...data.Live[category]]
    })

    const newData = {
      ...data,
      Live: newItems,
      Review: {
        'Store Details': [],
        Pricing: [],
        'Build and version': [],
      },
    }

    setData(newData)
    setPushToLiveEnabled(false)
    setIsFirstTimeToLive(false)
  }

  const isDataReadyForFirstTimeToLive = () => {
    // check if all the FirstTimeRequiredItems are in the Review stage
    return Object.keys(FirstTimeRequiredItems).every((category) =>
      FirstTimeRequiredItems[category].every((item) => data.Review[category].includes(item))
    )
  }

  const hasSelectedItems = () => {
    const items = selectedItems || {}
    return Object.values(items).some((itemList) => itemList.length > 0)
  }

  const hasItems = (env: string) => {
    const items = data[env] || {}
    return Object.keys(items).some((category) => data[env][category].length > 0)
  }

  const renderItems = (env: string, category: string) => {
    return data[env][category].map((item) => (
      <div key={`${env}-${category}-${item}`} className='relative flex items-start bg-gray-950 py-2 px-3 rounded'>
        {env === 'Dev' && (
          <div className='flex h-6 items-center'>
            <input
              id={`${env}-${category}-${item}`}
              name={`${env}-${category}-${item}`}
              type='checkbox'
              className='h-4 w-4 rounded text-indigo-600 focus:ring-offset-gray-950 bg-gray-900 focus:ring-indigo-600'
              onChange={() => handleSelect(env, category, item)}
            />
          </div>
        )}
        <div className='ml-3 text-xs leading-6'>
          <label htmlFor={`${env}-${category}-${item}`} className='font-medium text-gray-100'>
            {item}
          </label>
        </div>
      </div>
    ))
  }

  const renderCategories = (env: string) => {
    return Object.keys(data[env]).map((category) => (
      <div key={`${env}-${category}`} className='bg-white/5 mt-4 rounded-lg py-3 px-4'>
        <h4 className='text-xs uppercase mb-2 font-semibold leading-8 text-gray-600'>{category}</h4>
        <div className='space-y-1.5'>{renderItems(env, category)}</div>
      </div>
    ))
  }

  return (
    <div>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Launchpad</h1>
      <p className='mt-2 text-sm text-slate-400'>Release your products to the world.</p>
      <div className='grid auto-rows-fr grid-cols-1 gap-8 mt-10 xl:mx-0 xl:grid-cols-3'>
        {Object.keys(data).map((env) => (
          <div
            key={env}
            className='bg-gray-950 rounded-lg p-6 ring-1 ring-gray-800 flex flex-col justify-between h-full'
          >
            <div>
              <h3 className='text-lg font-semibold leading-8 text-gray-100 flex items-center justify-between'>
                {env}
                <div>
                  {env === 'Review' && (underReview || pushToLiveEnabled) && (
                    <span
                      className={clsx(
                        'flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                        underReview ? 'text-rose-400 ring-rose-400/20 bg-rose-400/10' : '',
                        pushToLiveEnabled ? 'text-emerald-400 ring-emerald-400/20 bg-emerald-400/10' : ''
                      )}
                    >
                      {underReview && 'In Review'}
                      {pushToLiveEnabled && 'Ready'}
                    </span>
                  )}
                </div>
              </h3>
              {renderCategories(env)}
            </div>

            {env === 'Dev' && (
              <ConfirmationModal
                title='Are you sure you want to push to Review?'
                description="You won't be able to push to live until we review these new changes."
                onConfirm={pushToReview}
                disabled={!hasSelectedItems()}
                pause={!underReview && !pushToLiveEnabled}
              >
                <button
                  className={`w-full mt-6 rounded-lg py-2.5 text-sm font-semibold leading-6 text-gray-100 bg-indigo-700 ${
                    hasSelectedItems() ? 'hover:bg-indigo-800' : 'cursor-default opacity-50'
                  }`}
                >
                  Push to Review
                </button>
              </ConfirmationModal>
            )}

            {env === 'Review' && (
              <button
                className={clsx(
                  'w-full mt-6 rounded-lg py-2.5 text-sm font-semibold leading-6 text-gray-100',
                  pushToLiveEnabled
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : `bg-rose-700 ${hasItems('Review') && !underReview && 'hover:bg-rose-800'}`,
                  hasItems('Review') && !underReview ? '' : 'cursor-default opacity-50'
                )}
                onClick={pushToLiveEnabled ? pushToLive : submitForReview}
                disabled={!hasItems('Review') || underReview}
              >
                {pushToLiveEnabled ? 'Push to Live' : underReview ? 'Under Review' : 'Submit for Review'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Launchpad
