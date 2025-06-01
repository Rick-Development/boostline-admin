import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  MenuItem,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css'; // Quill editor's CSS
import 'quill/dist/quill.snow.css'; 

import useUserData from 'src/hooks/useUserData';
// import useUserData from 'path-to-your-hook'; // Adjust path accordingly

interface PageFormProps {
  loading?: boolean;
  onSubmit: (formData: any) => void;
}

export default function PageForm({
  onSubmit,
  loading: dataLoading
}: PageFormProps) {
  const [formData, setFormData] = useState({
    emails: 'all',
    subject: 'Test Mail',
    body: 'We are excited to have you on board! Your account has been created successfully.\n\n<b>Please verify your email to get started.</b>',
    greetings: 'Dear {{name}}',
    signature: 'Best regards',
    status: 'draft'
  });
  const [loading, setLoading] = useState(dataLoading);
  const [emailType, setEmailType] = useState(formData.emails);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const {
    users: userList,
    loading: userLoading,
    error: userError,
    setPage,
    totalPages
  } = useUserData(0, 10, searchTerm); // Fetch users based on search term

  useEffect(() => {
    setLoading(dataLoading);
  }, [dataLoading]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value: string) => {
    setFormData({ ...formData, body: value });
  };

  const handleStatusChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string
  ) => {
    if (newStatus !== null) {
      setFormData((prevState) => ({ ...prevState, status: newStatus }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Handle user search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle user selection (comma separated)
  const handleUserSelection = (event: any, newValue: string[]) => {
    // Ensure the custom email type remains set
    setEmailType('custom');

    // Set selected users and update formData accordingly
    setSelectedUsers(newValue);
    setFormData({
      ...formData,
      emails: newValue.length > 0 ? newValue.join(', ') : 'custom'
    });
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
      {/* Recipients */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Recipients
        </Typography>
        <TextField
          fullWidth
          select
          name="emails"
          value={formData.emails}
          onChange={handleInputChange}
          variant="outlined"
          required
        >
          <MenuItem value="all">All Users</MenuItem>
          <MenuItem value="active">Active Users</MenuItem>
          <MenuItem value="inactive">Inactive Users</MenuItem>
          <MenuItem value="disabled">Disabled Users</MenuItem>
          <MenuItem value="custom" onClick={() => setEmailType('custom')}>
            Custom Users
          </MenuItem>
        </TextField>

        {emailType === 'custom' && (
          <>
            <Autocomplete
              multiple
              options={userList.map((user: any) => user.email)} // Assuming 'email' is a field in user data
              value={selectedUsers}
              onChange={handleUserSelection}
              filterSelectedOptions
              loading={userLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={handleSearchChange}
                  placeholder="Search and add emails"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {userLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
              sx={{ mt: 2 }}
            />
            {userError && (
              <Typography color="error">Error loading users</Typography>
            )}
          </>
        )}
      </Box>

      {/* Subject */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Subject
        </Typography>
        <TextField
          fullWidth
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Enter email subject"
          variant="outlined"
          required
        />
      </Box>

      {/* Body Content */}
      <Box sx={{ my: 3, mb: 10 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Body
        </Typography>
        <ReactQuill
          value={formData.body}
          onChange={handleContentChange}
          placeholder="Enter email body content"
          style={{ height: '250px', maxHeight: '100%', marginBottom: 2 }}
          theme="snow"
        />
      </Box>

      {/* Greetings */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Greetings
        </Typography>
        <TextField
          fullWidth
          name="greetings"
          value={formData.greetings}
          onChange={handleInputChange}
          placeholder="Enter greetings"
          variant="outlined"
          required
        />
      </Box>

      {/* Signature */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Signature
        </Typography>
        <TextField
          fullWidth
          name="signature"
          value={formData.signature}
          onChange={handleInputChange}
          placeholder="Enter signature"
          variant="outlined"
          required
        />
      </Box>

      {/* Status Toggle */}
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
          Status
        </Typography>
        <ToggleButtonGroup
          value={formData.status}
          exclusive
          onChange={handleStatusChange}
          aria-label="status"
        >
          <ToggleButton value="draft" aria-label="draft">
            Send Later
          </ToggleButton>
          <ToggleButton value="sent" aria-label="sent">
            Send Now
          </ToggleButton>
        </ToggleButtonGroup>
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
          {loading ? 'Saving...' : 'Send Email'}
        </Button>
      </Box>
    </Box>
  );
}
