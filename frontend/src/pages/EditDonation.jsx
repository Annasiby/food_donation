import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDonation.css'; // Create this CSS file

const EditDonation = () => {
  const { id } = useParams(); // Get donation ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food_item: '',
    quantity: '',
    location: '',
    phone: '',
    expiry_date: '',
    description: '',
    status: 'available',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to edit donations');
      navigate('/login');
      return;
    }

    // Fetch donation data
    const fetchDonation = async () => {
      try {
        const response = await fetch(`/api/donations/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch donation');
        }
        const data = await response.json();
        setFormData({
          food_item: data.food_item,
          quantity: data.quantity,
          location: data.location,
          phone: data.phone,
          expiry_date: data.expiry_date ? data.expiry_date.split('T')[0] : '',
          description: data.description || '',
          status: data.status,
        });
        setLoading(false);
      } catch (err) {
        console.error('Fetch donation error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to edit donations');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`/api/donations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update donation');
      }
      navigate('/dashboard'); // Redirect to dashboard after success
    } catch (err) {
      console.error('Update donation error:', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-donation-container">
      <h2>Edit Donation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Food Item</label>
          <input
            type="text"
            name="food_item"
            value={formData.food_item}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
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
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date (optional)</label>
          <input
            type="date"
            name="expiry_date"
            value={formData.expiry_date}
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
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="claimed">Claimed</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate('/dashboard')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditDonation;