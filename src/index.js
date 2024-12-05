import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login';
import Products from './components/products';
import Register from './components/register';
import Cart from './components/cart';
import { AuthProvider } from './contexts/userContext';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
      <Router>
        <Routes>       
          <Route path="/" element={<Products />}  />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
