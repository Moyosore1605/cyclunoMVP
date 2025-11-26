import React, {useEffect, useState} from 'react'
import {  IoAddCircleOutline } from "react-icons/io5";
import { VscBeaker } from "react-icons/vsc";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { RiBox3Line } from "react-icons/ri";
import { IoSettingsOutline, IoNotifications, IoHome  } from "react-icons/io5";
import { FaBug, FaTrash} from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import {Link, useNavigate} from "react-router-dom";
import { formatCreationDate } from '../../utils/dateUtils';

export default function Product() {
    const [products,setProducts] = useState(null);
    const [initializing,setInitializing] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            
            const savedProduct = localStorage.getItem("product");
            
            if (savedProduct) {
                try {
                    const parsedProduct = JSON.parse(savedProduct); 
                    
                    // set the state
                    setProducts(parsedProduct); 
                    
                    // CRITICAL FIX: Log the locally retrieved variable, NOT the stale state variable
                    console.log('useEffect loaded product data:', parsedProduct); 
                } catch (error) {
                    console.error("Error parsing product data from localStorage:", error);
                    // Clear corrupted data if parsing fails
                    localStorage.removeItem("product");
                }
            }
            
            // Set initializing to false after attempting to load data
            setInitializing(false);
            
        }, 100); // 100 milliseconds delay

        // 2. Cleanup function to clear the timeout if the component unmounts early
        return () => clearTimeout(timer);
    }, []);
    const displayDate = products ? formatCreationDate(products.data.created_at) : "N/A";

    return (
        <main className='flex'>
            <div className='w-[72%] pe-6'>
                <section className='flex justify-between border-b-blue-200 border-b pb-3'>
                    <div className='flex gap-2'>
                        <Link className='text-3xl text-gray-500' to='/dashboard'> <IoIosArrowBack /></Link>
                        <section>
                            <h1 className='font-fraunces text-3xl'>Project {products.data.name}</h1>
                            <small className='text-gray-500'>{displayDate}</small>
                        </section>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <FaTrash className='text-red-500 text-2xl'/>
                        <button className='text-gray-500 border p-3 w-[150px] flex items-center justify-center gap-2 rounded-lg'><GoDownload />Export</button>
                        <button className='text-white bg-[#1b365d] p-3 w-[150px] rounded-lg'>+ Add Feature</button>
                    </div>
                </section>
                <section className='flex gap-7 text-gray-500 pt-5 border-b border-b-blue-200'>
                    <h1 className='pb-5 text-[#1b365d] font-semibold border-b-2 border-b-[#1b365d]'>Overview</h1>
                    <h1>Design</h1>
                    <h1>Execute</h1>
                    <h1>Bugbed</h1>
                    <h1>Reports</h1>
                </section>
                <section className='text-gray-400 mt-4 border border-blue-200 rounded-lg p-4 pb-7'>
                    <h1 className='text-gray-700'>Product Information</h1>
                    <small>{products.data.description}</small><br />
                    <button className='border bg-gray-100 p-2 rounded-lg w-[45%] mt-10 me-5'>{products.data.industry}</button>
                    <button className='border bg-gray-100 p-2 rounded-lg w-[45%]'>{products.data.platform}</button>
                </section>
                <div className='flex gap-5 mt-6 text-gray-500'>
                    <section className='flex border border-blue-200 rounded-lg p-3 w-[22%]'>
                        <RiBox3Line className='text-3xl text-gray-500'/>
                        <section className='ms-2'>
                            <p>39</p>
                            <small>Total Features</small>
                        </section>
                    </section>
                    <section className='flex border border-blue-200 rounded-lg p-3 w-[22%]'>
                        <IoSettingsOutline className='text-3xl text-gray-500'/>
                        <section className='ms-2'>
                            <p>100</p>
                            <small>Test Cases</small>
                        </section>
                    </section>
                    <section className='flex border border-blue-200 rounded-lg p-3 w-[22%]'>
                        <FaBug className='text-3xl text-gray-500'/>
                        <section className='ms-2'>
                            <p>40</p>
                            <small className='text-red-400'>Bugs Logged</small>
                        </section>
                    </section>
                    <section className='flex border border-blue-200 rounded-lg p-3 w-[22%]'>
                        <VscBeaker className='text-3xl text-gray-500'/>
                        <section className='ms-2'>
                            <p>10</p>
                            <small className='text-green-400'>Execution Runs</small>
                        </section>
                    </section>
                </div>
                <div className='mt-3 p-4 shadow-xl border border-blue-200 rounded-lg pb-10'>
                    <h1>Recent Activity</h1>
                    <small>New Product Created</small>
                </div>
            </div>
            <section className='w-[24%]'>
                <div className='shadow-lg text-gray-500 p-4 rounded-md h-[280px] flex flex-col'>
                    <h1 className='font-semibold'>Recent Activity</h1>
                    <span className='items-center mt-10 flex gap-2'> <HiOutlineViewGridAdd className='text-lg'/> New Product Created</span>
                </div>
                <div className='shadow-lg text-gray-500 p-4 rounded-md h-[280px] flex flex-col gap-6 mt-5'>
                    <h1 className='font-semibold mb-2'>Quick Actions</h1>
                    <p className='flex items-center mb-1 gap-2'> <HiOutlineViewGridAdd className='text-lg'/> Create Product</p>
                    <p className='flex items-center mb-1 gap-2'> <IoAddCircleOutline className='text-lg'/> Add Features</p>
                    <p className='flex items-center mb-1 gap-2'> <VscBeaker className='text-lg'/> Generate Test Cases</p>
                    <p className='flex items-center mb-1 gap-2'> <FaBug className='text-lg'/> Log Bug</p>
                </div>
            </section>
        </main>
    )
}
