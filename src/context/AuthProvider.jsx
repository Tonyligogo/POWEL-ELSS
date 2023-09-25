
import React, {useContext, useState, useEffect } from "react";

export const AuthContext = React.createContext({
    authToken: null,
    setToken: () => {},
    setUser: () => {},
    removeToken: () => {},
    loading: true,
    authenticated: false,
    currentUser: null
});

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
 
  useEffect(() => {
    const storedAuthToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
      setCurrentUser(storedUser);
      setAuthenticated(true)
    } 
    setLoading(false);
  }, []);

  const setToken = (token) => {
    setAuthToken(token);
    sessionStorage.setItem("token", token);
    setAuthenticated(true)
  };
  const setUser = (user) => {
    setCurrentUser(user)
    sessionStorage.setItem("user", user);
  };

  const removeToken = () => {
    setAuthToken(null);
    sessionStorage.removeItem("token");
    setAuthenticated(false)
  };
  return (
    <AuthContext.Provider
      value={{setToken, setUser, currentUser, authToken, removeToken, authenticated, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};