import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import BannerProduct from '../Pages/Banner/BannerProduct';
import { AiFillOpenAI, AiOutlineLine } from 'react-icons/ai';
import HorizontalCardProduct from './HorizontalCardProduct';

const Toys_Baby_BooksList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.CategoryProduct.url);
            const dataResponse = await response.json();
            // Combine filtered categories into one array
            const filteredCategories = [
                ...dataResponse.data.filter(product => product.category === 'musicinstruments'),
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
            <div className='container mx-3 p-3'>
                <div className='flex items-center mr-[-258px]  gap-8 flex-row overflow-scroll scrollbar-none'>
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
            <BannerProduct />
            <div className='h-full w-full bg-slate-50 shadow-md p-3 mt-[-100px]'>
                <h2 className='text-2xl flex font-bold ml-[500px] '>
                    <AiOutlineLine className='mt-1' />
                    <AiFillOpenAI className='text-4xl text-orange-300' />
                    Musicinstruments
                    <AiFillOpenAI className='text-4xl text-orange-300' />
                    <AiOutlineLine className='mt-1' />
                </h2>
                <HorizontalCardProduct category={"musicinstruments"} heaing={"Top's Musicistruments"} />
            </div>
        </>
    );
};

export default Toys_Baby_BooksList;
