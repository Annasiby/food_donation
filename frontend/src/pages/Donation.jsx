
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './Donation.css';
// import { refreshToken } from './api.js';

// const Donation = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     foodItem: '',
//     quantity: '',
//     location: '',
//     phone: '',
//     expiryDate: '',
//     description: '',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (user?.phone) {
//       setFormData((prev) => ({ ...prev, phone: user.phone }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const errors = [];

//     if (!formData.foodItem?.trim()) {
//       errors.push('Food item is required');
//     }

//     const quantity = Number(formData.quantity);
//     if (isNaN(quantity)) {
//       errors.push('Quantity must be a number');
//     } else if (quantity <= 0) {
//       errors.push('Quantity must be positive');
//     }

//     if (!formData.location?.trim()) {
//       errors.push('Location is required');
//     }

//     if (!formData.phone?.trim()) {
//       errors.push('Phone is required');
//     } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.trim())) {
//       errors.push('Phone must be 10-15 digits');
//     }

//     if (formData.expiryDate) {
//       try {
//         const date = new Date(formData.expiryDate);
//         if (isNaN(date.getTime())) {
//           errors.push('Invalid expiry date');
//         }
//       } catch {
//         errors.push('Invalid expiry date format');
//       }
//     }

//     if (errors.length > 0) {
//       setError(errors.join(', '));
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     let token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     // Try refreshing token if it's expired
//     try {
//       token = await refreshToken();
//       localStorage.setItem('token', token);
//     } catch (err) {
//       console.error('Token refresh failed:', err);
//       navigate('/login');
//       return;
//     }

//     const donationData = {
//       food_item: formData.foodItem.trim(),
//       quantity: Number(formData.quantity),
//       location: formData.location.trim(),
//       phone: formData.phone.trim(),
//       expiry_date: formData.expiryDate || null,
//       description: formData.description.trim() || null,
//     };

//     console.log('Submitting donation:', donationData);

//     try {
//       const response = await fetch('http://localhost:5000/api/donations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(donationData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         const errorMsg = data.message || data.error || `Donation failed (${response.status})`;
//         throw new Error(errorMsg);
//       }

//       setFormData({
//         foodItem: '',
//         quantity: '',
//         location: '',
//         phone: user?.phone || '',
//         expiryDate: '',
//         description: '',
//       });

//       navigate('/dashboard', {
//         state: {
//           success: 'Donation created successfully!',
//           donation: data.donation,
//         },
//       });
//     } catch (err) {
//       console.error('Donation submission error:', err);
//       setError(err.message || 'Failed to create donation. Please check your inputs.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="donation-form-container">
//         <h2>Please login...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="donation-form-container">
//       <h2>Create Donation</h2>
//       {error && <div className="error-message">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Food Item *</label>
//           <input
//             type="text"
//             name="foodItem"
//             value={formData.foodItem}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Quantity *</label>
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             required
//             min="1"
//           />
//         </div>

//         <div className="form-group">
//           <label>Location *</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Phone *</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             pattern="\+?[0-9]{10,15}"
//             title="Phone must be 10-15 digits"
//           />
//         </div>

//         <div className="form-group">
//           <label>Expiry Date</label>
//           <input
//             type="date"
//             name="expiryDate"
//             value={formData.expiryDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="4"
//           />
//         </div>

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit Donation'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Donation;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Donation.css';
import { refreshToken } from './api';

const Donation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Initialize formData with all required keys to prevent undefined errors
  const [formData, setFormData] = useState({
    food_item: '',
    quantity: '',
    location: '',
    phone: '',
    expiry_date: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Update phone field when user changes
  useEffect(() => {
    if (user?.phone) {
      setFormData((prev) => ({
        ...prev,
        phone: user.phone || '', // Ensure phone is a string
      }));
    }
  }, [user]);

  // Handle input changes with logging for debugging
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`handleChange: name=${name}, value=${value}`); // Debug log
    if (!formData.hasOwnProperty(name)) {
      console.error(`Invalid form field: ${name}`);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const errors = [];

    if (!formData.food_item?.trim()) {
      errors.push('Food item is required');
    }

    const quantity = Number(formData.quantity);
    if (isNaN(quantity)) {
      errors.push('Quantity must be a number');
    } else if (quantity <= 0) {
      errors.push('Quantity must be positive');
    }

    if (!formData.location?.trim()) {
      errors.push('Location is required');
    }

    if (!formData.phone?.trim()) {
      errors.push('Phone is required');
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.trim())) {
      errors.push('Phone must be 10-15 digits');
    }

    if (formData.expiry_date) {
      try {
        const date = new Date(formData.expiry_date);
        if (isNaN(date.getTime())) {
          errors.push('Invalid expiry date');
        }
      } catch {
        errors.push('Invalid expiry date format');
      }
    }

    if (errors.length > 0) {
      setError(errors.join(', '));
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    let token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to create a donation');
      setIsSubmitting(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Verify token error response:', errorData);
        try {
          token = await refreshToken();
          localStorage.setItem('token', token);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          setError('Session expired. Please log in again.');
          setIsSubmitting(false);
          navigate('/login');
          return;
        }
      }
    } catch (err) {
      console.error('Token verification error:', err);
      setError('Failed to verify session. Please log in again.');
      setIsSubmitting(false);
      navigate('/login');
      return;
    }

    const donationData = {
      food_item: formData.food_item.trim(),
      quantity: Number(formData.quantity),
      location: formData.location.trim(),
      phone: formData.phone.trim(),
      expiry_date: formData.expiry_date || null,
      description: formData.description.trim() || null,
    };

    try {
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.message || data.error || `Donation failed (${response.status})`;
        throw new Error(errorMsg);
      }

      setFormData({
        food_item: '',
        quantity: '',
        location: '',
        phone: user?.phone || '',
        expiry_date: '',
        description: '',
      });

      navigate('/dashboard', {
        state: {
          success: 'Donation created successfully!',
          donation: data.donation,
        },
      });
    } catch (err) {
      console.error('Donation submission error:', err);
      setError(err.message || 'Failed to create donation. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent rendering form if user or formData is invalid
  if (!user) {
    return (
      <div className="donation-form-container">
        <h2>Please log in...</h2>
      </div>
    );
  }

  return (
    <div className="donation-form-container">
      <h2>Create Donation</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Food Item *</label>
          <input
            type="text"
            name="food_item"
            value={formData.food_item || ''} // Fallback to empty string
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity || ''} // Fallback to empty string
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location || ''} // Fallback to empty string
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ''} // Fallback to empty string
            onChange={handleChange}
            required
            pattern="\+?[0-9]{10,15}"
            title="Phone must be 10-15 digits"
          />
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiry_date"
            value={formData.expiry_date || ''} // Fallback to empty string
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description || ''} // Fallback to empty string
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Donation'}
        </button>
      </form>
    </div>
  );
};

export default Donation;