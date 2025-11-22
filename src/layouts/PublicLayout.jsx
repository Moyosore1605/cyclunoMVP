import React from 'react'
import Logo from '../assets/Logo.svg';
import { Outlet } from 'react-router-dom';
import SideImage from '../assets/SideImage.svg'
import Gradient from '../assets/Gradient.svg'

export default function PublicLayout() {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col w-[50%] p-5">
                <section className='flex items-center'>
                    <img src={Logo} width={'45px'} />
                    <h1 className='font-bold text-xl text-[#1B365D] ms-2'>Cycluno</h1>
                </section>
                <div className="flex-1 flex items-center justify-center">
                <Outlet />
                </div>
            </div>
              {/* Right side image */}
            <div className="flex w-[50%] justify-center items-center" style={{background:`url(${Gradient})`}}>
                <img src={SideImage} width={'600px'}/>
            </div>
            </div>
)
}