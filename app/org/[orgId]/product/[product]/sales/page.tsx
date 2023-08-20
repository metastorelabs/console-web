import React from 'react'

import Image from 'next/image'

import Pagination from './_components/Pagination'

const sales = [
  {
    product: 'Death Stranding',
    productImg: '/temp/dslogo.jpeg',
    buyer: 'Lindsay Walton',
    date: '2021-10-01',
    amount: '$100',
    transactionId: 'H231HIU2H3KJN',
  },
  {
    product: 'Monkey kong',
    productImg: '/temp/dslogo.jpeg',
    buyer: 'Lindsay Walton',
    date: '2021-10-01',
    amount: '$100',
    transactionId: '312JUI3H12IU3H',
  },
  {
    product: 'Monkey kong',
    productImg: '/temp/dslogo.jpeg',
    buyer: 'Lindsay Walton',
    date: '2021-10-01',
    amount: '$100',
    transactionId: 'HIUWEQIUH213I',
  },
  {
    product: 'Monkey kong',
    productImg: '/temp/dslogo.jpeg',
    buyer: 'Lindsay Walton',
    date: '2021-10-01',
    amount: '$100',
    transactionId: '231NJ23N1J2N3K',
  },
]

const Sales = () => {
  return (
    <div>
      <h1 className='text-white text-3xl md:text-4xl font-bold'>Sales</h1>
      <p className='mt-2 text-sm text-slate-400'>View and manage your product sales.</p>

      <div className='mt-8 flow-root md:rounded-md md:overflow-hidden'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-700 bg-gray-950'>
              <thead>
                <tr className='text-white'>
                  <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-3'>
                    Transaction ID
                  </th>
                  <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-3'>
                    Product
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm  font-semibold '>
                    Buyer
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold '>
                    Date
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold '>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white/5'>
                {sales.map((sale, saleIdx) => (
                  <tr key={sale.transactionId} className={saleIdx % 2 === 0 ? undefined : 'bg-gray-950'}>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-3'>
                      {sale.transactionId}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-400'>
                      <div className='flex items-center'>
                        <div className='h-8 w-8 flex-shrink-0'>
                          <Image className='h-8 w-8 rounded' src={sale.productImg} alt='' width={32} height={32} />
                        </div>
                        <div className='ml-4'>{sale.product}</div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-400'>{sale.buyer}</td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-400'>{sale.date}</td>
                    <td className='whitespace-nowrap pl-3 pr-4 py-4 text-sm text-gray-400'>{sale.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination itemsPerPage={10} totalItems={100} />
      </div>
    </div>
  )
}

export default Sales
