import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminProductEdit from './AdminProductEdit'
import displayINRCurrency from '../helpers/displayCurrency'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
const AdminProductCard = ({
    data,
    fetchData
}) => {
    const [editProduct, seteditProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.AllProduct.url, {
        method: SummaryApi.AllProduct.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllProduct(dataResponse.data); 
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  console.log(allProduct)

  useEffect(() => {
    fetchAllProduct();
  }, []);


    return (
        <div >
            <div className=' bg-white p-3 rounded shadow-lg cursor-pointer '>
                <div className='w-40'>
                    <div className='w-32 h-32 ml-4 flex justify-center items-center'>
                        <img src={data.productImage} alt={data.productName} className='mx-auto object-fill h-full ' />
                    </div>
                    <h3 className=' text-ellipsis line-clamp-1'>{data.productName}</h3>
                    <h3 className='font-semibold'>{displayINRCurrency(data.selling)}</h3>

                    <div className='w-fit ml-auto p-2   bg-green-100 cursor-pointer hover:bg-green-600 rounded-full hover:text-white' onClick={() => seteditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                </div>
            </div>
            {
                editProduct && (
                    <AdminProductEdit fetchData={fetchData} data={data} onClose={() => seteditProduct(false)} />
                )
            }
        </div>
    )
}

export default AdminProductCard