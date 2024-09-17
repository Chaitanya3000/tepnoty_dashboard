import React, { useState } from "react";
import "./Dashboard_nav.css";
import { Link, Outlet } from 'react-router-dom';
import Logo from "../assets/Logo.png";

function Dashboard_nav() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="profile">
          <i className="fa-solid fa-user"></i>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        {/* Sidebar */}
        <nav className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <i className="fas fa-times"></i> /* X icon for close */
            ) : (
              <i className="fas fa-bars"></i> /* Hamburger icon for open */
            )}
          </button>
          <ul>
            <li><Link className="link_navigation" to="User_data_display">User Data</Link></li>
            <li><Link className="link_navigation" to="post">Posts</Link></li>
            <li>Rating</li>
          </ul>
        </nav>

        {/* Center Content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard_nav;
