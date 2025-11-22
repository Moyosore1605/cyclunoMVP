import React from 'react'
import Logo from '../assets/Logo.svg';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
    return (
        <main className='h-screen overflow-hidden'>
            <div className='h-[90px] flex text-center pt-2' style={{backgroundColor:"#1B365D"}}>
                <img src={Logo} width={"85px"} className='ms-8' />
            </div>
                <Outlet />
        </main>
)
}