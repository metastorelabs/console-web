import AppTabs from './AppTabs'
import HeroInfo from './HeroInfo'
import HeroVideo from './HeroVideo'

const AppHero = () => {
  return (
    <>
      <div className='relative bg-gray-950 aspect-[2.35/1] w-full'>
        <HeroVideo />
        <HeroInfo />
      </div>
      <AppTabs />
    </>
  )
}

export default AppHero
