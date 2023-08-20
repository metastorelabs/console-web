'use client'

import { Fragment, useRef, useState } from 'react'

import { HiOutlineDuplicate } from 'react-icons/hi'

import { copyToClipboard, textLimiter, toPositiveInteger } from '@/utils/common'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { format } from 'date-fns-tz'

import DateTimePicker from '@/components/DateTimePicker'

type FormData = {
  name: string
  quantity: string
  startDate: Date | undefined
  endDate: Date | undefined
}

const defaultFormData: FormData = {
  name: '',
  quantity: '1',
  startDate: undefined,
  endDate: undefined,
}

const AccessKeyModal = ({ children }: { children: React.ReactNode }) => {
  const cancelButtonRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [showAccessCode, setShowAccessCode] = useState(false)
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [accessCode, setAccessCode] = useState('d2gt1dt5')

  const onClose = () => {
    setOpen(false)
    setShowAccessCode(false)
    setFormData(defaultFormData)
  }

  const checkFormValidity = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      return false
    }

    return true
  }

  const createAccessCode = () => {
    if (!checkFormValidity()) {
      return
    }

    setShowAccessCode(true)
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-950 bg-opacity-90 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative w-full transform overflow-hidden rounded-lg bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:max-w-3xl'>
                  <div className='px-4 pb-4 pt-5 sm:p-16'>
                    {!showAccessCode ? (
                      <div>
                        <div className='text-center'>
                          <Dialog.Title
                            as='h3'
                            className='text-2xl sm:text-3xl font-light leading-6 text-gray-100 mt-4 sm:mt-0'
                          >
                            Create Access Codes
                          </Dialog.Title>
                          <div className='mt-3'>
                            <p className='text-sm text-gray-400'>
                              Enable access codes for your product. Only players with a valid code can access your
                              product.
                            </p>
                          </div>
                        </div>

                        <div className='mt-8 space-y-6'>
                          <div className='grid grid-cols-3 gap-x-4 gap-y-5 sm:gap-y-6'>
                            <div className='col-span-full sm:col-span-2'>
                              <label
                                htmlFor='accessCodeName'
                                className='block text-sm font-medium leading-6 text-white'
                              >
                                Access code Name
                              </label>
                              <div className='mt-2'>
                                <input
                                  type='text'
                                  name='accessCodeName'
                                  id='accessCodeName'
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      name: textLimiter(e.target.value, 42),
                                    })
                                  }
                                  className='input-ui'
                                  placeholder='Test codes, Promo codes, etc.'
                                />
                              </div>
                            </div>

                            <div className='col-span-full sm:col-span-1'>
                              <label htmlFor='quantity' className='block text-sm font-medium leading-6 text-white'>
                                Quantity
                              </label>
                              <div className='mt-2'>
                                <input
                                  type='text'
                                  name='quantity'
                                  id='quantity'
                                  value={formData.quantity}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      quantity: toPositiveInteger(e.target.value, false, 1),
                                    })
                                  }
                                  className='input-ui'
                                />
                              </div>
                            </div>
                          </div>

                          <div className='grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-y-6'>
                            <div className='col-span-full sm:col-span-1'>
                              <p className='block text-sm font-medium leading-6 text-gray-200 mb-2'>Start date</p>
                              <DateTimePicker
                                value={formData.startDate}
                                onValueChange={(date: Date) =>
                                  setFormData({
                                    ...formData,
                                    startDate: date,
                                  })
                                }
                                placeholder='Select date and time'
                              />
                              <p className='mt-2 text-xs text-gray-400'>
                                {formData.startDate &&
                                  `Access codes works from ${format(
                                    new Date(formData.startDate),
                                    'MMM dd yyyy p (zzzz)'
                                  )}`}
                              </p>
                            </div>

                            <div className='col-span-full sm:col-span-1'>
                              <p className='block text-sm font-medium leading-6 text-gray-200 mb-2'>End date</p>
                              <DateTimePicker
                                value={formData.endDate}
                                onValueChange={(date: Date) =>
                                  setFormData({
                                    ...formData,
                                    endDate: date,
                                  })
                                }
                                placeholder='Select date and time'
                              />
                              <p className='mt-2 text-xs text-gray-400'>
                                {formData.endDate &&
                                  `Access codes stops working from ${format(
                                    new Date(formData.endDate),
                                    'MMM dd yyyy p (zzzz)'
                                  )}`}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className='sm:flex mt-10'>
                          <button
                            type='button'
                            className='w-full justify-center rounded mr-8 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-ring ring-offset-2'
                            onClick={() => {
                              setOpen(false)
                            }}
                          >
                            Cancel
                          </button>

                          <button
                            type='button'
                            className={clsx(
                              'w-full justify-center rounded bg-blue-600 px-4 py-4 text-sm font-semibold text-white shadow-sm mt-3 sm:mt-0 focus-ring ring-offset-2 !ring-blue-700',
                              checkFormValidity() ? 'hover:bg-blue-700' : 'opacity-50'
                            )}
                            onClick={createAccessCode}
                            disabled={!checkFormValidity()}
                          >
                            Create Access Code
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className='text-center'>
                          <Dialog.Title
                            as='h3'
                            className='text-2xl sm:text-3xl font-light leading-6 text-gray-100 mt-4 sm:mt-0'
                          >
                            Access Code Created
                          </Dialog.Title>
                          <div className='mt-3'>
                            <p className='text-sm text-gray-400'>
                              Share this code with your players or testers. They will need this code to access your
                              product.
                            </p>
                          </div>
                        </div>

                        <div className='mt-8 text-center'>
                          {accessCode.split('').map((letter, index) => (
                            <span
                              key={index}
                              className='inline-flex border-2 border-gray-800 bg-black/10 rounded h-10 w-10 items-center justify-center text-sm font-semibold text-gray-200 mr-2'
                            >
                              {letter}
                            </span>
                          ))}
                          <button
                            className='flex items-center justify-center py-2 px-2 rounded-md cursor-pointer hover:bg-gray-800 text-white w-36 mx-auto mt-4 focus-visible-ring'
                            onClick={() => copyToClipboard(accessCode)}
                          >
                            <HiOutlineDuplicate className='mr-1 text-white/50 cursor-pointer text-lg' />
                            <span>Copy</span>
                          </button>
                        </div>

                        <div className='sm:flex mt-10'>
                          <button
                            type='button'
                            className='w-full justify-center rounded mr-8 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-ring ring-offset-2'
                            onClick={() => {
                              onClose()
                            }}
                          >
                            Close
                          </button>

                          <button
                            type='button'
                            className={clsx(
                              'w-full justify-center rounded bg-blue-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 mt-3 sm:mt-0 focus-ring ring-offset-2 !ring-blue-700'
                            )}
                            onClick={() => {
                              setFormData(defaultFormData)
                              setShowAccessCode(false)
                            }}
                          >
                            Create Another
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default AccessKeyModal
