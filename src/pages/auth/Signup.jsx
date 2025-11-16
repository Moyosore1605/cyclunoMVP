import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Signup() {
    const { register } = useContext(AuthContext);
    const [form, setForm] = useState({name: "", email: "",  password: "",});
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await register(form);
        if (!res.success) {
            setError(res.message);
            return;
        }
        setDone(true);
    };

return (
    <form onSubmit={handleSignup} className="m-10 flex gap-3">
        <input  placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-5"/>
        <input placeholder="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-5"/>
        <input placeholder="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border p-5"/>
        <button>Sign Up</button>

        {error && <p>{error}</p>}
        {done && <p>Signup successful!</p>}
    </form>
);
}

