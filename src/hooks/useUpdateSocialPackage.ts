import { useState } from 'react';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import toast from 'react-hot-toast';

interface UpdateProductOptions {
  niceName?: string;
  status?: string;
  niceCategory?: string;
  category?: string;
  id?: string | number;
}

const authToken = localStorage.getItem('accessToken');

const useUpdateSocialPackage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async ({
    status = '0',
    niceName,
    category,
    niceCategory,
    id
  }: UpdateProductOptions) => {
    setLoading(true);
    setError(null);

    try {
      const data = {
        status,
        niceName,
        niceCategory
      };

      // Encode the category if it exists
      const encodedCategory = category ? encodeURIComponent(category) : '';

      // Construct the URL with the encoded category parameter
      const url = id
        ? `${process.env.REACT_APP_API_URL}/admin/socialPackage?id=${id}`
        : `${process.env.REACT_APP_API_URL}/admin/socialPackage${
            encodedCategory ? `?category=${encodedCategory}` : ''
          }`;

      const response = await axios.put(url, data, {
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

export default useUpdateSocialPackage;
