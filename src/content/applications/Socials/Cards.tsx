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
  Alert
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { format } from 'date-fns';
import useSocials from 'src/hooks/useSocials';

interface UserCardProp {
  limit?: number;
  paginate?: boolean;
  action?: (user: any) => void;
  userId?: string;
}

export default function Cards({
  limit = 10,
  paginate = true,
  action,
  userId
}: UserCardProp) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    data: rawData,
    loading,
    error,
    totalPages
  } = useSocials(null, userId || null, currentPage, limit, searchTerm);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(() => {
    if (rawData) {
      setFilteredUsers(rawData?.data?.socials || []);
    }
  }, [rawData]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      {paginate && (
        <Box px={2}>
          <TextField
            label="Search Subscriptions..."
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
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box
                  onClick={() => action(data)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`${
                        data.name.charAt(0).toUpperCase() + data.name.slice(1)
                      }`}
                      src={
                        process.env.REACT_APP_API_BASE + data.img ||
                        '/static/images/avatar/default.jpg'
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="div"
                        variant="body2"
                        fontWeight={700}
                        mb={0.5}
                      >
                        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}{' '}
                        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          color: 'text.primary',
                          display: 'inline',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {format(
                          new Date(data?.createdAt),
                          'MMM dd, yyyy h:mm a'
                        )}
                      </Typography>
                    }
                    sx={{
                      marginRight: 2,
                      maxWidth: { xs: '150px', sm: 'none' }
                    }}
                  />
                </Box>

                <Chip
                  onClick={() => action(data)}
                  label={
                    data.status.toLowerCase() === 'completed'
                      ? 'Completed'
                      : data.status.charAt(0).toUpperCase() +
                        data.status.slice(1)
                  }
                  color={
                    data.status.toLowerCase() === 'completed'
                      ? 'success'
                      : data.status.toLowerCase() === 'pending' ||
                        data.status.toLowerCase() === 'processing'
                      ? 'warning'
                      : data.status.toLowerCase() === 'in progress'
                      ? 'info'
                      : 'error'
                  }
                  size="small"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      )}

      {paginate && filteredUsers.length > 0 && (
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
