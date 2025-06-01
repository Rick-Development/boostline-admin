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
  Select,
  MenuItem,
  Button
} from '@mui/material';
import usePackages from 'src/hooks/usePackages';
import useUpdateSocialPackage from 'src/hooks/useUpdateSocialPackage';

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
  } = usePackages(
    null,
    userId || null,
    currentPage - 1,
    limit,
    searchTerm,
    'yes'
  );
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const { updateProduct, loading: submitLoading } = useUpdateSocialPackage();

  useEffect(() => {
    if (rawData) {
      setFilteredUsers(rawData?.data.socials || []);
    }
  }, [rawData]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleFormDisplay = (product: any) => {
    if (selectedProduct?.category === product.category) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  const decodeHtmlEntities = (str: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      {paginate && (
        <Box px={2}>
          <TextField
            label={`Search ${total.toLocaleString()} Categories...`}
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
                onClick={() => handleFormDisplay(data)}
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
                        {data.category}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.primary' }}
                      >
                        public ~ {data.niceName}
                      </Typography>
                    }
                  />
                </Box>
                <Chip
                  label={data.status === '1' ? 'Active' : 'Inactive'}
                  color={data.status === '1' ? 'success' : 'error'}
                  size="small"
                />
              </ListItem>

              {selectedProduct?.category === data.category && (
                <Box
                  p={2}
                  mt={2}
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2
                  }}
                >
                  <TextField
                    label="Category"
                    fullWidth
                    margin="normal"
                    value={decodeHtmlEntities(selectedProduct?.category || '')}
                    disabled
                  />
                  <TextField
                    label="Nice Category Name"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.niceCategory || ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        niceCategory: e.target.value
                      })
                    }
                  />
                  <Select
                    label="Status"
                    fullWidth
                    value={selectedProduct?.status || '0'}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        status: e.target.value
                      })
                    }
                  >
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </Select>
                  <Button
                    onClick={() =>
                      updateProduct({
                        category: selectedProduct.category,
                        niceCategory: selectedProduct.niceCategory,
                        status: selectedProduct?.status
                      })
                    }
                    disabled={submitLoading}
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    {submitLoading ? 'Saving...' : 'Save'}
                  </Button>
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
