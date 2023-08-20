'use client'

import React, { useEffect, useState } from 'react'

import { toPositiveInteger } from '@/utils/common'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { format, zonedTimeToUtc } from 'date-fns-tz'
import toast from 'react-hot-toast'

import DateTimePicker from '@/components/DateTimePicker'
import ListBox from '@/components/Listbox'
import MultiSelect from '@/components/MultiSelect'

const priceOptions = [
  {
    name: 'Free',
    value: 'free',
    description: 'This product will be free of charge for all users.',
  },
  {
    name: 'Fixed price',
    value: 'fixed-price',
    description: 'Users will pay a fixed price for this product.',
  },
]

const allPaymentOptions = [
  {
    name: 'STORE',
    value: 'store',
    avatar: '/logo.png',
  },
  {
    name: 'USDT',
    value: 'usdt',
    avatar: '/logo/usdt-logo.png',
  },
]

type Duration = '1d' | '3d' | '1w' | '3w' | '1m' | '2m' | '3m'

const durationOptions: { name: string; value: Duration }[] = [
  { name: '1 day', value: '1d' },
  { name: '3 days', value: '3d' },
  { name: '1 week', value: '1w' },
  { name: '3 weeks', value: '3w' },
  { name: '1 month', value: '1m' },
  { name: '2 months', value: '2m' },
  { name: '3 months', value: '3m' },
]

type FormData = {
  priceType: 'free' | 'fixed-price'
  price: string
  paymentOptions: string[]
  offer: {
    percentage: string
    release: 'immediate' | 'scheduled'
    startDate: Date | undefined
    duration: string
  }
}

const releaseOptions = [
  {
    name: 'Immediate',
    value: 'immediate',
    description: 'Offer will be released immediately after publishing.',
  },
  {
    name: 'Scheduled',
    value: 'scheduled',
    description: 'Offer will be released on a specific date. Must be set two days prior.',
  },
]

const Pricing = () => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [formData, setFormData] = useState<FormData>({
    priceType: 'free',
    price: '4.99',
    paymentOptions: [],
    offer: {
      percentage: '',
      release: 'immediate',
      startDate: undefined,
      duration: '1d',
    },
  })

  const isThereOffer = Number(formData.offer.percentage) > 0 ? true : false
  const isTherePrice = formData.priceType === 'fixed-price' && Number(formData.price) > 0 ? true : false

  const priceNumber = parseFloat(formData.price)
  const offerNumber = parseFloat(formData.offer.percentage || '0')
  const discountedPrice = priceNumber * (1 - offerNumber / 100)

  // Determine fee percentage
  let feePercentage
  if (formData.paymentOptions.includes('store') && formData.paymentOptions.length > 1) {
    feePercentage = '8%-12%'
  } else if (formData.paymentOptions.includes('store')) {
    feePercentage = '8%'
  } else {
    feePercentage = '12%'
  }

  // Calculate fee and final price range
  let feeText, finalPriceText
  if (feePercentage === '8%-12%') {
    const feeLow = discountedPrice * 0.08
    const feeHigh = discountedPrice * 0.12
    feeText = `($${feeLow.toFixed(2)} - $${feeHigh.toFixed(2)})`

    const finalPriceLow = discountedPrice - feeLow
    const finalPriceHigh = discountedPrice - feeHigh
    finalPriceText = `($${finalPriceLow.toFixed(2)} - $${finalPriceHigh.toFixed(2)})`
  } else {
    const fee = discountedPrice * (parseFloat(feePercentage) / 100)
    feeText = `$${fee.toFixed(2)}`

    const finalPrice = discountedPrice - fee
    finalPriceText = `$${finalPrice.toFixed(2)}`
  }

  // if offerNumber is 100, then the duration can be only '1d', '3d', '1w' else it can be all of them.
  useEffect(() => {
    if (offerNumber === 100 && !['1d', '3d', '1w'].includes(formData.offer.duration)) {
      console.log('running continously')
      setFormData((prevFormData) => ({
        ...prevFormData,
        offer: { ...prevFormData.offer, duration: '1d' },
      }))
    }
  }, [offerNumber, formData.offer.duration])

  const validateForm = () => {
    // if priceType is fixed-price, then price must be a > 0 number
    if (formData.priceType === 'fixed-price' && !priceNumber) {
      toast.error('Please enter a valid price.', {
        id: 'price-error',
      })
      return false
    }

    // paymentOptions must be at least one
    if (formData.paymentOptions.length === 0) {
      toast.error('Please select at least one payment option.', {
        id: 'payment-options-error',
      })
      return false
    }

    // if offer.release is scheduled, then offer.startDate must be set
    if (formData.offer.release === 'scheduled' && !formData.offer.startDate) {
      toast.error('Please select offer start date.', {
        id: 'offer-start-date-error',
      })
      return false
    }

    return true
  }

  const handleSubmit = () => {
    let utcTime

    if (formData.priceType === 'free') {
      toast.success('Product published successfully!')
    } else {
      if (validateForm()) {
        toast.success('Product published successfully!')
      } else {
        return
      }
    }

    if (formData.offer.startDate) {
      // convert to UTC ISO String
      utcTime = zonedTimeToUtc(formData.offer.startDate, userTimeZone).toISOString()
    }
  }

  return (
    <div>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Pricing and offer</h1>
      <p className='mt-2 text-sm text-slate-400'>Setup pricing and offer for your product.</p>

      <div className='mt-10'>
        <h2 className='text-base font-semibold leading-7 text-white'>Choose a price for your product</h2>
        <p className='mt-1 text-xs leading-4 text-gray-400 max-w-2xl'>
          Please note that Metastore charges a 8% fee for transactions using the STORE payment method and an 12% fee for
          all other payment methods on every product sale.
        </p>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-3xl'>
          <div className='col-span-full'>
            <p className='block text-sm font-medium leading-6 text-gray-200 mb-2'>Pricing options</p>
            <RadioGroup value={formData.priceType} onChange={(value) => setFormData({ ...formData, priceType: value })}>
              <RadioGroup.Label className='sr-only'>Privacy setting</RadioGroup.Label>
              <div className='-space-y-px rounded-md bg-black/5'>
                {priceOptions.map((po, priceIdx) => (
                  <RadioGroup.Option
                    key={po.name}
                    value={po.value}
                    className={({ checked }) =>
                      clsx(
                        priceIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                        priceIdx === priceOptions.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                        checked ? 'z-10 border-gray-500 bg-black/30' : 'border-gray-700',
                        'relative flex cursor-pointer border p-4 focus-visible-ring'
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <span
                          className={clsx(
                            checked ? 'bg-indigo-600 border-transparent' : 'bg-gray-900 border-gray-300',
                            active ? 'ring-2 ring-offset-2 ring-indigo-600 ring-offset-gray-900' : '',
                            'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                          )}
                          aria-hidden='true'
                        >
                          <span className={clsx('rounded-full  w-1.5 h-1.5', checked ? 'bg-white' : 'bg-gray-900')} />
                        </span>
                        <span className='ml-3 flex flex-col'>
                          <RadioGroup.Label as='span' className='block text-sm font-medium text-gray-200'>
                            {po.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description as='span' className='block text-sm text-gray-500'>
                            {po.description}
                          </RadioGroup.Description>
                        </span>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          {formData.priceType === 'fixed-price' && (
            <>
              <div className='sm:col-span-2'>
                <label htmlFor='price' className='block text-sm font-medium leading-6 text-gray-200'>
                  Base price
                </label>
                <div className='relative mt-2 rounded-md shadow-sm'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <span className='text-gray-500 sm:text-sm'>$</span>
                  </div>
                  <input
                    type='text'
                    name='price'
                    id='price'
                    value={formData.price}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        price: toPositiveInteger((e.target as HTMLInputElement).value, true, 0, 5000),
                      })
                    }
                    className='block w-full rounded-md border-0 py-2 pl-7 bg-white/5 pr-12 text-gray-200 placeholder:text-gray-400 focus-ring sm:text-sm sm:leading-6'
                    placeholder='0.00'
                  />
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                    <span className='text-gray-500 sm:text-sm' id='price-currency'>
                      USD
                    </span>
                  </div>
                </div>
                <p className='mt-2 text-xs text-gray-400'>Maxiumum price is $5000</p>
              </div>
              <div className='sm:col-span-4'>
                <MultiSelect
                  data={allPaymentOptions}
                  label='Payment options'
                  emptyText='Select Payment Options'
                  showImage={true}
                  onSelectionChange={(selected: string[]) => setFormData({ ...formData, paymentOptions: selected })}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {formData.priceType === 'fixed-price' && (
        <div className='mt-14'>
          <div className={isTherePrice ? '' : 'opacity-20 select-none'}>
            <h2 className='text-base font-semibold leading-7 text-white'>Choose an offer for your product</h2>
            <p className='mt-1 text-xs leading-4 text-gray-400 max-w-2xl'>
              You can choose to offer a discount on your product for a limited time.
            </p>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-3xl'>
            <div className={clsx('sm:col-span-2', isTherePrice ? '' : 'opacity-20 select-none')}>
              <label htmlFor='offer' className='block text-sm font-medium leading-6 text-gray-200'>
                Offer percentage
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <input
                  type='text'
                  name='offer'
                  id='offer'
                  disabled={!isTherePrice}
                  value={formData.offer.percentage}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      offer: {
                        ...formData.offer,
                        percentage: toPositiveInteger((e.target as HTMLInputElement).value, false, 0, 100),
                      },
                    })
                  }
                  className='input-ui'
                  placeholder='0'
                  aria-describedby='offer-price'
                />
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <span className='text-gray-500 sm:text-sm'>%</span>
                </div>
              </div>
            </div>

            <>
              <div className={clsx('col-span-full', isThereOffer && isTherePrice ? '' : 'opacity-20 select-none')}>
                <p className='block text-sm font-medium leading-6 text-gray-200 mb-2'>Offer release</p>
                <RadioGroup
                  value={formData.offer.release}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      offer: { ...formData.offer, release: value },
                    })
                  }
                >
                  <RadioGroup.Label className='sr-only'>Privacy setting</RadioGroup.Label>
                  <div className='-space-y-px rounded-md bg-black/5'>
                    {releaseOptions.map((release, releaseIdx) => (
                      <RadioGroup.Option
                        key={release.name}
                        disabled={!isThereOffer || !isTherePrice}
                        value={release.value}
                        className={({ checked }) =>
                          clsx(
                            releaseIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                            releaseIdx === releaseOptions.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                            checked ? 'z-10 border-gray-500 bg-black/30' : 'border-gray-700',
                            'relative flex border p-4 focus:outline-none',
                            isThereOffer && isTherePrice ? 'cursor-pointer' : ' cursor-default'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <span
                              className={clsx(
                                checked ? 'bg-indigo-600 border-transparent' : 'bg-gray-900 border-gray-300',
                                active ? 'ring-2 ring-offset-2 ring-indigo-600' : '',
                                'mt-0.5 h-4 w-4 shrink-0 rounded-full border flex items-center justify-center'
                              )}
                              aria-hidden='true'
                            >
                              <span
                                className={clsx('rounded-full  w-1.5 h-1.5', checked ? 'bg-white' : 'bg-gray-900')}
                              />
                            </span>
                            <span className='ml-3 flex flex-col'>
                              <RadioGroup.Label as='span' className='block text-sm font-medium text-gray-200'>
                                {release.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description as='span' className='block text-sm text-gray-500'>
                                {release.description}
                              </RadioGroup.Description>
                            </span>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div
                className={clsx(
                  'sm:col-span-3',
                  isThereOffer && isTherePrice && formData.offer.release === 'scheduled' ? '' : 'opacity-20 select-none'
                )}
              >
                <p className='block text-sm font-medium leading-6 text-gray-200 mb-2'>Offer start date</p>
                <DateTimePicker
                  value={formData.offer.startDate}
                  onValueChange={(date: Date) =>
                    setFormData({
                      ...formData,
                      offer: { ...formData.offer, startDate: date },
                    })
                  }
                  placeholder='Select date and time'
                  disabled={!isThereOffer || !isTherePrice || formData.offer.release !== 'scheduled'}
                />
                <p className='mt-2 text-xs text-gray-400'>
                  {formData.offer.startDate &&
                    `Offer will start on ${format(new Date(formData.offer.startDate), 'MMM dd yyyy p (zzzz)')}`}
                </p>
              </div>

              <div
                className={clsx(
                  'sm:col-span-3',
                  isThereOffer && isTherePrice ? '' : 'opacity-20 select-none cursor-default'
                )}
              >
                <p className='block text-sm font-medium leading-6 text-gray-200 mb-2'>Offer duration</p>
                <ListBox
                  options={formData.offer.percentage === '100' ? durationOptions.slice(0, 3) : durationOptions}
                  disabled={!isThereOffer || !isTherePrice}
                  value={formData.offer.duration}
                  setValue={(selected) =>
                    setFormData({
                      ...formData,
                      offer: { ...formData.offer, duration: selected },
                    })
                  }
                />
                <p className='mt-2 text-xs text-gray-400'>
                  The Duration period of the offer. 100% offer has limited duration options.
                </p>
              </div>
            </>
          </div>
        </div>
      )}

      {isTherePrice && formData.paymentOptions.length > 0 && (
        <div className='mt-14 max-w-3xl'>
          <div className='rounded-lg bg-black/25 px-6 py-6'>
            <h2 className='text-white font-semibold'>Pricing overview</h2>
            <dl className='divide-y divide-gray-700 text-sm mt-6'>
              <div className='flex items-center justify-between pb-4'>
                <dt className='text-gray-500'>Product price</dt>
                <dd className='font-medium text-gray-100'>${priceNumber}</dd>
              </div>
              <div className='flex items-center justify-between py-4'>
                <dt className='text-gray-500'>Offer</dt>
                <dd className='font-medium text-gray-100'>- {offerNumber || '0'}%</dd>
              </div>
              <div className='flex items-center justify-between py-4'>
                <dt className='text-gray-500'>Fee ({feePercentage})</dt>
                <dd className='font-medium text-gray-100'>{feeText}</dd>
              </div>
              <div className='flex items-center justify-between pt-4'>
                <dt className='font-medium text-gray-100'>You&apos;ll get currency worth of</dt>
                <dd className='font-medium text-indigo-500'>{finalPriceText}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      <div className='mt-14 border-t pt-6 border-white/10 flex items-center justify-end gap-x-6 max-w-3xl'>
        <button type='submit' onClick={handleSubmit} className='button-indigo'>
          Save changes
        </button>
      </div>
    </div>
  )
}

export default Pricing
