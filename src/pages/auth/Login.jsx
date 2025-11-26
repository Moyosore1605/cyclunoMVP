import api from '../../api/axios.js';
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link, useNavigate } from "react-router-dom";
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner";
// import { useRef } from 'react';

export default function Login() {
    const { login, loginUser, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    // const justLoggedIn = useRef(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setLoading(false);
            toast.error("Email format is invalid. Use something like user@example.com");
            return;        
        }

        try {
            const res = await login({ email, password });
            // console.log("Login response1:", res);

            if (!res || !res.success) {
                // normalize message to string
                const msg = typeof res?.message === "string"? res.message : res?.message && typeof res.message === "object"
                            ? JSON.stringify(res.message) : res?.data && typeof res.data === "string" ? res.data : res?.data
                            ? JSON.stringify(res.data) : "Login failed";
                toast.error(msg);
                return;
            }

            const payload = res?.data?.result || res?.data;
            // let newUser = null;
            // if (payload && typeof payload === "object") {
            //     newUser = payload?.data ?? payload?.user ?? payload;
            // } else if (typeof payload === "string") {
            //     newUser = { email: payload };
            // }
            // // console.log("newUser after login (normalized):", newUser);
            // if (newUser && typeof loginUser === "function") {
            //     loginUser(newUser);
            //     toast.success("Login Successful");
            //     navigate("/dashboard");
            // } else {
            //     // backend returned no usable profile; still inform user
            //     toast.error("Login succeeded but no profile returned");
            // }

            if (payload && typeof payload === "object" && payload.access) {
                // Pass the full payload (with 'access' key) to AuthContext
                loginUser(payload); 
                toast.success("Login Successful");
                navigate("/dashboard");
            } else {
                // backend returned no usable profile OR no tokens; inform user
                toast.error("Login succeeded but failed to retrieve user tokens/profile.");
            }

            } catch (error) {
                // extract axios/server error safely
                const errMsg =
                    error?.response?.data?.message ||
                    error?.response?.data ||
                    error?.message ||
                    "Something went wrong during login";
                toast.error(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
                console.error("login error:", error);
            } finally{
                setLoading(false);
            }
    };
    if (loading) {
        return <Spinner />;
    }

return (
    <main className='flex h-screen w-full p-10 pt-4 overflow-hidden'>
            <form onSubmit={handleLogin} className='m-10 mt-10 flex flex-col w-full items-start'>
                <h1 className='text-3xl font-semibold mb-5 font-fraunces'>Login</h1>
                <label htmlFor="email" className='text-gray-600 mt-4'>Email</label>
                <input placeholder="Enter your email here" value={email} onChange={(e) => setEmail(e.target.value)} className='border p-3 rounded-md text-sm w-full'/>
                <div className='flex justify-between mt-11 w-full'>
                    <label htmlFor="password" className='text-gray-600'>Password</label>
                    <Link to='/forgotpassword' className='text-[#1B365D] text-sm'>Forgot Password ?</Link>
                </div>
                <div className='relative w-full'>
                    <input  placeholder="Enter your password" type={showPassword? 'text': 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='border p-3 rounded-md text-sm w-full transition ease-in-out'/>
                    {showPassword?(<AiFillEyeInvisible onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>):
                    (<AiFillEye onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>)}
                </div>
                <button className='bg-[#1B365D] text-[16px] mt-10 text-white p-2 rounded-md w-[200px] mx-auto' type='submit'>Log in</button>
                <span className='text-gray-400 text-sm text-center mt-2 mx-auto'>Don't Have An Account? 
                    <Link to='/signup' className='ms-1 text-[#1B365D]'>
                        Sign Up
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
