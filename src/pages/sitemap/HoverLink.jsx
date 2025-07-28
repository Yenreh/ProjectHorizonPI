import React from "react";
import { Link } from "react-router-dom";
import "./HoverLink.css"; // Asegúrate de crear este archivo también

const HoverLink = ({ to, children }) => {
  return (
    <Link className="hover-link d-flex align-items-center link-clean" to={to}>
      <i className="bi bi-arrow-right me-2 hover-icon"></i>
      {children}
    </Link>
  );
};

export default HoverLink;