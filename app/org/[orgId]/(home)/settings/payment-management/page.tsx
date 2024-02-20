'use client'

import React, { useState } from 'react'

import { textLimiter } from '@/utils/common'
import { toast } from 'react-hot-toast'

import Button from '@/components/button'

const PaymentManagement = () => {
  const [walletAddress, setWalletAddress] = useState('')

  const handleSave = () => {
    if (!walletAddress) return toast.error('Please provide a valid wallet address')
    toast.success('Payment method updated successfully')
  }

  return (
    <div className='divide-y divide-white/5'>
      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 pt-12 pb-16 md:grid-cols-3'>
        <div className='md:col-span-1'>
          <h2 className='text-base font-semibold leading-7 text-white'>Crptocurrency payment method</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            Sales profit will be sent to this wallet address. You can configure project specific payment method in
            project settings.
          </p>
        </div>

        <form className='md:col-span-2 mx-auto'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
            <div className='col-span-full'>
              <label htmlFor='walletAddress' className='block text-sm font-medium leading-6 text-white'>
                Wallet Address
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name=''
                  id='walletAddress'
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(textLimiter(e.target.value, 42))}
                  className='input-ui'
                  placeholder='0x0000..'
                />
              </div>
              <p className='mt-2 text-sm text-gray-400'>
                Provide only ERC20 compatible wallet address or else your payments will be lost.
              </p>
            </div>
          </div>

          <div className='mt-8 flex'>
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentManagement
