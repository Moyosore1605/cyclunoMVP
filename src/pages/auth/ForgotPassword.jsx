import React from 'react'
import OtpComponent from '../../components/OtpComponent'

export default function ForgotPassword() {
const handleSubmit = (fullCode) => {
    console.log('OTP Entered:', fullCode);
    // You can now send this fullCode to your backend API
    // for verification when the user clicks 'Submit'
};

return (
    <main className='h-screen p-10 flex flex-col justify-start w-full ms-10'>
        <h1 className="text-3xl font-semibold mt-10 mb-5 font-fraunces">Reset Password</h1>
        <p className='text-sm text-gray-400'>Enter OTP sent to your email</p>
        <section className='flex w-full flex-col gap-5 mt-10 items-center'>
        <OtpComponent length={4} onSubmit={handleSubmit} />
        <button type='submit' className='bg-[#1B365D] text-[16px] mt-6 text-white p-2 rounded-md w-[270px]'>Submit</button>
        </section>
    </main>
)
}
