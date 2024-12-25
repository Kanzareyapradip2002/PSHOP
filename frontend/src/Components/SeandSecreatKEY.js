import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { VscChromeClose } from 'react-icons/vsc';
import ChangeUserRole from './ChangeUserRole';

const SeandSecreatKEY = ({ onClose, name, email, role, userId, callFun }) => {
    const [isUpdatingUserRole, setIsUpdatingUserRole] = useState(false);
    const [submitOtp, setSubmitOtp] = useState(false);
    const [data, setData] = useState({
        email: '',
        KEY: '',
    });
    const [error, setError] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timer, setTimer] = useState(0); // Track countdown time

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

        if (!data.email) {
            toast.error("Please Enter Valid Email Address");
            setIsSubmitting(false);
            return;
        }

        if (!submitOtp) {
            const otpCode = Math.floor(100000 + Math.random() * 900000);

            if (data.email === email) {
                try {
                    const response = await axios.post(SummaryApi.SendKEY.url, { email: data.email, Code: otpCode });
                    setGeneratedOtp(otpCode);
                    setSubmitOtp(true);
                    setData((prevData) => ({ ...prevData, KEY: '' }));
                    setTimer(120); // Start a 2-minute timer
                    if (response) {
                        toast.success('KEY sent to email!');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setError('Failed to send KEY. Please try again.');
                }
            } else {
                toast.error("Please Enter Valid Email Address");
            }
        } else {
            if (data.KEY === String(generatedOtp)) {
                toast.success('Verification Success');
                setIsUpdatingUserRole(true);
            } else {
                setError('Invalid KEY. Please try again.');
            }
        }

        setIsSubmitting(false);
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
        <section id="login">
            <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-60">
                <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
                    <button className="block ml-auto" onClick={onClose}>
                        <VscChromeClose />
                    </button>
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
                                        <div>
                                            <p className="text-lg ml-24">Notice:</p>
                                            <p className="text-red-500 mt-1">* Please contact P-SHOP Customer Help Line and get the KEY</p>
                                            <p className="text-red-500 mt-1">* Email: Kanzareyapradip230@gmail.com</p>
                                        </div>
                                    </div>
                                )}
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {isUpdatingUserRole && (
                <ChangeUserRole
                    name={name}
                    email={email}
                    role={role}
                    userId={userId}
                    callFun={callFun}
                    onClose={onClose}
                />
            )}
        </section>
    );
};

export default SeandSecreatKEY;
