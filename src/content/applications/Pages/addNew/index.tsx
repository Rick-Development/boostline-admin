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
import Cards from './Cards';
import PageHeader from './PageHeader';
import useCreatePage from 'src/hooks/useCreatePage';

function ManagementUserProfile() {
  const { loading, error, responseData, createPage } = useCreatePage();

  const handleFormSubmit = (data: any) => {
    createPage(data);
  };

  return (
    <>
      <Helmet>
        <title>Activation - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid item xs={8} md={8}>
          <PageHeader />
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
              <Box mb={3}>
                <Cards onSubmit={handleFormSubmit} loading={loading} />
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
