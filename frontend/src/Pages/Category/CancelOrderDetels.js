import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';  // Assuming you are using react-toastify
import SummaryApi from '../../common';
import { useParams } from 'react-router-dom';
import displayINRCurrency from '../../helpers/displayCurrency';

const CancelOrderDetels = () => {
    const [allAddToCart, setAllAddToCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state?.user?.user);
    const verificationCodes = user?.verificationCode;
    const { id } = useParams();
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
    const processingItems = allAddToCart.filter(item => item._id === id);

    return (
        <div>
            <div className='bg-white p-2'>
                <h2 className='font-bold'>Processing Order Deteles </h2>
            </div>
            {allAddToCart.length === 0 ? (
                <p>No items in the cart for this verification code.</p>
            ) : processingItems.length === 0 ? (
                <p>No items are being processed .</p>
            ) : (
                <ul>
                    {processingItems.map((item, index) => (
                        <div>
                            {/* Product Details */}
                            <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 mr-2'>
                                <h1 className='font-bold ml-2 text-xl'>* Product Details *</h1>
                            </div>

                            <div className="flex">
                                <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 w-[400px] flex justify-center items-center'>
                                    <img src={item.ProductImage} className='h-[300px] w-[300px] mix-blend-multiply ' alt='ProductImage' />
                                    <div className=' font-bold w-[360px] ml-[-350px] mt-[-20px] -rotate-45 text-4xl p-2 bg-red-500 bg-opacity-75 rounded-lg'>
                                    <p className='ml-28 pb-1 text-white'>
                                        {item.Confirmation}
                                    </p>
                                </div>
                                </div>
                                <div className='bg-white shadow-lg p-2  rounded-lg mt-3 ml-3 mr-2'>
                                    <div className='flex gap-3 ml-3 mt-2 flex-wrap w-[800px]'>
                                        <div className='bg-white shadow-lg p-3 rounded-lg '>
                                            <h1 className='font-bold'>Product Name:</h1>
                                            <h1>{item.ProductName}</h1>
                                        </div>
                                        <div className='bg-white shadow-lg p-3 rounded-lg '>
                                            <h1 className='font-bold'>Product Brand:</h1>
                                            <h1>{item.ProductBrand}</h1>
                                        </div>
                                        <div className='bg-white shadow-lg p-3 rounded-lg '>
                                            <h1 className='font-bold'>Product Category:</h1>
                                            <h1>{item.ProductCategory}</h1>
                                        </div>
                                        <div className='bg-white shadow-lg p-3 rounded-lg '>
                                            <h1 className='font-bold'>Product Quantity:</h1>
                                            <h1>{item.Num}</h1>
                                        </div>
                                        <div className='bg-white shadow-lg p-3 rounded-lg '>
                                            <h1 className='font-bold'>Product Price:</h1>
                                            <h1>{displayINRCurrency(item.ProductPrice)}</h1>
                                        </div>
                                        <div className='bg-white shadow-lg p-3 rounded-lg '>
                                            <h1 className='font-bold'>Product Discount:</h1>
                                            <h1>{item.Discount}</h1>
                                        </div>
                                        <div className='bg-white shadow-lg p-3 rounded-lg '>
                                            <h1 className='font-bold'>Total Price:</h1>
                                            <h1>{displayINRCurrency(item.TotalPrice)}</h1>
                                        </div>
                                        <div className='bg-white shadow-lg p-3 w-[1000px] rounded-lg '>
                                            <h1 className='font-bold'>Product Description:</h1>
                                            <h1>{item.ProductDescription}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bank Account Details */}
                            <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 mr-2'>
                                <h1 className='font-bold ml-2 text-xl'>* Bank Account Details *</h1>
                            </div>

                            <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 mr-2 '>
                                <div className='flex gap-5 ml-16 mt-10 pb-10 flex-wrap w-[1040px]'>
                                    <div className='bg-white shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Account Holder Photo:</h1>
                                        <img src={item.AccountHolderPhoto} className='rounded-full h-20 ml-10' alt='Account Holder ' />
                                    </div>
                                    <div className='bg-white shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Bank:</h1>
                                        <img src={item.Bank} className='h-16 ' alt='Account Holder ' />
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Account Holder Name:</h1>
                                        <h1>{item.AccountHolderName}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Account Number:</h1>
                                        <h1>{item.AccountNumber}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Mobile Number:</h1>
                                        <h1>{item.MobileNo}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Email Id:</h1>
                                        <h1>{item.EmailId}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Bank Branch:</h1>
                                        <h1>{item.Branch}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Branch Code:</h1>
                                        <h1>{item.BranchCode}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>City:</h1>
                                        <h1>{item.City}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>District:</h1>
                                        <h1>{item.District}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>State:</h1>
                                        <h1>{item.State}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>Country:</h1>
                                        <h1>{item.Country}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 mr-2'>
                                <h1 className='font-bold ml-2 text-xl'>* Address Details *</h1>
                            </div>

                            <div className='bg-white shadow-lg p-2  rounded-lg mt-3 ml-3 mr-2 '>
                                <div className='flex gap-5 ml-16 mt-10 pb-10 flex-wrap w-[1040px]'>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>FullName:</h1>
                                        <h1>{item.FullName}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>PhoneNumber:</h1>
                                        <h1>{item.PhoneNumber}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>AltPhoneNumber:</h1>
                                        <h1>{item.AltMobileNo}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>PinCode:</h1>
                                        <h1>{item.PinCode}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>City:</h1>
                                        <h1>{item.City}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>State:</h1>
                                        <h1>{item.State}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>HouseNo:</h1>
                                        <h1>{item.HouseNo}</h1>
                                    </div>
                                    <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
                                        <h1 className='font-bold'>RoadName:</h1>
                                        <h1>{item.RoadName}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3'></div>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CancelOrderDetels