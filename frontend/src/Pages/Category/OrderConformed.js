import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';  // Assuming you are using react-toastify
import SummaryApi from '../../common';
import { Link } from 'react-router-dom';

const OrderConformed = () => {
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
        return <div>Loading...</div>;  // Simple loading state
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Filter items that have the "Processing..." confirmation status
    const processingItems = allAddToCart.filter(item => item.Confirmation === "Confirmed");

    return (
        <div>
            <div className='bg-white p-2'>
                <h2 className='font-bold'>Conformed Order Book</h2>
            </div>
            {allAddToCart.length === 0 ? (
                <p>No items in the cart for this verification code.</p>
            ) : processingItems.length === 0 ? (
                <p>No items are being Conformed .</p>
            ) : (
                <ul className=' flex flex-wrap gap-2' >
                    {processingItems.map((item, index) => (
                        <Link to={`ConformedPage/${item._id}`}>
                            <li key={index}>
                                <div className='mt-2 w-32 bg-white rounded-md'>
                                    <div>
                                        <img
                                            src={item.ProductImage}
                                            alt={`Product: ${item.ProductName}`}  // More descriptive alt text
                                            className='mix-blend-multiply h-28 ml-5 w-24'
                                        />

                                    </div>
                                    <div className='ml-3 font-semibold pb-2 text-lg'>{item.ProductName}</div>
                                </div>
                                <div className=' font-bold w-[130px] mt-[-105px] -rotate-45 text-md bg-opacity-75 bg-green-500 rounded-lg'>
                                    <p className='ml-5 pb-1 text-white'>
                                        {item.Confirmation}
                                    </p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderConformed;
