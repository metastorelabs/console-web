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
  if (!text) return '' // If empty string or undefined, return empty string

  const regex = decimal ? /[^0-9.]/g : /[^0-9]/g

  let result = text.replace(regex, '')

  if (decimal) {
    // Only allow one decimal point
    while (result.indexOf('.') !== result.lastIndexOf('.')) {
      result = result.substring(0, result.lastIndexOf('.')) + result.substring(result.lastIndexOf('.') + 1)
    }
  } else {
    // If decimal is false, we strip out any periods
    result = result.replace('.', '')
  }

  // If after removing invalid characters the result is not a valid number or empty string, return empty string
  if (!result || isNaN(Number(result))) return ''

  const numberResult = Number(result)

  if (min !== undefined && numberResult < min) {
    return min.toString()
  }

  if (max !== undefined && numberResult > max) {
    return max.toString()
  }

  return result
}

export const compactNumberFormat = (total: string): string => {
  const numberValue = parseInt(total, 10)

  if (numberValue < 10000) return total

  const valueInThousands = numberValue / 1000
  return `${valueInThousands.toFixed(valueInThousands % 1 !== 0 ? 1 : 0)}k`
}
