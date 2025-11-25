import React from 'react'
import Logo from '../assets/Logo.svg';
import { Outlet, Link } from 'react-router-dom';

export default function LandingLayout() {
    return (
        <main className='h-full'>
            <div className='h-[60px] flex justify-between items-center ps-20 pe-16 pt-1 bg-white'>
                <div className='flex items-center'>
                    <img src={Logo} width={"45px"} />
                    <h1 className='font-bold text-xl text-[#1B365D] ms-2'>Cycluno</h1>
                </div>
                <div className='flex items-center gap-10 me-4'>
                    <Link to="/">Home</Link>
                    <Link to="/">Services</Link>
                    <Link to="/">Features</Link>
                    <Link to="/">About</Link>
                    <Link to="/login" className='p-2 ps-4 pe-4 bg-[#1B365D] text-white text-base rounded-md'>Log In</Link>
                </div>
            </div>
                <Outlet />
        </main>
)
}
