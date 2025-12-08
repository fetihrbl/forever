import React from 'react'
import { assets } from '../assets/admin_assets/assets'

const Navbar = ({logout}) => {
  return (
    <div className="flex items-center justify-between px-[4%] py-3 bg-white border-b border-gray-300">
      {/* Logo */}
      <img 
        src={assets.logo} 
        alt="logo" 
        className="w-[120px] md:w-[130px] object-contain"
      />

      {/* Logout Button */}
      <button 
        onClick={logout}
        className="bg-gray-700 text-white px-5 py-2 md:px-7 md:py-2 rounded-full 
                   hover:bg-gray-800 transition-all duration-200 text-sm md:text-base cursor-pointer"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
