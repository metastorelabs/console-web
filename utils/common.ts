import { toast } from 'react-hot-toast'

export const textLimiter = (text: string, limit: number): string => {
  return text.length > limit ? text.substring(0, limit) : text
}

export const copyToClipboard = (text: string, message?: string): void => {
  navigator.clipboard.writeText(text)
  toast.success(message || 'Copied to clipboard', {
    id: 'copy-to-clipboard',
    duration: 2000,
  })
}
