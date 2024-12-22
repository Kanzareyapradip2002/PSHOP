import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import displayINRCurrency from '../../helpers/displayCurrency';
import VarticalProductCard from '../../Components/VarticalProductCard';
import { useSelector } from 'react-redux';
import ROLE from '../../common/role';

const ShowCategoryProduct = () => {
  const user = useSelector((state) => state?.user?.user);
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate()

  const [currentImage, setCurrentImage] = useState(product?.productImage);

  if (!product) {
    return <div>No product information available.</div>;
  }
  const productImages = [
    product.productImage,
    product.productOtherImage1,
    product.productOtherImage2,
    product.productOtherImage3,
    product.productOtherImage4,
  ].filter(image => image !== null && image !== undefined);
  const ProductPrice = parseFloat(product.price)
  const ProductSelingPrice =parseFloat(product.selling)
  const ProductName = product.productName
  const ProductBrand = product.brandName
  const ProductCategory = product.category

  const calculatePercentageDifference = (price, sellingPrice) => {
    if (sellingPrice === 0) return "Selling price cannot be zero.";
    return ((price - sellingPrice) / price * 100).toFixed(2);
  };

  const percentageDifference = calculatePercentageDifference(parseFloat(product.price), parseFloat(product.selling));
  const Discount =`${percentageDifference > 0 ? percentageDifference : 0}%`;

  const handleShowDataCategory = (product) => {
    navigate('/Place-Order', { state: { product } });
};


  return (
    <>
      <div className='flex cursor-pointer'>
        <div className='container mx-1 mb-1'>
          <div className='flex flex-col ml-3 gap-3 mt-3'>
            {productImages.map((Product, index) => (
              <div>
                <img
                  key={index}
                  src={Product}
                  className="h-20 w-20 object-cover"
                  onClick={() => setCurrentImage(Product)}
                  alt=''
                />
              </div>
            ))}
          </div>
        </div>
        <div className='mt-3'>
          <img
            src={currentImage}
            className=" h-[460px] mr-[1100px] w-[530px] pb-4"
            alt=''
          />
        </div>

      </div>
      <div className='mt-[-460px] ml-[746px] bg-slate-200 h-[440px] rounded mr-3 mb-6 '>
        <div className=' flex items-center justify-center font-semibold'>
          <p className='mt-6'>
            Product Detels
          </p>
        </div>
        <div className='bg-white h-[270px] w-[400px] ml-14 mt-8 rounded-lg  '>
          <div className='flex flex-row ml-16 pr-4'>
            <div className='mt-14 flex flex-row'>
              <p className='font-semibold'>ProductName:</p>
              <p className='font-semibold text-black ml-20 text-ellipsis line-clamp-2 '>
                {ProductName}
              </p>
            </div>
          </div>
          <div className=' flex flex-row ml-16'>
            <div className='flex flex-row'>
              <p className='font-semibold'>ProductBrand:</p>
              <p className='font-semibold text-black ml-20 '>
                {ProductBrand}
              </p>
            </div>
          </div>
          <div className=' flex flex-row ml-16'>
            <div className='flex flex-row'>
              <p className='font-semibold'>ProductCategory:</p>
              <p className='font-semibold text-black ml-14 capitalize '>
                {ProductCategory}
              </p>
            </div>
          </div>
          <div className=' flex flex-row ml-16'>
            <div className=' flex flex-row'>
              <p className='font-semibold'>ProductPrice:</p>
              <p className='font-semibold text-neutral-500 ml-[85px] '>
                <del>

                  {displayINRCurrency(ProductPrice)}
                </del>
              </p>
            </div>
          </div>
          <div className=' flex flex-row ml-16'>
            <div className=' flex flex-row'>
              <p className='font-semibold'>Discount:</p>
              <p
                className={`font-semibold  ml-[115px] ${percentageDifference < 50 ? 'text-red-500' : 'text-green-500'}`}
              >
                {Discount}
              </p>
            </div>
          </div>
          <div className=' flex flex-row ml-16'>
            <div className=' flex flex-row'>
              <p className='font-semibold'>ProductsellingPrice:</p>
              <p className='font-semibold text-black ml-10 '>
                {displayINRCurrency(ProductSelingPrice)}
              </p>
            </div>
          </div>
          

        </div>
        {user?._id && user?.role === ROLE.GENERAL && (
        <div className='flex items-center justify-center mt-6  ' >
          <button className=' border border-red-500  bg-red-500 p-2 font-bold rounded-lg  hover:text-white hover:bg-red-600'
           onClick={() => handleShowDataCategory(product)}
          >Add To Cart</button>
        </div>
        )}
      </div>
      
      <VarticalProductCard category={product.category} heading={"Recommended Product"}/>
  
    </>
  );
};

export default ShowCategoryProduct;
