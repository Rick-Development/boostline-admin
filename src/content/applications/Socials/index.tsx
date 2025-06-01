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
import ActivationDeatails from './Details';
import useSocials from 'src/hooks/useSocials';

function Socials() {
  const [users, setUsers] = useState<any | null>(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState<any | null>(null);
  const [dataa, setDataa] = useState<any | null>(null);
  const [total, setTotal] = useState<string | null>();
  const [view, setView] = useState<string | null>();
  const {
    data: fetchedData,
    loading: dataLoading,
    error: userError
  } = useSocials();

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

  return (
    <>
      <Helmet>
        <title>Socials Subscription - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid item xs={8} md={8}>
          <PageHeader
            data={data}
            action={handleAction}
            viewMode={view}
            userId={userId}
          />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            {view !== 'details' ? (
              <Card>
                <CardHeader title="All Activations" />
                <Divider />
                <Box py={1} mb={3}>
                  <Cards action={handleData} />
                </Box>
              </Card>
            ) : (
              <ActivationDeatails data={dataa} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Socials;
