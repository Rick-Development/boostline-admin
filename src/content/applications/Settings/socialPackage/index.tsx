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
import { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import useMails from 'src/hooks/useMails';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Category from './Category';
import Country from './Packages';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);
function ManagementUserProfile() {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState<any | null>(null);
  const [dataa, setDataa] = useState<any | null>(null);
  const [view, setView] = useState<string | null>('products'); // Default view to 'products' tab
  const [tabValue, setTabValue] = useState(0); // State for tabs

  const {
    data: fetchedData,
    loading: dataLoading,
    error: userError
  } = useMails();

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData, userId]);

  const handleData = (data: any) => {
    setUserId(data.user_id);
    setDataa(data);
    setView('details');
  };

  const handleAction = (type: string) => {
    setView(type);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Activation - Management</title>
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
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabChange}
              value={tabValue}
              variant="fullWidth"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              aria-label="management tabs"
            >
              <Tab label="Categories" />
              <Tab label="All Packages" />
            </TabsWrapper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <Box py={3} mb={3}>
                {tabValue === 0 && (
                  <Box>
                    {/* Products Tab Content */}
                    <Category action={handleData} />
                  </Box>
                )}
                {tabValue === 1 && (
                  <Box>
                    {/* Country Tab Content */}
                    <Country />
                  </Box>
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
