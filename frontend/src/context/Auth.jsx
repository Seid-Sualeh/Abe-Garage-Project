//import necessary modules from react
import React, { useState, useEffect, useContext } from "react";
//import custom auth functions
import { getAuth } from "../utils/auth";
//create AuthContext
const AuthContext = React.createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
//create AuthProvider component to wrap around the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const value = {
    isLogged,
    setIsLogged,
    employee,
    isAdmin,
    setIsAdmin,
  };

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      // console.log(response);
      if (response.employee_token) {
        setIsLogged(true);
        // 3 is the employee_role for admin
        if (response.employee_role === 3) {
          setIsAdmin(true);
        }
        setEmployee(response);
      }
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
