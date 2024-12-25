import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import displayINRCurrency from '../../helpers/displayCurrency';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Address from '../Category/Address';
import UserAddress from '../UserAddress';

const PlaceOrderPage = () => {
  const location = useLocation();
  const { productDetails } = location.state || {}; // Fallback for missing product

  // Initialize Product Details
  const productImage = productDetails?.productImage || '/path/to/placeholder-image.jpg';
  const ProductName = productDetails?.productName || 'N/A';
  const ProductBrand = productDetails?.brandName || 'N/A';
  const ProductCategory = productDetails?.category || 'N/A';
  const ProductDescription = productDetails?.description || 'No description available.';
  const ProductPrice = parseFloat(productDetails?.price || 0);
  const ProductSellingPrice = parseFloat(productDetails?.selling || 0);
  const Code = parseFloat(productDetails?.Code)


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

  const TotalPriceNum = ProductSellingPrice + deliveryChargePrice;
  const TotalPrice = TotalPriceNum;

  // State and Methods for Quantity and Address Management
  const [quantity, setQuantity] = useState(1);
  const [addressVisible, setAddressVisible] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const toggleAddress = () => setAddressVisible(!addressVisible);

  const fetchAllAddresses = async () => {
    try {
      const response = await fetch(SummaryApi.AllAddress.url, {
        method: SummaryApi.AllAddress.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllAddresses(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error('Failed to fetch Address');
      console.error(error);
    }
  };

  const user = useSelector((state) => state?.user?.user);
  const verificationCodes = user?.verificationCode;

  const userAddress = allAddresses.find(address => address.verificationCode === verificationCodes);

  useEffect(() => {
    if (user) {
      fetchAllAddresses();
    }
  }, [user]);

  const handleAddToCart = () => {
    if (!user || !userAddress) {
      toast.error("Please Log In to Your Account or Add an Address");
    }
  };

  return (
    <div className="mt-5 ml-3 h-full rounded mr-3 mb-6">
      <div className="flex flex-col md:flex-row gap-7">
        {/* Product Image and Quantity Selection */}
        <div className="h-auto w-full md:w-[350px] bg-slate-200">
          <div className="max-h-full max-w-full mt-14 ml-6">
            <img
              src={productImage}
              alt="Product"
              className="object-contain max-w-full max-h-[300px]"
            />
          </div>
          <div className="mt-4 ml-6 mr-6 bg-slate-200 flex justify-center">
            <div>
              <label htmlFor="quantity" className="text-lg font-bold">Select Quantity :</label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-2 p-2 border font-bold border-none rounded bg-slate-200 cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="h-auto w-full md:w-[850px] bg-slate-200">
          <div className="p-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-2 capitalize">
                <p className="font-semibold">Product Name :</p>
                {ProductName}
              </div>
              <div className="flex flex-col md:flex-row gap-2 capitalize">
                <p className="font-semibold">Product Category :</p>
                {ProductCategory}
              </div>
              <div className="flex flex-col md:flex-row gap-2 capitalize">
                <p className="font-semibold">Product Brand :</p>
                {ProductBrand}
              </div>
              <div className="flex flex-col md:flex-row gap-2 capitalize">
                <p className="font-semibold">Discount :</p>
                <p className={`${DiscountPercentage < 50 ? 'text-red-500' : 'text-green-500'}`}>
                  {Discount}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 capitalize">
                <p className="font-semibold">Product Price :</p>
                <p>{displayINRCurrency(ProductPrice)}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 capitalize">
                <p className="font-semibold">Discount Price :</p>
                <p>{displayINRCurrency(DiscountPrice)}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 capitalize">
                <p className="font-semibold">Product Selling Price :</p>
                <p className="">{displayINRCurrency(ProductSellingPrice)}</p>
              </div>
              {deliveryChargePrice > 0 && (
                <div className="flex flex-col md:flex-row gap-2 capitalize">
                  <p className="font-semibold">Delivery Charge :</p>
                  <p>{displayINRCurrency(deliveryChargePrice)}</p>
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-2 capitalize font-bold">
                <p className="font-bold">Total Price :</p>
                <p>{displayINRCurrency(TotalPrice)}</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg mt-3 p-3">
              <div className="gap-2 ml-2 capitalize overflow-y-scroll scrollbar-none">
                <p className="font-semibold">Description: </p>
                {ProductDescription}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="w-full h-auto mt-6 bg-slate-200 p-4">
        {user && verificationCodes && (
          <div className="text-xl ml-2 font-bold cursor-pointer" onClick={toggleAddress}>
            {addressVisible ? 'Close Address' : 'Add Address'}
          </div>
        )}
        {addressVisible && <Address />}
        <UserAddress
          Num={quantity}
          handleAddToCart={handleAddToCart}
          TotalPrice={TotalPrice}
          DiscountPrice={DiscountPrice}
          ProductImage={productImage}
          ProductName={ProductName}
          ProductBrand={ProductBrand}
          ProductCategory={ProductCategory}
          ProductDescription={ProductDescription}
          ProductPrice={ProductPrice}
          ProductSellingPrice={ProductSellingPrice}
          Discount={Discount}
          DeliveryChargePrice={deliveryChargePrice}
          Code={Code}
        />
      </div>
    </div>
  );
};

export default PlaceOrderPage;
