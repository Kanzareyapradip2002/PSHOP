import React from 'react';
import { useSelector } from 'react-redux';
import displayINRCurrency from '../../helpers/displayCurrency';
import { Link, useParams} from 'react-router-dom';
import AddBank from '../Paymant/AddBank';
import PaymantHistory from './PaymantHistory';

const Wallet = () => {
  const user = useSelector((state) => state?.user?.user);
  const { email, profilePic, name, role } = user || {}; // Destructure user info
  const Code = useParams()

  const Codes = Code.Code

 localStorage.setItem("addtocart",Codes)

  // Loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white w-full h-full shadow-lg mt-3 p-5">
      <div className="flex ml-10">
        <h2 className="font-bold text-xl">User Wallet Details</h2>
      </div>

      <div className="mt-5 flex gap-20 ml-10">
        <h2 className="font-semibold bg-white shadow-lg w-56 p-2 rounded-lg">
          Name:
          <p className="text-sm text-gray-600">{name || 'Not available'}</p>
        </h2>
        <h2 className="font-semibold bg-white shadow-lg w-56 p-2 rounded-lg">
          Email:
          <p className="text-sm text-gray-600">{email || 'Not available'}</p>
        </h2>
        <h2 className="font-semibold bg-white shadow-lg w-56 p-2 rounded-lg">
          User Account Type:
          <p className="text-sm text-gray-600">{role || 'Not available'}</p>
        </h2>
      </div>

      <div className="flex mt-[-50px] justify-end">
        <img
          src={profilePic || '/default-profile.jpg'} // Fallback profile pic
          alt="Profile"
          className="h-56 w-52 rounded-lg object-cover"
        />
      </div>

      <div className="bg-white rounded-lg ml-10 shadow-xl h-[260px] mt-[-160px] w-[900px] p-1 overflow-y-scroll scrollbar-none">
        <div className="w-[300px] ml-3 rounded h-auto mt-6 bg-white shadow-xl p-4">
          {user && (
            <>
              <div className="text-xl ml-2 font-bold cursor-pointer">
                <Link to={`/AddBankAccount/${Codes}`}>
                  <p>Add Bank Account</p>
                </Link>
              </div>
            </>
          )}
        </div>
        <AddBank/>
      </div>

      <div className="flex ml-12 mt-4">
        <h2 className="font-bold ml-[-10px]">Payment History </h2>
      </div>
      <div className='bg-white shadow-md rounded-md pb-3 overflow-y-scroll h-[200px] scrollbar-none'>
        <PaymantHistory/>
      </div>
      
    </div>
  );
};

export default Wallet;
