// File: src/pages/Donation.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Donation.css';

const Donation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodItem: '',
    quantity: '',
    location: '',
    expiryDate: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Donation failed');
      }

      navigate('/dashboard', { 
        state: { success: 'Donation created successfully!' } 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="donation-form-container">
      <h2>Create New Donation</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Food Item*</label>
    <input
      type="text"
      name="foodItem"
      value={formData.foodItem}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Quantity (e.g., 5 packs)*</label>
    <input
      type="text"
      name="quantity"
      value={formData.quantity}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Current Location*</label>
    <input
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Phone Number*</label>
    <input
      type="tel"
      name="phoneNumber"
      value={formData.phoneNumber || ''}
      onChange={handleChange}
      required
      pattern="[0-9]{10}"
      title="Enter a valid 10-digit phone number"
    />
  </div>

  <div className="form-group">
    <label>Expiry Date</label>
    <input
      type="date"
      name="expiryDate"
      value={formData.expiryDate}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Description (optional)</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
    />
  </div>

  <button 
    type="submit" 
    className="submit-button"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Submitting...' : 'Create Donation'}
  </button>
</form>

    </div>
  );
};

export default Donation;