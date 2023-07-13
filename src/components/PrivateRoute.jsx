import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, redirectTo = "/login" }) {
  const { user, loading } = useContext(AuthContext);
  console.log("user", user);
  console.log("loading", loading);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
