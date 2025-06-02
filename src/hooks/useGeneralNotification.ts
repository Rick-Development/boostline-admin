// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // Retrieve the authToken once, outside of the component hook.
// const authToken = localStorage.getItem('accessToken');

// const useGeneralNotification = (
//   id = null,
//   userId = null,
//   page = 0,
//   limit = 10,
//   searchTerm = ''
// ) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalPages, setTotalPages] = useState(0);
//   const [total, setTotal] = useState<number | null>(0);
//   const [currentPage, setCurrentPage] = useState(page);

//   const API_URL = id
//     ? `${process.env.REACT_APP_API_URL}/admin/settings?id=${id}`
//     : `${
//         process.env.REACT_APP_API_URL
//       }/admin/settings?page=${page}&limit=${limit}&search=${searchTerm}&user=${
//         userId || ''
//       }`;

//   const fetPages = async (signal: any) => {
//     setError(null);
//     setLoading(true);

//     const config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: API_URL,
//       headers: {
//         Authorization: `Bearer ${authToken}`
//       },
//       signal
//     };

//     try {
//       const response = await axios.request(config);
//       setData(response.data);
//       setTotal(response.data.data.total);
//       setTotalPages(response.data.data.totalPages);
//       setCurrentPage(response.data.currentPage);
//     } catch (error) {
//       if (axios.isCancel(error)) {
//       } else {
//         const detailedError = error?.response?.data || error;
//         setError(detailedError.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const controller = new AbortController();
//     fetPages(controller.signal);

//     return () => {
//       controller.abort();
//     };
//   }, [id, userId, page, limit, searchTerm]);

//   return {
//     data,
//     loading,
//     error,
//     refetch: () => fetPages(new AbortController().signal),
//     totalPages,
//     currentPage,
//     total,
//     setPage: setCurrentPage
//   };
// };

// export default useGeneralNotification;

// import { useState } from 'react';
// import axios from 'axios';
// import qs from 'qs';
// import toast from 'react-hot-toast';

// const authToken = localStorage.getItem('accessToken');

// const useGeneralNotification = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const generate = async (title, message) => {
//     setLoading(true);
//     setError(null);

//     const config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: `${process.env.REACT_APP_API_URL}/admin/generalnotifications`,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${authToken}`
//       },
//       data: {
//         title,
//         message
//       }
//     };

//     try {
//       const response = await axios.request(config);
//       toast.success(response.data.message);
//       return response.data;
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to Send Notification');
//       const detailedError = err?.response?.data || err;
//       toast.error(detailedError.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { generate, loading, error };
// };

// export default useGeneralNotification;


import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
  const authToken = localStorage.getItem('accessToken');

const useGeneralNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 // Or pass as argument

  const generate = async (title:string, message: string) => {
    setLoading(true);
    setError(null);

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/admin/generalnotifications`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      data: JSON.stringify({ title, message })
    };

    try {
      const response = await axios.request(config);
      toast.success(response.data.message);
      return response.data;
    } catch (err) {
      const detailedError = err?.response?.data || err;
      setError(detailedError.message || 'Failed to Send Notification');
      toast.error(detailedError.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
};

export default useGeneralNotification;
