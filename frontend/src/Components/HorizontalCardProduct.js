import React, { useEffect, useState, useCallback } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { useSelector } from 'react-redux';

const HorizontalCardProduct = ({ category, heading }) => {
    const user = useSelector((state) => state?.user?.user);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categoryLoading = new Array(6).fill(null);
    const navigate = useNavigate();

    // Use useCallback to memoize fetchData function
    const fetchData = useCallback(async () => {
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(categoryProduct?.data || []);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchData();
    }, [category, fetchData]); // 'fetchData' is now properly included in the dependency array

    const handleShowDataCategory = (product) => {
        navigate('/ShowCategory', { state: { product } });
    };

    return (
        <div className="container p-3 ">
            <h2 className="text-xl font-bold py-8">{heading}</h2>
            <div className="flex items-center gap-3  md:gap-6 overflow-x-scroll scrollbar-none lg:w-[1300px]">
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div
                            className="w-[160px] h-[160px] p-5 md:h-[160px] md:w-[160px] rounded bg-slate-200 flex items-center justify-center animate-pulse"
                            key={`categoryLoading-${index}`}
                        >
                            <div className="h-[100px] w-[100px] bg-gray-400" />
                        </div>
                    ))
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    data.map((product) => {
                        const ProductPrice = product.price;
                        const ProductSellingPrice = product.selling;
                        const ProductName = product.productName;
                        const ProductCategory = product.category;

                        const calculatePercentageDifference = (price, sellingPrice) => {
                            if (sellingPrice === 0) return 0;
                            return ((price - sellingPrice) / price * 100).toFixed(2);
                        };

                        const percentageDifference = calculatePercentageDifference(product.price, product.selling);
                        const Discount = `${percentageDifference > 0 ? percentageDifference : 0}%`;

                        return (
                            <div
                                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 rounded-sm shadow-lg flex cursor-pointer"
                                key={product.id}
                                onClick={user?.role === ROLE.GENERAL ? () => handleShowDataCategory(product) : undefined}
                            >
                                <div className="bg-slate-300 h-full p-2 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                                    <img
                                        src={product.productImage}
                                        alt={ProductName}
                                        className="h-full object-contain mix-blend-multiply hover:scale-75 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col justify-between p-2">
                                    <p className="text-ellipsis line-clamp-1 font-semibold">{ProductName}</p>
                                    <p className="font-semibold capitalize">{ProductCategory}</p>
                                    <p className="font-semibold text-slate-500">
                                        <del>{displayINRCurrency(ProductPrice)}</del>
                                    </p>
                                    <p className="font-semibold">{displayINRCurrency(ProductSellingPrice)}</p>
                                    <p
                                        className={`font-semibold ${percentageDifference < 50 ? 'text-red-500' : 'text-green-500'}`}
                                    >
                                        {Discount}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
