// src/context/AuthContext.js
import React, { createContext, useState,useEffect } from "react";
import { login, register, fetchUserData } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const oldToken = localStorage.getItem("authToken");
    if (oldToken) {
      fetchUserData(oldToken)
        .then((userData) => {
          let name = userData.name;
          setUser({ name, oldToken });
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      console.log("Login", email, password);
      const userData = await login(email, password);
      let name = userData.name;
      let token = userData.token;
      setUser({ name, token });
      setIsLoggedIn(true);
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error during login:", error.message);
      throw new Error("Failed to login");
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      // After registration, you might want to log the user in automatically.
      // Here, we are just setting the user data for demonstration purposes.
      let name = userData.name;
      let token = "YOUR_NEW_AUTH_TOKEN"; // Replace with the actual new token received after registration.
      setUser({ name, token });
      setIsLoggedIn(true);
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw new Error("Failed to register");
    }
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
