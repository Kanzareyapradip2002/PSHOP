  import React, { useState } from 'react';
  import { CgClose } from 'react-icons/cg';
  import ProductCategory from '../helpers/ProductCategory';
  import { MdCloudUpload, MdDelete } from "react-icons/md";
  import ImageConveter from '../helpers/ImageConveter';
  import SummaryApi from '../common';
  import { toast } from 'react-toastify';

  const AdminProductEdit = ({ 
      onClose,
      data,
      fetchData
  }) => {
    const [imageData, setImageData] = useState({
      ...data,
      productName:data?.productName,
      brandName: data?.brandName,
      category: data?.category,
      productImage:data?.productImage || null,
      productOtherImage1:data?.productOtherImage1 || null,
      productOtherImage2:data?.productOtherImage2 || null,
      productOtherImage3:data?.productOtherImage3 || null,
      productOtherImage4:data?.productOtherImage4 || null,
      description:data?.description,
      price:data?.price,
      selling:data?.selling
    });
    
    const [submitMessage, setSubmitMessage] = useState("");

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setImageData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleUploadProduct = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const ProductImage = await ImageConveter(file);
        setImageData((prev) => ({
          ...prev,
          productImage: ProductImage
        }));
      }
    };
    const handleUploadProductOther1 = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const ProductImage = await ImageConveter(file);
        setImageData((prev) => ({
          ...prev,
          productOtherImage1: ProductImage
        }));
      }
    };
    const handleUploadProductOther2 = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const ProductImage = await ImageConveter(file); 
        setImageData((prev) => ({
          ...prev,
          productOtherImage2: ProductImage
        }));
      }
    };
    const handleUploadProductOther3 = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const ProductImage = await ImageConveter(file); 
        setImageData((prev) => ({
          ...prev,
          productOtherImage3: ProductImage
        }));
      }
    };
    const handleUploadProductOther4 = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const ProductImage = await ImageConveter(file);
        setImageData((prev) => ({
          ...prev,
          productOtherImage4: ProductImage
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(imageData);
      try {
        const ImageUploadData = await fetch(SummaryApi.UpdateProduct.url, {
          method: SummaryApi.UpdateProduct.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(imageData)
        });
        
        const data = await ImageUploadData.json();
        console.log("data", data);
        if(data.success){
          toast.success(data?.message)
          onClose()
          fetchData()
        }
      } catch (error) {
        console.error("Upload error:", error);
        setSubmitMessage("Error uploading product.");
      }
    };

    const handleDeleteProductImage = () => {
      setImageData((prev) => ({
        ...prev,
        productImage: null
      }));
    };
    const handleDeleteOtherProductImage1 = () => {
      setImageData((prev) => ({
        ...prev,
        productOtherImage1: null
      }));
    };
    const handleDeleteOtherProductImage2 = () => {
      setImageData((prev) => ({
        ...prev,
        productOtherImage2: null
      }));
    };
    const handleDeleteOtherProductImage3 = () => {
      setImageData((prev) => ({
        ...prev,
        productOtherImage3: null
      }));
    };
    const handleDeleteOtherProductImage4 = () => {
      setImageData((prev) => ({
        ...prev,
        productOtherImage4: null
      }));
    };
    return (
      <div className='fixed w-full bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-center items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name:</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='text'
            id="productName"
            name='productName'
            placeholder='Enter Product Name'
            value={imageData.productName}
            onChange={handleOnChange}
            required
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='text'
            id="brandName"
            name='brandName'
            placeholder='Enter Brand Name'
            value={imageData.brandName}
            onChange={handleOnChange}
            required
          />

          <label htmlFor='category' className='mt-3'>Category:</label>
          <select
            id="category"
            name='category'
            value={imageData.category}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          >
            <option value="">Select a category</option>
            {ProductCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.lable}</option>
            ))}
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image:</label>
          <label htmlFor='uploadImageProduct'>
            <div className='p-2 bg-slate-100 border rounded h-40 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col'>
                <span className='text-4xl gap-2'><MdCloudUpload /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageProduct' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>
          <div>
            <div>
              <label htmlFor='productOtherImage1' className='mt-3'>Product Other Image 1:</label>
              <label htmlFor='uploadOtherImageProduct1'>
                <div className='p-2 bg-slate-100 border rounded h-14 w-full flex justify-center items-center cursor-pointer'>
                  <div className='text-slate-500 flex justify-center items-center flex-col'>
                    <span className='text-4xl gap-2'><MdCloudUpload /></span>
                    <p className='text-sm'>Upload Product Image</p>
                    <input type='file' id='uploadOtherImageProduct1' className='hidden' onChange={handleUploadProductOther1} />
                  </div>
                </div>
              </label>
            </div>
            <div>
              <label htmlFor='productOtherImage2' className='mt-3'>Product Other Image 2:</label>
              <label htmlFor='uploadOtherImageProduct2'>
                <div className='p-2 bg-slate-100 border rounded h-14 w-full flex justify-center items-center cursor-pointer'>
                  <div className='text-slate-500 flex justify-center items-center flex-col'>
                    <span className='text-4xl gap-2'><MdCloudUpload /></span>
                    <p className='text-sm'>Upload Product Image</p>
                    <input type='file' id='uploadOtherImageProduct2' className='hidden' onChange={handleUploadProductOther2} />
                  </div>
                </div>
              </label>
            </div>
            <div>
              <label htmlFor='productOtherImage3' className='mt-3'>Product Other Image 3:</label>
              <label htmlFor='uploadOtherImageProduct3'>
                <div className='p-2 bg-slate-100 border rounded h-14 w-full flex justify-center items-center cursor-pointer'>
                  <div className='text-slate-500 flex justify-center items-center flex-col'>
                    <span className='text-4xl gap-2'><MdCloudUpload /></span>
                    <p className='text-sm'>Upload Product Image</p>
                    <input type='file' id='uploadOtherImageProduct3' className='hidden' onChange={handleUploadProductOther3} />
                  </div>
                </div>
              </label>
            </div>
            <div>
              <label htmlFor='productOtherImage4' className='mt-3'>Product Other Image 4:</label>
              <label htmlFor='uploadOtherImageProduct4'>
                <div className='p-2 bg-slate-100 border rounded h-14 w-full flex justify-center items-center cursor-pointer'>
                  <div className='text-slate-500 flex justify-center items-center flex-col'>
                    <span className='text-4xl gap-2'><MdCloudUpload /></span>
                    <p className='text-sm'>Upload Product Image</p>
                    <input type='file' id='uploadOtherImageProduct4' className='hidden' onChange={handleUploadProductOther4} />
                  </div>
                </div>
              </label>
            </div>

          </div>
          <div className=' flex gap-4'>
          {imageData.productImage && (
            <div className='relative group w-24'>
              <img src={imageData.productImage} alt="Product Preview" className='bg-slate-100 border rounded mt-2' width={100} height={100} />
              <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteProductImage}>
                <MdDelete />
              </div>
            </div>
          )}
          {imageData.productOtherImage1 && (
            <div className='relative group w-24'>
              <img src={imageData.productOtherImage1} alt="Product Preview" className='bg-slate-100 border rounded mt-2' width={100} height={100} />
              <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteOtherProductImage1}>
                <MdDelete />
              </div>
            </div>
          )}
          {imageData.productOtherImage2 && (
            <div className='relative group w-24'>
              <img src={imageData.productOtherImage2} alt="Product Preview" className='bg-slate-100 border rounded mt-2' width={100} height={100} />
              <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteOtherProductImage2}>
                <MdDelete />
              </div>
            </div>
          )}
          {imageData.productOtherImage3 && (
            <div className='relative group w-24'>
              <img src={imageData.productOtherImage3} alt="Product Preview" className='bg-slate-100 border rounded mt-2' width={100} height={100} />
              <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteOtherProductImage3}>
                <MdDelete />
              </div>
            </div>
          )}
          {imageData.productOtherImage4 && (
            <div className='relative group w-24'>
              <img src={imageData.productOtherImage4} alt="Product Preview" className='bg-slate-100 border rounded mt-2' width={100} height={100} />
              <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteOtherProductImage4}>
                <MdDelete />
              </div>
            </div>
          )}
          </div>
          <label htmlFor='price' className='mt-3'>Price:</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='number'
            id="price"
            name='price'
            placeholder='Enter price'
            value={imageData.price}
            onChange={handleOnChange}
            required
          />

          <label htmlFor='selling' className='mt-3'>Selling Price:</label>
          <input
            className='p-2 bg-slate-100 border rounded'
            type='number'
            id="selling"
            name='selling'
            placeholder='Enter selling price'
            value={imageData.selling}
            onChange={handleOnChange}
            required
          />

          <label htmlFor='description' className='mt-3'>Description:</label>
          <textarea
            className='h-28 bg-slate-100 border resize-none p-1'
            name='description'
            placeholder='Enter Product Description'
            rows={3}
            value={imageData.description}
            onChange={handleOnChange}
            required
          />

          <button type='submit' className='bg-blue-500 text-white rounded p-2 mt-3'>Submit Product</button>
        </form>

        {submitMessage && <p className='mt-4 text-center'>{submitMessage}</p>}
      </div>
    </div>
  );
  };

  export default AdminProductEdit 
  ;
