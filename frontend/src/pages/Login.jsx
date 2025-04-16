// /*import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/login", { email, password });
//       alert(res.data.message);
//     } catch (err) {
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;*/
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include'
//       });

//       const data = await response.json();
      
//       if (!response.ok) throw new Error(data.error || 'Login failed');
      
//       // Store user data and redirect
//       localStorage.setItem('user', JSON.stringify(data.user));
//       navigate('/dashboard');
      
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="right-pane">
//           <h2 className="login-title">Login</h2>
//           {error && <div className="error-message">{error}</div>}
          
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="submit" className="login-button">
//               Login
//             </button>
//           </form>

//           <p className="signup-text">
//             Don't have an account?{' '}
//             <span onClick={() => navigate('/register')} className="link">
//               Sign Up
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// File: src/pages/Login.jsx
// File: src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Importing the useAuth hook
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();  // Access the login function from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Call the login function from AuthContext to store user and token
      login(data.user, data.token);

      // Navigate to dashboard after login
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);  // Display error message if login fails
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="right-pane">
          <h2 className="login-title">Login</h2>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/register')} 
              className="link"
              style={{ cursor: 'pointer' }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
