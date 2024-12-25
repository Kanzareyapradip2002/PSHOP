import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../common'; // Assuming you have this file that exports the API configuration
import { useParams } from 'react-router-dom';
import displayINRCurrency from '../../helpers/displayCurrency';
import Withdrawal from './Withdrawal';
import Logo from '../../assest/p-shop.png';

const PamantPage = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const { AccountNumber } = useParams();

  console.log('AccountNumber from URL:', AccountNumber);

  const ID = localStorage.getItem("addtocart");

  const fetchData = async () => {
    try {
      // Fetch bank accounts
      const bankAccountsResponse = await fetch(SummaryApi.GetAddBankAccount.url, {
        method: SummaryApi.GetAddBankAccount.method,
        credentials: 'include',
      });

      if (!bankAccountsResponse.ok) {
        throw new Error('Failed to fetch bank accounts');
      }

      const bankAccountsData = await bankAccountsResponse.json();
      if (bankAccountsData.success) {
        setBankAccounts(bankAccountsData.data);
      } else {
        toast.error(bankAccountsData.message);
      }

      // Fetch addToCart data
      const addToCartResponse = await fetch(SummaryApi.AllAddToCart.url, {
        method: SummaryApi.AllAddToCart.method,
        credentials: 'include',
      });

      if (!addToCartResponse.ok) {
        throw new Error('Failed to fetch AddToCart data');
      }

      const addToCartData = await addToCartResponse.json();
      if (addToCartData.success) {
        setAddToCart(addToCartData.data);
      } else {
        toast.error(addToCartData.message);
      }

    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Find the account with the AccountNumber from the URL
  const account = bankAccounts.find(account => account.AccountNumber === AccountNumber);

  console.log("account", account);

  if (!account) {
    return <p>
      <div class="ring">
        <img src={Logo} alt='logo' className='mt-3' />
        <span></span>
      </div>
    </p>
  }

  // Find the corresponding AddToCart item based on the ProductCode
  const AddToCartData = addToCart.find(item => item._id === ID);

  if (!AddToCartData) {
    return <p>
      <div class="ring">
        <img src={Logo} alt='logo' className='mt-3' />
        <span></span>
      </div>
    </p>
  }

  console.log("AddToCart", AddToCartData);

  // Parsing product prices and quantities
  const productQuantity = parseFloat(AddToCartData?.Num);
  const productPrice = parseFloat(AddToCartData?.ProductPrice || 0);
  const DiscountPrice = parseFloat(AddToCartData?.DiscountPrice || 0);
  const DeliveryChargePrice = parseFloat(AddToCartData?.DeliveryChargePrice || 0);

  // Calculating total prices
  const TotalPrice = productPrice * productQuantity;
  const ProductSellingPrice = TotalPrice - DiscountPrice;
  const CurrentTotalPrice = ProductSellingPrice + DeliveryChargePrice;


  return (
    <div>
      <div className="mt-5 ml-3 h-full rounded mr-3 mb-6">
        <div className="flex flex-col md:flex-row gap-7">
          {/* Product Image and Quantity Selection */}
          <div className="h-auto w-full md:w-[340px] bg-white shadow-md rounded-md">
            <div className="max-h-full max-w-full mt-14 ml-6">
              <img
                src={AddToCartData?.ProductImage || '/default-image.jpg'} // Default image if none found
                alt="Product"
                className="object-contain mix-blend-multiply max-w-full max-h-[300px]"
              />
            </div>
            <div className="mb-4 ml-6 mr-6 bg-white   flex justify-center">
              <div>
                <label className="text-lg font-bold">Select Quantity :{AddToCartData?.Num}</label>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="h-auto w-full md:w-[850px] ">
            <div className="p-4">
              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex flex-col md:flex-row gap-2 capitalize">
                  <p className="font-semibold">Product Name :</p>
                  <p>{AddToCartData?.ProductName}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 capitalize">
                  <p className="font-semibold">Product Category :</p>
                  <p>{AddToCartData?.ProductCategory}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 capitalize">
                  <p className="font-semibold">Product Brand :</p>
                  <p>{AddToCartData?.ProductBrand}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 capitalize">
                  <p className="font-semibold">Discount :</p>
                  <p className={`${AddToCartData?.DiscountPercentage < 50 ? 'text-red-500' : 'text-green-500'}`}>
                    {AddToCartData?.Discount}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 capitalize">
                  <p className="font-semibold">Product Price :</p>
                  <p>{displayINRCurrency(productPrice)}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 capitalize">
                  <p className="font-semibold">Discount Price :</p>
                  <p>{displayINRCurrency(DiscountPrice)}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 capitalize">
                  <p className="font-semibold">Product Selling Price :</p>
                  <p>{displayINRCurrency(ProductSellingPrice)}</p>
                </div>
                {DeliveryChargePrice > 0 && (
                  <div className="flex flex-col md:flex-row gap-2 capitalize">
                    <p className="font-semibold">Delivery Charge :</p>
                    <p>{displayINRCurrency(DeliveryChargePrice)}</p>
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-2 capitalize font-bold">
                  <p className="font-bold">Total Price :</p>
                  <p>{displayINRCurrency(CurrentTotalPrice)}</p>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg mt-3 p-3">
                <div className="gap-2 ml-2 capitalize overflow-y-scroll scrollbar-none">
                  <p className="font-semibold">Description: </p>
                  <p>{AddToCartData?.ProductDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className='bg-white shadow-lg p-4 rounded-lg mt-3 mx-3'>
        <h1 className='font-bold text-xl'>* Bank Account Details *</h1>
      </div>

      <div className='bg-white shadow-lg p-4 rounded-lg mt-3 mx-3'>
        <div className='flex gap-4 flex-wrap'>
          {/* Display Account Details */}
          {[
            { label: 'Account Holder Photo', value: account.AccountHolderPhoto, isImage: true },
            { label: 'Account Holder Name', value: account.AccountHolderName },
            { label: 'Account Type', value: account.AccountType },
            { label: 'Account Number', value: account.AccountNumber },
            { label: 'Mobile Number', value: account.MobileNo },
            { label: 'Email Id', value: account.EmailId },
            { label: 'Bank Branch', value: account.Branch },
            { label: 'Branch Code', value: account.BranchCode },
          ].map((item, idx) => (
            <div key={idx} className='bg-white shadow-lg p-4 rounded-lg w-full md:w-1/4'>
              <h1 className='font-bold'>{item.label}:</h1>
              {item.isImage ? (
                <img src={item.value} className='rounded-full h-20 w-20 object-cover' alt={item.label} />
              ) : (
                <h1>{item.value}</h1>
              )}
            </div>
          ))}
        </div>
      </div>

      <Withdrawal
        AccountNumber={account.AccountNumber}
        TotalPrice={CurrentTotalPrice}
        EmailId={account.EmailId}
        AddToCartData={AddToCartData}
      />
    </div>
  );
};

export default PamantPage;
