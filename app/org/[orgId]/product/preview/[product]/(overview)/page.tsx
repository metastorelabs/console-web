import React from 'react'

import AdditionalInfo from './_components/AdditionalInfo'
import Carousel from './_components/Carousel'
import InfoTags from './_components/InfoTags'
import Specifications from './_components/Specification'

const AppPage = () => {
  return (
    <div>
      <h2 className='text-slate-400 text-base md:text-xl lg:text-2xl text-center px-2 md:px-6'>
        Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, Red Dead Redemption 2 is an
        epic tale of honor and loyalty at the dawn of the modern age. Includes Red Dead Redemption 2: Story Mode and Red
        Dead Online.
      </h2>

      <InfoTags />

      <Carousel />

      <AdditionalInfo />

      <Specifications />

      <div className='text-slate-600 mt-20 text-center max-w-4xl mx-auto mb-10 px-4 text-sm md:text-base'>
        <p>
          ©2021 Sony Interactive Entertainment Inc. DEATH STRANDING is a trademark of Sony Interactive Entertainment
          LLC. Created and developed by KOJIMA PRODUCTIONS.
        </p>
      </div>
    </div>
  )
}

export default AppPage
