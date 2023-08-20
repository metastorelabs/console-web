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

export const toPositiveInteger = (text: string, decimal?: boolean, min?: number, max?: number): string => {
  const regex = decimal ? /[^0-9.]/g : /[^0-9]/g
  let result = text.replace(regex, '')

  if (decimal) {
    const decimalIndex = result.indexOf('.')
    if (decimalIndex !== -1 && decimalIndex < result.length - 3) {
      result = result.substring(0, decimalIndex + 3)
    }
  }

  const numberResult = Number(result)

  if (min !== undefined && numberResult < min) {
    return min.toString()
  }

  if (max !== undefined && numberResult > max) {
    return max.toString()
  }

  return result
}
