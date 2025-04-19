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
    phone: '',
    expiryDate: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ✅ Optional: Auto-fill phone if available
  useEffect(() => {
    if (user?.phone) {
      setFormData(prev => ({ ...prev, phone: user.phone }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
  
    const donationData = {
      food_item: formData.foodItem.trim(),
      quantity: parseInt(formData.quantity),
      location: formData.location.trim(),
      phone: formData.phone.trim(),
      expiry_date: formData.expiryDate ||  new Date().toISOString(),  // Send null if empty
      description: formData.description.trim() || "No description",
      status: "available",
  donor_id: user.id // If your backend doesn't auto-add this
};
    console.log("Sending donation data:", donationData); // ADD THIS LINE
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        mode: 'cors',  // Explicitly enable CORS mode
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer  ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(donationData)
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 422 && data.errors) {
          const errorMessages = Object.values(data.errors).join(', ');
          throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw new Error(data.error || 'Donation failed');
      }
  
      navigate('/dashboard', { 
        state: { 
          success: 'Donation created successfully!',
          donation: data.donation
        } 
      });
  
    } catch (err) {
      let errorMessage = 'Donation failed';
      
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        errorMessage = 'Network error - please check your connection and try again';
      } else if (err.response?.status === 401) {
        errorMessage = 'Session expired - please login again';
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        errorMessage = err.message || errorMessage;
      }
    
      setError(errorMessage);
    }finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div className="donation-form-container"><h2>Redirecting to login...</h2></div>;
  }

  return (
    <div className="donation-form-container">
      <h2>Create Donation</h2>
      {error && <div className="error">{error}</div>}

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
          <label>Quantity*</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Location*</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
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
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Donate'}
        </button>
      </form>
    </div>
  );
};

export default Donation;
