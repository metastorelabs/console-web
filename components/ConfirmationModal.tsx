'use client'

import { cloneElement, Fragment, useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import Button from './button'
import { ButtonVariants } from './button/type'

const ConfirmationModal = ({
  title,
  description = 'Are you sure you want to do this?',
  onConfirm,
  children,
  pause = false,
  disabled = false,
  btnColor = 'blue',
  btnText = 'Confirm',
}: {
  title: string
  onConfirm: () => void
  description?: string
  children: React.ReactElement
  pause?: boolean
  disabled?: boolean
  btnColor?: ButtonVariants
  btnText?: string
}) => {
  const cancelButtonRef = useRef(null)
  const [open, setOpen] = useState(false)

  const modifiedChildren = cloneElement(children, {
    onClick: () => {
      if (disabled) {
        return
      }
      if (!pause) {
        setOpen(true)
      } else {
        onConfirm()
      }
    },
  })

  return (
    <>
      {modifiedChildren}
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
                  <div className='px-4 pb-4 pt-5 sm:p-14'>
                    <div className='text-center'>
                      <Dialog.Title
                        as='h3'
                        className='text-2xl sm:text-3xl font-light leading-6 text-gray-100 mt-4 sm:mt-0'
                      >
                        {title}
                      </Dialog.Title>
                      <div className='mt-3'>
                        <p className='text-sm text-gray-400'>{description}</p>
                      </div>
                    </div>

                    <div className='sm:flex mt-10'>
                      <Button
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                        variant='white'
                        className='w-full mr-8'
                      >
                        Cancel
                      </Button>

                      <Button
                        className='w-full mt-3 sm:mt-0'
                        variant={btnColor}
                        onClick={() => {
                          onConfirm()
                          setOpen(false)
                        }}
                      >
                        {btnText}
                      </Button>
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

export default ConfirmationModal
