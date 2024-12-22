import React, { useState } from 'react';
import loginicon from '../assest/signin.gif'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageConverter from '../helpers/ImageConveter'; 
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const location = useLocation();
    const { email } = location.state || {};
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmpassword: "",
        profilePic: "",
        verificationCode:Math.floor(100000 + Math.random() * 900000), 
    });
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };


    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imagePic = await ImageConverter(file);
            setData((prev) => ({ ...prev, profilePic: imagePic }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmpassword) {
            return toast.error("Passwords do not match!");
        }
        if (email !== data.email) {
            return toast.error("Email does not match!");
        }
        try {
            const response = await fetch(SummaryApi.SignUp.url, {
                method: SummaryApi.SignUp.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message);
            }
            toast.success(result.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Sign-up failed!");
        }
    };

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full py-5 max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <img src={data.profilePic || loginicon} alt='Profile Preview' />
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 pb-4 pt-2 cursor-pointer bg-slate-200 py-4 text-center absolute bottom-0 w-full'>
                                    Upload Photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name:</label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type='text'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    placeholder='Enter Your Name'
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type='email'
                                    name='email'
                                    value={data.email}
                                    required
                                    onChange={handleOnChange}
                                    placeholder='Enter Email Id'
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className="bg-slate-100 p-2 flex">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter Password'
                                    className='w-full h-full outline-none bg-transparent'
                                    name='password'
                                    required
                                    value={data.password}
                                    onChange={handleOnChange} />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <div className="bg-slate-100 p-2 flex">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Enter Confirm Password'
                                    className='w-full h-full outline-none bg-transparent'
                                    name='confirmpassword'
                                    value={data.confirmpassword}
                                    required
                                    onChange={handleOnChange} />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        <button 
                            type='submit' 
                            className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 hover:bg-red-700'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
