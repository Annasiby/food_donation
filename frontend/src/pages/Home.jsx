import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaPhone, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Swiper for Our Aim & About Us */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="home-swiper"
      >
        <SwiperSlide>
          <div className="home-slide">
            <div className="home-text">
              <h2>Our Aim</h2>
              <p>
                We strive to reduce food waste by enabling food donations from
                restaurants and hotels to charitable trusts.
              </p>
            </div>
            <img src="/images/f3.jpg" alt="Our Aim" className="home-image" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="home-slide">
            <div className="home-text">
              <h2>About Us</h2>
              <p>
                We connect donors and charitable organizations, ensuring excess
                food reaches those in need, promoting sustainability.
              </p>
            </div>
            <img src="/images/f1.jpg" alt="About Us" className="home-image" />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Contact Information Tab BELOW Swiper */}
      <div className="contact-tab">
        <h2>Contact Us</h2>
        <div className="contact-details">
          <p>
            <FaPhone className="contact-icon" /> +91 98765 43210
          </p>
          <p>
            <FaEnvelope className="contact-icon" /> contact@fooddonate.com
          </p>
        </div>
        <div className="social-icons">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
