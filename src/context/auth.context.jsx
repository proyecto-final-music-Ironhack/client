import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";

export const TOKEN_NAME = "authToken";

export const AuthContext = createContext();

export const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    authenticate();
  }, [hasChanged]);

  const storeToken = (token) => {
    localStorage.setItem(TOKEN_NAME, token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_NAME);
  };

  const logout = () => {
    setLoading(false);
    setUser();
    removeToken();
  };

  const getUser = () => {
    userService.getUser().then(({ data }) => {
      setUser(data);
    });
  };

  const authenticate = async () => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      logout();
    }
    setLoading(true);
    return authService
      .verify(token)
      .then(() => {
        setLoading(false);
        getUser();
      })
      .catch((err) => {
        logout();
        setError("You are not authenticated!");
      });
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        hasChanged,
        setUser,
        storeToken,
        authenticate,
        logout,
        removeToken,
        setHasChanged,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
