import { useState, useEffect } from 'react';
import axios from 'axios';

// Retrieve the authToken once, outside of the component hook.
const authToken = localStorage.getItem('accessToken');

const useActivities = (
  ID = null,
  userId = null,
  page = 0,
  limit = 10,
  searchTerm = ''
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(page);

  const API_URL = ID
    ? `${process.env.REACT_APP_API_URL}/admin/activities/${ID}`
    : `${
        process.env.REACT_APP_API_URL
      }/admin/activities?page=${page}&limit=${limit}&search=${searchTerm}&user=${
        userId || ''
      }`;

  const fetchTransactions = async (signal) => {
    setError(null);
    setLoading(true);

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      signal
    };

    try {
      const response = await axios.request(config);

      setData(response.data);
      setTotal(response.data.data.total);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        const detailedError = error?.response?.data || error;
        setError(detailedError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchTransactions(controller.signal);

    return () => {
      controller.abort();
    };
  }, [ID, userId, page, limit, searchTerm]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchTransactions(new AbortController().signal),
    totalPages,
    currentPage,
    total,
    setPage: setCurrentPage
  };
};

export default useActivities;
