import api from '../../api/axios.js';
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link, useNavigate } from "react-router-dom";
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import {toast} from "react-toastify";
import Cover from '../../assets/Cover.png';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(form.email)) {
            setLoading(false);
            toast.error("Email format is invalid. Use something like user@example.com");
            return;        
        }

        try {
            const res = await login({ email, password });
            console.log("Login response1:", res);

            if (!res || !res.success) {
                // normalize message to string
                const msg = typeof res?.message === "string"? res.message : res?.message && typeof res.message === "object"
                            ? JSON.stringify(res.message) : res?.data && typeof res.data === "string" ? res.data : res?.data
                            ? JSON.stringify(res.data) : "Login failed";
                toast.error(msg);
                return;
            }
            const newUser = res.data?.data || res.data;
            if (newUser) loginUser(newUser);
            toast.success("Login Successful");
            navigate("/dashboard");
            } catch (error) {
                // extract axios/server error safely
                const errMsg =
                    error?.response?.data?.message ||
                    error?.response?.data ||
                    error?.message ||
                    "Something went wrong during signup";
                toast.error(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
                console.error("login error:", error);
            } finally{
                setLoading(false);
            }

        // if (!res.success) {
        // toast.error(res.message || "Login Failed");
        // return;
        // }
        // toast.success("Login Successful");
        // navigate("/dashboard");
    };

return (
    <main className='flex h-screen w-full p-10 pt-4 overflow-hidden'>
            <form onSubmit={handleLogin} className='m-10 mt-10 flex flex-col w-full items-start'>
                <h1 className='text-3xl font-semibold mb-5 font-fraunces'>Login</h1>
                <label htmlFor="email" className='text-gray-600 mt-4'>Email</label>
                <input placeholder="Enter your email here" value={email} onChange={(e) => setEmail(e.target.value)} className='border p-3 rounded-md text-sm w-full'/>
                <div className='flex justify-between mt-11 w-full'>
                    <label htmlFor="password" className='text-gray-600'>Password</label>
                    <Link to='/' className='text-[#1B365D] text-sm'>Forgot Password ?</Link>
                </div>
                <div className='relative w-full'>
                    <input  placeholder="Enter your password" type={showPassword? 'text': 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='border p-3 rounded-md text-sm w-full transition ease-in-out'/>
                    {showPassword?(<AiFillEyeInvisible onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>):
                    (<AiFillEye onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>)}
                </div>
                <button className='bg-[#1B365D] text-[16px] mt-10 text-white p-2 rounded-md w-[200px] mx-auto'>Log in</button>
                <span className='text-gray-400 text-sm text-center mt-2 mx-auto'>Don't Have An Account? 
                    <Link to='/signup' className='ms-1 text-[#1B365D]'>
                        Sign Up
                    </Link>
                </span>
                <p className="mx-auto text-gray-400 font-semibold mt-6 mb-4">- OR -</p>
                <section className="flex gap-3 mx-auto">
                    <button className="border border-gray-400 p-2 rounded-lg text-gray-400 text-sm flex items-center">
                        <FcGoogle className="text-2xl" />Sign up with Google</button>
                    <button className="border border-gray-400 p-2 rounded-lg text-gray-400 text-sm flex items-center">
                        <AiFillGithub className="text-2xl" />Sign up with GitHub</button>
                </section>
        </form>
    </main>
);
}
