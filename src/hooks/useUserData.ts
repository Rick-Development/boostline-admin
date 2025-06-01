import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserData = (page = 0, size = 10, search = '', userId = null) => {
  const [users, setUsers] = useState<any | []>([]);
  const [user, setUser] = useState<any | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(page);
  const authToken = localStorage.getItem('accessToken');

  const url = !userId
    ? `${process.env.REACT_APP_API_URL}/admin/users?page=${page}&size=${size}&search=${search}`
    : `${process.env.REACT_APP_API_URL}/admin/users/${userId}`;

  console.log(url);

  useEffect(() => {
    const abortController = new AbortController(); // Create AbortController instance
    const fetchUsers = async () => {
      setError(null);
      setLoading(true);
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: url,
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          signal: abortController.signal // Pass signal to axios
        };

        const response = await axios.request(config);

        setUsers(response.data.data.users);
        setUser(response.data);
        setTotal(response.data.data.total);
        setTotalPages(response.data.data.totalPages);
        setCurrentPage(response.data.data.currentPage);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          // console.log('Request canceled', error.message);
        } else {
          const detailedError = error.response?.data || error;
          setError(detailedError.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Cleanup function to abort request
    return () => {
      abortController.abort();
    };
  }, [page, size, search, userId, authToken, url]);

  return {
    users,
    user,
    loading,
    error,
    totalPages,
    currentPage,
    total,
    setPage: setCurrentPage
  };
};

export default useUserData;
