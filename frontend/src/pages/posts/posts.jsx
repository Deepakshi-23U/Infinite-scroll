import "./posts.css"
import Navbar from "../../components/navbar/navbar";
import Postbody from "../../components/postbody/postbody"
import { useEffect } from "react";

function Posts(){

    function isTokenExpired() {
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        console.log("expiry", tokenExpiry);
        if (!tokenExpiry) {
          return true;
        }
        const currentTime = Date.now();
        return currentTime > tokenExpiry;
      }

    function handleTokenExpiry() {
        if (isTokenExpired()) {
          localStorage.removeItem('username');
          localStorage.removeItem('tokenExpiry');
          document.cookie = 'jwt=; Max-Age=0; path=/'; //remove cookie
          window.location.href = '/'; //reroute to login page
        }
      }

    useEffect(() => {
        // Check token expiry on component mount
        handleTokenExpiry();
    
        // Set up a regular check for token expiration
        const interval = setInterval(() => {
          handleTokenExpiry();
        }, 3600000); // Check after 1hr
        console.log("current", Date.now());
     
        // Clear interval on component unmount
        return () => clearInterval(interval);
      }, []);
    return(
        <div>
        <Navbar />
        {console.log("date",Date.now())}
        <Postbody />
        </div>
    )
}

export default Posts;