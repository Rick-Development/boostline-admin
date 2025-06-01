import { Typography, CircularProgress, Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import useUserData from 'src/hooks/useUserData';
import { useLocation, useNavigate } from 'react-router-dom';
import useQuery from 'src/hooks/useQuery';

function PageHeader() {
  const navigate = useNavigate();
  const query = useQuery();

  const userId = query.user || null;

  if (!userId) {
    navigate(`/dgsdghsg`);
  }

  const {
    user: usersData,
    loading,
    error
  } = useUserData(null, null, null, userId);
  const [user, setUser] = useState<any>(null); // Initialize as null

  useEffect(() => {
    if (usersData) {
      setUser(usersData.data || null);
    }
  }, [usersData, userId]);

  // if (loading) return <CircularProgress size={20} />; // Show loading indicator
  if (error) return <p>{error}</p>;
  if (loading) {
    return (
      <Box>
        <Typography variant="h3" component="h3" gutterBottom>
          User Settings
        </Typography>
        <Skeleton
          variant="text"
          width="60%"
          height={40}
          sx={{ marginBottom: 1 }}
        />
        <Skeleton variant="text" width="40%" height={30} />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Settings
      </Typography>
      {loading ? (
        <CircularProgress size={14} />
      ) : (
        <>
          <Typography variant="subtitle2">
            {user
              ? `Account Settings for: ${user.fname} ${user.lname}.`
              : 'User not found.'}
          </Typography>
          <Typography variant="subtitle2" fontSize={14}>
            {user ? `${user.email}` : ''}
          </Typography>
        </>
      )}
    </>
  );
}

export default PageHeader;
