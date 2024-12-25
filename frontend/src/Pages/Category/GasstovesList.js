import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import displayINRCurrency from '../../helpers/displayCurrency';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assest/p-shop.png'

const GasstovesList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const fetchCategoryProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(SummaryApi.AllProduct.url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const dataResponse = await response.json();
            const filteredCategories = dataResponse.data.filter(product => product.category === 'gasstoves');
            setCategoryProduct(filteredCategories);
        } catch (error) {
            console.error("Error fetching category products:", error);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    const handleShowDataCategory = (product) => {
        navigate('/ShowCategory', { state: { product } });
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className='container'>
            <div className='flex ml-2 items-center gap-3 mt-4'>
                {loading && <p><div class="ring">
                    <img src={Logo} alt='' className='mt-3' />
                    <span></span>
                </div></p>}
                {error && <p className='text-red-500'>{error}</p>}
                {!loading && !error && categoryProduct.length === 0 && <p>No products found.</p>}
                {!loading && !error && categoryProduct.map(product => {
                    const productImage = product?.productImage || '/path/to/default/image.jpg';
                    const productName = product?.productName || 'Unknown Product';
                    const price = parseFloat(product?.price)
                    const brand = product?.brandName
                    const sellingPrice = parseFloat(product?.selling)
                    return (
                        <div key={product.id} className="cursor-pointer pb-64 ">
                            <div className="bg-white h-52 w-48 shadow-md rounded-lg flex flex-col items-center p-4 " onClick={() => handleShowDataCategory(product)}>
                                <img src={productImage} className="h-28 w-24 object-cover" alt="" />
                                <div className="card-body mt-2">
                                    <p className="card-text text-center text-gray-800 font-bold">{brand}</p>
                                    <p className="card-text text-center text-gray-600 font-semibold text-ellipsis line-clamp-1">{productName}</p>
                                    <div className='flex flex-row gap-5 ml-2'>
                                        <p className="card-text text-gray-500 font-semibold"><del>{displayINRCurrency(price)}</del></p>
                                        <p className="card-text text-black font-semibold">{displayINRCurrency(sellingPrice)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GasstovesList;
