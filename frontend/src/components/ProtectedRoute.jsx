import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ 
  children,
  roles = [], // Optional role-based access
  redirectPath = '/login',
  requireAuth = true
}) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Or your custom loader
  }

  // If auth is required but no user
  if (requireAuth && !user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Role-based access control
  if (user && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass
  return children;
}