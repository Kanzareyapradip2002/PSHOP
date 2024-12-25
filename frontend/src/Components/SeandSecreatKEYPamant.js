import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SeandSecreatKEYPamant = ({ onClose, email }) => {
    const [submitOtp, setSubmitOtp] = useState(false);
    const [data, setData] = useState({
        email: '',
        KEY: '',
    });
    const [error, setError] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timer, setTimer] = useState(0); // Timer for OTP countdown

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Ensure the email entered matches the provided email
        if (data.email !== email) {
            toast.error("Please enter the correct email address.");
            setIsSubmitting(false);
            return;
        }

        if (!submitOtp) {
            const otpCode = Math.floor(100000 + Math.random() * 900000);

            try {
                const response = await axios.post(SummaryApi.SendKEY.url, { email: data.email, Code: otpCode });
                setGeneratedOtp(otpCode);
                setSubmitOtp(true);
                setData((prevData) => ({ ...prevData, KEY: '' }));
                setTimer(120); // Start 2-minute timer
                if (response) {
                    toast.success('KEY sent to email!');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to send KEY. Please try again.');
            }
        } else {
            if (data.KEY === String(generatedOtp)) {
                toast.success('Account Verification Success');
                onClose();
            } else {
                setError('Invalid KEY. Please try again.');
            }
        }

        setIsSubmitting(false);
    };

    // Countdown effect
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval); // Stop timer when it reaches 0
        }

        return () => clearInterval(interval); // Cleanup interval when component unmounts
    }, [timer]);

    // Format time into mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <section id="login">
            <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-60">
                <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
                    <div className="mx-auto container p-4">
                        <div className="bg-white p-5 w-full py-5 max-w-sm mx-auto">
                            {error && <div className="text-red-600">{error}</div>}
                            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                                <div className="grid">
                                    <label>Email:</label>
                                    <div className="bg-slate-100 p-2">
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleOnChange}
                                            placeholder="Enter Email Id"
                                            className="w-full h-full outline-none bg-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                {submitOtp && (
                                    <div>
                                        <label>KEY:</label>
                                        <div className="bg-slate-100 p-2 flex">
                                            <input
                                                type="text"
                                                name="KEY"
                                                value={data.KEY}
                                                onChange={handleOnChange}
                                                placeholder="Enter KEY"
                                                className="w-full h-full outline-none bg-transparent"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                {data.email === email && (
                                    <>
                                        <button
                                            type='submit'
                                            className={`bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 hover:bg-red-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SeandSecreatKEYPamant;
