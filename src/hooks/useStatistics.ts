import { useEffect, useState } from 'react';
import axios from 'axios';

const useStatistics = () => {
  const [statistics, setStatistics] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const authToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_API_URL}/admin/statistics`,
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        };

        const response = await axios.request(config);

        if (response.data.status === true) setStatistics(response.data.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { statistics, loading, error };
};

export default useStatistics;
