import React from 'react'

import Flatpickr from 'react-flatpickr'

import 'flatpickr/dist/themes/dark.css'

import clsx from 'clsx'
import format from 'date-fns/format'

interface DateTimePickerProps {
  value: Date | undefined
  onValueChange: (_value: Date) => void
  placeholder?: string
  disabled?: boolean
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onValueChange, placeholder = '', disabled }) => {
  const limiterDate = new Date()
  limiterDate.setDate(limiterDate.getDate() + 2)

  // Format the limiterDate as a string
  const limiterDateString = format(limiterDate, 'yyyy-MM-dd')

  const options = {
    enableTime: true,
    dateFormat: 'Y-m-d h:i K',
    minDate: limiterDateString,
    onChange: (selectedDates: Date[]) => {
      onValueChange(selectedDates[0])
    },
  }

  return (
    <div className='relative mt-2 rounded-md shadow-sm'>
      <Flatpickr
        value={value}
        disabled={disabled}
        options={options}
        placeholder={placeholder}
        className={clsx('input-ui', disabled ? 'cursor-default' : 'cursor-pointer')}
        onChange={(selectedDates) => onValueChange(selectedDates[0])}
      />
    </div>
  )
}

export default DateTimePicker
