import React from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/use-auth-store";
import NotLoggedModal from "../components/NotLoggedModal";

/**
 * ProtectedRoute: Solo renderiza el children si el usuario está logueado.
 * Si no, muestra el modal y redirige a inicio al cerrarlo.
 */
export default function ProtectedRoute({ children }) {
  const { userLooged } = useAuthStore();
  const navigate = useNavigate();

  if (!userLooged) {
    return <NotLoggedModal isOpen={true} onClose={() => navigate("/")} />;
  }
  return children;
}
