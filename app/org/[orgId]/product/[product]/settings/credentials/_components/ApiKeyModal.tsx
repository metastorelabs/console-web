'use client'

import { Fragment, useRef, useState } from 'react'

import { HiOutlineDuplicate, HiX } from 'react-icons/hi'

import { copyToClipboard } from '@/utils/common'
import { Dialog, Transition } from '@headlessui/react'

const ApiKeyModal = ({ children }: { children: React.ReactNode }) => {
  const cancelButtonRef = useRef(null)
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
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
                  <HiX
                    className='absolute top-4 right-4 text-gray-400 hover:text-gray-100 cursor-pointer h-6 w-6 hover:scale-110'
                    onClick={onClose}
                  />
                  <div className='px-4 pb-4 pt-5 sm:p-16'>
                    <div>
                      <div className='text-center'>
                        <Dialog.Title
                          as='h3'
                          className='text-2xl sm:text-3xl font-light leading-6 text-gray-100 mt-4 sm:mt-0'
                        >
                          Api Key
                        </Dialog.Title>
                        <div className='mt-3'>
                          <p className='text-sm text-gray-400'>
                            This keys are required to access Metastore APIs and SDKs.
                          </p>
                        </div>
                      </div>

                      <div className='mt-8 space-y-6'>
                        <div>
                          <span className='block text-sm font-medium leading-6 text-white'>Cliend ID</span>
                          <div className='mt-2 flex items-center justify-between rounded-md border-0 focus:outline-none bg-black/30 py-2 px-4 text-white shadow-sm sm:text-sm sm:leading-6'>
                            <p className='truncate'>sdanjn123-ksdank-123-m12</p>
                            <button
                              className='flex flex-shrink-0 items-center py-1 px-2 rounded-md cursor-pointer hover:bg-gray-900 focus-visible-ring'
                              onClick={() => copyToClipboard('sdanjn123')}
                            >
                              <HiOutlineDuplicate className='mr-1 text-white/50 hover:text-white/80 cursor-pointer text-lg' />
                              <span>Copy</span>
                            </button>
                          </div>
                          <span className='mt-1 ml-1 text-xs leading-5 text-gray-400'>
                            Can be used in client-side applications to access the API.
                          </span>
                        </div>

                        <div>
                          <span className='block text-sm font-medium leading-6 text-white'>Api Key</span>
                          <div className='mt-2 flex items-center justify-between rounded-md border-0 focus:outline-none bg-black/30 py-2 px-4 text-white shadow-sm sm:text-sm sm:leading-6'>
                            <p className='truncate'>********** ********** **********</p>
                            <button
                              className='flex flex-shrink-0 items-center py-1 px-2 rounded-md cursor-pointer hover:bg-gray-900 focus-visible-ring'
                              onClick={() => copyToClipboard('sdanjn123')}
                            >
                              <HiOutlineDuplicate className='mr-1 text-white/50 hover:text-white/80 cursor-pointer text-lg' />
                              <span>Copy</span>
                            </button>
                          </div>
                          <span className='mt-1 ml-1 text-xs leading-5 text-gray-400'>
                            Never store your API key in a client-side application.
                          </span>
                        </div>
                      </div>
                    </div>
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

export default ApiKeyModal
