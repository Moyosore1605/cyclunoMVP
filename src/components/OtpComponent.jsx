import React, { useState, useRef } from 'react'

export default function OtpComponent({length = 4, onSubmit}) {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        // 1. Get the value entered (the element argument is the DOM event)
        const value = element.target.value;

        // 2. Only allow a single digit in the box
        if (isNaN(value) || value.length > 1) return;

        // 3. Update the OTP state array
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // 4. Automatically move to the next input field if a digit was entered
        if (value !== '' && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // 5. If the code is complete, call the onSubmit prop
        const fullCode = newOtp.join('');
        if (fullCode.length === length) {
            onSubmit(fullCode);
        }
    };
    const handleKeyDown = (element, index) => {
        // Check if the key pressed is Backspace (key code 8 or key string 'Backspace')
        if (
          element.key === 'Backspace' && // User pressed backspace
          otp[index] === '' && // The current box is empty
          index > 0 // We are not in the first box
        ) {
          // Move focus to the previous input field
            inputRefs.current[index - 1].focus();
        }
    };



return (
    <div style={{ display: 'flex', gap: '10px' }}>
        {otp.map((data, index) => {
            return (
                <input key={index} type="text" placeholder='.' className='text-center font-bold text-2xl w-12 h-12 rounded-lg border border-gray-300'
                // Assign the ref so we can programmatically focus it
                ref={el => (inputRefs.current[index] = el)} value={data} onChange={e => handleChange(e, index)} onKeyDown={e => handleKeyDown(e, index)} maxLength="1"/>
            );
        })}
    </div>
);
};
