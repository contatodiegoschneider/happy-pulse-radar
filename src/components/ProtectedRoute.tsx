import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  console.log('[ProtectedRoute] isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('[ProtectedRoute] Allowing access');
  return <>{children}</>;
};

export default ProtectedRoute;