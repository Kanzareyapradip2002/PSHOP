import React, { useContext, useEffect, useState } from 'react';
import loginicon from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../Context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const [loginUser,setLoginUser] = useState()
  const [users, setUsers] = useState([]);
  
  
  // Fetch all users from the API
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(SummaryApi.AllUser.url, {
        method: SummaryApi.AllUser.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setUsers(dataResponse.data); // Store all users in state
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the user exists
    const foundUser = users.find(user => user.email === data.email);

    setLoginUser(foundUser)

    console.log(foundUser)
    
    if (!foundUser) {
      toast.error("User with this email does not exist.");
      return;
    }
     localStorage.setItem("loginUserEmail",foundUser.email)
     localStorage.setItem("loginUsername",foundUser.name)
     localStorage.setItem("loginUserpassword",foundUser.password)
    // If user is found and password is correct, log the user in
    const dataResponse = await fetch(SummaryApi.SignIn.url, {
      method: SummaryApi.SignIn.method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.error) {
      toast.error(dataApi.message);
    } else if (dataApi.message) {
      toast.success(dataApi.message);
      navigate("/"); // Redirect to the home page
      fetchUserDetails(); // Fetch user details for session management
    }
  };

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full py-5 max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginicon} alt='Logo Icos' className='rounded-full' />
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type='email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder='Enter Email Id'
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter Password'
                  className='w-full h-full outline-none bg-transparent'
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <Link to='/forgot-password' className='block w-fit ml-auto text-sm hover:underline hover:text-red-600'>
                Forgot Password?
              </Link>
            </div>
            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 hover:bg-red-700'>
              Login
            </button>
          </form>
          <p className='my-5'>Don't Have Account? <Link to={"/Email-Otp"} className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
