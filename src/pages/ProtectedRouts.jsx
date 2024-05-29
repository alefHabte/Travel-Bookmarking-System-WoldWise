/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRouts({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRouts;
