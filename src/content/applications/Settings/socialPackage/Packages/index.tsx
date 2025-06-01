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
  Button,
  Switch,
  FormControlLabel
} from '@mui/material';
import usePackages from 'src/hooks/usePackages';
import useUpdateCountry from 'src/hooks/useUpdateCountry';
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
  } = usePackages(null, userId || null, currentPage - 1, limit, searchTerm);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isTop, setIsTop] = useState<boolean>(false);
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
    if (selectedProduct?.id === product.id) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
      setIsTop(product.top === 'true');
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      {paginate && (
        <Box px={2}>
          <TextField
            label={`Search ${total.toLocaleString()} Packages...`}
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
                        {data.name}
                        {data.top === 'true' && (
                          <Chip
                            label="Top"
                            color="info"
                            size="small"
                            variant="outlined"
                            sx={{ ml: 1 }}
                          />
                        )}
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

              {selectedProduct?.id === data.id && (
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
                    label="Service"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.service || ''}
                    disabled
                  />
                  <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.name || ''}
                    disabled
                  />
                  <TextField
                    label="Type"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.type || ''}
                    disabled
                  />
                  <TextField
                    label="Rate"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.rate || ''}
                    disabled
                  />
                  <TextField
                    label="Min"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.min || ''}
                    disabled
                  />
                  <TextField
                    label="Max"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.max || ''}
                    disabled
                  />
                  <TextField
                    label="Dripfeed"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.dripfeed ? 'Yes' : 'No'}
                    disabled
                  />
                  <TextField
                    label="Refill"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.refill ? 'Yes' : 'No'}
                    disabled
                  />
                  <TextField
                    label="Start Count"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.start_count || ''}
                    disabled
                  />
                  <TextField
                    label="Remains"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.remains || ''}
                    disabled
                  />
                  <TextField
                    label="Cancel"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.cancel ? 'Yes' : 'No'}
                    disabled
                  />
                  <TextField
                    label="Category"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.category || ''}
                    disabled
                  />
                  <TextField
                    label="Nice Category"
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
                  <TextField
                    label="Nice Name"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.niceName || ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        niceName: e.target.value
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
                  {/* <FormControlLabel
                    control={
                      <Switch
                        checked={isTop}
                        onChange={() => setIsTop(!isTop)}
                      />
                    }
                    label="Top"
                  /> */}
                  <Button
                    onClick={() =>
                      updateProduct({
                        id: selectedProduct.id,
                        niceName: selectedProduct.niceName,
                        niceCategory: selectedProduct.niceCategory,
                        status: selectedProduct.status
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
