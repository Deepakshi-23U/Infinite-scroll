import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Posts from "./pages/posts/posts";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import useLogin from "./hooks/useLogin";
import { Navigate } from "react-router-dom";

function App() {
  const { auth } = useLogin();

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts" element = {auth? <Posts /> : <Navigate to="/"/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;