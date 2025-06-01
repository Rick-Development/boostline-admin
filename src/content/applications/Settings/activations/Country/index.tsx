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
  LinearProgress,
  Switch,
  FormControlLabel
} from '@mui/material';
import useCountries from 'src/hooks/useCountries';
import useUpdateProduct from 'src/hooks/useUpdateProduct';
import useUpdateCountry from 'src/hooks/useUpdateCountry';

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
  } = useCountries(null, userId || null, currentPage - 1, limit, searchTerm);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isTop, setIsTop] = useState<boolean>(false);
  const { updateProduct, loading: submitLoading } = useUpdateCountry();

  useEffect(() => {
    if (rawData) {
      setFilteredUsers(rawData?.data.countries || []);
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
            label={`Search ${total.toLocaleString()} Countries...`}
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
                      src={`https://flagcdn.com/${data.iso.toLowerCase()}.svg`} // Display country flag
                      alt={`${data.name} flag`}
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
                  label={data.status}
                  color={data.status === 'active' ? 'success' : 'error'}
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
                  <TextField
                    label="SMS Bower ID"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.sms_bower_id || ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        sms_bower_id: e.target.value
                      })
                    }
                  />
                  <TextField
                    label="SMS Bus ID"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.smsBus_id || ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        smsBus_id: e.target.value
                      })
                    }
                  />
                  <TextField
                    label="Country RU Name"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.ruName || ''}
                    disabled
                  />
                  <TextField
                    label="Country Prefix"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.prefix || ''}
                    disabled
                  />
                  <Select
                    label="Status"
                    fullWidth
                    value={selectedProduct?.status || 'inactive'}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        status: e.target.value
                      })
                    }
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isTop}
                        onChange={() => setIsTop(!isTop)}
                      />
                    }
                    label="Top"
                  />
                  <Button
                    onClick={() =>
                      updateProduct({
                        id: selectedProduct.id,
                        niceName: selectedProduct.niceName,
                        status: selectedProduct.status,
                        sms_bower_id: selectedProduct.sms_bower_id,
                        smsBus_id: selectedProduct.smsBus_id,
                        top: isTop
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
