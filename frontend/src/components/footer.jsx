import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Food Donation Platform. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
