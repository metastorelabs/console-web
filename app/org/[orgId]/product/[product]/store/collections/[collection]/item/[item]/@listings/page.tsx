import React from 'react'

const listings = [
  {
    id: '1',
    unitPrice: '200 STORE',
    dollarPrice: '$20',
    quantity: '4',
    from: '0x1234...5678',
  },
  {
    id: '2',
    unitPrice: '200 STORE',
    dollarPrice: '$20',
    quantity: '4',
    from: '0x1234...5678',
  },
]

const Listings = () => {
  return (
    <div className='flow-root'>
      <div className='inline-block overflow-x-auto min-w-full align-middle'>
        <table className='min-w-full'>
          <thead>
            <tr>
              <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-0'>
                Price
              </th>
              <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-100'>
                Quantity
              </th>
              <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-100'>
                From
              </th>
              <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                <span className='sr-only'>Buy</span>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-800'>
            {listings.map((list) => (
              <tr key={list.id}>
                <td className='whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0'>
                  <div>
                    <div className='font-medium text-gray-100'>{list.unitPrice}</div>
                    <div className='mt-1 text-gray-400'>{list.dollarPrice}</div>
                  </div>
                </td>
                <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-400'>{list.quantity}</td>

                <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-400'>{list.from}</td>

                <td className='relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                  <a href='#' className='text-indigo-600 hover:text-indigo-400'>
                    Buy
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Listings
