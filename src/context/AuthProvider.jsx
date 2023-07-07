
import React, {useContext, useState, useEffect } from "react";

export const AuthContext = React.createContext({
    authToken: null,
    setToken: () => {},
    removeToken: () => {},
    isAuthenticated: () => false,
    loading: true
  
});

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuthToken = sessionStorage.getItem("token");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    } 
    setLoading(false);
  }, []);

  const setToken = (token) => {
    setAuthToken(token);
    sessionStorage.setItem("token", token);
  };

  const removeToken = () => {
    setAuthToken(null);
    sessionStorage.removeItem("token");
  };


  const isAuthenticated = () => {
    return authToken !== null;
  };

  return (
    <AuthContext.Provider
      value={{  authToken, setToken, removeToken, isAuthenticated, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};