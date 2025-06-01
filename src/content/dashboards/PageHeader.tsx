import { Typography, Avatar, Grid, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import useAdminData from 'src/hooks/useAdminData';

function PageHeader() {
  const { userData, loading, error } = useAdminData();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const users = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={4}
    >
      <Grid item>
        {loading ? (
          <Skeleton
            variant="circular" // Change to 'circular' for the avatar
            sx={{
              width: theme.spacing(8),
              height: theme.spacing(8),
              mr: 2
            }}
          />
        ) : (
          <Avatar
            sx={{
              mr: 2,
              width: theme.spacing(8),
              height: theme.spacing(8)
            }}
            variant="rounded"
            alt={`${user?.firstName} ${user?.lastName}`}
            src={users.avatar}
          />
        )}
      </Grid>
      <Grid item>
        {loading ? (
          <>
            <Skeleton variant="text" width={200} /> {/* Keep this as 'text' */}
            <Skeleton variant="text" width={300} /> {/* Keep this as 'text' */}
          </>
        ) : (
          <>
            <Typography variant="h3" component="h3" gutterBottom>
              Welcome, {`${user?.firstName || 'User'} ${user?.lastName || ''}`}!
            </Typography>
            <Typography variant="subtitle2">
              Today is a good day to start tracking your assets!
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
