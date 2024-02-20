'use client'

import { IoGameController } from 'react-icons/io5'

import clsx from 'clsx'
import Image from 'next/image'

interface UserGameType {
  title: string
  gameLogo: string
  slug: string
  gameUrl: string
  hidden?: boolean
}

const games: UserGameType[] = [
  {
    title: 'Red Dead Redemption 2',
    gameLogo:
      'https://w0.peakpx.com/wallpaper/588/872/HD-wallpaper-red-dead-redemption2-gaming-morgan-rdr2-rockstar-ps4-red-dead-redemption-2-thumbnail.jpg',
    slug: 'red-dead-redemption-2',
    gameUrl: 'https://www.rockstargames.com/reddeadredemption2/',
  },
  {
    title: 'Marvel spiderman 2',
    gameLogo:
      'https://gmedia.playstation.com/is/image/SIEPDC/ps5-games-spiderman-miles-morales-image-block-en-26aug22?$1600px$',
    slug: 'marvel-spiderman-2',
    gameUrl: 'https://www.marvel.com/games/marvel-s-spider-man-miles-morales',
    hidden: true,
  },
]

const Sidebar = () => {
  return (
    <div className='flex flex-col w-20 bg-gray-950 pb-40 group'>
      <div className='flex h-20 items-center justify-center shrink-0 opacity-30'>
        <div className='-m-2 p-2 rounded-full focus-visible-ring'>
          <Image src='/logo.svg' alt='Metastore logo' width={44} height={44} className='' />
        </div>
      </div>

      <div className='flex items-center justify-center mt-8 mb-2 opacity-30'>
        <div className='group bg-white/5 hover:bg-gray-900 text-white flex rounded-md p-3 text-sm leading-6 font-semibold focus-ring focus:ring-offset-4'>
          <IoGameController className='h-6 w-6 shrink-0' aria-hidden='true' />
        </div>
      </div>

      <div className='h-full overflow-y-scroll no-scrollbar pt-2 pb-4 space-y-4 w-full flex flex-col items-center'>
        <div className='-my-2' />
        {games.map((game) => (
          <GameButton key={game.title} game={game} />
        ))}
      </div>
    </div>
  )
}

const GameButton = ({ game }: { game: UserGameType }) => {
  return (
    <div className='h-12 w-12'>
      <button
        className={clsx(
          'bg-gray-900 h-12 w-12 overflow-hidden rounded-md select-none',
          game.hidden
            ? 'opacity-50 cursor-default focus:outline-none'
            : 'cursor-pointer hover:grayscale focus-ring focus:ring-offset-4'
        )}
      >
        <Image
          src={game.gameLogo}
          alt={game.title}
          width={48}
          height={48}
          draggable={false}
          className='object-cover h-full w-full'
        />
      </button>
    </div>
  )
}

export default Sidebar
