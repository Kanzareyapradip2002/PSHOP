import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import AddBank from '../Paymant/AddBank';
import PaymantHistory from './PaymantHistory';
import Logo from '../../assest/p-shop.png';;

const Wallet = () => {
  const user = useSelector((state) => state?.user?.user);
  const { email, name, role } = user || {}; // Destructure user info
  const id = useParams();
  const Codes = id.id;

  console.log(Codes)

  localStorage.setItem('addtocart', Codes);

  // Loading state
  if (!user) {
    return <p>
      <div class="ring">
        <img src={Logo} alt='logo' className='mt-3' />
        <span></span>
      </div>
    </p>
  }

  return (
    <div className="bg-white w-full h-full shadow-lg mt-3 p-5 md:p-10">
      <div className="flex ml-10">
        <h2 className="font-bold text-xl">User Wallet Details</h2>
      </div>

      <div className="mt-5 flex flex-wrap gap-5 ml-10">
        <div className="w-full sm:w-56 p-2 bg-white shadow-lg rounded-lg">
          <h3 className="font-semibold">Name:</h3>
          <p className="text-sm text-gray-600">{name || 'Not available'}</p>
        </div>
        <div className="w-full sm:w-56 p-2 bg-white shadow-lg rounded-lg">
          <h3 className="font-semibold">Email:</h3>
          <p className="text-sm text-gray-600">{email || 'Not available'}</p>
        </div>
        <div className="w-full sm:w-56 p-2 bg-white shadow-lg rounded-lg">
          <h3 className="font-semibold">User Account Type:</h3>
          <p className="text-sm text-gray-600">{role || 'Not available'}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-xl p-4 mt-5 overflow-y-scroll scrollbar-none">
        <div className="w-full sm:w-[300px] ml-3 rounded h-auto mt-6 bg-white shadow-xl p-4">
          {user && (
            <>
              <div className="text-xl ml-2 font-bold cursor-pointer">
                <Link to={`/AddBankAccount`}>
                  <p>Add Bank Account</p>
                </Link>
              </div>
            </>
          )}
        </div>
        <AddBank />
      </div>

      <div className="flex ml-12 mt-4">
        <h2 className="font-bold">Payment History</h2>
      </div>

      <div className="bg-white shadow-md rounded-md pb-3 overflow-y-scroll h-[200px] scrollbar-none">
        <PaymantHistory />
      </div>
    </div>
  );
};

export default Wallet;
