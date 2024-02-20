'use client'

import { useEffect, useRef, useState } from 'react'

import { PiArrowBendRightDownBold } from 'react-icons/pi'

import clsx from 'clsx'
import { Resizable } from 're-resizable'

const StorePage = ({
  params: { product, orgId },
}: {
  params: {
    product: string
    orgId: string
  }
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeLoading, setIframeLoading] = useState(true)
  const [resized, setResized] = useState(false)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'iframe_resize' && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height}px`
        setIframeLoading(false)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div className='relative'>
      {iframeLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 h-screen z-10 animate-pulse' />
      )}
      <div
        className={clsx(
          'text-white items-end space-x-1.5 flex absolute z-30 -right-2 -top-2 -translate-y-full transition-opacity duration-500 ease-in-out',
          iframeLoading || resized ? 'opacity-0' : 'opacity-100 animate-pulse'
        )}
      >
        <p className='text-sm'>Drag to resize</p>
        <PiArrowBendRightDownBold />
      </div>
      <div className='pb-40'>
        <Resizable
          defaultSize={{
            width: '100%',
            height: 'auto',
          }}
          enable={{
            right: true,
          }}
          maxWidth='100%'
          minWidth={375}
          className={iframeLoading ? 'invisible' : 'block'}
          handleComponent={{
            right: <HandleComponent />,
          }}
          onResize={() => setResized(true)}
        >
          <div className='w-full bg-gray-950'>
            <iframe
              ref={iframeRef}
              src={`/org/${orgId}/product/preview/${product}`}
              title='Store page iframe'
              className='w-full overflow-hidden'
              scrolling='no'
            />
          </div>
        </Resizable>
      </div>
    </div>
  )
}

const HandleComponent: React.FC = () => {
  return <div className='w-2 ml-2.5 h-full bg-gray-800 rounded-full' />
}

export default StorePage
