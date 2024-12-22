import React, { useState } from 'react';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Address = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        altPhoneNumber: '',
        pincode: '',
        state: '',
        city: '',
        houseNo: '',
        roadName: '',
        verificationCode: '', 
    });

    const user = useSelector((state) => state?.user?.user);
    const verificationCodes = user?.verificationCode;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.phoneNumber || !formData.pincode || !formData.state || !formData.city || !formData.houseNo || !formData.roadName) {
            toast.error('Please fill in all required fields.');
            return;
        }

        const dataToSubmit = {
            ...formData,
            verificationCode: verificationCodes || '', 
        };

        try {
            const response = await fetch(SummaryApi.Address.url, {
                method: SummaryApi.Address.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                throw new Error('Something went wrong with the submission');
            }

            const result = await response.json();
            console.log('Success:', result);

            setFormData({
                fullName: '',
                phoneNumber: '',
                altPhoneNumber: '',
                pincode: '',
                state: '',
                city: '',
                houseNo: '',
                roadName: '',
                verificationCode: '',
            });

            toast.success('Address submitted successfully!');
        } catch (error) {
            console.error('Error submitting address:', error);
            toast.error('Failed to submit address, please try again later.');
        }
    };

    return (
        <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="font-semibold text-xl">Enter Your Address</h2>
            <form onSubmit={handleSubmit}>
               
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Full Name (Required)*"
                        className="p-2 w-full border rounded"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Phone Number (Required)*"
                        className="p-2 w-full sm:w-1/2 border rounded"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Alternate Phone Number"
                        className="p-2 w-full sm:w-1/2 border rounded mt-2 sm:ml-4"
                        name="altPhoneNumber"
                        value={formData.altPhoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Pincode (Required)*"
                        className="p-2 w-full sm:w-1/3 border rounded"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="State (Required)*"
                        className="p-2 w-full sm:w-1/3 border rounded mt-2 sm:ml-4"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="City (Required)*"
                        className="p-2 w-full sm:w-1/3 border rounded mt-2 sm:ml-4"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="House No., Building Name (Required)*"
                        className="p-2 w-full border rounded"
                        name="houseNo"
                        value={formData.houseNo}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Road Name, Area, Colony (Required)*"
                        className="p-2 w-full border rounded"
                        name="roadName"
                        value={formData.roadName}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 p-2 w-full sm:w-1/3 bg-blue-500 rounded font-semibold hover:font-bold hover:bg-blue-600 hover:text-white mx-auto"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Address;
