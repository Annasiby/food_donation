import React, { useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="contact-container">
      <h2>Get in Touch</h2>

      {/* Tabs Navigation */}
      <div className="contact-tabs">
        <button className={activeTab === "contact" ? "active" : ""} onClick={() => setActiveTab("contact")}>Contact Us</button>
        <button className={activeTab === "feedback" ? "active" : ""} onClick={() => setActiveTab("feedback")}>Feedback</button>
        <button className={activeTab === "map" ? "active" : ""} onClick={() => setActiveTab("map")}>Locate Us</button>
      </div>

      {/* Contact Info Tab */}
      {activeTab === "contact" && (
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📧 Email: contact@fooddonate.com</p>
          <div className="social-icons">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="social-icon" />
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="social-icon" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="social-icon" />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="social-icon" />
    </a>
</div>
   
</div>

      )}

      {/* Feedback Form Tab */}
      {activeTab === "feedback" && (
        <div className="feedback-form">
          <h3>Send us your Feedback</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Locate Us Tab */}
      {activeTab === "map" && (
        <div className="map-container">
         
      <iframe 
        src="https://www.google.com/maps/d/u/0/embed?mid=1y8NVYr1WJJyzYYxeYkUH0XswK8l8Dgg&ehbc=2E312F&noprof=1"
        width="90%" 
        height="500"
        style={{ border: "0", borderRadius: "10px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
        </div>
      )}
    </div>
  );
};

export default Contact;
