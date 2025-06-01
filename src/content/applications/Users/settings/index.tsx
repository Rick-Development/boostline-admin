import { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Tabs,
  Tab,
  Grid,
  Divider,
  Box,
  Typography,
  Chip
} from '@mui/material';
import Footer from 'src/components/Footer';
import { styled } from '@mui/material/styles';

import SecurityTab from './SecurityTab';
import useUserData from 'src/hooks/useUserData';
import useQuery from 'src/hooks/useQuery';
import { useNavigate } from 'react-router';
import QuickView from './QuickView';
import ActivationCards from '../../Activations/Cards';
import SocialCards from '../../Socials/Cards';
import NotificationCards from '../../Notifications/Cards';
import RecentOrdersTable from '../../Transactions/RecentOrdersTable';
import ActivationDeatails from '../../Activations/Details';
import { Close } from '@mui/icons-material';
import SocialDetails from '../../Socials/Details';
import NotificationDetails from '../../Notifications/Details';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

const ManagementUserSettings = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const userId = query.user || null;
  if (!userId) {
    navigate(`/dgsdghsg`);
  }

  const [view, setView] = useState<string | null>();
  const [dataa, setDataa] = useState<any | null>(null);

  const {
    users: usersData,
    loading,
    error
  } = useUserData(null, null, null, userId);

  const [currentTab, setCurrentTab] = useState<string>('activity');
  const tabs = [
    { value: 'activity', label: 'Overview' },
    { value: 'transaction', label: 'Transactions' },
    { value: 'activation', label: 'Activations' },
    { value: 'socials', label: 'Socials' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'bills', label: 'Bill Payments' },
    { value: 'security', label: 'Activities' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
    setView(null);
  };

  const handleData = (data: any) => {
    setDataa(data);
    setView('details');
  };

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Full viewport height
          color: 'red', // Error text color
          textAlign: 'center' // Center align text
        }}
      >
        <Typography variant="h6">{error}!</Typography>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Settings - Applications</title>
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
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {/* <ActivityTab /> */}
            {currentTab === 'activity' && <QuickView userId={userId} />}
            {currentTab === 'transaction' && (
              <RecentOrdersTable userId={userId} />
            )}
            {currentTab === 'activation' &&
              (view === 'details' ? (
                <Grid>
                  <Divider />
                  <Grid item xs={12} container justifyContent="center">
                    <Box py={2}>
                      <Chip
                        onClick={() => setView('all')}
                        label="Close"
                        icon={<Close />}
                        color="error"
                        size="small"
                      />
                    </Box>
                  </Grid>
                  <ActivationDeatails data={dataa} />
                </Grid>
              ) : (
                <ActivationCards action={handleData} userId={userId} />
              ))}

            {currentTab === 'socials' &&
              (view === 'details' ? (
                <Grid>
                  <Divider />
                  <Grid item xs={12} container justifyContent="center">
                    <Box py={2}>
                      <Chip
                        onClick={() => setView('all')}
                        label="Close"
                        icon={<Close />}
                        color="error"
                        size="small"
                      />
                    </Box>
                  </Grid>
                  <SocialDetails data={dataa} />
                </Grid>
              ) : (
                <SocialCards action={handleData} userId={userId} />
              ))}

            {currentTab === 'notifications' &&
              (view === 'details' ? (
                <Grid>
                  <Divider />
                  <Grid item xs={12} container justifyContent="center">
                    <Box py={2}>
                      <Chip
                        onClick={() => setView('all')}
                        label="Close"
                        icon={<Close />}
                        color="error"
                        size="small"
                      />
                    </Box>
                  </Grid>
                  <NotificationDetails data={dataa} />
                </Grid>
              ) : (
                <NotificationCards action={handleData} userId={userId} />
              ))}

            {currentTab === 'bills' && <SecurityTab />}
            {currentTab === 'security' && <SecurityTab userId={userId} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ManagementUserSettings;
