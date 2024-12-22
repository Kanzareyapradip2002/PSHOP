import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import SummaryApi from '../../common';
import displayINRCurrency from '../../helpers/displayCurrency';
import { Link } from 'react-router-dom';

const AddToCart = () => {
    const [allAddToCart, setAllAddToCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAddToCart, setTotalAddToCart] = useState(0);
    const user = useSelector((state) => state?.user?.user);
    const verificationCodes = user?.verificationCode;

    useEffect(() => {
        const fetchAllUsers = async () => {
            setLoading(true);
            setError(null);
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

    const deleteAddToCart = async (itemId) => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.DeleteAddToCart.url.replace(':id', itemId), {
                method: SummaryApi.DeleteAddToCart.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData?.message || 'Failed to delete AddToCart.');
                return;
            }

            const updatedItems = allAddToCart.filter((item) => item._id !== itemId);
            setAllAddToCart(updatedItems);
            toast.success('Item deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete item, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (allAddToCart.length > 0) {
            const total = allAddToCart.reduce((acc, item) => {
                const productQuantity = parseFloat(item?.Num);
                const productPrice = parseFloat(item?.ProductPrice);
                const DiscountPrice = parseFloat(item?.DiscountPrice || 0);
                const DeliveryChargePrice = parseFloat(item?.DeliveryChargePrice || 0);
                const TotalPrice = productPrice * productQuantity;
                const ProductSellingPrice = TotalPrice - DiscountPrice;
                const CurrentTotalPrice = ProductSellingPrice + DeliveryChargePrice;
                return acc + CurrentTotalPrice;
            }, 0);
            setTotalAddToCart(total); // Update the total price
        }
    }, [allAddToCart]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <ul className="flex flex-wrap">
                {allAddToCart.length > 0 ? (
                    allAddToCart.map((item, index) => {
                        const productQuantity = parseFloat(item?.Num);
                        const productPrice = parseFloat(item?.ProductPrice);
                        const DiscountPrice = parseFloat(item?.DiscountPrice || 0);
                        const DeliveryChargePrice = parseFloat(item?.DeliveryChargePrice || 0);
                        const TotalPrice = productPrice * productQuantity;
                        const ProductSellingPrice = TotalPrice - DiscountPrice;
                        const CurrentTotalPrice = ProductSellingPrice + DeliveryChargePrice;
                        const handelPayError = () =>{
                            toast.error("This Order Is Payment Conformed ")
                        }
                        return (
                            <li key={index} className="flex justify-center items-center ml-7  pb-3 pt-4">
                                <div className="bg-white p-3 rounded shadow-lg cursor-pointer">
                                    <div className="w-[550px] h-[300px] pb-5 overflow-y-scroll scrollbar-none">
                                        <div className='bg-slate-200 ml-[355px] mt-5 h-48 w-48 rounded-lg'>
                                            {item?.ProductImage ? (
                                                <img src={item?.ProductImage} alt="Product" className='mix-blend-multiply p-4 pt-2 w-40 ml-4 mt-4' />
                                            ) : (
                                                <p>No image available</p>
                                            )}
                                            <div>
                                                {
                                                    item?.Confirmation === "Confirmed" ? (
                                                        <div className='mt-5  text-green-600 font-semibold text-lg ml-12'>{item?.Confirmation}</div>
                                                    ) : (
                                                        <div className='mt-5 text-red-600 font-semibold text-lg ml-12'>{item?.Confirmation}</div>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <div className='mt-[-200px] ml-2 w-[270px]'>
                                            <div className='flex font-bold'>ProductName: <p className='ml-2 font-semibold text-ellipsis line-clamp-2'>{item?.ProductName}</p></div>
                                            <div className='flex font-bold'>ProductBrand: <p className='ml-2 font-semibold capitalize'>{item?.ProductBrand}</p></div>
                                            <div className='flex font-bold'>ProductCategory: <p className='ml-2 font-semibold capitalize'>{item?.ProductCategory}</p></div>
                                            <div className='flex font-bold'>Discount: <p className='ml-2 font-semibold capitalize'>{item?.Discount}</p></div>
                                            <div className='flex font-bold'>ProductPrice: <p className='ml-14 font-semibold'>{displayINRCurrency(item?.ProductPrice)}</p></div>
                                            <div className='flex font-bold'>ProductQuantity: <p className='ml-20 font-semibold'>{item?.Num}</p></div>
                                            <div className='ml-36 mt-[-19px]'>______________</div>
                                            <div className='flex font-bold'>TotalPrice: <p className='ml-20 font-semibold'>{displayINRCurrency(TotalPrice)}</p></div>
                                            <div className='flex font-bold'>DiscountPrice: <p className='ml-14 font-semibold '>-{displayINRCurrency(DiscountPrice)}</p></div>
                                            <div className='ml-36 mt-[-19px]'>______________</div>
                                            <div className='flex font-bold'>ProductSellingPrice: <p className='ml-2 font-semibold '>{displayINRCurrency(ProductSellingPrice)}</p></div>
                                            <div className='flex font-bold'>DeliveryChargePrice: <p className='ml-2 font-semibold '>+{displayINRCurrency(DeliveryChargePrice)}</p></div>
                                            <div className='ml-36 mt-[-19px]'>______________</div>
                                            <div className='flex font-bold'>CurrentTotalPrice: <p className='ml-8 font-semibold '>{displayINRCurrency(CurrentTotalPrice)}</p></div>
                                        </div>
                                        <div className='bg-slate-200 h-[150px] w-[530px] ml-2 rounded overflow-y-scroll scrollbar-none'>
                                            <p className='font-semibold ml-1 '>Description</p>
                                            <p className='ml-2'>
                                                {item.ProductDescription}
                                            </p>
                                        </div>
                                        <div className='bg-slate-200 h-[180px] w-[530px] mt-3 ml-2 rounded overflow-y-scroll scrollbar-none'>
                                            <p className='font-semibold ml-1 '>Address:</p>
                                            <div className='ml-2 font-semibold flex gap-3'>
                                                <p>1.Name : {item.FullName}</p>
                                                <p>2.Phone Number : {item.PhoneNumber}</p>
                                            </div>
                                            <div className='ml-2 mt-2 font-semibold flex gap-3'>
                                                <p>3.Alt Phone Number : {item.AltPhoneNumber}</p>
                                                <p>4.Pincode : {item.Pincode}</p>
                                            </div>
                                            <div className='ml-2 mt-2 font-semibold flex gap-3'>
                                                <p>5.State : {item.State}</p>
                                                <p>6.City : {item.City}</p>

                                            </div>
                                            <div className='ml-2 mt-2 font-semibold flex gap-3'>
                                                <p>7.HouseNo : {item.HouseNo}</p>
                                            </div>
                                            <div className='ml-2 mt-2 font-semibold flex gap-3'>
                                                <p>8.RoadName : {item.RoadName}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='mb-[-12px] pb-3'>
                                        {
                                            item?.Confirmation === "Confirmed" ? (
                                                <Link onClick={handelPayError}>
                                                    <button className='border border-red-600 w-[280px] h-[50px] rounded-lg font-bold hover:bg-red-600 hover:text-white'>Pay</button>
                                                </Link>
                                            ) : (
                                                <Link to={`/User-Wallet/${item._id}`}>
                                                    <button className='border border-red-600 w-[280px] h-[50px] rounded-lg font-bold hover:bg-red-600 hover:text-white'>Pay</button>
                                                </Link>
                                            )
                                        }
                                        <button
                                            className='border border-red-600 ml-3 w-[280px] h-[50px] rounded-lg font-bold hover:bg-red-600 hover:text-white'
                                            onClick={() => deleteAddToCart(item?._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : ("")}
            </ul>
            <div className='bg-white ml-[1006px] mt-10 mb-3 rounded-lg shadow-lg flex justify-center w-[250px] h-[50px]'>
                <div className='font-bold flex justify-center items-center text-xl'>Total:
                    <p>{displayINRCurrency(totalAddToCart)}</p>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;
