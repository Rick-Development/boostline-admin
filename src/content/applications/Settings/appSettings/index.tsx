import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import {
  Grid,
  Container,
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Tabs,
  Tab,
  styled
} from '@mui/material';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Category from './Options';

function ManagementUserProfile() {
  return (
    <>
      <Helmet>
        <title>Site & App Settings</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <Card>
              <Box py={3} mb={3}>
                <Box>
                  <Category />
                </Box>
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
