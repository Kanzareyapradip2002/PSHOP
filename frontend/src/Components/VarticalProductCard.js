import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const VarticalProductCard = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const categoryLoading = new Array(6).fill(null);
    const navigate = useNavigate()
    const fetchData = async () => {
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(categoryProduct?.data || []);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]); 

    const handleShowDataCategory = (product) => {
        navigate('/ShowCategoryProduct', { state: { product } });
    };

    return (
        <div className="container p-3 ">
            <h2 className="text-xl font-bold py-8">{heading}</h2>
            <div className="flex items-center gap-3 w-[1200px] md:gap-6 overflow-x-auto scrollbar-none">
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
                                onClick={() => handleShowDataCategory(product)}
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
}

export default VarticalProductCard