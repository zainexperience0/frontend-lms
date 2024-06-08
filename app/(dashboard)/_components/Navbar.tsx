import React from 'react'
import { NavbarRoutes } from './NavbarRoutes'
import { MobileSidebar } from './MobileSidebar'

export const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex items-center shadow-sm'>
        <MobileSidebar />
        <NavbarRoutes />
    </div>
  )
}
