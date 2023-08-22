import { AiFillApple, AiFillWindows } from 'react-icons/ai'
import { FiGlobe } from 'react-icons/fi'

const infos = [
  { name: 'Platform', tags: ['web'] },
  { name: 'Genre', tags: ['Action', 'Open world', 'Adventure'] },
  {
    name: 'Features',
    tags: ['Single Player', 'Controller Support', 'Cloud Save', 'Achievements'],
  },
]

export default function InfoTags() {
  return (
    <div>
      <h2 className='sr-only'>Genre and Features</h2>
      <div className='mx-auto max-w-7xl divide-y divide-gray-700 md:flex md:justify-center md:divide-y-0 md:divide-x py-20 md:py-28'>
        {infos.map((info, infoId) => (
          <div key={infoId} className='py-8 md:w-1/3 md:flex-none md:py-0 '>
            <div className='md:mx-auto flex max-w-xs items-center px-4 md:max-w-none md:px-8 '>
              <div className='ml-4'>
                <h3 className='text-slate-500'>{info.name}</h3>
                <p className='text-base text-slate-300'>
                  {infoId === 0 ? (
                    <span className='text-2xl'>
                      {info.tags.includes('windows') && <AiFillWindows className='inline-block mr-4' />}
                      {info.tags.includes('mac') && <AiFillApple className='inline-block mr-4' />}
                      {info.tags.includes('web') && <FiGlobe className='inline-block mr-4' />}
                    </span>
                  ) : (
                    info.tags.map((tag, tagId) => (
                      <span key={tagId}>
                        {tag}
                        {tagId !== info.tags.length - 1 && ', '}
                      </span>
                    ))
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
