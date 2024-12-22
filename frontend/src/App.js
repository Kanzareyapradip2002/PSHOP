import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useCallback, useState } from 'react';
import SummaryApi from './common';
import Context from './Context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Stores/userSlice';

function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = useCallback(async () => {
    try {
      if (!SummaryApi.Currentuser) {
        throw new Error('SummaryApi.Currentuser is undefined');
      }

      const dataResponse = await fetch(SummaryApi.AllUser.url, {
        method: SummaryApi.AllUser.method,
        credentials: 'include',
      });

      if (!dataResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await dataResponse.json();

      // Check if the response is successful
      if (!data.success) {
        throw new Error('Failed to fetch user details');
      }

      // Filter the user details based on the email from SummaryApi.Currentuser
      const email = localStorage.getItem("loginUserEmail");
      const username = localStorage.getItem("loginUsername");
      const password = localStorage.getItem("loginUserpassword");

      // Find the user by matching the email, username, and password
      const foundUser = data.data.find(user =>
        user.email === email && user.name === username && user.password === password
      );

      if (foundUser) {
        // Dispatch the user details if a user was found
        dispatch(setUserDetails(foundUser));
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);



  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <ToastContainer />
      <>
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </>
    </Context.Provider>
  );
}

export default App;