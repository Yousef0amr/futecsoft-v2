import React from 'react'
import { ToastContainer } from 'react-toastify'

const NotificationProvider = ({ children }) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  )
}

export default NotificationProvider
