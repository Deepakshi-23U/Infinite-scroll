import { useEffect, useState } from "react";
import axios from "axios";

const useLogin = () => {
    const [auth,setauth] = useState(false);

    useEffect(() => {
        async function fetchauth() {
          try 
          {
            const res = await axios.get("http://localhost:8800/u/verify", { withCredentials: true });
            setauth(true);
          } 
          catch (err) 
          {
            setauth(false);
            console.log("User not logged in:", err.response.data);
          }
        };
        fetchauth();
      });

      return {auth};
}
  
  export default useLogin;