import React, { useState, useEffect } from "react";
import axios from "axios";

const Donations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Available Food Donations</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id}>{donation.food_name} - {donation.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Donations;
