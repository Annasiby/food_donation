
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';  // Importing the useAuth hook
// // import './Login.css';

// // // const Login = () => {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [error, setError] = useState('');
// // //   const { login } = useAuth();  // Access the login function from AuthContext
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError(''); // Clear previous errors
    
// // //     try {
// // //       const response = await fetch('http://localhost:5000/api/login', {
// // //         method: 'POST',
// // //         headers: { 
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ 
// // //           email: email.trim(),  // Trim whitespace
// // //           password: password    // Don't trim passwords
// // //         }),
// // //       });
  
// // //       const data = await response.json();
// // //       console.log("Login response:", data);  // Debug logging
  
// // //       if (!response.ok) {
// // //         throw new Error(data.error || 'Login failed');
// // //       }
  
// // //       // Verify the response structure
// // //       if (!data.access_token || !data.user) {
// // //         throw new Error('Invalid response from server');
// // //       }
  
// // //       login(data.user, data.access_token);
// // //       navigate('/dashboard');
// // //     } catch (err) {
// // //       console.error("Login error:", err);
// // //       setError(err.message || 'Login failed. Please try again.');
// // //     }
// // //   };
// // //   return (
// // //     <div className="login-container">
// // //       <div className="login-box">
// // //         <div className="right-pane">
// // //           <h2 className="login-title">Login</h2>
// // //           {error && <div className="error-message">{error}</div>}
          
// // //           <form onSubmit={handleSubmit}>
// // //             <div className="input-group">
// // //               <label>Email</label>
// // //               <input
// // //                 type="email"
// // //                 value={email}
// // //                 onChange={(e) => setEmail(e.target.value)}
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="input-group">
// // //               <label>Password</label>
// // //               <input
// // //                 type="password"
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //                 required
// // //               />
// // //             </div>

// // //             <button type="submit" className="login-button">
// // //               Login
// // //             </button>
// // //           </form>

// // //           <p className="signup-text">
// // //             Don't have an account?{' '}
// // //             <span 
// // //               onClick={() => navigate('/register')} 
// // //               className="link"
// // //               style={{ cursor: 'pointer' }}
// // //             >
// // //               Sign Up
// // //             </span>
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;
// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const { login } = useAuth();  // Get login function from AuthContext
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(''); // Clear previous errors
    
// //     try {
// //       // Use the login function from AuthContext
// //       const result = await login(email.trim(), password);
      
// //       if (result.success) {
// //         navigate('/dashboard'); // Redirect on success
// //       } else {
// //         setError(result.error || 'Login failed');
// //       }
// //     } catch (err) {
// //       console.error("Login error:", err);
// //       setError(err.message || 'Login failed. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-box">
// //         <div className="right-pane">
// //           <h2 className="login-title">Login</h2>
// //           {error && <div className="error-message">{error}</div>}
          
// //           <form onSubmit={handleSubmit}>
// //             <div className="input-group">
// //               <label>Email</label>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div className="input-group">
// //               <label>Password</label>
// //               <input
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <button type="submit" className="login-button">
// //               Login
// //             </button>
// //           </form>

// //           <p className="signup-text">
// //             Don't have an account?{' '}
// //             <span 
// //               onClick={() => navigate('/register')} 
// //               className="link"
// //               style={{ cursor: 'pointer' }}
// //             >
// //               Sign Up
// //             </span>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const result = await login(email, password);
      
//       if (result.success) {
//         navigate('/dashboard');
//       } else {
//         setError(result.error || 'Login failed');
//       }
//     } catch (err) {
//       setError(err.message || 'Login failed. Please try again.');
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
//             <span 
//               onClick={() => navigate('/register')} 
//               className="link"
//               style={{ cursor: 'pointer' }}
//             >
//               Sign Up
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
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