import React from 'react'

import { Toaster } from 'react-hot-toast'

const NotificationToaster = () => {
  return (
    <div>
      <Toaster
        position='top-right'
        reverseOrder={true}
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default NotificationToaster
