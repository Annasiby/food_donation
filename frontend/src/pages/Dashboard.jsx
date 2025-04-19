// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     // Assuming user info is stored in localStorage after login
//     const userData = JSON.parse(localStorage.getItem("user"));

//     if (userData && userData.name) {
//       setUserName(userData.name);
//     } else {
//       // If user not found, redirect to login
//       navigate("/login");
//     }
//   }, [navigate]);

//   const goToDonation = () => navigate("/donation");
//   const goToRequests = () => navigate("/requests");

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
//           <p>12</p>
//         </div>
//         <div className="stat-card">
//           <h3>Requests</h3>
//           <p>5</p>
//         </div>
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
  const [userName, setUserName] = useState("");
  const [latestDonation, setLatestDonation] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const donation = JSON.parse(localStorage.getItem("latestDonation"));
    
    if (userData && userData.name) {
      setUserName(userData.name);
    } else {
      navigate("/login");
    }
    
    if (donation) {
      setLatestDonation(donation);
    }
  }, [navigate]);

  const goToDonation = () => navigate("/donation");
  const goToRequests = () => navigate("/requests");

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
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Requests</h3>
          <p>5</p>
        </div>
      </div>

      {latestDonation && (
        <div className="latest-donation">
          <h3>Your Latest Donation</h3>
          <p>{latestDonation.foodItem} ({latestDonation.quantity})</p>
          {latestDonation.location && <p>Location: {latestDonation.location}</p>}
        </div>
      )}
    </div>
  );
};

export default Dashboard;