// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Named export for context
export const AuthContext = createContext();

// Named export for provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // start true while checking auth

  const API_BASE_URL = "http://localhost:5000/api/v1"; // adjust for backend

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Optionally sync Firebase user with local storage
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register user
  const register = async (username, password) => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("recipehubUser", JSON.stringify(data));
      setUser(data);
    } else {
      throw new Error(data.message || "Registration failed");
    }
    setLoading(false);
  };

  // Login user
  const login = async (username, password) => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("recipehubUser", JSON.stringify(data));
      setUser(data);
    } else {
      throw new Error(data.message || "Login failed");
    }
    setLoading(false);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("recipehubUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, API_BASE_URL }}
    >
      {children}
    </AuthContext.Provider>
  );
};
