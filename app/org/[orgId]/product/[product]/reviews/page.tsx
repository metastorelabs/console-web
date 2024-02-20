import React from 'react'

import { HiStar } from 'react-icons/hi2'

import clsx from 'clsx'

const reviews = [
  {
    id: 1,
    rating: 5,
    content: `
      <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
    `,
    author: 'Risako M',
    date: 'May 16, 2021',
    datetime: '2021-01-06',
  },
  {
    id: 2,
    rating: 3,
    content: `
      <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
      <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    `,
    author: 'Risako M',
    date: 'May 16, 2021',
    datetime: '2021-01-06',
  },
]

const page = () => {
  return (
    <div className='space-y-10 divide-y divide-gray-700 pb-10'>
      {reviews.map((review) => (
        <div key={review.id} className='pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8'>
          <div className='lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8'>
            <div className='flex items-center xl:col-span-1'>
              <div className='flex items-center'>
                {[0, 1, 2, 3, 4].map((rating) => (
                  <HiStar
                    key={rating}
                    className={clsx(
                      review.rating > rating ? 'text-gray-100' : 'text-gray-700',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden='true'
                  />
                ))}
              </div>
              <p className='ml-3 text-sm text-gray-200'>
                {review.rating}
                <span className='sr-only'> out of 5 stars</span>
              </p>
            </div>

            <div className='mt-4 lg:mt-6 xl:col-span-2 xl:mt-0'>
              <div className='space-y-6 text-sm text-gray-400' dangerouslySetInnerHTML={{ __html: review.content }} />
            </div>
          </div>

          <div className='mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3'>
            <p className='font-medium text-gray-100'>{review.author}</p>
            <time
              dateTime={review.datetime}
              className='ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0'
            >
              {review.date}
            </time>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page
