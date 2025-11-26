import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {toast} from "react-toastify";
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import {Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function Signup() {
    const { signup, loginUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({company_name: "", email: "",  password: "", password_confirm: "", job_title: "", team_size: "",});

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(form.email)) {
            setLoading(false);
            toast.error("Email format is invalid. Use something like user@example.com");
            return;        
        }
        if (form.password !== form.password_confirm) {
            setLoading(false);
            toast.error("Passwords do not match");
            return;
        }
        try {
            const res = await signup(form);
            // console.log("signup response1:", res);

            if (!res || !res.success) {
                // normalize message to string
                const msg = typeof res?.message === "string"? res.message : res?.message && typeof res.message === "object"
                            ? JSON.stringify(res.message) : res?.data && typeof res.data === "string" ? res.data : res?.data
                            ? JSON.stringify(res.data) : "Signup failed";
                toast.error(msg);
                return;
            }
            const newUser = res.data?.data || res.data;
            if (newUser) loginUser(newUser);
            toast.success("Signup Successful, check your email for verification link!");
            navigate("/emailverify");
        } catch (error) {
            // extract axios/server error safely
            const errMsg =
                error?.response?.data?.message ||
                error?.response?.data ||
                error?.message ||
                "Something went wrong during signup";
            toast.error(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
            // console.error("signup error:", error);
        } finally{
            setLoading(false);
        }
    };
    if (loading) {
        return <Spinner />;
    }



return (
    <main className='flex h-full w-full p-10 pt-4'>
            <form onSubmit={handleSignup} className="m-10 mt-10 flex flex-col w-full items-start">
                <h1 className="text-3xl font-semibold text-center mb-5 font-fraunces">Sign-up</h1>
                <label className="text-gray-500 text-sm" htmlFor="email">Email</label>
                <input placeholder="Enter your Email here" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-3 rounded-md text-sm bg-gray-200 w-full"/>

                <label className="text-gray-500 mt-4 text-sm" htmlFor="company name">Company Name</label>
                <input  placeholder="Enter your Company here" required value={form.company_name} 
                onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="border p-3 rounded-md text-sm bg-gray-200 w-full"/>

                <label className="text-gray-500 mt-4 text-sm" htmlFor="job title">Job Title</label>
                <select value={form.job_title} onChange={(e) => setForm({...form, job_title: e.target.value})} required className="appearance-none border p-3 rounded-md bg-gray-200 w-full text-gray-500 text-sm">
                    <option value="">Enter your Job Title here</option>
                    <option value="Developer">Developer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Designer">Designer</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="CTO">CTO</option>
                    <option value="Others">Others</option>
                </select>

                <label className="text-gray-500 mt-4 text-sm" htmlFor="team size">User Size</label>
                <select value={form.team_size} onChange={(e) => setForm({...form, team_size: e.target.value})} required className="appearance-none border p-3 rounded-md bg-gray-200 w-full text-gray-500 text-sm">
                    <option value="">Enter your User Size here</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1001+">1001+</option>
                    <option value="Others">Others</option>
                </select>


                <label className="text-gray-500 mt-4 text-sm" htmlFor="password">Password</label>
                <div className='relative w-full'>
                    <input placeholder="Enter your password" required type={showPassword? 'text' : 'password'} value={form.password} 
                    onChange={(e) => setForm({ ...form, password: e.target.value })} className="border w-full p-3 rounded-md text-sm bg-gray-200 transition ease-in-out"/>
                    {showPassword?(<AiFillEyeInvisible onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>):
                    (<AiFillEye onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>)}
                </div>

                <label className="text-gray-500 mt-4 text-sm" htmlFor="password_confirm">Confirm Password</label>
                <div className="relative w-full">
                    <input placeholder="Enter password again" required type={showPassword1? 'text' : 'password'} value={form.password_confirm} 
                    onChange={(e) => setForm({ ...form, password_confirm: e.target.value })} className="w-full border p-3 rounded-md text-sm bg-gray-200 transition ease-in-out"/>
                    {showPassword1?(<AiFillEyeInvisible onClick={()=>setShowPassword1(!showPassword1)} className='absolute right-3 top-3 text-xl cursor-pointer'/>):
                    (<AiFillEye onClick={()=>setShowPassword1(!showPassword1)} className='absolute right-3 top-3 text-xl cursor-pointer'/>)}
                </div>

        <button className='bg-[#1B365D] text-[16px] mt-6 text-white p-2 rounded-md w-[200px] mx-auto' type="submit">Create Account</button>
        <span className='text-gray-400 text-sm text-center mt-2 mx-auto'>Already have an account? 
            <Link to='/login' className='ms-1 text-[#1B365D]'>
                Log in
            </Link>
        </span>
        <p className="mx-auto text-gray-400 font-semibold mt-6 mb-4">- OR -</p>
        <section className="flex gap-3 mx-auto">
            <span className="border border-gray-400 p-2 rounded-lg text-gray-400 text-sm flex items-center">
                <FcGoogle className="text-2xl" />Sign up with Google</span>
            <span className="border border-gray-400 p-2 rounded-lg text-gray-400 text-sm flex items-center">
                <AiFillGithub className="text-2xl" />Sign up with GitHub</span>
        </section>
    </form>
    </main>
);
}

