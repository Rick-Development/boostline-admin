import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import useCheckTokenValidity from 'src/hooks/useCheckTokenValidity';

const PrivateRoute = ({ element }) => {
  const { isValid, error, loading: tokenLoading } = useCheckTokenValidity(); // Get loading state from the hook
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tokenLoading) {
      setLoading(false);
    }
  }, [tokenLoading]);

  if (loading || tokenLoading) {
    return <SuspenseLoader />;
  }

  if (!isValid || error) {
    return <Navigate to="/auth/login" replace />;
  }

  return element;
};

export default PrivateRoute;
