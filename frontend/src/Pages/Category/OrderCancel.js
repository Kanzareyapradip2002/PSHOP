import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';  // Assuming you are using react-toastify
import SummaryApi from '../../common';
import { Link } from 'react-router-dom';
import Logo from '../../assest/p-shop.png';  // Simple loading state

const OrderCancel = () => {
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
        return <p>
                    <div class="ring">
                        <img src={Logo} alt='logo' className='mt-3' />
                        <span></span>
                    </div>
                </p>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Filter items that have the "Cancel" confirmation status
    const canceledItems = allAddToCart.filter(item => item.Confirmation === "Cancel");

    return (
        <div>
            <div className='bg-white p-4'>
                <h2 className='font-bold text-xl md:text-2xl'>Canceled Order Book</h2>
            </div>
            {allAddToCart.length === 0 ? (
                <p>No items in the cart for this verification code.</p>
            ) : canceledItems.length === 0 ? (
                <p>No items are canceled.</p>
            ) : (
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    {canceledItems.map((item, index) => (
                        <Link to={`ConformedPage/${item._id}`} key={index}>
                            <li className='flex flex-col items-center bg-white rounded-lg shadow-lg p-4 relative'>
                                <div className='w-full flex justify-center mb-3'>
                                    <img
                                        src={item.ProductImage}
                                        alt={`Product: ${item.ProductName}`}
                                        className='w-24 h-24 object-contain'
                                    />
                                </div>
                                <div className='text-center font-semibold text-lg'>{item.ProductName}</div>

                                <div className='absolute top-2 right-2 bg-red-500 bg-opacity-75 text-white px-3 py-1 text-sm font-bold rounded-lg transform rotate-45'>
                                    {item.Confirmation}
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderCancel;
