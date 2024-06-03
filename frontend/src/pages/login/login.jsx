import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  faEyeSlash,
  faEye
  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Login()
{
    const [credentials, setCredentials] = useState({
    username: null,
    password: null,
  });

  const [error, seterror] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/auth/login", credentials, {withCredentials:true});
      localStorage.setItem("username",res.data.username);
      //storing current time+1hr for expiration
      const tokenExpiry = Date.now() + 3600000
      localStorage.setItem('tokenExpiry', tokenExpiry);
      toast.success("login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(res.data.username);
      setTimeout(() => {
        navigate('/posts');
      }, 2000);
    } 
    catch (err) 
    {
      seterror(err.response.data);
      console.log(error);
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
}

  return (
   
    <div className="flex h-screen w-screen bg-indigo-300">
     <ToastContainer />
    <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">   
        
      <form onSubmit = {handleClick}>

        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="username">Username</label>
          <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="username"
           placeholder="Username"
           id="username"
           onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
          <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password"
            id="password"
            onChange={handleChange} />
          <button type="button" className="absolute inset-y-0 right-[640px] top-[20px] pr-2 flex items-center" onClick={toggleShowPassword}> {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} </button>
        </div>

        <div>          
          <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit"/>
        </div>  

      </form>  
      <footer>
        <div className="flex items-center justify-center">
        {error && <h4 className="text-red-700 font-bold text-sm float-left block" href="#">{error}</h4>}
        </div>
        <Link className="text-indigo-700 hover:text-pink-700 text-sm float-left" to="#">Forgot Password?</Link>
        <Link className="text-indigo-700 hover:text-pink-700 text-sm float-right" to="/register">Create Account</Link>
      </footer>   
    </div>
    </div>
  )
};

export default Login;