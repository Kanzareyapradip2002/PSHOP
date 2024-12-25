import React, { useState, useEffect } from 'react';
import loginicon from '../assest/signin.gif'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const EmailPage = () => {
    const [submitOtp, setSubmitOtp] = useState(false);
    const [data, setData] = useState({
        email: '',
        otp: '',
    });
    const [error, setError] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [timer, setTimer] = useState(0); // Track countdown time
    const navigate = useNavigate();

    // Handle input change
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setError(''); // Clear error message on input change
    };

    // Handle OTP submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!submitOtp) {
            // Sending OTP
            const otpCode = Math.floor(100000 + Math.random() * 900000); // Generating OTP
            console.log(otpCode); // For debugging purposes, ideally log this in a secure way

            try {
                // Sending the OTP to user's email via your backend
                const response = await axios.post(SummaryApi.Sendotp.url, {email: data.email, Code: otpCode });
                
                if (response.status === 200) {
                    setGeneratedOtp(otpCode); // Store the generated OTP
                    setSubmitOtp(true);
                    setData((prevData) => ({ ...prevData, otp: '' }));
                    setTimer(120); // Start a 2-minute timer
                    toast.success('OTP sent to your email!');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to send OTP. Please try again.');
            }
        } else {
            // Verifying OTP
            if (data.otp === String(generatedOtp)) {
                toast.success('Verification Success');
                navigate('/sign-up', { state: { email: data.email } });
            } else {
                setError('Invalid OTP. Please try again.');
            }
        }
    };

    // Countdown timer effect
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval); // Stop timer when it reaches 0
        }

        return () => clearInterval(interval); // Cleanup on component unmount or timer stop
    }, [timer]);

    // Format the remaining time in mm:ss format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full py-5 max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginicon} alt='Logo Icon' className='rounded-full' />
                    </div>
                    {error && <div className='text-red-600'>{error}</div>}
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    placeholder='Enter Email Id'
                                    className='w-full h-full outline-none bg-transparent'
                                    required
                                />
                            </div>
                        </div>
                        {submitOtp && (
                            <div>
                                <label>OTP:</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type='text'
                                        name='otp'
                                        value={data.otp}
                                        onChange={handleOnChange}
                                        placeholder='Enter OTP'
                                        className='w-full h-full outline-none bg-transparent'
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        <button
                            type='submit'
                            className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 hover:bg-red-700'
                        >
                            {(submitOtp ? 'Submit OTP' : 'Send OTP')}
                        </button>
                        <div className='ml-28'>
                          {
                            timer !== 0 && (
                               `Otp Expierd :${formatTime(timer)}`
                            )
                          }  
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EmailPage;
