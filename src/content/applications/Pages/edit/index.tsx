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

function ManagementUserProfile() {
  const navigate = useNavigate();
  const query = useQuery();
  const id = query.id || null;

  const [data, setData] = useState<any | null>(null);
  const [view, setView] = useState<string | null>();
  const { data: fetchedData, loading, error: userError } = usePages(id);
  if (!id || id === null) {
    navigate('/management/pages');
  }

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData?.data?.pages[0]);
    }
  }, [fetchedData]);

  const handleFormSubmit = (data: any) => {};

  const handleAction = (type: string) => {
    setView(type);
  };

  return (
    <>
      <Helmet>
        <title>Activation - Management</title>
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
              <CardHeader title="All Pages" />
              <Divider />
              <Box py={1} mb={3}>
                <Cards
                  data={data}
                  onSubmit={handleFormSubmit}
                  loading={loading}
                />
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
