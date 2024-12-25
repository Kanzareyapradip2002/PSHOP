import React, { useState, useEffect } from 'react';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import CONFIRMATION from '../../common/Confirmation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConformedOrderPage = ({
    Confirmation,
    OrderID,
    ProductId,
    Email,
    ProdactImage,
    ProductName,
    ProductBrand,
    ProductCategory,
    ProductQuantity,
    ProductPrice,
    Discount,
    TotalPrice,
    AccountHolderName,
    AccountNumber,
    MobileNo,
    FullName,
    AltMobileNo,
    PinCode,
    City,
    State,
    HouseNo,
    RoadName
}) => {
    const [Confirmed, setConfirmed] = useState(Confirmation);
    const [loading, setLoading] = useState(false);
    const naviget = useNavigate();

    // Update state if Confirmation prop changes
    useEffect(() => {
        setConfirmed(Confirmation);
    }, [Confirmation]);

    // Handle the change in the select dropdown
    const handleOnChangeSelect = (e) => {
        setConfirmed(e.target.value);
    };

    // Function to make the API request
    const updateConfirmationStatus = async (url, orderId, confirmation) => {
        try {
            setLoading(true); // Start loading state before the request

            const fetchResponse = await fetch(url, {
                method: 'POST', // Assuming POST method; adjust if necessary
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    OrderId: orderId,
                    Confirmation: confirmation,
                }),
            });

            const responseData = await fetchResponse.json();

            // Handle response based on success or failure
            if (responseData.success) {
                toast.success(responseData.message);
                handleSubmit();
                naviget("admin-panel/all-users");
            } else {
                toast.error(responseData.message || 'Failed to update confirmation.');
            }
        } catch (error) {
            // Improved error handling for fetch
            const errorMessage = error.message || 'An error occurred while updating the confirmation status.';
            toast.error(errorMessage);
            console.error('Error updating confirmation:', errorMessage);
        } finally {
            setLoading(false); // Reset loading state after request completes
        }
    };

    // Function to handle the confirm button click
    const updateUserRole = async () => {
        if (!Confirmed) {
            toast.error('Please select a confirmation status.');
            return;
        }

        // First, update the order confirmation
        await updateConfirmationStatus(SummaryApi.Confirmation.url, OrderID, Confirmed);

        // Then, update the cart status (if needed)
        await updateConfirmationStatus(SummaryApi.AddToCartUpdate.url, ProductId, Confirmed);
    };

    const handleSubmit = async () => {
        try {
            // Sending the order details via email
            const response = await axios.post(SummaryApi.SendEmailOrderDetels.url, {
                email: Email,
                ProductImage: ProdactImage,
                productName: ProductName,
                productBrand: ProductBrand,
                productCategory: ProductCategory,
                productQuantity: ProductQuantity,
                productPrice: ProductPrice,
                discount: Discount,
                totalPrice: TotalPrice,
                accountHolderName: AccountHolderName,
                accountNumber: AccountNumber,
                mobileNo: MobileNo,
                fullName: FullName,
                altMobileNo: AltMobileNo,
                pinCode: PinCode,
                city: City,
                state: State,
                houseNo: HouseNo,
                roadName: RoadName,
            });

            if (response.status === 200) {
                toast.success('Order details sent to your email!');
            } else {
                toast.error('Failed to send order details.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error occurred while sending order details.');
        }
    };

    return (
        <div className="mx-auto p-4 w-full max-w-sm md:max-w-md lg:max-w-lg">
            {/* Confirmation dropdown */}
            <select
                className="border px-4 text-xl rounded-lg font-semibold w-60 h-14 py-1 cursor-pointer md:w-72 md:ml-10 lg:w-96 ml-3 xl:w-1/2"
                value={Confirmed}
                onChange={handleOnChangeSelect}
            >
                {Object.values(CONFIRMATION).map((el) => (
                    <option value={el} key={el}>
                        {el}
                    </option>
                ))}
            </select>

            {/* Confirm order button */}
            <button
                className={`w-fit mx-auto mt-3 block border py-1 px-6 rounded-full bg-red-600 text-white hover:bg-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''} md:w-full lg:w-1/2`}
                onClick={updateUserRole}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Confirm Order'}
            </button>
        </div>
    );
};

export default ConformedOrderPage;
