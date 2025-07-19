/* eslint-disable react/prop-types */
import "./Layout.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import LoginModal from '../components/LoginModal';
import { useState, useEffect } from "react";


const Layout = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onLoginClick={() => setShowModal(true)} />
      <main className="flex-grow-1 ">{children}</main>
      <Footer />
      <LoginModal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Layout;