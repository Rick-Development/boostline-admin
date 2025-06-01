import { useState } from 'react';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import toast from 'react-hot-toast';

interface UpdateProductOptions {
  name: string;
  file?: File;
  status?: string;
  niceName?: string;
  sms_bower_id?: string;
  smsBus_id?: string;
  smsBus_code?: string;
  top?: boolean;
  onProgress?: (progress: number) => void;
}

const authToken = localStorage.getItem('accessToken');

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async ({
    name,
    file,
    status = 'inactive',
    niceName,
    sms_bower_id,
    top,
    smsBus_code,
    smsBus_id,
    onProgress
  }: UpdateProductOptions) => {
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      if (file) {
        data.append('image', file);
      } else {
        data.append('status', status);
        data.append('niceName', niceName);
        data.append('sms_bower_id', sms_bower_id);
        data.append('smsBus_id', smsBus_id);
        data.append('smsBus_code', smsBus_code);
        data.append('top', top);
      }

      const config: AxiosRequestConfig<FormData> = {
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/admin/updateService?name=${name}`,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        data,
        maxBodyLength: Infinity,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        }
      };

      const response = await axios.request(config);
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

export default useUpdateProduct;
