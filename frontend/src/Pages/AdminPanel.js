import React from 'react'
import { FaUserTie } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../App.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { useEffect } from 'react';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);  
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex ' >
      <aside className='bg-white min-h-full w-full max-w-60 customShadow '>
        <div className='h-32 mt-2 flex justify-center items-center flex-col'>
          <div className='text-3xl cursor-pointer relative flex justify-center '>
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
              ) : (
                <FaUserTie />
              )
            }

          </div>
          <p className='capitalize text-lg font-semibold '>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>
        {/* navigation*/}
        <div>
          <nav className=' grid p-4 '>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
            <Link to={"Processing-Order"} className='px-2 py-1 hover:bg-slate-100'>Processing Order</Link>
            <Link to={"Conformed-Order"} className='px-2 py-1 hover:bg-slate-100'>Conformed Order</Link>
            <Link to={"Cancel-Order"} className='px-2 py-1 hover:bg-slate-100'>Cancel Order</Link>
            <Link to={"RecevaPayment"} className='px-2 py-1 hover:bg-slate-100'>Receva Payment</Link>
          </nav>
        </div>
      </aside>
      <main className=' w-full h-full p-2'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminPanel