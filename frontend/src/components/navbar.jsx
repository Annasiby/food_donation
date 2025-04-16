import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* ✅ Navbar */}
            <nav className="navbar">
                {/* ✅ Left side: Menu icon + Logo in one row */}
                <div className="left">
                    <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
                    <h2 className="logo">FD</h2>
                </div>

                {/* ✅ Right-side Links */}
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>

            {/* ✅ Sidebar Menu */}
            <div className={`sidebar ${menuOpen ? "open" : ""}`}>
                <FaTimes className="close-btn" onClick={() => setMenuOpen(false)} />
                <Link to="/donation" onClick={() => setMenuOpen(false)}>Donation</Link>
                <Link to="/requests" onClick={() => setMenuOpen(false)}>Requests</Link>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
        </>
    );
};

export default Navbar;
