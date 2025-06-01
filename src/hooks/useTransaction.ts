import { useState, useEffect } from 'react';
import axios from 'axios';

// Retrieve the authToken once, outside of the component hook.
const authToken = localStorage.getItem('accessToken');

const useTransaction = (
  transactionId = null,
  userId = null,
  page = 0,
  size = 10,
  searchTerm = ''
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API endpoint with query parameters for pagination and search
  const API_URL = transactionId
    ? `${process.env.REACT_APP_API_URL}/admin/transactions/${transactionId}`
    : `${
        process.env.REACT_APP_API_URL
      }/admin/transactions?page=${page}&size=${size}${
        userId ? `&user=${userId}` : ''
      }${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;

  const fetchTransactions = async () => {
    setError(null);
    setLoading(true); // Set loading to true before making the request

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    try {
      const response = await axios.request(config);
      setData(response.data);
    } catch (error) {
      const detailedError = error.response.data || error;
      setError(detailedError.message);
    } finally {
      setLoading(false);
    }
  };

  // Refetch whenever the transactionId, userId, page, size, or searchTerm changes
  useEffect(() => {
    fetchTransactions();
  }, [transactionId, userId, page, size, searchTerm]);

  return { data, loading, error, refetch: fetchTransactions };
};

export default useTransaction;
