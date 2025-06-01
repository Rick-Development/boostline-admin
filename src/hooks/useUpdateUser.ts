import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import toast from 'react-hot-toast';

const authToken = localStorage.getItem('accessToken');

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userId, payload) => {
    setLoading(true);
    setError(null);

    const data = qs.stringify(payload);

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/admin/users/${userId}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      },
      data: data
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

  return { updateUser, loading, error };
};

export default useUpdateUser;
