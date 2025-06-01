import { useState } from 'react';
import axios from 'axios';

const useCheckSms = (activationId: string, provider: string) => {
  const [smsData, setSmsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Authentication token not found');

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/check-sms?activation_id=${activationId}&provider=${provider}`,
        {}, // Empty body for POST request
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSmsData(response.data);
    } catch (err: any) {
      const detailedError = err.response?.data || err.message || err;
      setError(detailedError);
    } finally {
      setLoading(false);
    }
  };

  return { smsData, loading, error, refetch };
};

export default useCheckSms;
