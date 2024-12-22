import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../common'; // Assuming you have this file that exports the API configuration
import { useParams } from 'react-router-dom';
import displayINRCurrency from '../../helpers/displayCurrency';
import Withdrawal from './Withdrawal';

const PamantPage = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const { AccountNumber } = useParams();

  console.log('AccountNumber from URL:', AccountNumber);

  const ID = localStorage.getItem("addtocart")

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

  console.log("account", account)

  if (!account) {
    return <div>Account not found or loading...</div>;
  }

  // Find the corresponding AddToCart item based on the ProductCode
  const AddToCartData = addToCart.find(item => item._id === ID);


  if (!AddToCartData) {
    return <div>AddToCart data not found...</div>;
  }

  console.log("AddToCart", AddToCartData)

  // Parsing product prices and quantities
  const productQuantity = parseFloat(AddToCartData?.Num || 1);
  const productPrice = parseFloat(AddToCartData?.ProductPrice || 0);
  const DiscountPrice = parseFloat(AddToCartData?.DiscountPrice || 0);
  const DeliveryChargePrice = parseFloat(AddToCartData?.DeliveryChargePrice || 0);

  // Calculating total prices
  const TotalPrice = productPrice * productQuantity;
  const ProductSellingPrice = TotalPrice - DiscountPrice;
  const CurrentTotalPrice = ProductSellingPrice + DeliveryChargePrice;


  //Deposit
  
  return (
    <div>
      {/* Product Details */}
      <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 mr-2'>
        <h1 className='font-bold ml-2 text-xl'>* Product Details *</h1>
      </div>

      <div className="flex">
        <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 w-[400px] flex justify-center items-center'>
          <img src={AddToCartData.ProductImage} className='h-[300px] w-[300px] mix-blend-multiply ' alt='ProductImage' />
        </div>
        <div className='bg-white shadow-lg p-2  rounded-lg mt-3 ml-3 mr-2'>
          <div className='flex gap-3 ml-3 mt-2 flex-wrap w-[800px]'>
            <div className='bg-white shadow-lg p-3 rounded-lg '>
              <h1 className='font-bold'>Product Name:</h1>
              <h1>{AddToCartData.ProductName}</h1>
            </div>
            <div className='bg-white shadow-lg p-3 rounded-lg '>
              <h1 className='font-bold'>Product Brand:</h1>
              <h1>{AddToCartData.ProductBrand}</h1>
            </div>
            <div className='bg-white shadow-lg p-3 rounded-lg '>
              <h1 className='font-bold'>Product Category:</h1>
              <h1>{AddToCartData.ProductCategory}</h1>
            </div>
            <div className='bg-white shadow-lg p-3 rounded-lg '>
              <h1 className='font-bold'>Product Quantity:</h1>
              <h1>{AddToCartData.Num}</h1>
            </div>
            <div className='bg-white shadow-lg p-3 rounded-lg '>
              <h1 className='font-bold'>Product Price:</h1>
              <h1>{displayINRCurrency(AddToCartData.ProductPrice)}</h1>
            </div>
            <div className='bg-white shadow-lg p-3 rounded-lg '>
              <h1 className='font-bold'>Product Discount:</h1>
              <h1>{AddToCartData.Discount}</h1>
            </div>
            <div className='bg-white shadow-lg p-3 rounded-lg '>
              <h1 className='font-bold'>Total Price:</h1>
              <h1>{displayINRCurrency(CurrentTotalPrice)}</h1>
            </div>
            <div className='bg-white shadow-lg p-3 w-[1000px] rounded-lg '>
              <h1 className='font-bold'>Product Description:</h1>
              <h1>{AddToCartData.ProductDescription}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 mr-2'>
        <h1 className='font-bold ml-2 text-xl'>* Bank Account Details *</h1>
      </div>

      <div className='bg-white shadow-lg p-2 rounded-lg mt-3 ml-3 mr-2 '>
        <div className='flex gap-5 ml-16 mt-10 pb-10 flex-wrap w-[1040px]'>
          <div className='bg-white shadow-lg p-3 rounded-lg '>
            <h1 className='font-bold'>Account Holder Photo:</h1>
            <img src={account.AccountHolderPhoto} className='rounded-full h-20' alt='Account Holder ' />
          </div>
          <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
            <h1 className='font-bold'>Account Holder Name:</h1>
            <h1>{account.AccountHolderName}</h1>
          </div>
          <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
            <h1 className='font-bold'>Account Type:</h1>
            <h1>{account.AccountType}</h1>
          </div>
          <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
            <h1 className='font-bold'>Account Number:</h1>
            <h1>{account.AccountNumber}</h1>
          </div>
          <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
            <h1 className='font-bold'>Mobile Number:</h1>
            <h1>{account.MobileNo}</h1>
          </div>
          <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
            <h1 className='font-bold'>Email Id:</h1>
            <h1>{account.EmailId}</h1>
          </div>
          <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
            <h1 className='font-bold'>Bank Branch:</h1>
            <h1>{account.Branch}</h1>
          </div>
          <div className='bg-white h-16 shadow-lg p-3 rounded-lg '>
            <h1 className='font-bold'>Branch Code:</h1>
            <h1>{account.BranchCode}</h1>
          </div>
        </div>
      </div>
      <Withdrawal
       AccountNumber = {account.AccountNumber}
       TotalPrice ={CurrentTotalPrice}
       EmailId={account.EmailId}
       AddToCartData = {AddToCartData}
      />
  

    </div>
  );
};

export default PamantPage;
