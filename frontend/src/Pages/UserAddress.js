import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency';

const UserAddress = ({
  TotalPrice,
  DeliveryChargePrice,
  Num,
  ProductImage,
  ProductName,
  ProductBrand,
  ProductCategory,
  ProductDescription,
  ProductPrice,
  ProductSellingPrice,
  Discount,
  DiscountPrice,
  Code
}) => {
  const [allAddress, setAllAddress] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const user = useSelector((state) => state?.user?.user);
  const verificationCodes = user?.verificationCode;
  const Confirmation = "Processing"
  // Fetch all addresses
  const fetchAllAddress = async () => {
    try {
      const response = await fetch(SummaryApi.AllAddress.url, {
        method: SummaryApi.AllAddress.method,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData?.message || 'Failed to fetch addresses');
        return;
      }

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setAllAddress(dataResponse.data);
      } else {
        toast.error(dataResponse.message || 'No data found');
      }
    } catch (error) {
      toast.error('Failed to fetch addresses');
      console.error(error);
    }
  };

  // Filter addresses based on verification codes
  useEffect(() => {
    fetchAllAddress();
  }, []);

  useEffect(() => {
    if (allAddress.length && verificationCodes) {
      const verificationCodeArray = Array.isArray(verificationCodes)
        ? verificationCodes
        : [verificationCodes];

      const filteredAddresses = allAddress.filter((address) =>
        verificationCodeArray.includes(address.verificationCode)
      );

      setUserAddresses(filteredAddresses);
    }
  }, [allAddress, verificationCodes]);

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  const navigate = useNavigate();

  const handleAddToCartSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAddress) {
      toast.error(user?._id ? 'Please Select Address' : 'Please Login Account');
      return;
    }

    const dataToSubmit = {
      TotalPrice,
      Num,
      ProductImage,
      ProductName,
      ProductBrand,
      ProductCategory,
      ProductDescription,
      ProductPrice,
      ProductSellingPrice,
      Discount,
      Code,
      DiscountPrice:DiscountPrice,
      VerificationCodes: selectedAddress.verificationCode,
      FullName: selectedAddress.fullName,
      PhoneNumber: selectedAddress.phoneNumber,
      AltPhoneNumber: selectedAddress.altPhoneNumber,
      Pincode: selectedAddress.pincode,
      State: selectedAddress.state,
      City: selectedAddress.city,
      HouseNo: selectedAddress.houseNo,
      RoadName: selectedAddress.roadName,
      DeliveryChargePrice,
      Confirmation:Confirmation

    };

    try {
      const response = await fetch(SummaryApi.AddToCart.url, {
        method: SummaryApi.AddToCart.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData?.message || 'Something went wrong with the submission.');
        return;
      }

      const result = await response.json();
      console.log('API response:', result);
      toast.success('Added to Cart successfully!');
      navigate('/AddToCart');
    } catch (error) {
      console.error('Error during fetch:', error);
      toast.error('Failed to add to cart, please try again later.');
    }
  };

  const DeleteAddress = async (addressId) => {
    try {
      const response = await fetch(SummaryApi.DeleteAddress.url.replace(':id', addressId), {
        method: SummaryApi.DeleteAddress.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addressId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData?.message || 'Failed to delete address.');
        return;
      }

      const updatedAddresses = userAddresses.filter((address) => address._id !== addressId);
      setUserAddresses(updatedAddresses);
      toast.success('Address deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete address, please try again later.');
    }
  };

  return (
    <>
      <div className="container p-3">
        <div className="flex md:gap-6 overflow-y-auto mr-[-190px] scrollbar-none">
          <div
            className="flex gap-4 ml-[14px] mr-[-900px]"
            style={{ maxHeight: '500px', flexWrap: 'wrap' }}
          >
            {userAddresses.length > 0 ? (
              userAddresses.map((address) => (
                <div key={address._id} className="bg-white rounded-lg shadow-md w-[270px]">
                  <div className="p-3">
                    <div className="flex">
                      <p>
                        <strong>Address:</strong>
                      </p>
                      <input
                        type="radio"
                        className="w-5 ml-40"
                        name="address"
                        checked={selectedAddress?._id === address._id}
                        onChange={() => handleAddressSelection(address)}
                      />
                    </div>
                    <p>
                      <strong>Full Name:</strong> {address.fullName}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {address.phoneNumber}
                    </p>
                    <p>
                      <strong>Alt Phone Number:</strong> {address.altPhoneNumber}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {address.pincode}
                    </p>
                    <p>
                      <strong>State:</strong> {address.state}
                    </p>
                    <p>
                      <strong>House No:</strong> {address.houseNo}
                    </p>
                    <p>
                      <strong>Road Name:</strong> {address.roadName}
                    </p>
                    <button
                      type="button"
                      className="p-2 ml-20 font-bold border border-red-600 cursor-pointer mt-2 rounded-lg hover:text-white hover:bg-red-500"
                      onClick={() => DeleteAddress(address._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No addresses found for the current user.</p>
            )}
          </div>
        </div>
      </div>
      <div className="h-[45px] w-full mt-6 bg-red-600 rounded-lg flex items-center">
        <button
          className="text-white font-bold text-lg ml-[560px] mx-auto"
          onClick={handleAddToCartSubmit}
        >
          AddToCart
        </button>
        <p className="mt-[5px] mr-5 font-bold text-white ">{displayINRCurrency(TotalPrice)}</p>
      </div>
    </>
  );
};

export default UserAddress;
