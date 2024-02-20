import clsx from 'clsx'
import Image from 'next/image'

export const PolygonaLogo = ({ iconSize = 11, className = '', showBg = true }) => {
  return (
    <div
      className={clsx(
        'rounded-full overflow-hidden flex items-center justify-center',
        showBg ? 'bg-violet-950' : '',
        className
      )}
    >
      <Image src='/logo/polygon-logo.png' alt='Polygon Logo' width={iconSize} height={iconSize} />
    </div>
  )
}
