import { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton
} from '@mui/material';
import { format } from 'date-fns';
import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import 'quill/dist/quill.snow.css'; 

import useQuery from 'src/hooks/useQuery';
import { useNavigate } from 'react-router';
import usePages from 'src/hooks/usePages';
import useCreatePage from 'src/hooks/useCreatePage';

interface ActivationDetailsProps {
  data?: {
    slug: string;
    title: string;
    updatedAt: string;
    createdAt: string;
    id: number;
    image: string;
    status: string;
    location: string;
    user_id: number;
    content: string;
  };
}
interface PageFormProps {
  loading?: boolean;
  onSubmit: (formData: any) => void;
  data?: ActivationDetailsProps;
}
export default function PageDetails({
  onSubmit,
  loading: dataLoading,
  data: initData
}: PageFormProps) {
  const [data, setData] = useState<any | null>(initData);

  const { loading: submitLoading, editPage } = useCreatePage();

  const [submitLoader, setSubmitLoader] = useState(submitLoading);

  const query = useQuery();
  const id = query.id || null;

  const { data: fetchedData, loading, error: userError } = usePages(id);

  useEffect(() => {
    if (fetchedData) {
      const pageData = fetchedData?.data?.pages[0];

      const validStatuses = ['active', 'inactive'];
      const validatedStatus = validStatuses.includes(pageData.status)
        ? pageData.status
        : 'inactive';

      setData({
        ...pageData,
        status: validatedStatus
      });
    }
  }, [fetchedData]);

  useEffect(() => {
    setSubmitLoader(submitLoading);
  }, [submitLoading]);

  const handleChange = (field: string, value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    editPage(data);
  };

  return (
    <Box
      sx={{
        padding: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: '600px',
        margin: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Avatar
          alt={data?.title}
          src={
            process.env.REACT_APP_API_BASE + data?.image ||
            '/static/images/avatar/default.jpg'
          }
          sx={{ width: 56, height: 56 }}
        />

        {loading ? (
          <Box sx={{ textAlign: 'right' }}>
            <Skeleton variant="text" width="80%" height={20} sx={{ ml: 2 }} />
            <Skeleton variant="text" width="80%" height={20} sx={{ ml: 2 }} />
          </Box>
        ) : (
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="textSecondary" mb={1}>
              <strong>Created:</strong>{' '}
              {format(new Date(data?.createdAt || ''), 'MMM dd, yyyy h:mm a')}
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              <strong>Updated:</strong>{' '}
              {format(new Date(data?.updatedAt), 'MMM dd, yyyy h:mm a')}
            </Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Editable Page Title */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Title
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={56} />
        ) : (
          <TextField
            fullWidth
            value={data?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            variant="outlined"
            label="Title"
          />
        )}
      </Box>

      {/* Editable Slug */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Slug
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={56} />
        ) : (
          <TextField
            fullWidth
            value={data?.slug || ''}
            onChange={(e) => handleChange('slug', e.target.value)}
            variant="outlined"
            label="Slug"
          />
        )}
      </Box>

      {/* Select for Location */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Location
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={56} />
        ) : (
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={data?.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              label="Location"
            >
              <MenuItem value="menu">Menu</MenuItem>
              <MenuItem value="footer">Footer</MenuItem>
              <MenuItem value="app">App</MenuItem>
              <MenuItem value="faq">FAQ</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Editable Content with ReactQuill */}
      <Box sx={{ my: 3, mb: 10 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Content
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={150} />
        ) : (
          <ReactQuill
            value={data?.content || ''}
            onChange={(value) => handleChange('content', value)}
            theme="snow"
            style={{ height: '250px', maxHeight: '100%', marginBottom: 2 }}
          />
        )}
      </Box>

      {/* Select for Status */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Status
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={56} />
        ) : (
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={data?.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
              label="Status"
            >
              <MenuItem value="active">Published</MenuItem>
              <MenuItem value="inactive">Draft</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Submit Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={submitLoader}
        >
          {submitLoader ? 'Saving...' : 'Submit Changes'}
        </Button>
      </Box>
    </Box>
  );
}
