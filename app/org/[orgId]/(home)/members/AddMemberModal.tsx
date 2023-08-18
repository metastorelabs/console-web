'use client'

import { Fragment, useRef, useState } from 'react'

import { HiOutlineDuplicate } from 'react-icons/hi'

import { copyToClipboard } from '@/utils/common'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

import ListBox from '@/components/Listbox'

const expiryOptions = [
  { value: '30m', name: '30 minutes' },
  { value: '1h', name: '1 hour' },
  { value: '6h', name: '6 hours' },
  { value: '12h', name: '12 hours' },
  { value: '1d', name: '1 day' },
  { value: '7d', name: '7 days' },
  { value: 'never', name: 'Never' },
]

const usesLimitOptions = [
  { value: '1', name: '1 use' },
  { value: '5', name: '5 uses' },
  { value: '10', name: '10 uses' },
  { value: '20', name: '20 uses' },
  { value: '50', name: '50 uses' },
  { value: '100', name: '100 uses' },
  { value: 'nolimit', name: 'No limit' },
]

type LinkLimit = {
  expiryLimit: string
  usesLimit: string
}

const AddMemberModal = ({ orgId, children }: { orgId: string; children: React.ReactNode }) => {
  const cancelButtonRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [emailId, setEmailId] = useState('')
  const [showEditLinkPage, setShowEditLinkPage] = useState(false)
  const [link, setLink] = useState('https://console.metastore.to/p56Mnt3E')
  const [linkLimit, setLinkLimit] = useState<LinkLimit>({
    expiryLimit: '30m',
    usesLimit: '1',
  })

  const onClose = () => {
    setOpen(false)
    setEmailId('')
    setShowEditLinkPage(false)
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

          <div className='fixed inset-0 z-50'>
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
                <Dialog.Panel className='relative transform rounded-lg bg-gray-900 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl'>
                  <div className='px-4 pb-4 pt-5 sm:p-16'>
                    {showEditLinkPage ? (
                      <EditLinkPage
                        orgId={orgId}
                        setLink={setLink}
                        setShowEditLinkPage={setShowEditLinkPage}
                        setLinkLimit={setLinkLimit}
                      />
                    ) : (
                      <div>
                        <div className='text-center'>
                          <Dialog.Title
                            as='h3'
                            className='text-2xl sm:text-3xl font-light leading-6 text-gray-100  mt-4 sm:mt-0'
                          >
                            Add Member
                          </Dialog.Title>
                          <div className='mt-3'>
                            <p className='text-sm text-gray-400'>Invite a new member to your organization.</p>
                          </div>
                        </div>

                        <div className='mt-8 space-y-6'>
                          <div className='mt-6 flex gap-x-4'>
                            <label htmlFor='email-address' className='sr-only'>
                              Email address
                            </label>
                            <input
                              id='email-address'
                              name='email'
                              type='email'
                              autoComplete='email'
                              value={emailId}
                              onChange={(e) => setEmailId(e.target.value)}
                              required
                              className='input-ui'
                              placeholder='Enter email address'
                            />
                            <button type='button' className='button-indigo'>
                              Invite Member
                            </button>
                          </div>

                          <div className='relative mt-10'>
                            <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                              <div className='w-full border-t border-gray-700' />
                            </div>
                            <div className='relative flex justify-center text-sm font-medium leading-6'>
                              <span className='bg-gray-900 px-6 text-gray-100'>Or invite with</span>
                            </div>
                          </div>

                          <div>
                            <span className='block text-sm font-medium leading-6 text-white'>Invite Link</span>
                            <div className='mt-2 flex items-center justify-between rounded-md border-0 bg-black/30 py-2 px-4 text-white shadow-sm sm:text-sm sm:leading-6'>
                              <p className='truncate'>{link}</p>
                              <button
                                className='flex flex-shrink-0 items-center py-1 px-2 rounded-md hover:bg-gray-900 focus-visible-ring'
                                onClick={() => copyToClipboard(link)}
                              >
                                <HiOutlineDuplicate className='mr-1 text-white/50 hover:text-white/80 cursor-pointer text-lg' />
                                <span>Copy</span>
                              </button>
                            </div>
                            <span className='mt-1 ml-1 text-xs leading-5 text-gray-400'>
                              {linkLimit.usesLimit === 'nolimit' && linkLimit.expiryLimit === 'never'
                                ? 'Invite link has no usage limit and never expires.'
                                : linkLimit.usesLimit === 'nolimit'
                                ? 'Invite link has no usage limit and expires in ' +
                                  expiryOptions.find((option) => option.value === linkLimit.expiryLimit)?.name +
                                  '.'
                                : linkLimit.expiryLimit === 'never'
                                ? 'Invite link is limited to ' +
                                  usesLimitOptions.find((option) => option.value === linkLimit.usesLimit)?.name +
                                  ' and never expires.'
                                : 'Invite link is limited to ' +
                                  usesLimitOptions.find((option) => option.value === linkLimit.usesLimit)?.name +
                                  ' and expires in ' +
                                  expiryOptions.find((option) => option.value === linkLimit.expiryLimit)?.name +
                                  '.'}
                              <button
                                className='inline ml-1 text-indigo-500 focus-visible-ring hover:text-indigo-400 -mx-1 px-1'
                                onClick={() => setShowEditLinkPage(true)}
                              >
                                Edit Invite link
                              </button>
                            </span>
                          </div>
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

const EditLinkPage = ({
  orgId,
  setLink,
  setShowEditLinkPage,
  setLinkLimit,
}: {
  orgId: string
  setLink: (_link: string) => void
  setShowEditLinkPage: (_show: boolean) => void
  setLinkLimit: (_linkLimit: LinkLimit) => void
}) => {
  const [expiryLimit, setExpiryLimit] = useState('30m')
  const [usesLimit, setUsesLimit] = useState('1')

  return (
    <div>
      <div className='text-center'>
        <Dialog.Title as='h3' className='text-2xl sm:text-3xl font-light leading-6 text-gray-100  mt-4 sm:mt-0'>
          Edit Invite Link
        </Dialog.Title>
      </div>

      <div className='mt-8 space-y-6'>
        <div>
          <p className='block text-sm font-medium leading-6 text-white mb-1.5'>Expiry Limit</p>
          <ListBox options={expiryOptions} value={expiryLimit} setValue={(value) => setExpiryLimit(value)} />
        </div>

        <div>
          <p className='block text-sm font-medium leading-6 text-white mb-1.5'>Usage Limit</p>
          <ListBox options={usesLimitOptions} value={usesLimit} setValue={(value) => setUsesLimit(value)} />
        </div>
      </div>
      <div className='sm:flex mt-10'>
        <button
          type='button'
          className='w-full justify-center rounded mr-8 bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-ring ring-offset-2'
          onClick={() => {
            setShowEditLinkPage(false)
          }}
        >
          Back
        </button>

        <button
          type='button'
          className={clsx(
            'w-full justify-center rounded bg-emerald-600 px-4 py-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 mt-3 sm:mt-0 focus-ring ring-offset-2 !ring-green-700'
          )}
          onClick={() => {
            setLink('https://console.meta-store.in/15saMnt3E')
            setShowEditLinkPage(false)
            setLinkLimit({
              expiryLimit,
              usesLimit,
            })
          }}
        >
          Generate Link
        </button>
      </div>
    </div>
  )
}

export default AddMemberModal
