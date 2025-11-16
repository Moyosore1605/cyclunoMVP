import api from '../../api/axios.js';
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await login({ email, password });
        if (!res.success) {
        setError(res.message);
        return;
        }
        navigate("/dashboard");
    };

return (
    <form onSubmit={handleLogin} className='m-10 flex gap-3'>
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border p-5'/>
        <input  placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border p-5'/>
        <button>Login</button>
        {error && <p>{error}</p>}
    </form>
);
}
