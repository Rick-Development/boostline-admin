import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid
} from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import useStatistics from 'src/hooks/useStatistics';
import SuspenseLoader from 'src/components/SuspenseLoader';
import Users from '../applications/Users/users/Users';
import { useNavigate } from 'react-router';

function DashboardCrypto() {
  const { statistics, loading, error } = useStatistics();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item xs={12}>
            <Wallets />
          </Grid>
          {/* <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid> */}
          <Grid item xs={12}>
            {/* <WatchList /> */}
            <Card>
              <CardHeader
                title="Recent Users"
                action={
                  <Button
                    size="small"
                    onClick={() => navigate('/management/users')}
                  >
                    See All
                  </Button>
                }
              />
              <Divider />
              <Users limit={7} paginate={false} />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
