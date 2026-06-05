import {
  Navigate
} from "react-router-dom";

function PublicRoute({ children }) {

  const token = localStorage.getItem("token");

  // If already logged in
  if (token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PublicRoute;