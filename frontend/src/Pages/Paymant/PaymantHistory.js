import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for toast notifications
import SummaryApi from '../../common'; // Assuming you have this file that exports the API configuration
import moment from 'moment';
import displayINRCurrency from '../../helpers/displayCurrency';
import { useSelector } from 'react-redux';

const PaymentHistory = () => {
  const [PaymentHistory, setPaymentHistory] = useState([]); // Initializing state for payment history
  const [totalAmount, setTotalAmount] = useState(0); // State for total payment amount

  const user = useSelector((state) => state?.user?.user);
  const VerificationCodes = user?.verificationCode;

  // Function to fetch payment history from the API
  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch(SummaryApi.AllPaymentHistory.url, {
        method: SummaryApi.AllPaymentHistory.method,
        credentials: 'include', // Sending credentials if needed
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataResponse = await response.json(); // Parsing JSON data

      if (dataResponse.success) {
        setPaymentHistory(dataResponse.data); // Update state with fetched data
        calculateTotal(dataResponse.data, VerificationCodes); // Calculate the total payment amount
      } else {
        toast.error(dataResponse.message); // Show error message if API indicates failure
      }
    } catch (error) {
      toast.error("Failed to fetch payment history"); // Show general error if fetch fails
      console.error(error); // Log error for debugging
    }
  };

  // Function to calculate the total payment amount based on the filtered data
  const calculateTotal = (data, verificationCodes) => {
    // Filter the payments where the Code matches the VerificationCode
    const filteredPayments = data.filter((history) => history.Code === verificationCodes);

    // Calculate the total for filtered payments
    const total = filteredPayments.reduce((acc, history) => acc + parseFloat(history.Balance || 0), 0);
    setTotalAmount(total); // Set the total amount state
  };

  // useEffect hook to fetch payment history when the component is mounted
  useEffect(() => {
    fetchPaymentHistory(); // Call the fetch function on mount
  }, []);

  // Filter the payment history only for the correct VerificationCodes
  const filterPaymentHistory = PaymentHistory.filter(account => 
    VerificationCodes && account.Code === VerificationCodes
  );

  return (
    <div className="p-4">
      {/* Render payment history as a list */}
      <>
        <ul className="space-y-4">
          {filterPaymentHistory.map((history) => (
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
    </div>
  );
};

export default PaymentHistory;
