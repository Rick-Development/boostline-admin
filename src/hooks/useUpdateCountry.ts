import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface UpdateProductOptions {
  id?: string | number;
  status?: string;
  niceName?: string;
  sms_bower_id?: string;
  smsBus_id?: string;
  top?: boolean;
}

const authToken = localStorage.getItem('accessToken');

const useUpdateCountry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async ({
    status = 'inactive',
    niceName,
    sms_bower_id,
    top,
    smsBus_id,
    id
  }: UpdateProductOptions) => {
    setLoading(true);
    setError(null);

    try {
      const data = {
        status,
        name: niceName,
        sms_bower_id,
        smsBus_id,
        top
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/countries?id=${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

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

export default useUpdateCountry;
