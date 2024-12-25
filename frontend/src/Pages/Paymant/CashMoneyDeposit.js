import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import displayINRCurrency from '../../helpers/displayCurrency';
import { useNavigate } from 'react-router-dom';

const CashMoneyDeposit = ({ TotalPrice, AddToCartData, BankAccountsData }) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const navigate = useNavigate();
  
  // Account info for the deposit
  const [account, setAccount] = useState({
    Account: '1733796991961', // Example AccountNumber
    Balance: TotalPrice, // Balance to deposit
  });

  console.log(AddToCartData, BankAccountsData);

  // Fetch all bank accounts
  const fetchAllBankAccount = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.GetBankAccount.url, {
        method: SummaryApi.GetBankAccount.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllAccounts(dataResponse.data); // Store accounts
      } else {
        toast.error(dataResponse.message || 'Failed to fetch accounts');
      }
    } catch (error) {
      toast.error('Failed to fetch accounts');
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllBankAccount(); // Fetch data on mount
  }, [fetchAllBankAccount]);

  // Handle deposit submission
  const handleDepositSubmit = async (accountData) => {
    if (!accountData || !accountData._id) {
      toast.error('Invalid account information');
      return;
    }

    // Ensure balance is a valid number
    const depositAmount = parseFloat(account.Balance);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      toast.error('Invalid deposit amount');
      return;
    }

    try {
      // Send deposit request to the backend
      const response = await fetch(SummaryApi.UpdateBalance.url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: accountData._id, // Use accountData._id here for the correct account ID
          Balance: depositAmount + parseFloat(accountData.Balance), // Add deposit amount to the current balance
        }),
      });

      const responseData = await response.json();

      // Handle backend response
      if (responseData.success) {
        setAccount((prev) => ({ ...prev, Balance: '' })); // Clear balance after successful deposit
        toast.success(`Your Order was Successful! Waiting for confirmation from ${accountData.EmailId}`);
        navigate("/AddToCart");
        handleAddToCartSubmit();
      } else {
        toast.error(responseData.message || 'Failed to deposit');
      }
    } catch (error) {
      toast.error('An error occurred while depositing the money.');
      console.error('Error depositing money:', error);
    }
  };

  // Filter the accounts based on the specific account number
  const filteredAccounts = allAccounts.filter(acc => acc.AccountNumber === account.Account);

  // Handle add to cart form submission
  const handleAddToCartSubmit = async (e) => {

    if (!AddToCartData || !BankAccountsData) {
      toast.error('Missing cart or bank account data');
      return;
    }
 

    const dataToSubmit = {
      PhoneNumber: AddToCartData.AltPhoneNumber,
      City: AddToCartData.City,
      Code: AddToCartData.Code,
      Confirmation: AddToCartData.Confirmation,
      DeliveryChargePrice: AddToCartData.DeliveryChargePrice,
      Discount: AddToCartData.Discount,
      DiscountPrice: AddToCartData.DiscountPrice,
      FullName: AddToCartData.FullName,
      HouseNo: AddToCartData.HouseNo,
      Num: AddToCartData.Num,
      State: AddToCartData.State,
      Pincode: AddToCartData.Pincode,
      ProductBrand: AddToCartData.ProductBrand,
      ProductCategory: AddToCartData.ProductCategory,
      ProductDescription: AddToCartData.ProductDescription,
      ProductImage: AddToCartData.ProductImage,
      ProductName: AddToCartData.ProductName,
      ProductPrice: AddToCartData.ProductPrice,
      TotalPrice:TotalPrice,
      RoadName: AddToCartData.RoadName,
      VerificationCodes: AddToCartData.VerificationCodes,
      AccountHolderName: BankAccountsData.AccountHolderName,
      AccountHolderPhoto: BankAccountsData.AccountHolerPhoto,
      AccountNumber: BankAccountsData.AccountNumber,
      Address: BankAccountsData.Address,
      AltMobileNo: BankAccountsData.AltMobileNo,
      Bank: BankAccountsData.Bank,
      Branch: BankAccountsData.Branch,
      BranchCode: BankAccountsData.BranchCode,
      Country: BankAccountsData.Country,
      District: BankAccountsData.District,
      EmailId: BankAccountsData.EmailId,
      MobileNo: BankAccountsData.MobileNo,
      PinCode: BankAccountsData.PinCode,
      ProductId:AddToCartData._id
    };

    try {
      const response = await fetch(SummaryApi.OrderProduct.url, {
        method: SummaryApi.OrderProduct.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData?.message || 'Something went wrong with the submission.');
        return;
      }

      const result = await response.json();
      console.log('API response:', result);
      handleSubmit()
      toast.success('Order Successfully Sand To Processing');
    } catch (error) {
      console.error('Error during fetch:', error);
      toast.error('Failed to add to cart, please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    
    // Validate that account data is available
    if (!account || !account.Account || !account.Balance) {
      toast.error('Missing required account data.');
      return;
    }

    try {
      // Send the withdrawal history data to the API
      const uploadData = await fetch(SummaryApi.DipositHstrey.url, {
        method: SummaryApi.DipositHstrey.method,
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
      <>
        {/* Display accounts and deposit button */} 
        {filteredAccounts.length > 0 ? (
          <ul className="mt-6">
            {filteredAccounts.map((accountData, index) => (
              <div key={index} className="pb-4">
                <button
                  onClick={() => handleDepositSubmit(accountData)}
                  className="bg-red-500 shadow-lg flex p-2 w-full rounded-lg"
                >
                  <h1 className="font-bold text-lg text-white  lg:ml-7">ConfirmPayment</h1>
                  <h1 className="font-bold ml-auto text-lg text-white ">{displayINRCurrency(TotalPrice)}</h1>
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <p>No matching accounts found</p>
        )}
      </>
    </div>
  );
};

export default CashMoneyDeposit;
