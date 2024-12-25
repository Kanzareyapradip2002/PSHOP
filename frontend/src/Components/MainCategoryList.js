import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import HorizontalCardProduct from './HorizontalCardProduct';
import CarouselHome from '../Pages/Banner/CarouselHome';


const MainCategoryList = () => {
    const [MaincategoryProduct, setMainCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryLoading = new Array(13).fill(null);

    const fetchMainCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.MainCategoryProduct.url);
            const dataResponse = await response.json();
            setMainCategoryProduct(dataResponse.data);
        } catch (error) {
            console.error("Error fetching category products:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchMainCategoryProduct()
    }, []);

    return (
        <>
            <div className='container p-3'>
                <div className='flex items-center justify-between gap-8 flex-row overflow-scroll scrollbar-none sm:mr-[-140px] lg:mr-[-240px]'>
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
                        MaincategoryProduct.map((category) => {
                            const categoryName = category?.minecategory;
                            const productImage = category?.products[0]?.productImage;
                            return (
                                <Link
                                    to={`/get-Category/${categoryName}`}
                                    className='flex flex-col items-center cursor-pointer'
                                    key={category?.category}
                                >
                                    <div className='w-16 h-16 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                        <img
                                            className='h-full object-cover mix-blend-multiply hover:scale-150 transition-all'
                                            src={productImage || 'default-image.jpg'} // Fallback image
                                            alt={categoryName}
                                        />
                                    </div>
                                    <p className='text-center truncate text-sm font-semibold mt-1 capitalize'>{categoryName}</p>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
            <CarouselHome/>
            <div>
                <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
                <HorizontalCardProduct category={"printers"} heading={"Top's Printers"} />
                <HorizontalCardProduct category={"tyres"} heading={"Top's Tyres"} />
                <HorizontalCardProduct category={"shampoo"} heading={"Top's Shampoo"} />
                <HorizontalCardProduct category={"jeans"} heading={"Top's Jeans"} />
                <HorizontalCardProduct category={"sweet"} heading={"Top's Sweet"} />
                <HorizontalCardProduct category={"detergent"} heading={"Top's Detergent"} />
                <HorizontalCardProduct category={"gasstoves"} heading={"Top's Gasstoves"} />
                <HorizontalCardProduct category={"tablets"} heading={"Top's Tablets"} />
                <HorizontalCardProduct category={"bicycle"} heading={"Top's Bicycle"} />
                <HorizontalCardProduct category={"musicinstruments"} heading={"Top's Musicinstruments"} />
            </div>

        </>
    );
};

export default MainCategoryList;
