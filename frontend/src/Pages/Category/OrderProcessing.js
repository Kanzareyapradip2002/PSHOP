import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import { Link } from 'react-router-dom';
import Logo from '../../assest/p-shop.png';  // Simple loading state

const OrderProcessing = () => {
    const [allAddToCart, setAllAddToCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state?.user?.user);
    const verificationCodes = user?.verificationCode;

    useEffect(() => {
        const fetchAllUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(SummaryApi.getAllOrderProdact.url, {
                    method: SummaryApi.getAllOrderProdact.method,
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
                toast.error('Failed to fetch cart items');
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (verificationCodes) {
            fetchAllUsers();
        }
    }, [verificationCodes]);

    if (loading) {
        return<p>
                    <div class="ring">
                        <img src={Logo} alt='logo' className='mt-3' />
                        <span></span>
                    </div>
                </p>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Filter items that have the "Processing..." confirmation status
    const processingItems = allAddToCart.filter(item => item.Confirmation === "Processing");

    return (
        <div>
            <div className='bg-white p-4'>
                <h2 className='font-bold text-xl md:text-2xl'>Processing Order Book</h2>
            </div>
            {allAddToCart.length === 0 ? (
                <p>No items in the cart for this verification code.</p>
            ) : processingItems.length === 0 ? (
                <p>No items are being processed.</p>
            ) : (
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    {processingItems.map((item, index) => (
                        <Link to={`ConformedPage/${item._id}`} key={index}>
                            <li className='flex flex-col items-center bg-white rounded-md shadow-md p-4'>
                                <div className='w-full flex justify-center mb-3'>
                                    <img
                                        src={item.ProductImage}
                                        alt={`Product: ${item.ProductName}`}
                                        className='w-24 h-24 object-contain'
                                    />
                                </div>
                                <div className='text-center font-semibold text-lg'>{item.ProductName}</div>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderProcessing;
