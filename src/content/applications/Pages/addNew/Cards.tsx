import { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  TextField,
  Button,
  MenuItem,
  Chip
} from '@mui/material';
import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css'; // Quill editor's CSS
import 'quill/dist/quill.snow.css'; 

interface PageFormProps {
  loading?: boolean;
  onSubmit: (formData: any) => void;
}

export default function PageForm({
  onSubmit,
  loading: dataLoading
}: PageFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: 'menu',
    status: 'inactive',
    content: ''
  });
  const [loading, setLoading] = useState(dataLoading);

  useEffect(() => {
    setLoading(dataLoading);
  }, [dataLoading]);

  // Generate slug from the title
  useEffect(() => {
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters
    };

    setFormData((prevData) => ({
      ...prevData,
      slug: generateSlug(prevData.title)
    }));
  }, [formData.title]); // Trigger on title change

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value: string) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: '600px',
        margin: 'auto'
      }}
    >
      {/* Page Title */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Title
        </Typography>
        <TextField
          fullWidth
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter page title"
          variant="outlined"
          required
        />
      </Box>

      {/* Page Slug (auto-generated) */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Slug (auto-generated)
        </Typography>
        <TextField
          fullWidth
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          variant="outlined"
          disabled
          sx={{
            borderRadius: 1,
            bgcolor: 'grey.200'
          }}
        />
      </Box>

      {/* Page Location */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Location
        </Typography>
        <TextField
          fullWidth
          select
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          variant="outlined"
          required
        >
          <MenuItem value="menu">Menu</MenuItem>
          <MenuItem value="footer">Footer</MenuItem>
          <MenuItem value="app">App</MenuItem>
          <MenuItem value="faq">FAQ</MenuItem>
        </TextField>
      </Box>

      {/* Page Content */}
      <Box sx={{ my: 3, mb: 10 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Content
        </Typography>
        <ReactQuill
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Enter page content"
          style={{ height: '250px', maxHeight: '100%', marginBottom: 2 }}
          theme="snow"
        />
      </Box>

      {/* Status */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Status
        </Typography>
        <TextField
          fullWidth
          select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          variant="outlined"
          required
        >
          <MenuItem value="active">Publish</MenuItem>
          <MenuItem value="inactive">Draft</MenuItem>
        </TextField>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography gutterBottom mb={1} variant="h4">
          Status
        </Typography>
        <Chip
          label={formData.status === 'active' ? 'Published' : 'Draft'}
          color={formData.status === 'active' ? 'success' : 'warning'}
        />
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Submit Button */}
      <Box
        mt={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            padding: '12px 24px', // Adjust padding for larger button
            fontSize: '16px' // Optional: Increase font size
          }}
        >
          {loading ? 'Saving...' : 'Create Page'}
        </Button>
      </Box>
    </Box>
  );
}
