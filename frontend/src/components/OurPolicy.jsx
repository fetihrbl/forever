import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs md:text-base text-gray-700">
      {/* First */}
      <div className="">
        <img
          src={assets.exchange_icon}
          alt="exchange_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Eazy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      {/* Middle */}
      <div className="">
        <img
          src={assets.quality_icon}
          alt="exchange_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      {/* Last */}
      <div className="">
        <img
          src={assets.support_img}
          alt="exchange_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Best Customer Suppor</p>
        <p className="text-gray-400">We provide 7/24 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
