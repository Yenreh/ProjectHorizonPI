import React from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/use-auth-store";
import LoginModal from "../components/LoginModal";

/**
 * ProtectedRoute: Solo renderiza el children si el usuario está logueado.
 * Si no, muestra el modal y redirige a inicio al cerrarlo.
 */
export default function ProtectedRoute({ children }) {
  const { userLooged } = useAuthStore();
  const navigate = useNavigate();

  if (!userLooged) {
    return <LoginModal visible={true} onClose={() => navigate("/")} type={"not-logged"} />;
  }
  return children;
}
