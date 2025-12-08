import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const Contact = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 border-t">
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="contact_img" className='w-full md:max-w-[480px]'/>
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>134134  Willms Station <br /> Suite 324i Washington, USA</p>
          <p className='text-gray-500'>Tell: (515) 555-0132 <br />Email: admin@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forover</p>
          <p className='text-gray-500'>Learn more about tems and job oenings</p>
          <button className='border border-black px-8 py-4 text-sm hover:text-white hover:bg-black transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
