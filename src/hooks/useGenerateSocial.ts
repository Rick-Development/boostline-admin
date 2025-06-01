import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import toast from 'react-hot-toast';

const authToken = localStorage.getItem('accessToken');

const useGenerateSocials = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/generate-social-package`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      }
    };

    try {
      const response = await axios.request(config);
      toast.success(response.data.message);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      const detailedError = err?.response?.data || err;
      toast.error(detailedError.message);
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
};

export default useGenerateSocials;
