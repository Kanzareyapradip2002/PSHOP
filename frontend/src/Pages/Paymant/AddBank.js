import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for toast notifications
import SummaryApi from '../../common'; // Assuming you have this file that exports the API configuration
import { Link } from 'react-router-dom';

const AddBank = () => {
  const [bankAccounts, setBankAccounts] = useState([]); // Initializing state for bank accounts

  // Function to fetch bank accounts from the API
  const fetchBankAccounts = async () => {
    try {
      const response = await fetch(SummaryApi.GetAddBankAccount.url, {
        method: SummaryApi.GetAddBankAccount.method,
        credentials: 'include', // Sending credentials if needed
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataResponse = await response.json(); // Parsing JSON data

      if (dataResponse.success) {
        setBankAccounts(dataResponse.data); // Updating state with the fetched data
      } else {
        toast.error(dataResponse.message); // Show error message if API indicates failure
      }
    } catch (error) {
      toast.error("Failed to fetch accounts"); // Show general error if the fetch fails
      console.error(error); // Logging error for debugging
    }
  };

  // useEffect hook to fetch bank accounts when the component is mounted
  useEffect(() => {
    fetchBankAccounts(); // Call the fetch function on mount
  }, []);

  return (
    <div>
      {/* Render bank accounts as a list */}
      <ul>
        {bankAccounts.map((account) => (
          <li key={account.id}> {/* Using account.id if it's unique */}
            <div className="flex flex-wrap">
              <div className=' h-16 rounded-md mt-2 ml-3 bg-white shadow-lg p-2'>
                <h2 className='font-semibold'>Bank:</h2>
                <img src={account.Bank} className='h-8' alt=''/>
              </div>
              <div className='h-16 rounded-md mt-2 ml-3 bg-white shadow-lg p-2'>
                <h2 className='font-semibold'>Account Holder Name:</h2>
                <h2>{account.AccountHolderName}</h2> {/* Handle undefined AccountHolderName */}
              </div>
              <div className='h-16 rounded-md mt-2 ml-3 bg-white shadow-lg p-2'>
                <h2 className='font-semibold'>Account Number:</h2>
                <h2>{account.AccountNumber}</h2> {/* Handle undefined AccountHolderName */}
              </div>
              <div className='h-16 rounded-md mt-2 ml-3 bg-white shadow-lg p-2'>
                <h2 className='font-semibold'>Email Id:</h2>
                <h2>{account.EmailId}</h2> {/* Handle undefined AccountHolderName */}
              </div>
              <Link to={`/PaymentPage/${account.AccountNumber}`} className='h-16 rounded-md mt-2 ml-3 bg-red-500 text-white  shadow-lg p-5 hover:text-black cursor-pointer hover:bg-red-600'>
                 <h2 className='font-bold'>Pay</h2>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddBank;
