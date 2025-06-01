import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import {
  Grid,
  Container,
  Box,
  Typography,
  Card,
  CardHeader,
  Divider
} from '@mui/material';
import ProfileCover from './ProfileCover';
import QuickView from '../settings/QuickView';
import Feed from './Feed';
import PopularTags from './PopularTags';
// import MyCards from './MyCards';
// import Addresses from './Addresses';
import { useEffect, useState } from 'react';
import useUserData from 'src/hooks/useUserData';
import UsersCard from 'src/content/applications/Users/users/Users';
import MyCards from './MyCards';
import Addresses from './Addresses';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';

function ManagementUserProfile() {
  const [users, setUsers] = useState<any | null>(null);
  const { users: fetchedUsers, loading, error, total } = useUserData();
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState<any | null>(null);
  const {
    users: fetchedUser,
    loading: userLoading,
    error: userError
  } = useUserData(null, null, '', userId);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUsers);
    }
  }, [fetchedUser, userId]);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching user data</div>;

  const handleData = (user: any) => {
    setUserId(user.id);
    setUser(user);
  };

  return (
    <>
      <Helmet>
        <title>Users - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid item xs={8} md={8}>
          <ProfileCover total={total} />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="All Users" />
              <Divider />
              <Box py={1} mb={3}>
                <UsersCard action={handleData} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
