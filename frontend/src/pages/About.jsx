import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="about_img" className='w-full md:max-w-[450px]'/>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere reprehenderit commodi delectus alias consequatur ratione libero, atque laudantium quis molestias dolore temporibus magnam exercitationem vero praesentium inventore! Numquam, odit possimus.
          Possimus saepe, quae error autem quidem est officiis beatae, doloremque quaerat tenetur sit quo illum et optio non quibusdam aliquam corporis! Nam voluptate dolorem earum rerum neque quia doloremque repellendus.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium rem facere similique ratione, aperiam commodi ipsum itaque molestiae eaque laborum quia. Culpa quod perspiciatis facere possimus eveniet nobis eaque corrupti.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam accusamus ipsa incidunt eaque amet quibusdam excepturi aperiam aspernatur illo nemo quasi molestias necessitatibus, saepe accusantium alias non corrupti unde quia?</p>
        </div>
      </div>

    <div className="text-xl py-4">
      <Title text1={'WHY'} text2={'CHOOSE US'} />
    </div>

    <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet totam quaerat laudantium eligendi, excepturi optio .</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet totam quaerat laudantium eligendi, excepturi optio placeat </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet totam quaerat laudantium eligendi, excepturi optio placeat </p>
        </div>
    </div>

    </div>
  )
}

export default About
