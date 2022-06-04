import {useState} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import React from "react";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isLoggedIn, setLoggedIn] = useState(token);
  console.log("render");
  const CustomWrapper = ({ isLoggedIn }) => {
    return isLoggedIn ? <Homepage /> : <Navigate to={`/`} />;
  };

  const login = (token) => {
    cookies.set("token", token, { path: "/" });
    setLoggedIn(token);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login login={login}/>} />
        <Route path="questions" element={<CustomWrapper isLoggedIn={isLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
