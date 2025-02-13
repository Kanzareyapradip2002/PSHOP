import React, { useEffect } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import '../App.css';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-white w-full md:w-72 min-h-full customShadow sm:p-4 flex-shrink-0">
        <div className="h-32 mt-2 flex justify-center items-center flex-col">
          <div className="text-3xl cursor-pointer relative flex justify-center">
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className="w-20 h-20 rounded-full" alt={user?.name} />
              ) : (
                <FaUserTie />
              )
            }
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        
        {/* Navigation */}
        <div>
          <nav className="grid p-4 gap-2">
            <Link to="all-users" className="px-2 py-1 hover:bg-slate-100 rounded">All Users</Link>
            <Link to="all-products" className="px-2 py-1 hover:bg-slate-100 rounded">All Products</Link>
            <Link to="Processing-Order" className="px-2 py-1 hover:bg-slate-100 rounded">Processing Order</Link>
            <Link to="Conformed-Order" className="px-2 py-1 hover:bg-slate-100 rounded">Confirmed Order</Link>
            <Link to="Cancel-Order" className="px-2 py-1 hover:bg-slate-100 rounded">Cancel Order</Link>
            <Link to="RecevaPayment" className="px-2 py-1 hover:bg-slate-100 rounded">Receive Payment</Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
