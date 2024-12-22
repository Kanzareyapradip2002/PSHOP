import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import { useNavigate } from 'react-router-dom';

const SendMessageOwner = () => {
    const [data, setData] = useState({ email: '', message: '' });
    const [error, setError] = useState('');
    const naviget = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        setError('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

            const message = data.message;
            try {
                const response = await axios.post(SummaryApi.SendMessage.url, { email: data.email, Code: message });
                if (response.status === 200) {
                    setData((prevData) => ({ ...prevData, message: '' }));
                    toast.success('Message sent to Oner email!');
                    naviget("/admin-panel/all-users")
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to send message. Please try again.');
            }
    };

    return (
        <section className='min-h-[calc(100vh-10px)] mt-4'>
            <div className='flex pb-6 justify-center'>
                <div className='bg-white shadow-md flex p-4 w-full max-w-screen-xl'>
                    <div className='container'>
                        <div className='bg-white w-full max-w-lg'>
                            {error && <div className='text-red-600'>{error}</div>}
                            <form className='flex flex-col gap-2 ml-3' onSubmit={handleSubmit}>
                                <div className='grid'>
                                    <label htmlFor='email'>Email:</label>
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
                                <div>
                                    <label htmlFor='message'>Message:</label>
                                    <textarea
                                        className='bg-slate-100 w-full min-h-[440px] outline-none p-2'
                                        name='message'
                                        value={data.message}
                                        onChange={handleOnChange}
                                        placeholder='Enter your message here'
                                        required
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='bg-red-600 text-white px-6 py-2 rounded-full hover:scale-110 transition-all mx-auto block mt-4 hover:bg-red-700'
                                >
                                Send Message
                                </button>

                            </form>
                        </div>
                    </div>
                    <div className='mt-5 ml-[-400px]'>
                        <p className='text-2xl font-semibold'>Notice:</p>
                        <p className='text-slate-400 mt-1'>* You have Changa User Role * </p>
                        <p className='text-slate-400 mt-1'>* Stap-1: Sand The Your Email Id </p>
                        <p className='text-slate-400 mt-1'>* Stap-2: All Uaer Detels Wrait The Box Sand The Message </p>
                        <p className='text-slate-400 mt-1'>* Stap-3: All Details Red The Oner And Change The  Your User Roll  </p>
                        <p className='text-slate-400 mt-1'>* Stap-4: Your User Roll Admin To Ganrel And User Roll Ganrel To Admin </p>
                        <p className='text-slate-400 mt-1'>* Stap-5: Your User Roll Admin The Sohw The AdminPanel </p>
                        <p className='text-slate-400 mt-1'>* Stap-6: Your User Roll Ganrel The Not Sohw The AdminPanel only Ganrel User Detels Show </p>
                        <p className='text-slate-400 mt-1'>* Stap-7: Your User Roll Admin To Cahnge User Roll To Send Email Id To Sand Secret Key Oner Email Id </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SendMessageOwner;
