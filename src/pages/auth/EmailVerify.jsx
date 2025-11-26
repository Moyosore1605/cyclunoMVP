import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail as verifyEmailAPI } from "../../api/auth"; // 👈 Rename the import
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

// Remove: useContext(AuthContext) and the duplicate verifyEmail (it's not needed here)

export default function EmailVerify() {
    const navigate = useNavigate();
    
    // Use a single state object for the entire OTP field values
    const [form, setForm] = useState({ email: "" }); 

    // Individual states for OTP inputs
    const [otpValues, setOtpValues] = useState(['', '', '', '']); 
    
    const [loading, setLoading] = useState(false);

    // Function to handle changes in OTP fields (improves UX from previous example)
    const handleOtpChange = (index, value) => {
        // Only allow a single digit
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otpValues];
        newOtp[index] = value;
        setOtpValues(newOtp);

        // Auto-focus logic (Good UX)
        if (value && index < newOtp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };
    
    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(form.email)) {
            setLoading(false);
            return toast.error("Email format is invalid.");
        }

        // 1. Construct the final OTP string from the array
        const otpCode = otpValues.join('');

        if (otpCode.length !== otpValues.length) {
            setLoading(false);
            return toast.error("Please enter the full 4-digit OTP.");
        }

        // 2. Build the payload for the API
        const payload = {
            email: form.email,
            otp_code: otpCode, // Send the actual OTP entered by the user
        };
        
        try {
            // 3. Use the renamed API function
            const res = await verifyEmailAPI(payload); 
            console.log("verification response:", res);
            
            toast.success('Verification Successful! Redirecting to Dashboard.');
            navigate('/dashboard');

        } catch (error) {
            // Handle error response from the backend
            console.error("Verification Error:", error);
            const msg = error.response?.data?.message || "Failed to verify email. Check the code and email.";
            toast.error(msg);
            
        } finally {
            // 4. IMPORTANT: Always stop loading here, regardless of success or failure.
            setLoading(false); 
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <main className="h-screen flex items-center w-full justify-center p-5">
            <form onSubmit={handleVerify} className="w-[80%] flex flex-col">
                <h1 className="text-3xl font-bold text-center mb-5">Verify Email</h1>
                <input 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    className="border p-3 rounded-md text-sm bg-gray-100 w-full" 
                    type="email"
                />
                
                {/* 🌟 OTP INPUTS 🌟 */}
                <div className="flex gap-3 mt-4 justify-center">
                    {otpValues.map((value, index) => (
                        <input 
                            key={index}
                            id={`otp-${index}`}
                            className="p-3 w-10 h-10 text-center rounded-md border" 
                            maxLength='1' 
                            value={value} 
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            type="tel" // Use tel for better mobile keyboard experience
                        />
                    ))}
                </div>
                
                <button 
                    className='bg-[#1B365D] text-[16px] mt-6 text-white p-2 rounded-md w-[200px] mx-auto' 
                    type="submit"
                    disabled={loading} // Good practice to disable during loading
                >
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>
            </form>
        </main>
    );
}