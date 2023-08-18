'use client'

import { useState } from 'react'

import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'

type Settings = {
  [category: string]: {
    [key: string]: boolean
  }
}

const settingsOptions = [
  {
    title: 'Email Notifications',
    description: 'Set organization-wide email notification preferences.',
    settings: [
      {
        name: 'Reviewing Process',
        description: 'Get notified when your product has been reviewed for the release.',
      },
      {
        name: 'Product Review',
        description: 'Get notified when your product receives a new review or rating.',
      },
      {
        name: 'Daily/Weekly Sales Report',
        description: "Get notified with a summary of your product's sales performance.",
      },
      {
        name: 'New Feature',
        description:
          'Get notified when the marketplace releases a new feature or opportunity that may be beneficial for your product.',
      },
      {
        name: 'Policy Change',
        description: 'Get notified when there are significant changes to the marketplace policies or terms of service.',
      },
      {
        name: 'Promotion/Marketing Opportunity',
        description: "Get notified when there's an opportunity for promoting or marketing your product.",
      },
    ],
  },
  {
    title: 'Push Notifications',
    description: 'Set organization-wide push notification preferences.',
    settings: [
      {
        name: 'New Purchase',
        description: 'Get notified when someone buys your product.',
      },
      {
        name: 'Reviewing Process',
        description: 'Get notified when your product has been reviewed for the release.',
      },
      {
        name: 'Product Review',
        description: 'Get notified when your product receives a new review or rating.',
      },
    ],
  },
]

const Notification = () => {
  const [settings, setSettings] = useState<Settings>(
    settingsOptions.reduce((acc, settingGroup) => {
      acc[settingGroup.title] = {}
      settingGroup.settings.forEach((setting) => {
        acc[settingGroup.title][setting.name] = false // initially all settings are off
      })
      return acc
    }, {} as Settings)
  )

  const handleToggle = (category: string, name: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [name]: !prevSettings[category][name],
      },
    }))
  }

  const saveChange = () => {
    toast.success('Notification preference saved successfully!')
  }

  return (
    <div className=' divide-y divide-gray-700 max-w-7xl'>
      {settingsOptions.map((setting, settingIdx) => (
        <div key={settingIdx} className='grid grid-cols-1 gap-x-8 gap-y-10 pt-12 pb-16 md:grid-cols-3'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-white'>{setting.title}</h2>
            <p className='mt-1 text-sm leading-6 text-gray-400'>{setting.description}</p>
          </div>
          <form className='md:col-span-2'>
            <ul role='list' className='divide-y divide-gray-700'>
              {setting.settings.map((item, itemIds) => (
                <Switch.Group
                  key={item.name}
                  as='li'
                  className={clsx('flex items-center justify-between', itemIds === 0 ? 'pb-4' : 'py-4')}
                >
                  <span className='flex flex-grow flex-col'>
                    <Switch.Label as='span' className='text-sm font-medium leading-6 text-gray-100' passive>
                      {item.name}
                    </Switch.Label>
                    <Switch.Description as='span' className='text-sm text-slate-400'>
                      {item.description}
                    </Switch.Description>
                  </span>
                  <Switch
                    checked={settings[setting.title][item.name]}
                    onChange={() => handleToggle(setting.title, item.name)}
                    className={clsx(
                      settings[setting.title][item.name]
                        ? 'bg-indigo-600 focus-ring ring-offset-2 !ring-indigo-600'
                        : 'bg-gray-700 focus-ring ring-offset-2',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
                    )}
                  >
                    <span className='sr-only'>Use setting</span>
                    <span
                      className={clsx(
                        settings[setting.title][item.name] ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    >
                      <span
                        className={clsx(
                          settings[setting.title][item.name]
                            ? 'opacity-0 duration-100 ease-out'
                            : 'opacity-100 duration-200 ease-in',
                          'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                        )}
                        aria-hidden='true'
                      >
                        <svg className='h-3 w-3 text-gray-400' fill='none' viewBox='0 0 12 12'>
                          <path
                            d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                            stroke='currentColor'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </span>
                      <span
                        className={clsx(
                          settings[setting.title][item.name]
                            ? 'opacity-100 duration-200 ease-in'
                            : 'opacity-0 duration-100 ease-out',
                          'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                        )}
                        aria-hidden='true'
                      >
                        <svg className='h-3 w-3 text-indigo-600' fill='currentColor' viewBox='0 0 12 12'>
                          <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                        </svg>
                      </span>
                    </span>
                  </Switch>
                </Switch.Group>
              ))}
            </ul>
          </form>
        </div>
      ))}
      <div className='mt-6 pt-4 flex items-center justify-end gap-x-6'>
        <button
          type='reset'
          className='rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/5 focus-ring ring-offset-2'
        >
          Revert Changes
        </button>
        <button onClick={saveChange} className='button-indigo'>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Notification
