import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { Spinner } from "@chakra-ui/react";

export const TOKEN_NAME = "authToken";

export const AuthContext = createContext();

export const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      await authenticate();
    };

    authenticateUser();
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
    return userService.getUser().then(({ data }) => {
      setUser(data);
    });
  };

  const authenticate = async () => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      logout();
      return;
    }
    setLoading(true);
    return authService
      .verify(token)
      .then(() => {
        return getUser().then(() => {
          setLoading(false);
        });
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
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
