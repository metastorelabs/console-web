'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import { HiDuplicate } from 'react-icons/hi'
import { HiTrash } from 'react-icons/hi2'

import { copyToClipboard } from '@/utils/common'
import clsx from 'clsx'
import { format } from 'date-fns-tz'

import AccessKeyModal from './_components/AccessKeyModal'
import ApiKeyModal from './_components/ApiKeyModal'

interface ApiKey {
  clientId: string
  clientSecret: string
  creationDate: string
}

interface AccessCode {
  code: string
  limit: string
  redeemed: string
  creationDate: string
}

const ApiKeys: ApiKey[] = [
  {
    clientId: '21d24w7gN4sdQ8PXecas-iOJLIoy7sPPphasak',
    clientSecret: '1Zv0zXcjzpC-3kcmWdZ7jG2z3L4nMwO_1B822CcKm_5FvDjWvw8CMM3yQxxUuTCi',
    creationDate: '2021-08-12T20:00:00Z',
  },
  {
    clientId: '21d247e2gN4sdQ8PXecas-iOJLIoy7sPPphasak',
    clientSecret: '1Zv0zXcjzpC-3kcmWdZ7jG2z3L4nMwO_1B822CcKm_5FvDjWvw8CMM3yQxxUuTCi',
    creationDate: '2021-08-12T20:00:00Z',
  },
  {
    clientId: '21d24w7gN4sdQ8PXecas-iOJLIoy7sPPphasak',
    clientSecret: '1Zv0zXcjzpC-3kcmWdZ7jG2z3L4nMwO_1B822CcKm_5FvDjWvw8CMM3yQxxUuTCi',
    creationDate: '2021-08-12T20:00:00Z',
  },
]

const AccessCodes: AccessCode[] = [
  {
    code: '21d24w7gN4sdQ8PXecas-iOJLIoy7sPPphasak',
    limit: '100',
    redeemed: '0',
    creationDate: '2021-08-12T20:00:00Z',
  },
  {
    code: '21d24w7gN4sdQ8PXecas-iOJLIoy7sPPphasak',
    limit: '100',
    redeemed: '0',
    creationDate: '2021-08-12T20:00:00Z',
  },
]

const page = () => {
  return (
    <div className='max-w-7xl pt-12 pb-16 space-y-32'>
      <ApiKeysComponent />
      <AccessCodesComponent />
    </div>
  )
}

const AccessCodesComponent = () => {
  const checkbox = useRef<HTMLInputElement | null>(null)
  const [checked, setChecked] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState<boolean>(false)
  const [selectedAccessCodes, setSelectedAccessCodes] = useState<AccessCode[]>([])

  useLayoutEffect(() => {
    const isIndeterminate = selectedAccessCodes.length > 0 && selectedAccessCodes.length < AccessCodes.length
    setChecked(selectedAccessCodes.length === AccessCodes.length)
    setIndeterminate(isIndeterminate)
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
  }, [selectedAccessCodes])

  const toggleAll = (): void => {
    setSelectedAccessCodes(checked || indeterminate ? [] : AccessCodes)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-white'>Access Codes</h1>
          <p className='mt-2 text-sm text-gray-300'>
            Enable access codes for your product. Only players with a valid code can access your product.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <AccessKeyModal>
            <button type='button' className='button-indigo'>
              Create access code
            </button>
          </AccessKeyModal>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto custom-scrollbar sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='max-h-96 relative'>
              <table className='min-w-full table-fixed divide-y divide-gray-800'>
                <thead className='bg-gray-950 sticky top-0 z-30'>
                  <tr>
                    <th scope='col' className='relative px-7 sm:w-12 sm:px-6'>
                      <input
                        type='checkbox'
                        className='absolute left-4 top-1/2 -mt-2 h-4 w-4  bg-gray-900 rounded border-gray-400 text-indigo-600 focus-ring focus:ring-indigo-600'
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th scope='col' className='min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-white'>
                      {selectedAccessCodes.length === 0 ? (
                        'Access Code'
                      ) : (
                        <div className='absolute left-14 top-0 flex h-12 items-center space-x-3 sm:left-12'>
                          <button
                            type='button'
                            className='rounded bg-white/10 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible-ring'
                          >
                            Delete all
                          </button>
                        </div>
                      )}
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                      Redeemed
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                      Limit
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                      Creation Date
                    </th>
                    <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-3'>
                      <span className='sr-only'>Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-800'>
                  {AccessCodes.map((code) => (
                    <tr key={code.code} className={selectedAccessCodes.includes(code) ? 'bg-black/30' : undefined}>
                      <td className='relative px-7 sm:w-12 sm:px-6'>
                        {selectedAccessCodes.includes(code) && (
                          <div className='absolute inset-y-0 left-0 w-0.5 bg-indigo-700' />
                        )}
                        <input
                          type='checkbox'
                          className='absolute left-4 top-1/2 -mt-2 h-4 w-4  bg-gray-800 rounded border-gray-400 text-indigo-600 focus-ring focus:ring-indigo-600'
                          value={code.code}
                          checked={selectedAccessCodes.includes(code)}
                          onChange={(e) =>
                            setSelectedAccessCodes(
                              e.target.checked
                                ? [...selectedAccessCodes, code]
                                : selectedAccessCodes.filter((p) => p !== code)
                            )
                          }
                        />
                      </td>
                      <td
                        className={clsx(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedAccessCodes.includes(code) ? 'text-indigo-600' : 'text-white'
                        )}
                      >
                        {code.code}
                        <button
                          type='button'
                          onClick={() => copyToClipboard(code.code, 'Access code copied to clipboard')}
                          className='focus-visible-ring ml-2 rounded -m-1 p-1'
                        >
                          <HiDuplicate className='w-5 h-5 inline-block text-gray-400 hover:text-white' />
                        </button>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>{code.redeemed}</td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>{code.limit}</td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                        {format(new Date(code.creationDate), 'MMM dd yyyy p')}
                      </td>
                      <td className='whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3'>
                        <button
                          type='button'
                          className='text-gray-300 hover:text-red-500 focus-visible-ring focus:ring-red-500 -m-1 p-1 rounded'
                        >
                          <span className='sr-only'>Delete</span>
                          <HiTrash className='w-5 h-5' aria-hidden='true' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ApiKeysComponent = () => {
  const checkbox = useRef<HTMLInputElement | null>(null)
  const [checked, setChecked] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState<boolean>(false)
  const [selectedApiKeys, setSelectedApiKey] = useState<ApiKey[]>([])

  useLayoutEffect(() => {
    const isIndeterminate = selectedApiKeys.length > 0 && selectedApiKeys.length < ApiKeys.length
    setChecked(selectedApiKeys.length === ApiKeys.length)
    setIndeterminate(isIndeterminate)
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
  }, [selectedApiKeys])

  const toggleAll = (): void => {
    setSelectedApiKey(checked || indeterminate ? [] : ApiKeys)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-white'>API Keys</h1>
          <p className='mt-2 text-sm text-gray-300'>Keys are required to access Metastore APIs and SDKs.</p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <ApiKeyModal>
            <button type='button' className='button-indigo'>
              Create API Key
            </button>
          </ApiKeyModal>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto custom-scrollbar sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='max-h-96 relative'>
              <table className='min-w-full table-fixed divide-y divide-gray-800'>
                <thead className='bg-gray-950 sticky top-0 z-30'>
                  <tr>
                    <th scope='col' className='relative px-7 sm:w-12 sm:px-6'>
                      <input
                        type='checkbox'
                        className='absolute left-4 top-1/2 -mt-2 h-4 w-4  bg-gray-900 rounded border-gray-400 text-indigo-600 focus-ring focus:ring-indigo-600'
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th scope='col' className='min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-white'>
                      {selectedApiKeys.length === 0 ? (
                        'Client ID'
                      ) : (
                        <div className='absolute left-14 top-0 flex h-12 items-center space-x-3 sm:left-12'>
                          <button
                            type='button'
                            className='rounded bg-white/10 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible-ring'
                          >
                            Delete all
                          </button>
                        </div>
                      )}
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                      Client Secret
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                      Creation date
                    </th>
                    <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-3'>
                      <span className='sr-only'>Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-800'>
                  {ApiKeys.map((key) => (
                    <tr key={key.clientId} className={selectedApiKeys.includes(key) ? 'bg-black/30' : undefined}>
                      <td className='relative px-7 sm:w-12 sm:px-6'>
                        {selectedApiKeys.includes(key) && (
                          <div className='absolute inset-y-0 left-0 w-0.5 bg-indigo-700' />
                        )}
                        <input
                          type='checkbox'
                          className='absolute left-4 top-1/2 -mt-2 h-4 w-4  bg-gray-800 rounded border-gray-400 text-indigo-600 focus-ring focus:ring-indigo-600'
                          value={key.clientId}
                          checked={selectedApiKeys.includes(key)}
                          onChange={(e) =>
                            setSelectedApiKey(
                              e.target.checked ? [...selectedApiKeys, key] : selectedApiKeys.filter((p) => p !== key)
                            )
                          }
                        />
                      </td>
                      <td
                        className={clsx(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedApiKeys.includes(key) ? 'text-indigo-600' : 'text-white'
                        )}
                      >
                        {key.clientId}
                        <button
                          type='button'
                          onClick={() => copyToClipboard(key.clientId, 'Client ID copied to clipboard')}
                          className='focus-visible-ring ml-2 rounded -m-1 p-1'
                        >
                          <HiDuplicate className='w-5 h-5 inline-block text-gray-400 hover:text-white' />
                        </button>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                        *****************************
                        <button
                          type='button'
                          onClick={() => copyToClipboard(key.clientSecret, 'Client Secret copied to clipboard')}
                          className='focus-visible-ring ml-2 rounded -m-1 p-1'
                        >
                          <HiDuplicate className='w-5 h-5 inline-block text-gray-400 hover:text-white' />
                        </button>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                        {format(new Date(key.creationDate), 'MMM dd yyyy p')}
                      </td>
                      <td className='whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3'>
                        <button
                          type='button'
                          className='text-gray-300 hover:text-red-500 focus-visible-ring focus:ring-red-500 -m-1 p-1 rounded'
                        >
                          <span className='sr-only'>Delete</span>
                          <HiTrash className='w-5 h-5' aria-hidden='true' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
