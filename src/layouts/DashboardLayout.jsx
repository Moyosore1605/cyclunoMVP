import Logo from '../assets/Logo.svg'
import { Outlet } from 'react-router-dom';
import { IoSettingsOutline, IoNotifications, IoHome  } from "react-icons/io5";
import { MdUpload } from "react-icons/md";
import { FaUser,FaBug, FaSearch } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import { PiWarningOctagonFill, PiSignOut } from "react-icons/pi";
import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext';
import {Link, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    // const userName = user?.email;


    const profile = user?.user; 
    
    // 2. Extract properties from the profile object
    const userName = profile?.email || ''; 

    const extractUsername = (email) => {
    if (!email || typeof email !== 'string') {
    return 'User'; // Default name if email is missing
    }
    // Find the index of the '@' symbol
    const atIndex = email.indexOf('@');
    // If '@' is found, return the substring before it
    if (atIndex !== -1) {
    return email.substring(0, atIndex);
    }
    };
    const username = extractUsername(userName);
    
    

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            navigate("/login");

        } catch (error) {
            
        }}
return(
    <main className='flex h-full'>
        <div className='border-2 border-r-blue-200 w-[270px] h-screen flex flex-col justify-start'>
            <section className='p-5 pt-3 ps-7 flex items-center gap-1'>
                <img src={Logo} className='h-12'/>
                <h1 className='font-bold text-base text-[#1B365D]'>Cycluno</h1>
            </section>
            <section className='mt-10 p-7 flex flex-col gap-5 text-gray-500 border-b-2 border-b-blue-200 w-full'>
                <p className='flex items-center gap-2 text-[#1b365d]'> <IoHome className='text-lg' />Dashboard </p>
                <p className='flex items-center gap-2'> <MdUpload className='text-lg'/> Test Cases</p>
                <p className='flex items-center gap-2'> <GiBackwardTime className='text-lg' /> Execution Runs</p>
                <p className='flex items-center gap-2'> <FaUser className='text-lg'/> Teamwork</p>
                <p className='flex items-center gap-2'> <PiWarningOctagonFill className='text-lg'/> Reports</p>
                <p className='flex items-center gap-2'> <FaBug className='text-lg'/> Bugbed</p>
            </section>
            <section className='p-7'>
                <h1 className='mb-24 text-[#1B365D] font-semibold'>Projects</h1>
                <div className='text-gray-500'>
                    <section className='flex items-center'>
                        <FaUser className='w-8 h-8 rounded-full p-2 bg-gray-200'/>
                        <div className='ms-2'>
                            <h1 className='text-[#1d1c1c]'>{username}</h1>
                            <p className='text-sm'>QA Tester</p>
                        </div>
                    </section>
                    <p className='mt-6 flex items-center gap-3'> <IoSettingsOutline className='text-lg'/> Preferences</p>
                    <form action="submit" className='flex items-center gap-3 mt-4 mb-4'>
                        <PiSignOut className='text-lg'/>
                        <button className='text-[16px]' onClick={handleLogout} type='submit'>Sign Out</button>
                    </form>
                </div>
            </section>
        </div>
        <div className='w-full'>
            <section className='flex justify-between items-center p-3 border border-b-blue-200'>
                <p className='font-poppins text-gray-400 font-light text-xl'>Design, Execute and Report</p>
                <div className='flex gap-3 items-center'>
                    <div className='relative'>
                    <input placeholder='Search for something' className='p-2 bg-gray-200 rounded-3xl w-[400px] text-center'/>
                    <FaSearch className='absolute top-3 left-[88px] text-gray-400'/>
                    </div>
                    <IoSettingsOutline className='w-8 h-8 text-xl p-2 rounded-full bg-gray-300' />
                    <IoNotifications className='w-8 h-8 text-xl p-2 rounded-full bg-gray-300' />
                    <FaUser className='w-8 h-8 rounded-full p-2 bg-gray-200'/>
                </div>
            </section>
            <div className='p-9'>
                <Outlet/>
            </div>
        </div>
    </main>
)
}
