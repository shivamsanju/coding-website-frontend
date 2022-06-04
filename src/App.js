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
import PageNotFound from "./pages/PageNotFound";
import React from "react";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isLoggedIn, setLoggedIn] = useState(token);
  console.log("render");

  const LoginWrapper = ({ isLoggedIn }) => {
    return isLoggedIn ? <Homepage /> : <Login login={login}/>;
  };

  const login = (token) => {
    cookies.set("token", token, { path: "/" });
    setLoggedIn(token);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginWrapper isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
