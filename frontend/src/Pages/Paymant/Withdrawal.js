import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import displayINRCurrency from '../../helpers/displayCurrency';
import SummaryApi from '../../common';
import SeandSecreatKEYPamant from '../../Components/SeandSecreatKEYPamant';
import CashMoneyDeposit from './CashMoneyDeposit';

const Withdrawal = ({ AccountNumber, TotalPrice ,EmailId,AddToCartData}) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    Account: AccountNumber,
    Balance: TotalPrice, // Balance to Withdraw
  });



  console.log(AccountNumber)
  const [show, setShow] = useState(false);

  // Handle input change for deposit balance
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch all bank accounts
  const fetchAllBankAccount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.GetBankAccount.url, {
        method: SummaryApi.GetBankAccount.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllAccounts(dataResponse.data);
      } else {
        toast.error(dataResponse.message || 'Failed to fetch accounts');
      }
    } catch (error) {
      toast.error('Failed to fetch accounts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllBankAccount(); // Fetch data on mount
  }, [fetchAllBankAccount]);

  // Handle withdrawal form submission
  const handleWithdrawSubmit = async (e, accountData) => {
    e.preventDefault();

    if (!accountData || !accountData._id) {
      toast.error('Invalid account information');
      return;
    }

    const withdrawalAmount = parseFloat(account.Balance);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      toast.error('Please enter a valid withdrawal amount');
      return;
    }

    if (withdrawalAmount > accountData.Balance) {
      toast.error('Insufficient balance for withdrawal');
      return;
    }

    try {
      const response = await fetch(SummaryApi.UpdateBalance.url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: accountData._id,
          Balance: accountData.Balance - withdrawalAmount,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setAccount((prev) => ({ ...prev, Balance: '' }));
        fetchAllBankAccount(); // Refresh the account data
        setShow(true); // Show SeandSecreatKEYPamant form after successful withdrawal
        handleSubmit()
      } else {
        toast.error(responseData.message || 'Failed to withdraw');
      }
    } catch (error) {
      toast.error('An error occurred while withdrawing money.');
      console.error('Error withdrawing money:', error);
    }
  };

  // Find the account by AccountNumber from the list of accounts
  const accountData = allAccounts.find((acc) => acc.AccountNumber === AccountNumber);

  const [button, setButton] = useState(true)

  const handelonClose = () => {
    setShow(false)
    setButton(false)
  }


  // History //

  const handleSubmit = async (e) => {
    
    // Validate that account data is available
    if (!account || !account.Account || !account.Balance) {
      toast.error('Missing required account data.');
      return;
    }

    try {
      // Send the withdrawal history data to the API
      const uploadData = await fetch(SummaryApi.WedroalaHstrey.url, {
        method: SummaryApi.WedroalaHstrey.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          AccountNumber: account.Account, // Assuming the API needs 'Account' field
          Balance: account.Balance, // Assuming 'Balance' is the amount withdrawn
        }),
      });

      const data = await uploadData.json();

      if (data.success) {
        console.log('Withdrawal history uploaded successfully'); // Correctly log success
      } else {
        toast.error(data.message || 'Error uploading withdrawal history.');
      }
    } catch (error) {
      console.error('Upload error:', error); // Log error for developers
      toast.error('An error occurred while uploading withdrawal history.'); // Show user-friendly error message
    }
  };

  return (
    <div className="p-4">
      {/* Loading state */}
      {loading ? (
        <p className="text-center mt-6">Loading...</p>
      ) : (
        <>
          {/* Display the account if found */}
          {accountData ? (
            <ul className="mt-6">
              <li className="space-y-6 p-3 rounded mb-6">
                <form onSubmit={(e) => handleWithdrawSubmit(e, accountData)} className="mt-6">
                  <div className="flex justify-center">
                    <input
                      className="p-2 hidden w-[300px] bg-slate-100 border rounded"
                      type="text"
                      id="Balance"
                      name="Balance"
                      placeholder="Enter Withdrawal Amount"
                      value={account.Balance}
                      onChange={handleOnChange}
                      required
                    />
                  </div>

                  {/* Conditional rendering for showing confirmation button */}
                  {
                    button === true && (
                      <div>
                        {show === false && (
                          <div className="pb-4">
                            <button
                              type="submit"
                              className="bg-red-500 shadow-lg flex p-2 ml-8 w-[1140px] rounded-lg mt-3"
                            >
                              <h1 className="font-bold ml-7 text-xl text-white">Confirm Payment</h1>
                              <h1 className="font-bold ml-[800px] text-xl text-white">
                                {displayINRCurrency(TotalPrice)}
                              </h1>
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  }

                </form>
              </li>
            </ul>
          ) : (
            <p>No account found for the provided Account Number.</p>
          )}

          {/* Show either the Secret KEY form or Deposit form */}
          {show && (
            <SeandSecreatKEYPamant
             onClose={handelonClose}
             email={EmailId}/>
          )}
          {
            button === false && (
              <CashMoneyDeposit 
              TotalPrice={TotalPrice}
              AddToCartData={AddToCartData}
              BankAccountsData={accountData}
               />
            )
          }
        </>
      )}
    </div>
  );
};

export default Withdrawal;
