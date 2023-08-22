'use client'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './carousel.style.css'

import React, { useEffect, useRef, useState } from 'react'

import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'

import { useVisibilityChange } from '@/hooks/useVisibilityChange'
import Image from 'next/image'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const data = [
  {
    type: 'video',
    src: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256878920/movie480_vp9.webm?t=1648163051',
    thumbnail:
      'https://cdn2.unrealengine.com/dsdc-1920x1080-epic-1920x1080-546b398b0931.jpg?h=270&quality=medium&resize=1&w=480',
  },
  {
    type: 'image',
    src: 'https://cdn2.unrealengine.com/egs-deathstrandingdirectorscut-kojimaproductions-g1a-00-1920x1080-ff95f1c6868f.jpg',
  },
  {
    type: 'image',
    src: 'https://cdn2.unrealengine.com/egs-deathstrandingdirectorscut-kojimaproductions-g1a-14-1920x1080-50a63ebeee53.jpg',
  },
  {
    type: 'image',
    src: 'https://cdn2.unrealengine.com/egs-deathstrandingdirectorscut-kojimaproductions-g1a-08-1920x1080-ca41c57cee2d.jpg',
  },
  {
    type: 'image',
    src: 'https://cdn2.unrealengine.com/egs-deathstrandingdirectorscut-kojimaproductions-g1a-12-1920x1080-15909b83c3cb.jpg',
  },
  {
    type: 'image',
    src: 'https://cdn2.unrealengine.com/egs-deathstrandingdirectorscut-kojimaproductions-g1a-01-1920x1080-209008c65839.jpg',
  },
  {
    type: 'image',
    src: 'https://cdn2.unrealengine.com/egs-deathstrandingdirectorscut-kojimaproductions-g1a-02-1920x1080-6a1d1e08c752.jpg',
  },
  {
    type: 'image',
    src: 'https://cdn2.unrealengine.com/egs-deathstrandingdirectorscut-kojimaproductions-g1a-03-1920x1080-b5d07f820680.jpg',
  },
  {
    type: 'image',
    src: 'https://cdn2.unrealengine.com/egs-deathstrandingdirectorscut-kojimaproductions-g1a-07-1920x1080-c5238bdd6b1f.jpg',
  },
]

const Carousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [currentSlide, setCurrentSlide] = useState<HTMLElement | null>(null)
  const [manualPause, setManualPause] = useState(true)
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible] = useVisibilityChange(playerContainerRef, 40)
  const mobileUser = typeof window !== 'undefined' && window.innerWidth < 1024

  const handleSlideChange = (swiper: any) => {
    const currentIndex = swiper.activeIndex
    const prevIndex = swiper.previousIndex

    // Get video elements on current and previous slides
    const currentSlide = swiper.slides[currentIndex]
    setCurrentSlide(currentSlide)

    const prevSlide = swiper.slides[prevIndex]
    const currentVideo = currentSlide.querySelector('video')
    const prevVideo = prevSlide.querySelector('video')

    // Pause video on previous slide
    if (prevVideo) {
      prevVideo.pause()
    }

    // Play video on current slide
    if (currentVideo) {
      currentVideo.play()
    }
  }

  useEffect(() => {
    if (isVisible) {
      if (currentSlide) {
        const currentVideo = currentSlide.querySelector('video')
        if (currentVideo && currentVideo.paused && !manualPause) {
          currentVideo.play()
        }
      }
    } else {
      if (currentSlide) {
        const currentVideo = currentSlide.querySelector('video')
        if (currentVideo && !currentVideo.paused) {
          currentVideo.pause()
        }
      }
    }
  }, [currentSlide, isVisible, manualPause])

  return (
    <div className='mt-6 mb-16'>
      <h2 className='text-3xl font-bold tracking-tight text-slate-300 sm:text-4xl text-center mb-6 md:mb-10'>
        Trailers and gameplay
      </h2>
      <div className='relative bg-black' ref={playerContainerRef}>
        <Swiper
          loop={true}
          spaceBetween={10}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // set current slide
            const currentIndex = swiper.activeIndex
            const currentSlide = swiper.slides[currentIndex]
            setCurrentSlide(currentSlide)
          }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className='aspect-video w-full h-full relative'
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                {item.type === 'image' ? (
                  <Image src={item.src} alt='image' fill sizes='100vw' />
                ) : (
                  <video
                    loop
                    playsInline
                    controls
                    className='w-full h-full object-cover'
                    disablePictureInPicture
                    onPause={() => {
                      if (isVisible) setManualPause(true)
                    }}
                    onPlay={() => setManualPause(false)}
                    controlsList='nodownload'
                    src={item.src}
                  />
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div
          ref={prevRef}
          className='group cursor-pointer absolute top-1/2 transform -translate-y-1/2 z-10 h-1/2 w-10 hover:backdrop-brightness-75 backdrop-brightness-95 flex items-center justify-center'
        >
          <BsFillCaretLeftFill className='h-6 w-6 text-gray-200 opacity-70 group-hover:opacity-100' />
        </div>

        <div
          ref={nextRef}
          className='group cursor-pointer absolute top-1/2 transform right-0  -translate-y-1/2 z-10 h-1/2 w-10 hover:backdrop-brightness-75 backdrop-brightness-95 flex items-center justify-center'
        >
          <BsFillCaretRightFill className='h-6 w-6 text-gray-200 opacity-70 group-hover:opacity-100' />
        </div>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={mobileUser ? 4 : 6}
        autoplay
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mt-3 max-h-40 mySwiper'
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index} className='bg-transparent flex items-start'>
              <div className='bg-black aspect-video relative w-full cursor-pointer'>
                {item.type === 'image' ? (
                  <Image src={item.src} alt='thumbnail image' fill sizes='(max-width: 1024px) 25vw, 16.6vw' />
                ) : (
                  <>
                    <Image src={item.thumbnail ?? ''} alt='image' fill sizes='(max-width: 1024px) 25vw, 16.6vw' />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <FaPlay className='w-4 h-4 md:h-8 md:w-8 text-gray-200 opacity-70' />
                    </div>
                  </>
                )}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Carousel
