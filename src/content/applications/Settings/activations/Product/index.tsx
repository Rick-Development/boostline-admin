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
import { useDropzone } from 'react-dropzone';
import useProducts from 'src/hooks/useProducts';
import useUpdateProduct from 'src/hooks/useUpdateProduct';

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
  } = useProducts(null, userId || null, currentPage - 1, limit, searchTerm);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isTop, setIsTop] = useState<boolean>(false);
  const { updateProduct, loading: submitLoading } = useUpdateProduct();

  useEffect(() => {
    if (rawData) {
      setFilteredUsers(rawData?.data.products || []);
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

  const handleImageUpload = async (file: File) => {
    setUploadProgress(10); // Initial progress
    await updateProduct({
      name: selectedProduct.name,
      file,
      onProgress: (progress) => setUploadProgress(progress)
    });
    setUploadProgress(100);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0])
  });

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      {paginate && (
        <Box px={2}>
          <TextField
            label={`Search ${total.toLocaleString()} Products...`}
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
                  <Box
                    {...getRootProps()}
                    sx={{
                      p: 2,
                      border: '2px dashed grey',
                      textAlign: 'center'
                    }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography>Drop the image here...</Typography>
                    ) : (
                      <Typography>
                        Drag & drop an image here, or click to select
                      </Typography>
                    )}
                  </Box>
                  {uploadProgress > 0 && (
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress}
                    />
                  )}

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
                  {/* Added smsBus_id and smsBus_code fields */}
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
                    label="SMS Bus Code"
                    fullWidth
                    margin="normal"
                    value={selectedProduct?.smsBus_code || ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        smsBus_code: e.target.value
                      })
                    }
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
                        name: selectedProduct.name,
                        niceName: selectedProduct.niceName,
                        status: selectedProduct.status,
                        sms_bower_id: selectedProduct.sms_bower_id,
                        smsBus_id: selectedProduct.smsBus_id,
                        smsBus_code: selectedProduct.smsBus_code,
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
