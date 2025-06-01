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
import useUserData from 'src/hooks/useUserData';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserCardProp {
  limit?: number;
  paginate?: boolean;
  action?: (user: any) => void; // Add the action prop here
}

export default function UsersCard({
  limit = 10,
  paginate = true
}: UserCardProp) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    users: old,
    user: data,
    loading,
    error,
    setPage,
    totalPages
  } = useUserData(currentPage, limit, searchTerm);
  const [users, setUsers] = useState<[] | null>([]);

  useEffect(() => {
    if (data && data?.data?.users) {
      setUsers(data?.data?.users || []);
    }
  }, [data]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1);
    setPage(value - 1);
  };

  // Filter users based on the search term
  const filteredUsers = users;

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      {/* Search Input - Only show if paginate is true */}
      {paginate && (
        <Box px={2}>
          <TextField
            label="Search Users..."
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      )}

      {/* User List */}
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
        <Box px={2}>
          <Alert severity="info">{error}</Alert>
        </Box>
      ) : (
        <List>
          {filteredUsers.map((user: any) => (
            <Fragment key={user.id}>
              <ListItem
                alignItems="center"
                button
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box
                  onClick={() =>
                    navigate(`/management/profile/settings?user=${user.id}`)
                  }
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`${user.fname} ${user.lname}`}
                      src={
                        user.profilePicture ||
                        '/static/images/avatar/default.jpg'
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.fname} ${user.lname}`}
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
                        {user.email}
                      </Typography>
                    }
                    sx={{
                      marginRight: 2,
                      maxWidth: { xs: '150px', sm: 'none' }
                    }}
                  />
                </Box>

                <Chip
                  onClick={() =>
                    navigate(`/management/profile/settings?user=${user.id}`)
                  }
                  label={
                    user.status === 'active'
                      ? 'Active'
                      : user.status === 'inactive'
                      ? 'Inactive'
                      : 'Disabled'
                  }
                  color={
                    user.status === 'active'
                      ? 'success'
                      : user.status === 'inactive'
                      ? 'default'
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

      {/* Pagination Control - Only show if paginate is true and filtered users exist */}
      {paginate && filteredUsers.length > 0 && (
        <Stack spacing={2} alignItems="center" mt={2}>
          <Pagination
            count={totalPages} // Total pages based on filtered users
            page={currentPage + 1} // Displaying a 1-based page number
            onChange={handlePageChange} // Update page on change
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
}
