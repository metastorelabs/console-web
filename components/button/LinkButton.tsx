import React from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import { ButtonSize, ButtonVariants } from './type'

const btnColors: Record<ButtonVariants, string> = {
  blue: 'bg-blue-700 hover:bg-blue-600 focus:ring-blue-700',
  red: 'bg-red-700 hover:bg-red-600 focus:ring-red-700',
  fade: 'bg-white/10 hover:bg-white/20 focus:ring-gray-400',
  white: 'bg-white hover:bg-gray-200 focus:ring-white !text-black',
  gray: 'bg-gray-900 hover:bg-gray-800 focus:ring-gray-300',
  ghost: 'bg-transparent hover:bg-white/5 focus:ring-gray-300',
  underline: 'bg-transparent hover:underline focus:ring-gray-300',
  green: 'bg-emerald-700 hover:bg-emerald-600 focus:ring-emerald-700',
  rose: 'bg-rose-800 hover:bg-rose-700 focus:ring-rose-800',
}

export const btnSizes: Record<ButtonSize, string> = {
  sm: 'py-2 px-3 font-medium',
  md: 'p-3 font-medium',
  lg: 'p-4 font-semibold',
}

const LinkButton = ({
  children,
  href,
  variant = 'blue',
  size = 'lg',
  className,
  ...props
}: {
  children: React.ReactNode
  href: string
  variant?: ButtonVariants
  size?: ButtonSize
  className?: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    [key: string]: any
  }) => {
  return (
    <Link
      className={clsx(
        'rounded text-sm text-white shadow-sm focus-ring ring-offset-2',
        btnColors[variant],
        btnSizes[size],
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}

export default LinkButton
