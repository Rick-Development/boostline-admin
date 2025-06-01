import React, { Fragment, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
  Box,
  Chip,
  TextField,
  Pagination,
  Stack,
  Skeleton,
  Alert,
  Button
} from '@mui/material';
import useOptions from 'src/hooks/useOptions';
import useUpdateOptions from 'src/hooks/useUpdateOptions';

interface UserCardProp {
  limit?: number;
  paginate?: boolean;
  action?: (user: any) => void;
  userId?: string;
}

export default function Product({
  limit = 10,
  paginate = true,
  action,
  userId
}: UserCardProp) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: rawData,
    loading,
    error,
    totalPages,
    total
  } = useOptions(null, userId || null, currentPage - 1, limit, searchTerm);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Hook to update options
  const {
    updateProduct,
    loading: updateLoading,
    error: updateError
  } = useUpdateOptions();

  useEffect(() => {
    if (rawData) {
      setFilteredUsers(rawData?.data.settings || []);
    }
  }, [rawData]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleFormToggle = (product: any) => {
    if (selectedProduct?.name === product.name) {
      setSelectedProduct(null);
      setFormData({});
    } else {
      setSelectedProduct(product);
      try {
        const parsedData = JSON.parse(product.value);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing JSON', error);
      }
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    const updateData = {
      name: selectedProduct?.name,
      action: {}
    };

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        updateData.action[key] = formData[key] || 'false';
      }
    }

    await updateProduct(updateData);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      {paginate && (
        <Box px={2}>
          <TextField
            label={`Search ${total.toLocaleString()} Settings...`}
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      )}

      {loading ? (
        <List>
          {[...Array(limit)].map((_, index) => (
            <Fragment key={index}>
              <ListItem>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={20}
                  sx={{ ml: 2 }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      ) : error ? (
        <Box px={2} py={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <List>
          {filteredUsers.map((data: any) => (
            <Fragment key={data.id}>
              <ListItem
                alignItems="center"
                button
                onClick={() => handleFormToggle(data)}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        process.env.REACT_APP_API_BASE + data.img ||
                        '/static/images/avatar/default.jpg'
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={700}>
                        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}{' '}
                        Settings
                      </Typography>
                    }
                  />
                </Box>
                <Chip label="edit" color="info" size="small" />
              </ListItem>

              {selectedProduct?.name === data.name && (
                <Box
                  p={2}
                  mt={2}
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2
                  }}
                >
                  {Object.entries(formData).map(([key, value]) => (
                    <TextField
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      fullWidth
                      margin="normal"
                      value={value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  ))}
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={updateLoading}
                  >
                    {updateLoading ? 'Saving...' : 'Save'}
                  </Button>
                  {updateError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {updateError}
                    </Alert>
                  )}
                </Box>
              )}
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      )}

      {paginate && (
        <Stack spacing={2} alignItems="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
}
