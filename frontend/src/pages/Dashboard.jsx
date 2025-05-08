
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState('');
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user'));
//     const token = localStorage.getItem('token');

//     if (!userData || !userData.name || !token) {
//       setError('Please log in to access the dashboard');
//       setIsAuthenticated(false);
//       navigate('/login');
//       return;
//     }

//     setIsAuthenticated(true);
//     setUserName(userData.name);

//     const fetchDonations = async () => {
//       try {
//         const response = await fetch('/api/donations', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Failed to fetch donations');
//         }

//         const data = await response.json();
//         setDonations(data);
//       } catch (err) {
//         console.error('Fetch donations error:', err);
//         setError(err.message || 'Failed to load donations. Please check your connection or try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, [navigate]);

//   const goToDonation = () => navigate('/donation');
//   const goToRequests = () => navigate('/requests');

//   const handleDelete = async (donationId) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('Please log in to delete donations');
//       navigate('/login');
//       return;
//     }

//     if (window.confirm('Are you sure you want to delete this donation?')) {
//       try {
//         const response = await fetch(`/api/donations/${donationId}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Failed to delete donation');
//         }

//         setDonations(donations.filter((donation) => donation.id !== donationId));
//         setError(''); // Clear any previous errors on success
//       } catch (err) {
//         console.error('Delete donation error:', err);
//         if (err.message.includes('Failed to fetch')) {
//           setError('Unable to delete donation due to a network issue. Please check your server or try again later.');
//         } else {
//           setError(err.message || 'Failed to delete donation. Please try again later.');
//         }
//       }
//     }
//   };

//   const handleEdit = (donationId) => {
//     navigate(`/edit-donation/${donationId}`);
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="dashboard-container">
//         <h2>Please Log In</h2>
//         <p>You need to be logged in to access the dashboard.</p>
//         <button onClick={() => navigate('/login')}>Go to Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, <strong>{userName}</strong>!</h2>
//       <p>Here you can track your recent activity, donations, and requests.</p>

//       <div className="dashboard-buttons">
//         <button onClick={goToDonation}>Donate</button>
//         <button onClick={goToRequests}>Request</button>
//       </div>

//       <div className="dashboard-stats">
//         <div className="stat-card">
//           <h3>Total Donations</h3>
//           <p>{donations.length}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Requests</h3>
//           <p>5</p> {/* Update with actual requests data if available */}
//         </div>
//       </div>

//       <div className="donations-table">
//         <h3>Your Donations</h3>
//         {error && <div className="error-message">{error}</div>}
//         {loading ? (
//           <p>Loading donations...</p>
//         ) : donations.length === 0 ? (
//           <p>No donations found. Create one now!</p>
//         ) : (
//           <table className="donation-table">
//             <thead>
//               <tr>
//                 <th>Food Item</th>
//                 <th>Quantity</th>
//                 <th>Location</th>
//                 <th>Phone</th>
//                 <th>Expiry Date</th>
//                 <th>Description</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {donations.map((donation) => (
//                 <tr key={donation.id}>
//                   <td>{donation.food_item}</td>
//                   <td>{donation.quantity}</td>
//                   <td>{donation.location}</td>
//                   <td>{donation.phone}</td>
//                   <td>{donation.expiry_date || 'N/A'}</td>
//                   <td>{donation.description || 'N/A'}</td>
//                   <td>{donation.status}</td>
//                   <td>
//                     <button
//                       className="edit-button"
//                       onClick={() => handleEdit(donation.id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDelete(donation.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!userData || !userData.name || !token) {
      setError('Please log in to access the dashboard');
      setIsAuthenticated(false);
      navigate('/login');
      return;
    }

    setIsAuthenticated(true);
    setUserName(userData.name);

    const fetchData = async () => {
      try {
        // Fetch donations
        const donationResponse = await fetch('/api/donations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!donationResponse.ok) {
          const errorData = await donationResponse.json();
          throw new Error(errorData.error || 'Failed to fetch donations');
        }
        const donationData = await donationResponse.json();
        setDonations(donationData);

        // Fetch requests for my donations
        const requestResponse = await fetch('/api/requests/my-donations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!requestResponse.ok) {
          const errorData = await requestResponse.json();
          throw new Error(errorData.error || 'Failed to fetch requests');
        }
        const requestData = await requestResponse.json();
        setRequests(requestData);
      } catch (err) {
        console.error('Fetch data error:', err);
        setError(err.message || 'Failed to load data. Please check your connection or try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const goToDonation = () => navigate('/donation');
  const goToRequests = () => navigate('/requests');

  const handleDelete = async (donationId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to delete donations');
      navigate('/login');
      return;
    }

    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        const response = await fetch(`/api/donations/${donationId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete donation');
        }
        setDonations(donations.filter((donation) => donation.id !== donationId));
        setRequests(requests.filter((req) => req.donation_id !== donationId));
        setError('');
      } catch (err) {
        console.error('Delete donation error:', err);
        setError(err.message || 'Failed to delete donation. Please try again later.');
      }
    }
  };

  const handleEdit = (donationId) => {
    navigate(`/edit-donation/${donationId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="dashboard-container">
        <h2>Please Log In</h2>
        <p>You need to be logged in to access the dashboard.</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome, <strong>{userName}</strong>!</h2>
      <p>Here you can track your recent activity, donations, and requests.</p>

      <div className="dashboard-buttons">
        <button onClick={goToDonation}>Donate</button>
        <button onClick={goToRequests}>Request</button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Donations</h3>
          <p>{donations.length}</p>
        </div>
        <div className="stat-card">
          <h3>Requests Received</h3>
          <p>{requests.length}</p>
        </div>
      </div>

      <div className="donations-table">
        <h3>Your Donations</h3>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <p>Loading donations...</p>
        ) : donations.length === 0 ? (
          <p>No donations found. Create one now!</p>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.food_item}</td>
                  <td>{donation.quantity}</td>
                  <td>{donation.location}</td>
                  <td>{donation.phone}</td>
                  <td>{donation.expiry_date || 'N/A'}</td>
                  <td>{donation.description || 'N/A'}</td>
                  <td>{donation.status}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(donation.id)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(donation.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="requests-table">
        <h3>Requests for Your Donations</h3>
        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length === 0 ? (
          <p>No requests received for your donations.</p>
        ) : (
          <table className="donation-table">
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Requester Name</th>
                <th>Requester Phone</th>
                <th>Request Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.request_id}>
                  <td>{req.food_item}</td>
                  <td>{req.quantity}</td>
                  <td>{req.location}</td>
                  <td>{req.requester_name}</td>
                  <td>{req.requester_phone}</td>
                  <td>{new Date(req.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;