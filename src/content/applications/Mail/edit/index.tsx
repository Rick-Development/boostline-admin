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
// import ProfileCover from './ProfileCover';
import { useEffect, useState } from 'react';
import useUserData from 'src/hooks/useUserData';
import useActivation from 'src/hooks/useActivation';
import Cards from './Cards';
import PageHeader from './PageHeader';
import usePages from 'src/hooks/usePages';
import useQuery from 'src/hooks/useQuery';
import { useNavigate } from 'react-router';
import useMails from 'src/hooks/useMails';
import useCreateMail from 'src/hooks/useCreateMail';

function ManagementUserProfile() {
  const navigate = useNavigate();
  const query = useQuery();
  const id = query.id || null;

  const [data, setData] = useState<any | null>(null);
  const [view, setView] = useState<string | null>();
  const {
    data: fetchedData,
    loading: fetLoading,
    error: userError
  } = useMails(id);
  if (!id || id === null) {
    navigate('/mail');
  }
  const { loading, error, responseData, createPage } = useCreateMail();

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData?.data?.pages[0]);
    }
  }, [fetchedData, userError]);

  const handleFormSubmit = (data: any) => {
    createPage(data);
  };

  return (
    <>
      <Helmet>
        <title>Mail - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid item xs={8} md={8}>
          <PageHeader viewMode={id} userId={data?.user_id} />
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
              <CardHeader title="Send Mail" />
              <Divider />
              <Box py={1} mb={3}>
                {userError ? (
                  <Typography
                    flex={1}
                    alignContent={'center'}
                    alignItems={'center'}
                    color="error"
                  >
                    {userError}
                  </Typography>
                ) : (
                  <Cards
                    data={data}
                    onSubmit={handleFormSubmit}
                    loading={loading}
                  />
                )}
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
