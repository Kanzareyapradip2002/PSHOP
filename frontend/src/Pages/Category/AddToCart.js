import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import SummaryApi from '../../common';
import displayINRCurrency from '../../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import Logo from '../../assest/p-shop.png'

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
        return <p>
            <div class="ring">
                <img src={Logo} alt='logo' className='mt-3' />
                <span></span>
            </div>
        </p>
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {allAddToCart.length > 0 ? (
                    allAddToCart.map((item, index) => {
                        const productQuantity = parseFloat(item?.Num);
                        const productPrice = parseFloat(item?.ProductPrice);
                        const DiscountPrice = parseFloat(item?.DiscountPrice || 0);
                        const DeliveryChargePrice = parseFloat(item?.DeliveryChargePrice || 0);
                        const TotalPrice = productPrice * productQuantity;
                        const ProductSellingPrice = TotalPrice - DiscountPrice;
                        const CurrentTotalPrice = ProductSellingPrice + DeliveryChargePrice;
                        const handelPayError = () => {
                            toast.error("This Order Is Payment Conformed ");
                        };

                        return (
                            <li key={index} className="bg-white mt-3 p-4 rounded shadow-lg flex flex-col justify-between h-72 overflow-y-scroll scrollbar-none ">
                                <div className="relative  justify-center items-center">
                                    <div className="w-full h-64 bg-slate-200 rounded-lg overflow-hidden">
                                        {item?.ProductImage ? (
                                            <div>
                                                <img src={item?.ProductImage} alt="Product" className="w-50 h-60 mt-2 mix-blend-multiply ml-5" />
                                            </div>
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </div>

                                    <div className={`absolute top-4 right-4 text-lg font-semibold ${item?.Confirmation === "Confirmed" ? 'text-green-600' : 'text-red-600'}`}>
                                        {item?.Confirmation}
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col">
                                    <div className="font-bold">ProductName: <p className="font-semibold">{item?.ProductName}</p></div>
                                    <div className="font-bold">ProductBrand: <p className="font-semibold">{item?.ProductBrand}</p></div>
                                    <div className="font-bold">ProductCategory: <p className="font-semibold">{item?.ProductCategory}</p></div>
                                    <div className="font-bold">Discount: <p className="font-semibold">{item?.Discount}</p></div>
                                    <div className="font-bold">ProductPrice: <p className="font-semibold">{displayINRCurrency(item?.ProductPrice)}</p></div>
                                    <div className="font-bold">ProductQuantity: <p className="font-semibold">{item?.Num}</p></div>
                                    <div className="font-bold mt-2">TotalPrice: <p className="font-semibold">{displayINRCurrency(TotalPrice)}</p></div>
                                    <div className="font-bold mt-2">DiscountPrice: <p className="font-semibold">-{displayINRCurrency(DiscountPrice)}</p></div>
                                    <div className="font-bold mt-2">ProductSellingPrice: <p className="font-semibold">{displayINRCurrency(ProductSellingPrice)}</p></div>
                                    <div className="font-bold mt-2">DeliveryChargePrice: <p className="font-semibold">+{displayINRCurrency(DeliveryChargePrice)}</p></div>
                                    <div className="font-bold mt-2">CurrentTotalPrice: <p className="font-semibold">{displayINRCurrency(CurrentTotalPrice)}</p></div>
                                </div>

                                <div className="mt-3 bg-slate-200 p-4 rounded">
                                    <p className="font-semibold">Description:</p>
                                    <p>{item.ProductDescription}</p>
                                </div>

                                <div className="mt-3 bg-slate-200 p-4 rounded">
                                    <p className="font-semibold">Address:</p>
                                    <div className="flex flex-col gap-2">
                                        <p>Name: {item.FullName}</p>
                                        <p>Phone Number: {item.PhoneNumber}</p>
                                        <p>Alt Phone Number: {item.AltPhoneNumber}</p>
                                        <p>Pincode: {item.Pincode}</p>
                                        <p>State: {item.State}</p>
                                        <p>City: {item.City}</p>
                                        <p>HouseNo: {item.HouseNo}</p>
                                        <p>RoadName: {item.RoadName}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col gap-3">
                                    {item?.Confirmation === "Confirmed" ? (
                                        <Link onClick={handelPayError}>
                                            <button className="w-full border border-red-600 h-12 rounded-lg font-bold hover:bg-red-600 hover:text-white">
                                                Pay
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link to={`/User-Wallet/${item._id}`}>
                                            <button className="w-full border border-red-600 h-12 rounded-lg font-bold hover:bg-red-600 hover:text-white">
                                                Pay
                                            </button>
                                        </Link>
                                    )}
                                    <button
                                        className="w-full border border-red-600 h-12 rounded-lg font-bold hover:bg-red-600 hover:text-white"
                                        onClick={() => deleteAddToCart(item?._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        );
                    })
                ) : ("")}
            </ul>

            <div className="mt-6 bg-white w-full max-w-xs mx-auto rounded-lg shadow-lg flex justify-center items-center h-14">
                <div className="font-bold text-xl">Total: <p>{displayINRCurrency(totalAddToCart)}</p></div>
            </div>
        </div>
    );
};

export default AddToCart;
