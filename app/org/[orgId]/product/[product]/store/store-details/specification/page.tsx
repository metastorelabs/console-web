'use client'

import React, { useState } from 'react'

import { AiFillApple, AiFillWindows } from 'react-icons/ai'
import { HiOutlineGlobeAlt } from 'react-icons/hi'

import clsx from 'clsx'
import { toast } from 'react-hot-toast'

import Breadcrumb from '@/components/Breadcrumb'

const tabs = [
  { name: 'Browser', icon: HiOutlineGlobeAlt, disabled: false },
  { name: 'Windows', icon: AiFillWindows, disabled: true },
  { name: 'Mac', icon: AiFillApple, disabled: true },
]

type Field = {
  name: string
  type: string
  isMinMax: boolean
  minPlaceholder: string
  maxPlaceholder: string
  required?: boolean
}

type Fields = {
  [key: string]: Field[]
}

const fields: Fields = {
  Browser: [
    {
      name: 'Browsers versions',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'Chrome 80, Safari 13',
      maxPlaceholder: 'Chrome 113, Safari 15',
      required: true,
    },
    {
      name: 'Browser Features',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'WebGL, WebRTC',
      maxPlaceholder: 'WebGL, WebRTC, Web Audio API',
    },
    {
      name: 'Internet Speed',
      type: 'text',
      isMinMax: true,
      minPlaceholder: '1 Mbps',
      maxPlaceholder: '10 Mbps',
      required: true,
    },
    {
      name: 'Memory',
      type: 'text',
      isMinMax: true,
      minPlaceholder: '1 GB',
      maxPlaceholder: '4 GB',
      required: true,
    },
    {
      name: 'Processor',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'Intel Core i3',
      maxPlaceholder: 'Intel Core i7',
    },
  ],
  Windows: [
    {
      name: 'OS version',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'Windows 10',
      maxPlaceholder: 'Windows 11',
      required: true,
    },
    {
      name: 'Memory',
      type: 'text',
      isMinMax: true,
      minPlaceholder: '1 GB',
      maxPlaceholder: '4 GB',
      required: true,
    },
    {
      name: 'Processor',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'Intel Core i3',
      maxPlaceholder: 'Intel Core i7',
      required: true,
    },
    {
      name: 'Graphics',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'Intel HD Graphics 4000',
      maxPlaceholder: 'NVIDIA GeForce GTX 1050',
      required: true,
    },
    {
      name: 'Storage',
      type: 'text',
      isMinMax: true,
      minPlaceholder: '6 GB',
      maxPlaceholder: '10 GB',
      required: true,
    },
    {
      name: 'DirectX',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'DirectX 11',
      maxPlaceholder: 'DirectX 12',
      required: true,
    },
    {
      name: 'Internet Speed',
      type: 'text',
      isMinMax: true,
      minPlaceholder: '1 Mbps',
      maxPlaceholder: '10 Mbps',
    },
  ],
  Mac: [
    {
      name: 'OS version',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'Mac OS 10.15',
      maxPlaceholder: 'Mac OS 12',
      required: true,
    },
    {
      name: 'Memory',
      type: 'text',
      isMinMax: true,
      minPlaceholder: '1 GB',
      maxPlaceholder: '4 GB',
      required: true,
    },
    {
      name: 'Processor',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'Intel Core i3',
      maxPlaceholder: 'Intel Core i7',
      required: true,
    },
    {
      name: 'Graphics',
      type: 'text',
      isMinMax: true,
      minPlaceholder: 'Intel HD Graphics 4000',
      maxPlaceholder: 'NVIDIA GeForce GTX 1050',
      required: true,
    },
    {
      name: 'Storage',
      type: 'text',
      isMinMax: true,
      minPlaceholder: '1 GB',
      maxPlaceholder: '4 GB',
      required: true,
    },
    {
      name: 'Internet Speed',
      type: 'text',
      isMinMax: true,
      minPlaceholder: '5 Mbps',
      maxPlaceholder: '8 Mbps',
    },
  ],
}

const Specification = ({
  params,
}: {
  params: {
    orgId: string
    product: string
  }
}) => {
  const [currentTab, setCurrentTab] = useState('Browser')
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string
  }>({})
  const [state, setState] = useState<{
    [key: string]: { [key: string]: { min: string; max: string } }
  }>(
    Object.entries(fields).reduce<{
      [key: string]: { [key: string]: { min: string; max: string } }
    }>((accumulator, [tabName, tabFields]) => {
      accumulator[tabName] = {}
      tabFields.forEach((field) => {
        accumulator[tabName][field.name] = { min: '', max: '' }
      })
      return accumulator
    }, {})
  )

  const breadcrumbItems = [
    {
      href: `/org/${params.orgId}/product/${params.product}/store/store-details`,
      name: 'Store Details',
    },
    {
      href: '#',
      name: 'Specification',
    },
  ]

  const onSubmit = () => {
    let allFieldsValid = true
    let errors: { [key: string]: string } = {}

    for (const tab of tabs) {
      if (tab.disabled) continue

      const currentTabFields = fields[tab.name]

      for (const field of currentTabFields) {
        if (field.required) {
          const fieldState = state[tab.name][field.name] // Corrected here
          if (!fieldState || !fieldState.min || !fieldState.max) {
            allFieldsValid = false
            errors = { ...errors, [`${tab.name}-${field.name}`]: 'Required' }
          }
        }
      }
    }

    setValidationErrors(errors)

    if (allFieldsValid) {
      toast.success('Specification updated successfully!')
      console.log(state)
    } else {
      toast.error('Please fill in the required fields.')
    }
  }

  const handleFieldChange = (
    fieldName: string,
    minOrMax: 'min' | 'max',
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fieldValue = event.target.value
    setState((prevState) => ({
      ...prevState,
      [currentTab]: {
        ...prevState[currentTab],
        [fieldName]: {
          ...prevState[currentTab][fieldName],
          [minOrMax]: fieldValue,
        },
      },
    }))

    if (validationErrors[`${currentTab}-${fieldName}`]) {
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[`${currentTab}-${fieldName}`]
        return newErrors
      })
    }
  }

  return (
    <div className='max-w-7xl'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='mt-6'>
        <h1 className='text-white text-2xl md:text-3xl font-bold'>Specification</h1>
        <p className='mt-2 text-sm text-slate-400'>Required system specifications to run your product.</p>
      </div>
      <div className='mt-6'>
        <div className='border-b border-gray-700'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setCurrentTab(tab.name)}
                disabled={tab.disabled}
                className={clsx(
                  currentTab === tab.name
                    ? 'border-indigo-500 text-indigo-500'
                    : 'border-transparent text-gray-500 hover:border-gray-300',
                  tab.disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
                  'group inline-flex w-full sm:w-auto justify-center items-center border-b-2 py-4 px-1 text-sm font-medium focus-visible-ring'
                )}
                aria-current={currentTab === tab.name ? 'page' : undefined}
              >
                <tab.icon
                  className={clsx(
                    currentTab === tab.name ? 'text-indigo-500' : 'text-gray-400',
                    'sm:-ml-0.5 sm:mr-2 h-5 w-5'
                  )}
                  aria-hidden='true'
                />
                <span className='hidden sm:inline'>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {currentTab === 'Browser' && (
        <SpecificationForm
          fields={fields.Browser}
          state={state}
          setState={setState}
          validationErrors={validationErrors}
          handleFieldChange={handleFieldChange}
          currentTab={currentTab}
        />
      )}

      <div className='mt-14 flex items-center border-t-2 py-3 max-w-7xl border-gray-800 justify-end gap-x-6'>
        <button type='button' onClick={onSubmit} className='button-indigo'>
          Save Changes
        </button>
      </div>
    </div>
  )
}

type SpecificationFormProps = {
  fields: Field[]
  state: { [key: string]: { [key: string]: { min: string; max: string } } }
  setState: React.Dispatch<
    React.SetStateAction<{
      [key: string]: { [key: string]: { min: string; max: string } }
    }>
  >
  validationErrors: { [key: string]: string }
  handleFieldChange: (_fieldName: string, _minOrMax: 'min' | 'max', _e: React.ChangeEvent<HTMLInputElement>) => void
  currentTab: string
}

const SpecificationForm: React.FC<SpecificationFormProps> = ({
  fields,
  state,
  setState,
  validationErrors,
  handleFieldChange,
  currentTab,
}) => {
  const handleInputChange = (
    fieldName: string,
    minOrMax: 'min' | 'max',
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.length > 80) {
      return
    }

    setState((prevState) => ({
      ...prevState,
      [currentTab]: {
        ...prevState[currentTab],
        [fieldName]: {
          ...prevState[currentTab][fieldName],
          [minOrMax]: event.target.value,
        },
      },
    }))

    handleFieldChange(fieldName, minOrMax, event)
  }

  return (
    <div className='mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-7xl'>
      {fields.map((field) => (
        <div key={field.name} className='col-span-3'>
          <h2 className='text-sm font-semibold leading-7 mb-2 ml-1 text-white'>
            {field.name} {field.required ? '*' : ''}
          </h2>
          <div className='isolate -space-y-px rounded-md shadow-sm bg-white/5'>
            <div
              className={`relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-700 focus-within:z-10 focus-within:ring-2 focus-within:ring-gray-400 ${
                validationErrors[`${currentTab}-${field.name}`] ? 'border border-red-600' : ''
              }`}
            >
              <div className='flex items-center justify-between text-xs font-medium text-gray-300'>
                <label htmlFor='name'>Minimum</label>
                <p className='text-gray-500'>{`${state[currentTab][field.name].min.length}/80`}</p>
              </div>
              <input
                type='text'
                name='min-value'
                id='min-value'
                className='block w-full border-0 p-0 text-gray-100 bg-transparent placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={field.minPlaceholder}
                value={state[currentTab][field.name].min}
                onChange={(e) => handleInputChange(field.name, 'min', e)}
                autoComplete='off'
              />
            </div>
            <div
              className={`relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-700 focus-within:z-10 focus-within:ring-2 focus-within:ring-gray-400 ${
                validationErrors[`${currentTab}-${field.name}`] ? 'border border-red-600' : ''
              }`}
            >
              <div className='flex items-center justify-between text-xs font-medium text-gray-300'>
                <label htmlFor='name'>Maximum</label>
                <p className='text-gray-500'>{`${state[currentTab][field.name].max.length}/80`}</p>
              </div>
              <input
                type='text'
                name='max-value'
                id='max-value'
                className='block w-full border-0 p-0 text-gray-100 bg-transparent placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={field.maxPlaceholder}
                value={state[currentTab][field.name].max}
                onChange={(e) => handleInputChange(field.name, 'max', e)}
                autoComplete='off'
              />
            </div>
          </div>
          {validationErrors[`${currentTab}-${field.name}`] && (
            <div className='text-red-500 ml-1 mt-1 text-xs'>{validationErrors[`${currentTab}-${field.name}`]}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Specification
