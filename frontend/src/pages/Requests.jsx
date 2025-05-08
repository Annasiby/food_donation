
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Requests.css';

// const Requests = () => {
//   const navigate = useNavigate();
//   const [availableDonations, setAvailableDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user'));
//     const token = localStorage.getItem('token');

//     if (!userData || !userData.name || !token) {
//       setError('Please log in to view available donations');
//       setIsAuthenticated(false);
//       navigate('/login');
//       return;
//     }

//     setIsAuthenticated(true);

//     const fetchAvailableDonations = async () => {
//       try {
//         const response = await fetch('/api/donations/available', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Failed to fetch available donations');
//         }

//         const data = await response.json();
//         setAvailableDonations(data);
//       } catch (err) {
//         console.error('Fetch donations error:', err);
//         setError(err.message || 'Failed to load available donations. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAvailableDonations();
//   }, [navigate]);

//   if (!isAuthenticated) {
//     return (
//       <div className="requests-container">
//         <h2>Please Log In</h2>
//         <p>You need to be logged in to view available donations.</p>
//         <button onClick={() => navigate('/login')}>Go to Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="requests-container">
//       <h2>Available Donations</h2>
//       <p>Browse donations available for request.</p>

//       {error && <div className="error-message">{error}</div>}
//       {loading ? (
//         <p>Loading available donations...</p>
//       ) : availableDonations.length === 0 ? (
//         <p>No donations available at the moment.</p>
//       ) : (
//         <table className="donation-table">
//           <thead>
//             <tr>
//               <th>Food Item</th>
//               <th>Quantity</th>
//               <th>Location</th>
//               <th>Phone</th>
//               <th>Expiry Date</th>
//               <th>Description</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {availableDonations.map((donation) => (
//               <tr key={donation.id}>
//                 <td>{donation.food_item}</td>
//                 <td>{donation.quantity}</td>
//                 <td>{donation.location}</td>
//                 <td>{donation.phone}</td>
//                 <td>{donation.expiry_date || 'N/A'}</td>
//                 <td>{donation.description || 'N/A'}</td>
//                 <td>{donation.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Requests;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Requests.css';

const Requests = () => {
  const navigate = useNavigate();
  const [availableDonations, setAvailableDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!userData || !userData.name || !token) {
      setError('Please log in to view available donations');
      setIsAuthenticated(false);
      navigate('/login');
      return;
    }

    setIsAuthenticated(true);

    const fetchAvailableDonations = async () => {
      try {
        const response = await fetch('/api/donations/available', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch available donations');
        }

        const data = await response.json();
        setAvailableDonations(data);
        // Set default tab to first location or 'All'
        const locations = [...new Set(data.map(d => d.location))];
        setActiveTab(locations[0] || 'All');
      } catch (err) {
        console.error('Fetch donations error:', err);
        setError(err.message || 'Failed to load available donations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDonations();
  }, [navigate]);
  const handleRequest = async (donationId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to request a donation');
      navigate('/login');
      return;
    }
  
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ donation_id: donationId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create request');
      }
  
      const data = await response.json();
      setAvailableDonations(availableDonations.filter(d => d.id !== donationId));
      setError('');
      alert(data.message); // Show success message
    } catch (err) {
      console.error('Request donation error:', err);
      setError(err.message); // Display the specific error message
    }
  };
  

  // Group donations by location for tabs
  const locations = [...new Set(availableDonations.map(d => d.location))];
  const filteredDonations = activeTab === 'All'
    ? availableDonations
    : availableDonations.filter(d => d.location === activeTab);

  if (!isAuthenticated) {
    return (
      <div className="requests-container">
        <h2>Please Log In</h2>
        <p>You need to be logged in to view available donations.</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="requests-container">
      <h2>Available Donations</h2>
      <p>Browse donations available for request.</p>

      {error && <div className="error-message">{error}</div>}

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        {locations.map(location => (
          <button
            key={location}
            className={`tab-button ${activeTab === location ? 'active' : ''}`}
            onClick={() => setActiveTab(location)}
          >
            {location}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading available donations...</p>
      ) : filteredDonations.length === 0 ? (
        <p>No donations available in this category.</p>
      ) : (
        <table className="donation-table">
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Expiry Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.food_item}</td>
                <td>{donation.quantity}</td>
                <td>{donation.location}</td>
                <td>{donation.phone}</td>
                <td>{donation.expiry_date || 'N/A'}</td>
                <td>{donation.description || 'N/A'}</td>
                <td>{donation.status}</td>
                <td>
                  <button
                    className="request-button"
                    onClick={() => handleRequest(donation.id)}
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Requests;