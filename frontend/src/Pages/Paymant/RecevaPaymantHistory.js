import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for toast notifications
import SummaryApi from '../../common'; // Assuming you have this file that exports the API configuration
import moment from 'moment';
import displayINRCurrency from '../../helpers/displayCurrency';
import Logo from '../../assest/p-shop.png'; // Show loading indicator while fetching data

const RecevaPaymantHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]); // Initializing state for payment history
  const [totalAmount, setTotalAmount] = useState(0); // State for total payment amount
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  // Function to fetch payment history from the API
  const fetchPaymentHistory = async () => {
    setIsLoading(true); // Start loading when fetching data
    try {
      const response = await fetch(SummaryApi.RecevPaymentHistory.url, {
        method: SummaryApi.RecevPaymentHistory.method,
        credentials: 'include', // Sending credentials if needed
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataResponse = await response.json(); // Parsing JSON data

      if (dataResponse.success) {
        setPaymentHistory(dataResponse.data); // Update state with fetched data
        calculateTotal(dataResponse.data); // Calculate the total payment amount
      } else {
        toast.error(dataResponse.message); // Show error message if API indicates failure
      }
    } catch (error) {
      toast.error("Failed to fetch payment history"); // Show general error if fetch fails
      console.error(error); // Log error for debugging
    } finally {
      setIsLoading(false); // Stop loading when data fetch is complete
    }
  };

  // Function to calculate the total payment amount
  const calculateTotal = (data) => {
    const total = data.reduce((acc, history) => acc + parseFloat(history.Balance || 0), 0);
    setTotalAmount(total); // Set the total amount state
  };

  // useEffect hook to fetch payment history when the component is mounted
  useEffect(() => {
    fetchPaymentHistory(); // Call the fetch function on mount
  });

  if (isLoading) {
    return <p>
      <div class="ring">
        <img src={Logo} alt='logo' className='mt-3' />
        <span></span>
      </div>
    </p>
  }

  return (
    <div className="p-4">
      {/* Render payment history as a list */}
      {paymentHistory.length === 0 ? (
        <p>No payment history available.</p> // Message if no data is available
      ) : (
        <>
          <ul className="space-y-4">
            {paymentHistory.map((history) => (
              <li key={history.id} className="bg-white shadow-md rounded-lg p-4 flex flex-wrap gap-4">
                {/* Account Number */}
                <div className="flex-1">
                  <h2 className="font-semibold text-sm sm:text-base">Account Number:</h2>
                  <p className="text-gray-700">{history.AccountNumber}</p>
                </div>

                {/* Payment Date */}
                <div className="flex-1">
                  <h2 className="font-semibold text-sm sm:text-base">Payment Date:</h2>
                  <p className="text-gray-700">{moment(history.createdAt).format('LL')}</p>
                </div>

                {/* Payment Amount */}
                <div className="flex-1">
                  <h2 className="font-semibold text-sm sm:text-base">Payment Amount:</h2>
                  <p className="text-green-600 text-lg">{displayINRCurrency(history.Balance)}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Total amount */}
          <div className="mt-8 bg-white rounded-lg shadow-lg flex justify-center w-full sm:w-[300px] mx-auto p-4">
            <div className="font-bold text-xl text-center">
              <p>Total: {displayINRCurrency(totalAmount)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecevaPaymantHistory;
