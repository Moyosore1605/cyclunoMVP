import React, {useContext} from 'react'
import { AuthContext } from "../../context/AuthContext";
import { RiBox3Line } from "react-icons/ri";
import { IoSettingsOutline, IoAddCircleOutline } from "react-icons/io5";
import { VscBeaker } from "react-icons/vsc";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { FaBug, FaSearch } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'


export default function Dashboard() {
    const { user, } = useContext(AuthContext);
    const navigate = useNavigate();
    const userName = user?.email;

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


    // const userEmail = user?.user?.email;
// const username = extractUsername(userEmail);

    return (
        <main>
            <div className='flex justify-between items-center'>
                <section>
                    <h1 className='font-fraunces text-4xl'>Welcome {username}</h1>
                    <p className='text-gray-500 mt-2'>Here's an overview of your testing projects and recent activity</p>
                </section>
                <Link to='/createproduct' className='bg-[#1B365D] text-white text-base p-3 rounded-lg'>Create New Product</Link>
            </div>
            <div className='flex gap-5 mt-6'>
                <section className='flex border border-blue-200 rounded-lg p-3 w-[22%]'>
                    <RiBox3Line className='text-3xl text-gray-500'/>
                    <section className='ms-2'>
                        <p>0</p>
                        <span className='text-green-600'>Total Product</span>
                    </section>
                </section>
                <section className='flex border border-blue-200 rounded-lg p-3 w-[22%]'>
                    <IoSettingsOutline className='text-3xl text-gray-500'/>
                    <section className='ms-2'>
                        <p>0</p>
                        <span className='text-blue-400'>Test Cases</span>
                    </section>
                </section>
                <section className='flex border border-blue-200 rounded-lg p-3 w-[22%]'>
                    <FaBug className='text-3xl text-gray-500'/>
                    <section className='ms-2'>
                        <p>0</p>
                        <span className='text-red-400'>Open Bugs</span>
                    </section>
                </section>
                <section className='flex border border-blue-200 rounded-lg p-3 w-[22%]'>
                    <VscBeaker className='text-3xl text-gray-500'/>
                    <section className='ms-2'>
                        <p>0</p>
                        <span className='text-green-400'>Avg Pass Rate</span>
                    </section>
                </section>
            </div>
            <div className='flex mt-12'>
                <section className='w-[72%]'>
                    <div className='flex justify-between items-start me-5'>
                        <h1 className='font-fraunces text-2xl'>Projects</h1>
                        <div className='relative'>
                            <input placeholder='Search' className='border p-2 rounded-lg border-blue-200 w-[400px]' />
                            <FaSearch className='absolute right-3 top-3 text-gray-400'/>
                        </div>
                    </div>
                    <div className='flex items-center justify-center text-gray-500 h-full'>
                        <h1>No project created</h1>
                    </div>
                </section>
                <section className='w-[24%]'>
                    <div className='shadow-lg text-gray-500 p-4 rounded-md h-[180px] flex flex-col'>
                        <h1 className='font-semibold'>Recent Activity</h1>
                        <span className='mx-auto mt-10'>No recent activity</span>
                    </div>
                    <div className='shadow-lg text-gray-500 p-4 rounded-md h-[180px] flex flex-col mt-5'>
                        <h1 className='font-semibold mb-2'>Quick Actions</h1>
                        <p className='flex items-center mb-1 gap-2'> <HiOutlineViewGridAdd className='text-lg'/> Create Product</p>
                        <p className='flex items-center mb-1 gap-2'> <IoAddCircleOutline className='text-lg'/> Add Features</p>
                        <p className='flex items-center mb-1 gap-2'> <VscBeaker className='text-lg'/> Generate Test Cases</p>
                        <p className='flex items-center mb-1 gap-2'> <FaBug className='text-lg'/> Log Bug</p>
                    </div>
                </section>
            </div>
        </main>
    )
}
