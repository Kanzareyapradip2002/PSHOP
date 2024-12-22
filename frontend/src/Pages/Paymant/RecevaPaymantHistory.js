import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for toast notifications
import SummaryApi from '../../common'; // Assuming you have this file that exports the API configuration
import moment from 'moment';
import displayINRCurrency from '../../helpers/displayCurrency';

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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div>
      {/* Render payment history as a list */}
      {paymentHistory.length === 0 ? (
        <p>No payment history available.</p> // Message if no data is available
      ) : (
        <>
          <ul>
            {paymentHistory.map((history) => (
              <li key={history.id} className="overflow-y-scroll scrollbar-none"> {/* Using history.id if it's unique */}
                <div className="flex flex-wrap ">
                  <div className="h-16 flex rounded-md mt-2 ml-2 bg-white shadow-lg p-2">
                    <div className="mt-4 flex">
                      <h2 className="font-semibold">Account Number: </h2>
                      <h2 className="h-8">{history.AccountNumber}</h2>
                    </div>
                    <div className="mt-4 ml-[130px] flex">
                      <h2 className="font-semibold">Payment Date: </h2>
                      <h2 className="h-8">{moment(history.createdAt).format('LL')}</h2>
                    </div>
                    <div className="mt-4 ml-[140px] flex">
                      <h2 className="font-semibold">Payment Amount: </h2>
                      <h2 className="h-8 ml-2 text-green-600">+{displayINRCurrency(history.Balance)}</h2>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Total amount */}
          <div className="bg-white mt-4 rounded-lg shadow-lg flex justify-center w-[250px] h-[50px] mx-auto">
            <div className="font-bold flex justify-center items-center text-xl">
              Total: <p>{displayINRCurrency(totalAmount)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecevaPaymantHistory;
