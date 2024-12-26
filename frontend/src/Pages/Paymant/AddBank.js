import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for toast notifications
import SummaryApi from '../../common'; // Assuming you have this file that exports the API configuration
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddBank = () => {
  const [bankAccounts, setBankAccounts] = useState([]); // Initializing state for bank accounts
  
  // Fetch bank accounts from the API
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
  
  const user = useSelector((state) => state?.user?.user);
  const VerificationCodes = user?.verificationCode;
  console.log(VerificationCodes,"VerificationCodes")
  console.log(bankAccounts,"bankAccounts")
  console.log(user,"user")
  // Ensure bankAccounts is an array and handle the verification code lookup
  const filteredBankAccounts = bankAccounts.filter(account => 
    VerificationCodes && account.VerificationCodes === VerificationCodes
  );
  return (
    <div>
      {/* Check if filteredAccounts has data before rendering */}
      {filteredBankAccounts.length > 0 ? (
        <ul>
          {filteredBankAccounts.map((account) => (
            <li key={account.id}> {/* Using account.id if it's unique */}
              <div className="flex flex-wrap">
                <div className="h-16 rounded-md mt-2 ml-3 bg-white shadow-lg p-2">
                  <h2 className="font-semibold">Bank:</h2>
                  <img src={account.Bank} className="h-8" alt="Bank Logo" />
                </div>
                <div className="h-16 rounded-md mt-2 ml-3 bg-white shadow-lg p-2">
                  <h2 className="font-semibold">Account Holder Name:</h2>
                  <h2>{account.AccountHolderName || 'N/A'}</h2> {/* Safe rendering */}
                </div>
                <div className="h-16 rounded-md mt-2 ml-3 bg-white shadow-lg p-2">
                  <h2 className="font-semibold">Account Number:</h2>
                  <h2>{account.AccountNumber || 'N/A'}</h2> {/* Safe rendering */}
                </div>
                <div className="h-16 rounded-md mt-2 ml-3 bg-white shadow-lg p-2">
                  <h2 className="font-semibold">Email Id:</h2>
                  <h2>{account.EmailId || 'N/A'}</h2> {/* Safe rendering */}
                </div>
                <Link
                  to={`/PaymentPage/${account.AccountNumber}`}
                  className="h-16 rounded-md mt-2 ml-3 bg-red-500 text-white shadow-lg p-5 hover:text-black cursor-pointer hover:bg-red-600"
                >
                  <h2 className="font-bold">Pay</h2>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching bank accounts found.</p> // Handle the case where no bank accounts match
      )}
    </div>
  );
};

export default AddBank;
