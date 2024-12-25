import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from '../Banner/Carousel';
import displayINRCurrency from '../../helpers/displayCurrency';

const ShowCategoryProduct = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Fallback for missing product
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true); // Handle loading state
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (product) {
      setLoading(false);
      setProductDetails(product); // Use the passed product directly
    } else {
      setLoading(false);
      toast.error("Product not found.");
    }
  }, [product]);

  // Fallback values for when product data might be missing
  const ProductSellingPrice = parseFloat(productDetails?.selling || 0);
  
  // Calculate Discount
  const DiscountPrice = productDetails?.price && productDetails?.selling
    ? productDetails?.price - productDetails?.selling
    : 0;
  const DiscountPercentage = productDetails?.price && productDetails?.selling
    ? ((productDetails?.price - productDetails?.selling) / productDetails?.price * 100).toFixed(2)
    : 0;
  const Discount = `${DiscountPercentage > 0 ? DiscountPercentage : 0}%`;

  // Calculate Delivery Charge Based on Discount Percentage
  let deliveryChargePrice = 0;
  if (DiscountPercentage > 0 && DiscountPercentage < 30) {
    deliveryChargePrice = 50;
  } else if (DiscountPercentage >= 31 && DiscountPercentage < 60) {
    deliveryChargePrice = 70;
  } else if (DiscountPercentage >= 61 && DiscountPercentage < 90) {
    deliveryChargePrice = 90;
  } else if (DiscountPercentage >= 91) {
    deliveryChargePrice = 100;
  }

  const TotalPrice = ProductSellingPrice + deliveryChargePrice;

  const handleShowDataCategory = () => {
    if (productDetails) {
      navigate('/Place-Order', { state: { productDetails } });
    } else {
      toast.error("Product not found.");
    }
  };

  // Handling the loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!productDetails ? (
        <p>Product not found</p> // If the product with the given id is not found
      ) : (
        <div>
          <Carousel
            img1={productDetails.productImage}
            img2={productDetails.productOtherImage1}
            img3={productDetails.productOtherImage2}
            img4={productDetails.productOtherImage3}
            img5={productDetails.productOtherImage4}
          />

          <div className="mt-5 ml-3 h-full rounded mr-3 mb-6">
            <div className="flex flex-col md:flex-row gap-7">
              {/* Product Image and Quantity Selection */}
              <div className="h-auto flex justify-center w-full pb-2 md:w-[350px] bg-slate-200">
                <div className="max-h-full max-w-full mt-5">
                  <img
                    src={productDetails.productImage}
                    alt="Product"
                    className="object-contain max-w-full max-h-[300px] mix-blend-multiply"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="h-auto w-full md:w-[850px] bg-slate-200">
                <div className="p-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Product Name :</p>
                      {productDetails.productName}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Product Category :</p>
                      {productDetails.category}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Product Brand :</p>
                      {productDetails.brandName}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Discount:</p>
                      {Discount}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Discount Price:</p>
                      {displayINRCurrency(DiscountPrice)}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Product Price :</p>
                      {displayINRCurrency(productDetails.price)}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Product Selling Price :</p>
                      {displayINRCurrency(productDetails.selling)}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Delivery Charge :</p>
                      {displayINRCurrency(deliveryChargePrice)}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 capitalize">
                      <p className="font-semibold">Total Price :</p>
                      {displayINRCurrency(TotalPrice)}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg mt-3 p-3">
                    <div className="gap-2 ml-2 capitalize overflow-y-scroll scrollbar-none">
                      <p className="font-semibold">Description: </p>
                      {productDetails.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={handleShowDataCategory}
              className="h-[45px] w-full cursor-pointer mt-6 bg-red-600 rounded-lg flex items-center justify-between px-4"
            >
              <button className="text-white font-bold text-lg">Add to Cart</button>
              <p className="font-bold text-white">{displayINRCurrency(TotalPrice)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCategoryProduct;
