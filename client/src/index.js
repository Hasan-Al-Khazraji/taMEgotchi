import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/home/App';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Mepet from './pages/mepet/mepet';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-ztbisxdn4j7cyrbs.us.auth0.com"
    clientId="MNMWv1XD0XZjacl9WZebgrznE8Vjx6YH"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mepet" element={<Mepet />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Auth0Provider>
);
