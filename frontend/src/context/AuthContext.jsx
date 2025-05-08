
// // // // import { createContext, useContext, useState, useEffect } from 'react';

// // // // const AuthContext = createContext();

// // // // export function AuthProvider({ children }) {
// // // //   const [user, setUser] = useState(() => {
// // // //     // Initialize from localStorage if available
// // // //     const savedUser = localStorage.getItem('user');
// // // //     return savedUser ? JSON.parse(savedUser) : null;
// // // //   });

// // // //   const login = (userData, token) => {
// // // //     localStorage.setItem('user', JSON.stringify(userData));
// // // //     localStorage.setItem('token', token);
// // // //     setUser(userData);
// // // //   };

// // // //   const logout = () => {
// // // //     localStorage.removeItem('user');
// // // //     localStorage.removeItem('token');
// // // //     setUser(null);
// // // //   };

// // // //   const value = { 
// // // //     user,
// // // //     login,
// // // //     logout
// // // //   };

// // // //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // // // }

// // // // export function useAuth() {
// // // //   const context = useContext(AuthContext);
// // // //   if (!context) {
// // // //     throw new Error('useAuth must be used within an AuthProvider');
// // // //   }
// // // //   return context;
// // // // }
// // // import { createContext, useContext, useState, useEffect } from 'react';

// // // const AuthContext = createContext();

// // // export function AuthProvider({ children }) {
// // //   const [user, setUser] = useState(() => {
// // //     // Initialize from localStorage if available
// // //     const savedUser = localStorage.getItem('user');
// // //     return savedUser ? JSON.parse(savedUser) : null;
// // //   });

// // //   const [loading, setLoading] = useState(true);

// // //   // Check auth status on initial load
// // //   useEffect(() => {
// // //     const verifyAuth = async () => {
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         if (token) {
// // //           const response = await fetch('http://localhost:5000/api/verify-token', {
// // //             headers: { 'Authorization': `Bearer ${token}` }
// // //           });
// // //           if (!response.ok) throw new Error('Invalid token');
// // //           // Optionally update user data
// // //         }
// // //       } catch (error) {
// // //         logout();
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     verifyAuth();
// // //   }, []);

// // //   const login = async (email, password) => {
// // //     try {
// // //       const response = await fetch('http://localhost:5000/api/login', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ email, password })
// // //       });
  
// // //       const data = await response.json();
      
// // //       if (!response.ok) {
// // //         throw new Error(data.error || 'Login failed');
// // //       }
  
// // //       // Match backend response structure
// // //       localStorage.setItem('user', JSON.stringify(data.user));
// // //       localStorage.setItem('token', data.access_token);  // Changed from data.token to data.access_token
// // //       setUser(data.user);
// // //       return { success: true };
// // //     } catch (error) {
// // //       return { success: false, error: error.message };
// // //     }
// // //   };

// // //   const register = async (userData) => {
// // //     try {
// // //       // Validate required fields
// // //       if (!userData.name || !userData.email || !userData.password) {
// // //         throw new Error('All fields are required');
// // //       }

// // //       if (userData.password !== userData.confirmPassword) {
// // //         throw new Error('Passwords do not match');
// // //       }

// // //       const response = await fetch('/api/register', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(userData)
// // //       });

// // //       const data = await response.json();
      
// // //       if (!response.ok) {
// // //         throw new Error(data.message || 'Registration failed');
// // //       }

// // //       // Auto-login after registration
// // //       localStorage.setItem('user', JSON.stringify(data.user));
// // //       localStorage.setItem('token', data.token);
// // //       setUser(data.user);
// // //       return { success: true };
// // //     } catch (error) {
// // //       return { success: false, error: error.message };
// // //     }
// // //   };

// // //   const logout = () => {
// // //     localStorage.removeItem('user');
// // //     localStorage.removeItem('token');
// // //     setUser(null);
// // //   };

// // //   const value = { 
// // //     user,
// // //     loading,
// // //     login,
// // //     register,
// // //     logout
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={value}>
// // //       {!loading && children}
// // //     </AuthContext.Provider>
// // //   );
// // // }

// // // export function useAuth() {
// // //   const context = useContext(AuthContext);
// // //   if (!context) {
// // //     throw new Error('useAuth must be used within an AuthProvider');
// // //   }
// // //   return context;
// // // }
// // import { createContext, useContext, useState, useEffect } from 'react';

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(() => {
// //     try {
// //       const savedUser = localStorage.getItem('user');
// //       return savedUser ? JSON.parse(savedUser) : null;
// //     } catch (error) {
// //       console.error('Failed to parse user data:', error);
// //       localStorage.removeItem('user');
// //       return null;
// //     }
// //   });

// //   const [loading, setLoading] = useState(true);

// //   // Check auth status on initial load
// //   useEffect(() => {
// //     const verifyAuth = async () => {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await fetch('http://localhost:5000/api/verify-token', {
// //           headers: { 'Authorization': `Bearer ${token}` }
// //         });

// //         if (!response.ok) {
// //           throw new Error('Token verification failed');
// //         }

// //         const data = await response.json();
// //         if (data.user) {
// //           localStorage.setItem('user', JSON.stringify(data.user));
// //           setUser(data.user);
// //         }
// //       } catch (error) {
// //         console.error('Auth verification error:', error);
// //         logout();
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     verifyAuth();
// //   }, []);

// //   const login = async (email, password) => {
// //     try {
// //       if (!email || !password) {
// //         throw new Error('Email and password are required');
// //       }

// //       const response = await fetch('http://localhost:5000/api/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password })
// //       });

// //       const data = await response.json();
      
// //       if (!response.ok) {
// //         throw new Error(data.message || data.error || 'Login failed');
// //       }

// //       if (!data.access_token || !data.user) {
// //         throw new Error('Invalid server response');
// //       }

// //       localStorage.setItem('user', JSON.stringify(data.user));
// //       localStorage.setItem('token', data.access_token);
// //       setUser(data.user);
      
// //       return { success: true, user: data.user };
// //     } catch (error) {
// //       console.error('Login error:', error);
// //       return { success: false, error: error.message };
// //     }
// //   };

// //   const register = async (userData) => {
// //     try {
// //       // Validate required fields
// //       const { name, email, password, confirmPassword } = userData;
// //       if (!name || !email || !password || !confirmPassword) {
// //         throw new Error('All fields are required');
// //       }

// //       if (password !== confirmPassword) {
// //         throw new Error('Passwords do not match');
// //       }

// //       if (password.length < 6) {
// //         throw new Error('Password must be at least 6 characters');
// //       }

// //       const response = await fetch('http://localhost:5000/api/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           name,
// //           email,
// //           password,
// //           phone: userData.phone || ''
// //         })
// //       });

// //       const data = await response.json();
      
// //       if (!response.ok) {
// //         throw new Error(data.message || 'Registration failed');
// //       }

// //       // Auto-login after registration if tokens are returned
// //       if (data.access_token && data.user) {
// //         localStorage.setItem('user', JSON.stringify(data.user));
// //         localStorage.setItem('token', data.access_token);
// //         setUser(data.user);
// //       }
      
// //       return { success: true, user: data.user };
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       return { success: false, error: error.message };
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('user');
// //     localStorage.removeItem('token');
// //     setUser(null);
// //   };

// //   const value = { 
// //     user,
// //     loading,
// //     login,
// //     register,
// //     logout
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }
// // src/context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const savedUser = localStorage.getItem('user');
//       return savedUser ? JSON.parse(savedUser) : null;
//     } catch (error) {
//       console.error('Failed to parse user data:', error);
//       localStorage.removeItem('user');
//       return null;
//     }
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyAuth = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setLoading(false);
//         return;
//       }
  
//       try {
//         // First attempt with current token
//         const response = await fetch('http://localhost:5000/api/verify-token', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
  
//         if (!response.ok) {
//           throw new Error('Token verification failed');
//         }
  
//         const data = await response.json();
//         localStorage.setItem('user', JSON.stringify(data.user));
//         setUser(data.user);
//       } catch (error) {
//         console.error('Auth verification error:', error);
        
//         // If token verification fails, try refreshing
//         try {
//           const newToken = await refreshAccessToken();
//           if (newToken) {
//             // Retry with the new token
//             const retryResponse = await fetch('http://localhost:5000/api/verify-token', {
//               headers: { 'Authorization': `Bearer ${newToken}` }
//             });
            
//             if (!retryResponse.ok) {
//               throw new Error('Retry after refresh failed');
//             }
  
//             const retryData = await retryResponse.json();
//             localStorage.setItem('user', JSON.stringify(retryData.user));
//             setUser(retryData.user);
//           }
//         } catch (refreshError) {
//           console.error('Refresh failed:', refreshError);
//           logout();
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Login failed');
//       }

//       if (!data.access_token || !data.refresh_token || !data.user) {
//         throw new Error('Invalid server response');
//       }

//       localStorage.setItem('token', data.access_token);
//       localStorage.setItem('refreshToken', data.refresh_token);   // <-- SAVE refresh_token
//       localStorage.setItem('user', JSON.stringify(data.user));
//       setUser(data.user);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, error: error.message };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData)
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed');
//       }

//       if (!data.access_token || !data.refresh_token || !data.user) {
//         throw new Error('Invalid server response');
//       }

//       localStorage.setItem('token', data.access_token);
//       localStorage.setItem('refreshToken', data.refresh_token);   // <-- SAVE refresh_token
//       localStorage.setItem('user', JSON.stringify(data.user));
//       setUser(data.user);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Registration error:', error);
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   // -----------------------------
//   // Refresh Access Token Function
//   // -----------------------------
//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) {
//       logout();
//       return;
//     }
  
//     try {
//       const response = await fetch('http://localhost:5000/api/refresh', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${refreshToken}` 
//         }
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to refresh token');
//       }
  
//       if (!data.access_token) {
//         throw new Error('Invalid refresh response');
//       }
  
//       localStorage.setItem('token', data.access_token);
//       console.log('Access token refreshed successfully.');
//       return data.access_token;
  
//     } catch (error) {
//       console.error('Token refresh error:', error);
//       logout();
//       throw error;
//     }
//   };
  

//   const value = { 
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     refreshAccessToken   // Export this if you want to use it manually
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
import { createContext, useContext, useState, useEffect } from 'react';
import { refreshToken } from '../pages/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Verify token error response:', errorData);
          throw new Error(errorData.message || 'Token verification failed');
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      } catch (error) {
        console.error('Auth verification error:', error);
        try {
          const newToken = await refreshToken();
          const retryResponse = await fetch('http://localhost:5000/api/verify-token', {
            headers: { Authorization: `Bearer ${newToken}` },
          });

          if (!retryResponse.ok) {
            const retryErrorData = await retryResponse.json();
            console.error('Retry verify token error response:', retryErrorData);
            throw new Error(retryErrorData.message || 'Retry after refresh failed');
          }

          const retryData = await retryResponse.json();
          localStorage.setItem('user', JSON.stringify(retryData.user));
          setUser(retryData.user);
        } catch (refreshError) {
          console.error('Refresh failed:', refreshError);
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (!data.access_token || !data.refresh_token || !data.user) {
        throw new Error('Invalid server response');
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (!data.access_token || !data.refresh_token || !data.user) {
        throw new Error('Invalid server response');
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}