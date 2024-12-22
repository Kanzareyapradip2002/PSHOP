import React, { useEffect, useState, useCallback } from 'react';
import UploadProduct from '../Components/UploadProduct';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import AdminProductCard from './AdminProductCard';
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const [openUploadProducts, setOpenUploadProducts] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  // Use `useSelector` hook to get the user's verification code
  const user = useSelector((state) => state?.user?.user);
  const verificationCodes = parseFloat(user?.verificationCode);

  // Fetch products with verification code
  const fetchAllProduct = useCallback(async () => {
    if (!verificationCodes) {
      toast.error("User verification code is missing.");
      return;
    }

    try {
      const response = await fetch(SummaryApi.AllProduct.url, {
        method: SummaryApi.AllProduct.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        // Filter products based on the user's verification code
        const filteredProducts = dataResponse.data.filter(
          (product) =>parseFloat(product.ProductCode) === verificationCodes
        );
        setAllProduct(filteredProducts);  // Set the filtered products
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error(error); // For debugging
      toast.error('Failed to fetch products.');
    }
  }, [verificationCodes]);

  // Trigger product fetching when the verification code changes
  useEffect(() => {
    if (verificationCodes) {
      fetchAllProduct();  // Only call fetchAllProduct if verificationCode is available
    }
  }, [verificationCodes, fetchAllProduct]);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border-2 py-1 px-3 rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all'
          onClick={() => setOpenUploadProducts(true)}
        >
          Upload Products
        </button>
      </div>

      <div className='flex-wrap flex items-center gap-6 pb-40 pt-4 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none'>
        {allProduct.length > 0 ? (
          allProduct.map((product) => (
            <AdminProductCard data={product} fetchData={fetchAllProduct} key={product.id} />
          ))
        ) : ("")}
      </div>

      {openUploadProducts && (
        <UploadProduct onClose={() => setOpenUploadProducts(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
