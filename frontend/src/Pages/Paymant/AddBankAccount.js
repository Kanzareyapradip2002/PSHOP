import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import { Link, useParams } from 'react-router-dom';

const AddBankAccount = () => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({ Account: "" });
  const [imageData, setImageData] = useState({
    Bank: "",
    AccountHolderPhoto: "",
    Date: "",
    Branch: "",
    BranchCode: "",
    AccountHolderName: "",
    MobileNo: "",
    EmailId: "",
    AccountType: "",
    AccountNumber: "",
    ProcuctCode: "",  // Make sure the initial state has this field
  });

  const [searchAccount, setSearchAccount] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const Codes  = useParams();  // Destructure 'Code' from useParams()

  const ProdactCode = Codes.Codes // Log Code to check the value
  localStorage.setItem("AddtoCart",ProdactCode)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const filterAccounts = useCallback((accounts) => {
    if (account.Account) {
      const filtered = accounts.filter((acc) =>
        acc.AccountNumber.includes(account.Account)
    );
    setFilteredAccounts(filtered);
  } else {
      setFilteredAccounts(accounts);
    }
  }, [account.Account]);
  
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
        filterAccounts(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filterAccounts]);

  useEffect(() => {
    fetchAllBankAccount();
  }, [fetchAllBankAccount]);
  
  useEffect(() => {
    filterAccounts(allAccounts);
  }, [account.Account, allAccounts, filterAccounts]);
  
  // This useEffect will update imageData when filteredAccounts change
  useEffect(() => {
    if (filteredAccounts.length > 0) {
      const accountData = filteredAccounts[0]; // Take the first account for now
      setImageData({
        Bank: accountData.Bank,
        AccountHolderPhoto: accountData.AccountHolerPhoto || "",  // Default to empty string if no photo
        Date: accountData.Date || "",
        Branch: accountData.Branch || "",
        BranchCode: accountData.BranchCode || "",
        AccountHolderName: accountData.AccountHolderName || "",
        MobileNo: accountData.MobileNo || "",
        EmailId: accountData.EmailId || "",
        AccountType: accountData.AccountType || "",
        AccountNumber: accountData.AccountNumber || "",
        ProcuctCode:ProdactCode, // Use Code from useParams() for ProcuctCode
      });
    }
  }, [filteredAccounts, ProdactCode]);  // Add Code as a dependency to this effect
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchAccount(true);
    fetchAllBankAccount();  // Trigger the account fetch after form submission
  };

  const [BankAccounts, setBankAccounts] = useState([]);

  const fetchBankAccount = async () => {
    try {
      const response = await fetch(SummaryApi.GetAddBankAccount.url, {
        method: SummaryApi.GetAddBankAccount.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setBankAccounts(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch accounts");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBankAccount();
  }, []);

  const Accountnumber = imageData.AccountNumber; // Assuming imageData has AccountNumber
  const BankAccount = BankAccounts.find(account => account.AccountNumber === Accountnumber); // Find account by matching AccountNumber

  const handleSubmitAccount = async (e) => {
    e.preventDefault();

    try {
      // If BankAccount exists, do something with it (optional, based on your logic)
      if (BankAccount) {
        // Do something if BankAccount is found, e.g., update the form
        toast.error("This bank account is already added.")
      } else {
        // If BankAccount is not found, proceed with submitting imageData
        const uploadData = await fetch(SummaryApi.AddBankAccount.url, {
          method: SummaryApi.AddBankAccount.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageData),
        });

        const data = await uploadData.json();
        if (data.success) {
          toast.success(data?.message);
          setIsClicked(true);
        } else {
          toast.error(data.message || "Error uploading details.");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading details.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex justify-center items-center w-full max-w-3xl mx-auto mt-6">
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="Account" className="font-semibold mb-2">
            Account No:
          </label>
          <input
            className="p-2 w-full bg-slate-100 border rounded"
            type="text"
            id="Account"
            name="Account"
            placeholder="Enter Your Account"
            value={account.Account}
            onChange={handleOnChange}
            required
          />
        </div>

        <button
          type="submit"
          className="p-2 ml-4 bg-blue-500 text-white rounded mt-8"
        >
          Submit
        </button>
      </form>

      {loading ? (
        <p className="text-center mt-6">Loading...</p>
      ) : (
        <ul className="mt-6">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account, index) => (
              <li key={index} className="bg-white p-4 mb-6 rounded-lg shadow-lg">
                {searchAccount && (
                  <div className="space-y-6">
                    <h1 className="text-center text-xl font-bold mb-4">Account Details</h1>

                    <div className="bg-orange-400 p-2 rounded-md shadow-lg mb-4">
                      <p className="font-semibold ml-2">1. Bank and Date</p>
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <div className="bg-white p-2 w-[150px] rounded-md shadow-lg">
                        <p className="font-semibold">Bank Name:</p>
                        <img src={account.Bank} alt="Bank Logo" className="h-16 w-16" />
                      </div>

                      <div className="bg-white p-4 w-[150px] rounded-md shadow-lg">
                        <p className="font-semibold">Bank Branch:</p>
                        <p>{account.Branch}</p>
                      </div>

                      <div className="bg-white p-4 w-[150px] rounded-md shadow-lg">
                        <p className="font-semibold">Branch Code:</p>
                        <p>{account.BranchCode}</p>
                      </div>

                      <div className="bg-white p-4 w-[190px] rounded-md shadow-lg">
                        <p className="font-semibold">Account Created Date:</p>
                        <p>{account.Date}</p>
                      </div>

                      <div className="bg-white p-4 w-[190px] rounded-md shadow-lg">
                        <p className="font-semibold">Account Type:</p>
                        <p>{account.AccountType}</p>
                      </div>
                      <div className="bg-white p-4 w-[190px] rounded-md shadow-lg">
                        <p className="font-semibold">Account Number:</p>
                        <p>{account.AccountNumber}</p>
                      </div>
                    </div>

                    {/* Personal Details Section */}
                    <div className="bg-orange-400 p-2 rounded-md shadow-lg mt-6">
                      <p className="font-semibold ml-2">2. Personal Details</p>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-4">
                      <div className="bg-white p-2 w-[300px] rounded-md shadow-lg">
                        <p className="font-semibold">Account Holder Name:</p>
                        <p>{account.AccountHolderName}</p>
                      </div>

                      <div className="bg-white p-4 flex justify-center items-center flex-col w-[300px] rounded-md shadow-lg">
                        <p className="font-semibold">Account Holder Photo:</p>
                        <img src={account.AccountHolerPhoto} alt="Account Holder" className="w-32 h-32 rounded-full shadow-xl mt-2" />
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-orange-400 p-2 rounded-md shadow-lg mt-6">
                      <p className="font-semibold ml-2">3. Contact Details</p>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-4">
                      <div className="bg-white p-4 w-[250px] rounded-md shadow-lg">
                        <p className="font-semibold">Mobile No:</p>
                        <p>{account.MobileNo}</p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-lg">
                        <p className="font-semibold">Email Id:</p>
                        <p>{account.EmailId}</p>
                      </div>
                    </div>
                    <div>
                      <div className='flex justify-center cursor-pointer font-semibold text-white items-center gap-3 ' >
                        <Link to={"/User-Wallet/:Code"} >
                          <p className='bg-red-600 p-3 rounded-lg shadow-lg hover:bg-red-700 '>Back</p>
                        </Link>
                        <p
                          className={`bg-red-600 p-3 rounded-lg shadow-lg ${isClicked ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-700'}`}
                          onClick={!isClicked ? handleSubmitAccount : null}
                          disabled={isClicked}
                        >
                          Confirm Account
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No accounts found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AddBankAccount;
