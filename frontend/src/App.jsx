import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Donation from './pages/Donation';
import Requests from './pages/Requests';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';  

const App = () => {
    console.log("✅ App Component Loaded!");  // ✅ Debugging Log

    return (
        <AuthProvider> {/* Keep AuthProvider here */}
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/donation" element={<Donation />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
            <Footer />
        </AuthProvider>
    );
};

export default App;
