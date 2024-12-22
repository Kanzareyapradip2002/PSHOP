import React, { useState, useEffect } from 'react';
import logo from '../assest/p-shop.png';
import { MdOutlineSearch } from "react-icons/md";
import { FaUserTie, FaCartPlus } from "react-icons/fa";
import { Link} from 'react-router-dom';
import {useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import ROLE from '../common/role';
import moment from 'moment';
import { HiWallet } from "react-icons/hi2";

const Header = () => {
    const user = useSelector((state) => state?.user?.user);
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [allAddToCart, setAllAddToCart] = useState([]);
    const verificationCodes = user?.verificationCode;
    useEffect(() => {
        if (verificationCodes) {
            const fetchAllUsers = async () => {
                try {
                    const response = await fetch(SummaryApi.AllAddToCart.url, {
                        method: SummaryApi.AllAddToCart.method,
                        credentials: 'include',
                    });

                    const dataResponse = await response.json();

                    if (dataResponse.success) {
                        const filteredItems = dataResponse.data.filter(item => item.VerificationCodes === verificationCodes);
                        setAllAddToCart(filteredItems);
                    } else {
                        toast.error(dataResponse.message);
                    }
                } catch (error) {
                    toast.error(`Failed to fetch cart items: ${error.message || 'Unknown error'}`);
                }
            };

            fetchAllUsers();
        }
    }, [verificationCodes]);

    const handleLogout = async () => {
        // Clear user data from localStorage
        localStorage.removeItem("loginUserEmail");
        localStorage.removeItem("loginUsername");
        localStorage.removeItem("loginUserpassword");

        // Optional: You can manually clear any other app state or session if necessary

        // Force a page refresh (reload)
        window.location.reload();
    };


    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-40'>
            <div className='h-full mx-auto flex items-center px-4 justify-between'>
                <div>
                    <Link to="/">
                        <img className='h-[90px] w-[120px]' src={logo} alt='Pixel Shop Logo' />
                    </Link>
                </div>
                <div className='lg:flex hidden items-center w-full justify-between max-w-sm border focus-within:shadow-md rounded-full pl-2'>
                    <input type='text' placeholder='Search Product....' className='w-full outline-none' />
                    <div className='text-lg min-w-[50px] h-8 bg-slate-400 flex items-center justify-center rounded-r-full'>
                        <MdOutlineSearch />
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='relative flex justify-center'>
                        {user?._id && (
                            <div className='text-2xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
                                {user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                                ) : (
                                    <FaUserTie />
                                )}
                            </div>
                        )}

                        {menuDisplay && (
                            <div className='absolute bg-white bottom-0 top-11 h-fit p-3 shadow-lg rounded-md'>
                                <nav>
                                    {user?.role === ROLE.ADMIN ? (
                                        <Link to={"admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>
                                            Admin-panel
                                        </Link>
                                    ) : (
                                        <div>
                                            <h1 className='text-xl text-center font-bold bg-black text-white'>User Details</h1>
                                            <div className='bg-slate-100'>
                                                <hr className='border-red-600' />
                                                <h1 className='p-1'>Name: {user?.name}</h1>
                                                <hr className='border-red-600' />
                                                <h1 className='p-1'>Email: {user?.email}</h1>
                                                <hr className='border-red-600' />
                                                <h1 className='p-1'>Role: {user?.role}</h1>
                                                <hr className='border-red-600' />
                                                <h1 className='p-1'>Create Date: {moment(user?.createdAt).format('LL')}</h1>
                                                <hr className='border-red-600' />
                                            </div>
                                        </div>
                                    )}
                                </nav>
                            </div>
                        )}
                    </div>

                    <div>
                        {user?._id ? (
                            <button onClick={handleLogout} className='px-4 py-1 cursor-pointer rounded-full text-white bg-red-600 hover:bg-red-700'>
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className='px-4 py-1 cursor-pointer rounded-full text-white bg-red-600 hover:bg-red-700'>
                                Login
                            </Link>
                        )}
                    </div>

                    {user?._id && user?.role === ROLE.GENERAL && (
                        <Link to={"/User-Wallet/:Code"} className="text-3xl relative">
                            <HiWallet />
                        </Link>
                    )}

                    {user?._id && user?.role === ROLE.GENERAL && (
                        <Link to={"/AddToCart"} className='text-3xl relative'>
                            <FaCartPlus />
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-2 right-1'>
                                <p className='text-sm'>{allAddToCart.length}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
