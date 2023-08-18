import { Fragment, useRef, useState } from 'react'

import { HiExclamationTriangle } from 'react-icons/hi2'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

const DeleteCheckModal = ({
  keyword,
  captchaText,
  children,
}: {
  keyword: string
  captchaText?: string
  children: React.ReactNode
}) => {
  const cancelButtonRef = useRef(null)
  const [reCaptcha, setReCaptcha] = useState('')
  const [open, setOpen] = useState(false)

  const closeModel = () => {
    setOpen(false)
    setReCaptcha('')
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={closeModel}>
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
                  <div className='px-4 pb-4 pt-5 sm:p-8 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900/20 sm:mx-0 sm:h-10 sm:w-10'>
                        <HiExclamationTriangle className='h-6 w-6 text-red-500' aria-hidden='true' />
                      </div>
                      <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                        <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-100'>
                          Delete {keyword}
                        </Dialog.Title>
                        <div className='mt-2'>
                          <p className='text-sm text-gray-400'>
                            Are you sure you want to delete your {keyword}? All of your data will be permanently
                            removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className='mt-8 text-sm text-gray-400 mb-2'>
                      Please type <span className='font-semibold text-white'>{captchaText}</span> to confirm.
                    </p>

                    <input
                      type='text'
                      value={reCaptcha}
                      placeholder='Type here...'
                      onPaste={(e) => e.preventDefault()}
                      onChange={(e) => setReCaptcha(e.target.value)}
                      className='input-ui'
                    />
                  </div>
                  <div className='px-4 pt-3 pb-5 sm:flex sm:flex-row-reverse sm:px-8 mt-2'>
                    <button
                      type='button'
                      className={clsx(
                        'inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-1/4',
                        reCaptcha !== captchaText ? 'opacity-50' : ''
                      )}
                      onClick={() => {
                        if (reCaptcha === captchaText) {
                          closeModel()
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-1/4'
                      onClick={() => closeModel()}
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

export default DeleteCheckModal
