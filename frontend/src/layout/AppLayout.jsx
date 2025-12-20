import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='max-w-sm mx-auto bg-background min-h-screen'>
      <Outlet/>
    </div>
  )
}

export default AppLayout