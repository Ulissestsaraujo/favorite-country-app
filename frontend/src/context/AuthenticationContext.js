import React, { createContext, useState, useEffect } from "react";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const login = (userId) => {
    localStorage.setItem("userId", userId);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <AuthenticationContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
