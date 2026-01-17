import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${isAdminPage ? 'bg-gray-50' : ''}`}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default Layout;