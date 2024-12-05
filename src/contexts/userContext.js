import React, { createContext, useState, useContext } from 'react';


const userAuthContext = createContext();

export const useAuth = () => useContext(userAuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')) || null);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authenticatedUser');
  };

  return (
    <userAuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </userAuthContext.Provider>
  );
};