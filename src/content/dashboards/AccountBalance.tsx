import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Skeleton
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  ConnectWithoutContact,
  OnlinePrediction,
  People,
  PhonelinkRing
} from '@mui/icons-material';
import useStatistics from 'src/hooks/useStatistics';
import { useEffect, useState } from 'react';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

const AccountBalance = () => {
  const { statistics, loading, error } = useStatistics();

  const [stats, setStats] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (statistics) {
      setStats(statistics);
    }
  }, [statistics]);

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if (typeof val === 'number') {
          return val.toFixed(2) + '%';
        } else if (typeof val === 'string') {
          return parseFloat(val).toFixed(2) + '%';
        } else if (Array.isArray(val)) {
          return val
            .map((num: any) => parseFloat(num).toFixed(2) + '%')
            .join(', ');
        }
        return val + '%'; // Fallback for any unexpected types
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['Users', 'Activations', 'Social', 'Bills'],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [
    stats?.users?.total || 0,
    stats?.activations?.total || 0,
    stats?.socials?.total || 0,
    0
  ];

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            {loading ? (
              <>
                <Skeleton variant="text" width="30%" height={30} />
                <Skeleton variant="text" width="100%" height={40} />
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="rectangular" height={250} sx={{ my: 4 }} />
              </>
            ) : (
              <Box>
                <Typography sx={{ pb: 3 }} variant="h4">
                  Users Balance
                </Typography>
                <Typography variant="h1" gutterBottom>
                  N
                  {(stats?.users?.balance?.toFixed(2) &&
                    parseFloat(
                      stats.users?.balance.toFixed(2)
                    ).toLocaleString()) ||
                    '0.00'}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="normal"
                  color="text.secondary"
                >
                  {stats?.users?.usersWithBalance.toLocaleString() || 0} users
                  with balance
                </Typography>
                <Box display="flex" sx={{ py: 4 }} alignItems="center">
                  <AvatarSuccess sx={{ mr: 2 }} variant="rounded">
                    <TrendingUp fontSize="large" />
                  </AvatarSuccess>
                  <Box>
                    <Typography variant="h4">
                      + N
                      {(stats?.transactions?.thisMonth?.toFixed(2) &&
                        parseFloat(
                          stats.transactions.thisMonth.toFixed(2)
                        ).toLocaleString()) ||
                        '0.00'}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      Deposits this month
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={3}>
                  <Grid sm item>
                    <Button fullWidth variant="outlined">
                      Send
                    </Button>
                  </Grid>
                  <Grid sm item>
                    <Button fullWidth variant="contained">
                      Receive
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid
          sx={{ position: 'relative' }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{ display: { xs: 'none', md: 'inline-block' } }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {loading ? (
                  <Skeleton variant="rectangular" width={250} height={250} />
                ) : (
                  <Chart
                    height={250}
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                  />
                )}
              </Grid>
              <Grid
                xs={12}
                sm={7}
                p={2}
                item
                display="flex"
                alignItems="center"
              >
                <List disablePadding sx={{ width: '100%' }}>
                  {loading ? (
                    [...Array(4)].map((_, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemAvatar>
                          <Skeleton variant="circular" width={40} height={40} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Skeleton variant="text" width="80%" />}
                          secondary={<Skeleton variant="text" width="60%" />}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <>
                      <ListItem disableGutters>
                        <ListItemAvatarWrapper>
                          <People color="warning" fontSize="large" />
                        </ListItemAvatarWrapper>
                        <ListItemText
                          primary="Total users"
                          primaryTypographyProps={{
                            variant: 'h5',
                            noWrap: true
                          }}
                          secondaryTypographyProps={{
                            variant: 'subtitle2',
                            noWrap: true
                          }}
                        />
                        <Box>
                          <Typography align="right" variant="h4" noWrap>
                            {stats?.users?.total.toLocaleString() || 0}
                          </Typography>
                        </Box>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemAvatarWrapper>
                          <PhonelinkRing color="info" fontSize="large" />
                        </ListItemAvatarWrapper>
                        <ListItemText
                          primary="Total Activations"
                          primaryTypographyProps={{
                            variant: 'h5',
                            noWrap: true
                          }}
                          secondaryTypographyProps={{
                            variant: 'subtitle2',
                            noWrap: true
                          }}
                        />
                        <Box>
                          <Typography align="right" variant="h4" noWrap>
                            {stats?.activations?.total.toLocaleString() || 0}
                          </Typography>
                        </Box>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemAvatarWrapper>
                          <ConnectWithoutContact fontSize="large" />
                        </ListItemAvatarWrapper>
                        <ListItemText
                          primary="Total Socials"
                          primaryTypographyProps={{
                            variant: 'h5',
                            noWrap: true
                          }}
                          secondaryTypographyProps={{
                            variant: 'subtitle2',
                            noWrap: true
                          }}
                        />
                        <Box>
                          <Typography align="right" variant="h4" noWrap>
                            {stats?.socials?.total.toLocaleString() || 0}
                          </Typography>
                        </Box>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemAvatarWrapper>
                          <OnlinePrediction color="primary" fontSize="large" />
                        </ListItemAvatarWrapper>
                        <ListItemText
                          primary="Total Bill Payments"
                          primaryTypographyProps={{
                            variant: 'h5',
                            noWrap: true
                          }}
                          secondaryTypographyProps={{
                            variant: 'subtitle2',
                            noWrap: true
                          }}
                        />
                        <Box>
                          <Typography align="right" variant="h4" noWrap>
                            0
                          </Typography>
                        </Box>
                      </ListItem>
                    </>
                  )}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AccountBalance;
