import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import HorizontalCardProduct from './HorizontalCardProduct';
import CarouselHome from '../Pages/Banner/CarouselHome';

const ElectronicList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null);
    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.CategoryProduct.url);
            const dataResponse = await response.json();
            const filteredCategories = [
                ...dataResponse.data.filter(product => product.category === 'airpodes'),
                ...dataResponse.data.filter(product => product.category === 'camera'),
                ...dataResponse.data.filter(product => product.category === 'earphones'),
                ...dataResponse.data.filter(product => product.category === 'mobiles'),
                ...dataResponse.data.filter(product => product.category === 'mouse'),
                ...dataResponse.data.filter(product => product.category === 'processor'),
                ...dataResponse.data.filter(product => product.category === 'refrigerator'),
                ...dataResponse.data.filter(product => product.category === 'speakers'),
                ...dataResponse.data.filter(product => product.category === 'trimmers'),
                ...dataResponse.data.filter(product => product.category === 'televisions'),
                ...dataResponse.data.filter(product => product.category === 'watches'),
                ...dataResponse.data.filter(product => product.category === 'printers'),
            ];
            setCategoryProduct(filteredCategories);
        } catch (error) {
            console.error("Error fetching category products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <>
            <div className='container p-3'>
                <div className='flex items-center gap-8 flex-row overflow-scroll scrollbar-none sm:mr-[-16px] lg:mr-[-140px]'>
                    {loading ? (
                        categoryLoading.map((_, index) => (
                            <div
                                className='w-16 h-16 p-5 md:h-16 md:w-16 rounded-full bg-slate-200 flex items-center justify-center animate-pulse'
                                key={`categoryLoading-${index}`}
                            >
                                <div className='h-10 w-10 p-5 rounded-full bg-gray-400' />
                            </div>
                        ))
                    ) : (
                        categoryProduct.map((product) => {
                            const productImage = product?.products[0]?.productImage || '/path/to/default/image.jpg';
                            const productName = product?.category || 'Unknown Product';

                            const key = product.id || `${productName}-${Math.random()}`;

                            return (
                                <Link to={`/Category/${productName}`} className='flex flex-col items-center cursor-pointer' key={key}>
                                    <div className='w-16 h-16 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center'>
                                        <img className='h-full object-cover mix-blend-multiply hover:scale-150 transition-all' src={productImage} alt={productName} />
                                    </div>
                                    <p className='text-center mt-2 capitalize font-semibold'>{productName}</p>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
            <div className=' overflow-y-hidden'>
                <CarouselHome />
            </div>
            <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
            <HorizontalCardProduct category={"printers"} heading={"Top's Printers"} />

        </>
    );
};

export default ElectronicList;
