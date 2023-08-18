'use client'

import { Fragment, useRef, useState } from 'react'

import { HiOutlineUpload } from 'react-icons/hi'

import { textLimiter } from '@/utils/common'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CreateOrgModal = ({ children }: { children: React.ReactNode }) => {
  const cancelButtonRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [orgName, setOrgName] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const onClose = () => {
    setOpen(false)
    setStep(1)
    setOrgName('')
    setAvatar(null)
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
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-gray-900 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl'>
                  <div className='px-4 pb-4 pt-5 sm:p-16'>
                    {step === 1 ? (
                      <div>
                        <div className='text-center'>
                          <Dialog.Title
                            as='h3'
                            className='text-2xl sm:text-3xl font-light leading-6 text-gray-100 mt-4 sm:mt-0'
                          >
                            Create Organization
                          </Dialog.Title>
                          <div className='mt-3'>
                            <p className='text-sm text-gray-400'>
                              Create an organization to collaborate and work on your products.
                            </p>
                          </div>
                        </div>

                        <div className='mt-8 space-y-6'>
                          <div>
                            <label htmlFor='orgName' className='block text-sm font-medium leading-6 text-white'>
                              Organization Name
                            </label>
                            <div className='mt-2'>
                              <input
                                type='text'
                                name='orgName'
                                id='orgName'
                                value={orgName}
                                onChange={(e) => setOrgName(textLimiter(e.target.value, 64))}
                                className='input-ui'
                              />
                            </div>
                          </div>

                          <div>
                            <p className='truncate text-sm mb-1 text-gray-200'>
                              https://console.metastore.to/
                              {orgName}
                            </p>
                            <span className='mt-1 text-xs leading-5 text-gray-400'>
                              Organization URL is auto generated based on organization name. It can&apos;t be changed.
                            </span>
                          </div>
                        </div>

                        <div className='sm:flex mt-10'>
                          <button
                            type='button'
                            className='w-full justify-center rounded mr-8 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-ring ring-offset-2'
                            onClick={onClose}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>

                          <button
                            type='button'
                            className={clsx(
                              'w-full justify-center rounded bg-blue-600 px-4 py-4 text-sm font-semibold text-white shadow-sm mt-3 sm:mt-0 focus-ring ring-offset-2 !ring-blue-700',
                              !orgName ? 'opacity-50' : 'hover:bg-blue-700'
                            )}
                            disabled={!orgName}
                            onClick={() => setStep(2)}
                          >
                            Continue
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
                            Upload Avatar (Optional)
                          </Dialog.Title>
                          <div className='mt-3'>
                            <p className='text-sm text-gray-400'>
                              It won&apos;t be visible in the marketplace. It is solely for ease of access.
                            </p>
                          </div>
                        </div>

                        <div className='mt-8 text-center'>
                          <button
                            className='w-44 flex mx-auto relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center focus-visible-ring'
                            onClick={() => fileUploadRef.current?.click()}
                          >
                            {avatar ? (
                              <Image
                                src={URL.createObjectURL(avatar)}
                                alt='avatar'
                                width={176}
                                height={176}
                                className='aspect-square object-cover'
                              />
                            ) : (
                              <HiOutlineUpload className='h-8 w-8 text-gray-400' />
                            )}

                            <input
                              id='file-upload'
                              ref={fileUploadRef}
                              name='file-upload'
                              type='file'
                              className='hidden'
                              onChange={(e) => {
                                if (e.target.files) {
                                  setAvatar(e.target.files[0])
                                }
                              }}
                              accept='image/*'
                            />
                          </button>
                          <span className='text-xs leading-5 text-gray-400'>PNG, JPG, GIF up to 10MB</span>
                        </div>

                        <div className='sm:flex mt-10'>
                          <button
                            type='button'
                            className='w-full justify-center rounded mr-8 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-ring ring-offset-2'
                            onClick={() => {
                              setStep(1)
                            }}
                          >
                            Back
                          </button>

                          <button
                            type='button'
                            className={clsx(
                              'w-full justify-center rounded bg-blue-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 mt-3 sm:mt-0 focus-ring ring-offset-2 !ring-blue-700'
                            )}
                            onClick={() => {
                              setOpen(false)
                              router.push(`/org/${orgName}`)
                            }}
                          >
                            Confirm
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

export default CreateOrgModal
