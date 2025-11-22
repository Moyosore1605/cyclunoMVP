import api from '../../api/axios.js';
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link, useNavigate } from "react-router-dom";
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
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
    <main className='flex flex-row-reverse h-full bg-cover w-full bg-no-repeat' style={{backgroundImage: `url(${Cover})`}}>
        <div className='bg-white p-10 rounded-l-3xl w-[50%] flex justify-center'>
            <form onSubmit={handleLogin} className='flex flex-col gap-2 w-[540px] h-[440px] shadow-xl rounded-md p-10 mt-10'>
                <h1 className='text-3xl font-semibold'>Login</h1>
                <label htmlFor="email" className='text-gray-600 mt-4'>Email</label>
                <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className='border p-3 rounded-md text-sm'/>
                <div className='flex justify-between mt-4'>
                    <label htmlFor="password" className='text-gray-600'>Password</label>
                    <Link to='/' className='text-[#00B5D8]'>Forgot Password ?</Link>
                </div>
                <div className='relative'>
                    <input  placeholder="Enter your password" type={showPassword? 'text': 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='border p-3 rounded-md text-sm w-full transition ease-in-out'/>
                    {showPassword?(<AiFillEyeInvisible onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>):
                    (<AiFillEye onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>)}
                </div>
                <button className='bg-[#2161F6] text-[16px] mt-6 text-white p-3 rounded-md'>Login now</button>
                <span className='text-gray-400 text-lg text-center mt-2'>Don't Have An Account? 
                    <Link to='/signup' className='ms-3 text-[#00B5D8]'>
                        Sign Up
                    </Link></span>
        </form>
        </div>
    </main>
);
}
