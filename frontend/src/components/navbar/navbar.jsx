import React from 'react';
import "./navbar.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  
  const navigate = useNavigate();
  const user = localStorage.getItem("username");

  const handleClick = async (e)=>{
    try {
          const res = await axios.get("http://localhost:8800/u/logout", { withCredentials: true });
          localStorage.removeItem("username");
          localStorage.removeItem('tokenExpiry');
          navigate("/");
    } 
    catch (err) {
      console.log("error",err);
    }
  }

return (
  
<nav className='dark-theme w-screen'>

<ul className='p-4 relative h-20 gap-4 items-center justify-between'>
  <li className='flex gap-8 justify-between items-center rounded-lg'>
    <div>
      <span className="md:flex">POSITFY</span>
    </div>
    <div>
      {console.log(user)}
      <Link className="px-4 py-2 rounded-lg navlink">{user}</Link> 
      <Link className="px-4 py-2 rounded-lg navlink" onClick={handleClick}>Logout</Link>
    </div>
  </li>
</ul>

</nav>
    );
}

export default Navbar;
