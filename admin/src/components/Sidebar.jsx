import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const Sidebar = () => {
  const navItems = [
    { to: "/add", label: "Add Item", icon: assets.add_icon },
    { to: "/list", label: "List Items", icon: assets.order_icon },
    { to: "/orders", label: "Orders", icon: assets.order_icon },
  ]

  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-white shadow-sm border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">

        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <img 
              className="w-5 h-5"
              src={item.icon} 
              alt={item.label} 
            />

            <p className="hidden md:block">{item.label}</p>
          </NavLink>
        ))}

      </div>
    </div>
  )
}

export default Sidebar
