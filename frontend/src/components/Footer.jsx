import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm">
        {/* First */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti,
            cum nihil illo, optio quam voluptatum
          </p>
        </div>
        {/* Middle */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About us</NavLink>
            </li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/* Last */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a
                href="tel:+905527095223"
                className="hover:text-black duration-200"
              >
                +90-(552)-709-5223
              </a>
            </li>

            <li>
              <a
                href="mailto:fatihdfe@gmail.com"
                className="hover:text-black duration-200"
              >
                fatihdfe@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Coppy */}
      <div className="">
        <hr />
        <p className="py-5 text-sm text-center">
          © {new Date().getFullYear()} forever.com – All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
