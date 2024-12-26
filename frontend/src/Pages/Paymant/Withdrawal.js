import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import displayINRCurrency from '../../helpers/displayCurrency';
import SummaryApi from '../../common';
import SeandSecreatKEYPamant from '../../Components/SeandSecreatKEYPamant';
import CashMoneyDeposit from './CashMoneyDeposit';
import Logo from '../../assest/p-shop.png';
import { useSelector } from 'react-redux';
const Withdrawal = ({ AccountNumber, TotalPrice, EmailId, AddToCartData }) => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user?.verificationCode)
  const [allAccounts, setAllAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    Account: AccountNumber,
    Balance: TotalPrice, // Balance to Withdraw
    Code:user?.verificationCode

  });
  const [show, setShow] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const accountData = allAccounts.find((acc) => acc.AccountNumber === AccountNumber);

  const [button, setButton] = useState(true);

  const handelonClose = () => {
    setShow(false);
    setButton(false);
  };

  const handleSubmit = async (e) => {
    if (!account || !account.Account || !account.Balance) {
      toast.error('Missing required account data.');
      return;
    }

    try {
      const uploadData = await fetch(SummaryApi.WedroalaHstrey.url, {
        method: SummaryApi.WedroalaHstrey.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          AccountNumber: account.Account,
          Balance: account.Balance,
          Code:account.Code
        }),
      });

      const data = await uploadData.json();

      if (data.success) {
        console.log('Withdrawal history uploaded successfully');
      } else {
        toast.error(data.message || 'Error uploading withdrawal history.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred while uploading withdrawal history.');
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <p>
          <div class="ring">
            <img src={Logo} alt='logo' className='mt-3' />
            <span></span>
          </div>
        </p>
      ) : (
        <>
          {accountData ? (
            <ul className="mt-6">
              <li className="space-y-6 p-3 rounded mb-6">
                <form onSubmit={(e) => handleWithdrawSubmit(e, accountData)} className="mt-6">
                  <div className="hidden">
                    <input
                      className="p-2 w-full max-w-[300px] bg-slate-100 border rounded"
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
                  {button && (
                    <div className="pb-4">
                      {show === false && (
                        <button
                          type="submit"
                          className="bg-red-500 shadow-lg flex p-2 w-full sm:w-[300px] lg:w-[1140px] mx-auto rounded-lg mt-3"
                        >
                          <h1 className="font-bold  text-xl text-white lg:ml-7">ConfirmPayment</h1>
                          <h1 className="font-bold ml-auto text-xl text-white">
                            {displayINRCurrency(TotalPrice)}
                          </h1>
                        </button>
                      )}
                    </div>
                  )}
                </form>
              </li>
            </ul>
          ) : (
            <p>No account found for the provided Account Number.</p>
          )}

          {show && (
            <SeandSecreatKEYPamant
              onClose={handelonClose}
              email={EmailId}
            />
          )}

          {button === false && (
            <CashMoneyDeposit
              TotalPrice={TotalPrice}
              AddToCartData={AddToCartData}
              BankAccountsData={accountData}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Withdrawal;
