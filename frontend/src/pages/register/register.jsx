import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  faEyeSlash,
  faEye
  } from "@fortawesome/free-solid-svg-icons"
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function Register()
{
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
    email:null,
    fullname:"",
  });
   
  const [image, setimage] = useState(null);
  const [error,seterror] = useState("");
  const [message, setmessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  async function handleClick(e)
  {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/auth/register", credentials, {withCredentials:true});
      setmessage(res.data);
      toast.success(res.data, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(res.data);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } 
    catch (err) {
      if (err.response && err.response.data) {
        seterror(err.response.data);
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err.response.data);
      } else {
        seterror("An unexpected error occurred. Please try again later.");
        toast.error('An error occurred while signing up', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      }
    }
  }


  return (
    
    <div className="w-screen h-screen bg-indigo-300 flex items-center justify-center">

      <ToastContainer />

      <div className="relative bg-indigo-100 p-8 rounded shadow-md">
        <form onSubmit={handleClick}>
        
        <div className="mb-4 flex justify-between">

        <div className="mr-4">

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">Email</label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">Username</label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center" onClick={toggleShowPassword}>
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>

          <div className="relative">
            <label className="block mb-2 text-indigo-500" htmlFor="password">Confirm Password</label>
            <input
              className="w-sm p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type={showPassword ? "text" : "password"}
              name="cpassword"
              placeholder="Confirm Password"
              id="cpassword"
              onChange={handleChange}
            />
          </div>

        </div>
        
        <div className="ml-4">

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">Fullname</label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">Username</label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">Upload image</label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="file"
              name="my-image"
              id="my-image"
              onChange={(e)=>{setimage(e.target.files[0])}}
            />
          </div>

        </div>

        </div>
          
          <div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
            <label htmlFor="">
              <input type="checkbox" />
              <span className="ml-1 font-extrabold">Terms and condition</span>
            </label>
          </div>

          <div>
            <input
              className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
            />
          </div>
        </form>
        <footer className="flex items-center justify-center">
          {message && <span className="font-bold text-green-700">{message}</span>}
          {error && <span className="font-bold text-red-700">{error}</span>}
        </footer>
      </div>
    </div>
  )
};

export default Register;

