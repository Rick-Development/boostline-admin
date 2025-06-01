import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface UpdateProductOptions {
  name?: string;
  action?: { [key: string]: string }; // Change to allow dynamic keys
}

const authToken = localStorage.getItem('accessToken');

const useUpdateOptions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async ({ name, action }: UpdateProductOptions) => {
    setLoading(true);
    setError(null);

    try {
      const data = {
        optionName: name,
        action: action || {} // This will dynamically accept the action object
      };

      const url = `${process.env.REACT_APP_API_URL}/admin/settings`;

      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update product');
      const detailedError = err?.response?.data || err;
      toast.error(detailedError.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
};

export default useUpdateOptions;
