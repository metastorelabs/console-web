import React from 'react'

import AppCard from './_components/AppCard'

const app = {
  name: 'Hogwarts Legacy',
  image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/capsule_616x353.jpg?t=1676412613',
  video: 'https://cdn.akamai.steamstatic.com/steam/apps/256930503/microtrailer.webm?t=1676412597',
  price: 2999,
  offer: null,
  currency: 'USDT',
  slug: 'hogwarts-legacy',
}

const ProductCard = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-96'>
        <AppCard
          key={app.name}
          currency={app.currency}
          imageSizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33.3vw'
          offer={app.offer}
          price={app.price}
          thumbnailImage={app.image}
          thumbnailVideo={app.video}
          title={app.name}
          offerExpiresAt={null}
        />
      </div>
    </div>
  )
}

export default ProductCard
