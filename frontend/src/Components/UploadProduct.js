import React, { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import ProductCategory from '../helpers/ProductCategory';
import { MdCloudUpload, MdDelete } from "react-icons/md";
import ImageConveter from '../helpers/ImageConveter';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import MainProductCategory from '../helpers/MainProductCategory';
import { useSelector } from 'react-redux';

const UploadProduct = ({
  onClose,
  fetchData
}) => {
  const [imageData, setImageData] = useState({
    productName: "",
    brandName: "",
    category: "",
    minecategory: "",
    productImage: null,
    productOtherImage1: null,
    productOtherImage2: null,
    productOtherImage3: null,
    productOtherImage4: null,
    description: "",
    price: "",
    selling: "",
    ProductCode: "",
    Code: Math.floor(100000 + Math.random() * 900000)
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
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (user?.verificationCode) {
      setImageData((prev) => ({
        ...prev,
        ProductCode: user.verificationCode,
      }));
    }
  }, [user]);

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
      const ImageUploadData = await fetch(SummaryApi.UploadProduct.url, {
        method: SummaryApi.UploadProduct.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(imageData)
      });

      const data = await ImageUploadData.json();
      if (data.success) {
        toast.success(data?.message);
        onClose();
        fetchData()
      } else {
        setSubmitMessage(data.message || "Error uploading product.");
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
    <div className='fixed w-full bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center '>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-center items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5 scrollbar-none' onSubmit={handleSubmit}>
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
          <label htmlFor='minecategory' className='mt-3'>Main Category:</label>
          <select
            id="minecategory"
            name='minecategory'
            value={imageData.minecategory}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          >
            <option value="">Select a Maincategory</option>
            {MainProductCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.lable}</option>
            ))}
          </select>
          <div className=' flex gap-3'>
          {
            imageData.productImage === null ? (
              <div>
                <label htmlFor='uploadImageProduct'>
                  <div className='p-2 bg-slate-100 border rounded h-28 w-28 flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col'>
                      <span className='text-4xl gap-2'><MdCloudUpload /></span>
                      <p className='text-sm'>Upload Product Image</p>
                      <input type='file' id='uploadImageProduct' className='hidden' onChange={handleUploadProduct} />
                    </div>
                  </div>
                </label>
              </div>
            ) : (
              imageData.productImage && (
                <div className='relative group h-28 w-28'>
                  <img src={imageData.productImage} alt="Product Preview" className='bg-slate-100 border rounded mt-2'/>
                  <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteProductImage}>
                    <MdDelete />
                  </div>
                </div>
              )
            )
          }
           {
            imageData.productOtherImage1 === null ? (
              <div>
                <label htmlFor='productOtherImage1' className='mt-3'></label>
                <label htmlFor='uploadImageProduct1'>
                  <div className='p-2 bg-slate-100 border rounded h-28 w-28 flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col'>
                      <span className='text-4xl gap-2'><MdCloudUpload /></span>
                      <p className='text-sm'>Upload Product Image</p>
                      <input type='file' id='uploadImageProduct1' className='hidden' onChange={handleUploadProductOther1} />
                    </div>
                  </div>
                </label>
              </div>
            ) : (
              imageData.productOtherImage1 && (
                <div className='relative group h-28 w-28'>
                  <img src={imageData.productOtherImage1} alt="Product Preview" className='bg-slate-100 border rounded mt-2'/>
                  <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteOtherProductImage1}>
                    <MdDelete />
                  </div>
                </div>
              )
            )
          }
           {
            imageData.productOtherImage2 === null ? (
              <div>
                <label htmlFor='productOtherImage2' className='mt-3'></label>
                <label htmlFor='uploadImageProduct2'>
                  <div className='p-2 bg-slate-100 border rounded h-28 w-28 flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col'>
                      <span className='text-4xl gap-2'><MdCloudUpload /></span>
                      <p className='text-sm'>Upload Product Image</p>
                      <input type='file' id='uploadImageProduct2' className='hidden' onChange={handleUploadProductOther2} />
                    </div>
                  </div>
                </label>
              </div>
            ) : (
              imageData.productOtherImage2 && (
                <div className='relative group h-28 w-28'>
                  <img src={imageData.productOtherImage2} alt="Product Preview" className='bg-slate-100 border rounded mt-2'/>
                  <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteOtherProductImage2}>
                    <MdDelete />
                  </div>
                </div>
              )
            )
          }
           {
            imageData.productOtherImage3 === null ? (
              <div>
                <label htmlFor='productOtherImage3' className='mt-3'></label>
                <label htmlFor='uploadImageProduct3'>
                  <div className='p-2 bg-slate-100 border rounded h-28 w-28 flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col'>
                      <span className='text-4xl gap-2'><MdCloudUpload /></span>
                      <p className='text-sm'>Upload Product Image</p>
                      <input type='file' id='uploadImageProduct3' className='hidden' onChange={handleUploadProductOther3} />
                    </div>
                  </div>
                </label>
              </div>
            ) : (
              imageData.productOtherImage3 && (
                <div className='relative group h-28 w-28'>
                  <img src={imageData.productOtherImage3} alt="Product Preview" className='bg-slate-100 border rounded mt-2'/>
                  <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteOtherProductImage3}>
                    <MdDelete />
                  </div>
                </div>
              )
            )
          }
           {
            imageData.productOtherImage4 === null ? (
              <div>
                <label htmlFor='productOtherImage4' className='mt-3'></label>
                <label htmlFor='uploadImageProduct4'>
                  <div className='p-2 bg-slate-100 border rounded h-28 w-28 flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col'>
                      <span className='text-4xl gap-2'><MdCloudUpload /></span>
                      <p className='text-sm'>Upload Product Image</p>
                      <input type='file' id='uploadImageProduct4' className='hidden' onChange={handleUploadProductOther4} />
                    </div>
                  </div>
                </label>
              </div>
            ) : (
              imageData.productImage && (
                <div className='relative group h-28 w-28'>
                  <img src={imageData.productOtherImage4} alt="Product Preview" className='bg-slate-100 border rounded mt-2'/>
                  <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={handleDeleteOtherProductImage4}>
                    <MdDelete />
                  </div>
                </div>
              )
            )
          }
          </div>
          < label htmlFor='price' className='mt-3'>Price:</label>
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
    </div >
  );
};

export default UploadProduct;
