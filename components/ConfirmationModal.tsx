import { Fragment, useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

const ConfirmationModal = ({
  title,
  description = 'Are you sure you want to do this?',
  onConfirm,
  children,
  pause = false,
  disabled = false,
}: {
  title: string
  onConfirm: () => void
  description?: string
  children: React.ReactNode
  pause?: boolean
  disabled?: boolean
}) => {
  const cancelButtonRef = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => {
          if (disabled) {
            return
          }
          if (!pause) {
            setOpen(true)
          } else {
            onConfirm()
          }
        }}
      >
        {children}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={setOpen}>
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
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-gray-900 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg'>
                  <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                        <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-100'>
                          {title}
                        </Dialog.Title>
                        <div className='mt-2'>
                          <p className='text-sm text-gray-400'>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='px-4 pt-3 pb-5 sm:flex sm:flex-row-reverse sm:px-6 mt-2'>
                    <button
                      type='button'
                      className={clsx(
                        'inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-1/4'
                      )}
                      onClick={() => {
                        onConfirm()
                        setOpen(false)
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-1/4'
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
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

export default ConfirmationModal
