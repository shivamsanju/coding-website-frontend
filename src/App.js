import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import PageNotFound from './pages/PageNotFound';
import React from 'react';
import Cookies from 'universal-cookie';
import Notes from './pages/Notes';
import Link from './pages/Links';

function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const token2 = localStorage.getItem('token');
  console.log('Token: ', token);
  console.log('Token2: ', token2);
  const [isLoggedIn, setLoggedIn] = useState(token);

  const HomeWrapper = ({ isLoggedIn }) => {
    return isLoggedIn ? <Homepage /> : <Login login={login} />;
  };

  const NotesWrapper = ({ isLoggedIn }) => {
    return isLoggedIn ? <Notes /> : <Login login={login} />;
  };

  const LinkWrapper = ({ isLoggedIn }) => {
    return isLoggedIn ? <Link /> : <Login login={login} />;
  };

  const login = (token) => {
    cookies.set('token', token, { path: '/' });
    setLoggedIn(token);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeWrapper isLoggedIn={isLoggedIn} />} />
        <Route
          path='/notes'
          element={<NotesWrapper isLoggedIn={isLoggedIn} />}
        />
        <Route
          path='/links'
          element={<LinkWrapper isLoggedIn={isLoggedIn} />}
        />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
