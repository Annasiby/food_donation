import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Donation from './pages/donation';
import Requests from './pages/Requests';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';  

const App = () => {
    console.log("✅ App Component Loaded!");  // ✅ Debugging Log
    return (
        <>
            <Navbar />
            <div className="container">
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/donate" element={<Donation />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
