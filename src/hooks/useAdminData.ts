import { useEffect, useState } from 'react';
import axios from 'axios';

const useAdminData = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const authToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_API_URL}/admin`,
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        };

        const response = await axios.request(config);

        setUserData(response.data.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, loading, error };
};

export default useAdminData;
