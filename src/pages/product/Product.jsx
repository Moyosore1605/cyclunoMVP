import React from 'react'
import {  IoAddCircleOutline } from "react-icons/io5";
import { VscBeaker } from "react-icons/vsc";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { FaBug, FaTrash} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";

export default function Product() {
    return (
        <main className='flex'>
            <div className='w-[72%]'>
                <section className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Link className='text-3xl text-gray-500' to='/dashboard'> <IoIosArrowBack /></Link>
                        <section>
                            <h1 className='font-fraunces text-3xl'>Project Gamma</h1>
                            <small className='text-gray-500'>Created Nov 13, 2025</small>
                        </section>
                    </div>
                    <div>
                        <FaTrash className='text-red-500 text-xl'/>

                    </div>
                </section>
            </div>
            <section className='w-[24%]'>
                <div className='shadow-lg text-gray-500 p-4 rounded-md h-[180px] flex flex-col'>
                    <h1 className='font-semibold'>Recent Activity</h1>
                    <span className='mx-auto mt-10 flex gap-2 items-center'> <HiOutlineViewGridAdd className='text-lg'/> New Product Created</span>
                </div>
                <div className='shadow-lg text-gray-500 p-4 rounded-md h-[180px] flex flex-col mt-5'>
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
