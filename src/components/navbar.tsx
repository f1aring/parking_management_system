import { Layout } from 'antd';
import React from 'react';
import '../App.css';

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header className="navbar">
      <div className="navbar-title">Parking Management System</div>
    </Header>
  );
};

export default Navbar;
