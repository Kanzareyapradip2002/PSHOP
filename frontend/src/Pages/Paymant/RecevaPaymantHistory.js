import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify'; 
import SummaryApi from '../../common';
import moment from 'moment';
import displayINRCurrency from '../../helpers/displayCurrency';
import Logo from '../../assest/p-shop.png'; 

const RecevaPaymantHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Memoizing the fetchPaymentHistory function with useCallback
  const fetchPaymentHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SummaryApi.RecevPaymentHistory.url, {
        method: SummaryApi.RecevPaymentHistory.method,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setPaymentHistory(dataResponse.data);
        calculateTotal(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch payment history");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array since it doesn't rely on any outside state or props

  // Function to calculate the total payment amount
  const calculateTotal = (data) => {
    const total = data.reduce((acc, history) => acc + parseFloat(history.Balance || 0), 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    fetchPaymentHistory(); // Call fetchPaymentHistory when the component mounts
  }, [fetchPaymentHistory]); // Fetch when fetchPaymentHistory changes (memoized)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="ring">
          <img src={Logo} alt="logo" className="mt-3" />
          <span className="loading-spinner"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {paymentHistory.length === 0 ? (
        <p>No payment history available.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {paymentHistory.map((history) => (
              <li key={history.id} className="bg-white shadow-md rounded-lg p-4 flex flex-wrap gap-4">
                <div className="flex-1">
                  <h2 className="font-semibold text-sm sm:text-base">Account Number:</h2>
                  <p className="text-gray-700">{history.AccountNumber}</p>
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-sm sm:text-base">Payment Date:</h2>
                  <p className="text-gray-700">{moment(history.createdAt).format('LL')}</p>
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-sm sm:text-base">Payment Amount:</h2>
                  <p className="text-green-600 text-lg">{displayINRCurrency(history.Balance)}</p>
                </div>
              </li>
            ))}
          </ul>
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

export default RecevaPaymantHistory
