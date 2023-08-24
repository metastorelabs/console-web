'use client'

import React from 'react'

import clsx from 'clsx'

import { ButtonSize, ButtonVariants } from './type'

const btnColors: Record<ButtonVariants, string> = {
  blue: 'bg-blue-700 hover:enabled:bg-blue-600 focus:ring-blue-700',
  red: 'bg-red-700 hover:enabled:bg-red-600 focus:ring-red-700',
  fade: 'bg-white/10 hover:enabled:bg-white/20 focus:ring-gray-400',
  white: 'bg-white hover:enabled:bg-gray-200 focus:ring-white !text-black',
  gray: 'bg-gray-900 hover:enabled:bg-gray-800 focus:ring-gray-300',
  ghost: 'bg-transparent hover:enabled:bg-white/5 focus:ring-gray-300',
  underline: 'bg-transparent hover:enabled:underline focus:ring-gray-300',
  green: 'bg-emerald-700 hover:enabled:bg-emerald-600 focus:ring-emerald-700',
  rose: 'bg-rose-800 hover:enabled:bg-rose-700 focus:ring-rose-800',
}

export const btnSizes: Record<ButtonSize, string> = {
  sm: 'py-2 px-3 font-medium',
  md: 'p-3 font-medium',
  lg: 'p-4 font-semibold',
}

const Button = ({
  children,
  onClick,
  variant = 'blue',
  size = 'lg',
  className,
  type = 'button',
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: ButtonVariants
  size?: ButtonSize
  className?: string
  type?: 'button' | 'submit' | 'reset'
} & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    [key: string]: any
  }) => {
  return (
    <button
      className={clsx(
        'rounded text-sm text-white shadow-sm focus-ring ring-offset-2 disabled:opacity-50',
        btnColors[variant],
        btnSizes[size],
        className
      )}
      {...props}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
