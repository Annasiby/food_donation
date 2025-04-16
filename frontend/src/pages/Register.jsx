// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Register.css"; // Ensure this file exists

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }
    
//     setError(""); // Clear error if passwords match
//     console.log("Name:", name);
//     console.log("Email:", email);
//     console.log("Password:", password);
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         {/* Left Pane - Image */}
       

//         {/* Right Pane - Form */}
//         <div className="signup-form">
//           <h2 className="signup-title">Sign Up</h2>
          
//           <form onSubmit={handleSubmit}>
//             {/* Name Input */}
//             <div className="input-group">
//               <label>Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Email Input */}
//             <div className="input-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password Input */}
//             <div className="input-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Confirm Password Input */}
//             <div className="input-group">
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 placeholder="Re-enter your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Error Message */}
//             {error && <p className="error-message">{error}</p>}

//             {/* Submit Button */}
//             <a href="/dashboard">
//   <button type="button" className="signup-button">Register</button>
// </a>


//             {/* Redirect to Login */}
//             <p className="login-text">
//               Already have an account? <Link to="/login">Login</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("✅ Registration success:", data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration error:", err.message);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-form">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button 
              type="submit" 
              className="signup-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
