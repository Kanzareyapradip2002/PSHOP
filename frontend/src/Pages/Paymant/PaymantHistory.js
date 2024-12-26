import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import moment from 'moment';
import displayINRCurrency from '../../helpers/displayCurrency';
import { useSelector } from 'react-redux';

const PaymentHistory = () => {
  const [PaymentHistory, setPaymentHistory] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const user = useSelector((state) => state?.user?.user);
  const VerificationCodes = user?.verificationCode;

  // Memoize the fetchPaymentHistory function using useCallback
  const fetchPaymentHistory = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.AllPaymentHistory.url, {
        method: SummaryApi.AllPaymentHistory.method,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setPaymentHistory(dataResponse.data);
        calculateTotal(dataResponse.data, VerificationCodes);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch payment history");
      console.error(error);
    }
  }, [VerificationCodes]); // Dependencies: If VerificationCodes changes, fetchPaymentHistory will be recreated

  const calculateTotal = (data, verificationCodes) => {
    const filteredPayments = data.filter((history) => history.Code === verificationCodes);
    const total = filteredPayments.reduce((acc, history) => acc + parseFloat(history.Balance || 0), 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]); // Now no warning, because fetchPaymentHistory is memoized

  const filterPaymentHistory = PaymentHistory.filter(account => 
    VerificationCodes && account.Code === VerificationCodes
  );

  return (
    <div className="p-4">
      <ul className="space-y-4">
        {filterPaymentHistory.map((history) => (
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
    </div>
  );
};

export default PaymentHistory;
