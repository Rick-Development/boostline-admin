import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useCheckTokenValidity = () => {
  const [isValid, setIsValid] = useState<boolean | false>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Set to true initially as loading starts immediately

  useEffect(() => {
    const authToken = localStorage.getItem('accessToken');

    console.log(`${process.env.REACT_APP_API_URL}/token`);
    console.log(authToken);

    // If there's no token, immediately set loading to false and invalid state
    if (!authToken) {
      setIsValid(false);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const checkToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/token`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );

        if (isMounted) {
          setIsValid(response.data.status); // Assuming response.data.status is a boolean
        }
      } catch (err) {
        // console.error(err);
        toast.dismiss();
        if (isMounted) {
          toast.error('You have been logged out.');
          setError('Token validation failed');
          setIsValid(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Always stop loading after the API call
        }
      }
    };

    checkToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isValid, error, loading };
};

export default useCheckTokenValidity;
