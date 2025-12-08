import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken } = useContext(ShopContext);

  // Sidebar menü items
  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      {/* Desktop menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex flex-col items-center gap-1"
          >
            <p>{item.name}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Right icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch((prev) => !prev)}
          src={assets.search_icon}
          alt="search_icon"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
            onClick={() => token ? null : navigate('login')}
          />
         <div className={`${token ? "group-hover:block hidden" : "hidden"} absolute right-0 pt-4`}>
  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
    {token && (
      <>
        <p className="cursor-pointer hover:text-black" onClick={() => navigate("/profile")}>My Profile</p>
        <p className="cursor-pointer hover:text-black" onClick={() => navigate("/orders")}>Orders</p>
        <p className="cursor-pointer hover:text-black" onClick={handleLogout}>Logout</p>
      </>
    )}
  </div>
</div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile menu button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-50",
          visible ? "w-full" : "w-0"
        )}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown_icon"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-b"
            >
              {item.name}
            </NavLink>
          ))}

          <div className="flex flex-col pl-6 pt-4">
            {token ? (
              <>
                <p className="py-2 cursor-pointer" onClick={() => { navigate("/profile"); setVisible(false); }}>My Profile</p>
                <p className="py-2 cursor-pointer" onClick={() => { navigate("/orders"); setVisible(false); }}>Orders</p>
                <p className="py-2 cursor-pointer" onClick={() => { handleLogout(); setVisible(false); }}>Logout</p>
              </>
            ) : (
              <p className="py-2 cursor-pointer" onClick={() => { navigate("/login"); setVisible(false); }}>Login</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
