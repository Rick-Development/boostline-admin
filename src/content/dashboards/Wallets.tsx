import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled,
  Skeleton
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {
  ConnectWithoutContact,
  OnlinePrediction,
  Paid,
  People,
  PhonelinkRing
} from '@mui/icons-material';
import useStatistics from 'src/hooks/useStatistics';
import { useEffect, useState } from 'react';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
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

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

const Wallets = () => {
  const { statistics, loading, error } = useStatistics();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (statistics) {
      setStats(statistics);
    }
  }, [statistics]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Statistics</Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add new user
        </Button>
      </Box>
      <Grid container spacing={3}>
        {loading &&
          [...Array(4)].map((_, index) => (
            <Grid xs={12} sm={6} md={3} item key={index}>
              <Card sx={{ px: 1 }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AvatarWrapper>
                    <Skeleton variant="circular" width={56} height={56} />
                  </AvatarWrapper>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Box
                    sx={{
                      pt: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Skeleton variant="text" width="50%" height={40} />
                    <Skeleton variant="text" width="30%" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        {!loading && (
          <>
            <Grid xs={12} sm={6} md={3} item>
              <Card
                sx={{
                  px: 1
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AvatarWrapper>
                    <People color="warning" fontSize="large" />
                  </AvatarWrapper>
                  <Typography variant="h5" noWrap>
                    User Stats
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {stats?.users?.total.toLocaleString() || 0} total users
                  </Typography>
                  <Box
                    sx={{
                      pt: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="h3" gutterBottom noWrap>
                      N
                      {(stats?.users?.balance?.toFixed(2) &&
                        parseFloat(
                          stats.users.balance.toFixed(2)
                        ).toLocaleString()) ||
                        '0.00'}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {stats?.users?.active.toLocaleString() || 0} active users
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={3} item>
              <Card
                sx={{
                  px: 1
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AvatarWrapper>
                    <Paid color="primary" fontSize="large" />
                  </AvatarWrapper>
                  <Typography variant="h4" noWrap>
                    Transaction Stats
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {stats?.transactions?.total.toLocaleString() || 0} total
                    transactions
                  </Typography>
                  <Box
                    sx={{
                      pt: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="h3" gutterBottom noWrap>
                      N
                      {(stats?.transactions?.amount?.toFixed(2) &&
                        parseFloat(
                          stats.transactions.amount.toFixed(2)
                        ).toLocaleString()) ||
                        '0.00'}
                    </Typography>
                    <Typography variant="subtitle2">
                      N
                      {(stats?.transactions?.deposit?.toFixed(2) &&
                        parseFloat(
                          stats.transactions.deposit.toFixed(2)
                        ).toLocaleString()) ||
                        '0.00'}{' '}
                      total deposits
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={3} item>
              <Card
                sx={{
                  px: 1
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AvatarWrapper>
                    <PhonelinkRing color="info" fontSize="large" />
                  </AvatarWrapper>
                  <Typography variant="h5" noWrap>
                    Activation Stats
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {stats?.activations?.total.toLocaleString() || 0} total
                    activations
                  </Typography>
                  <Box
                    sx={{
                      pt: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="h3" gutterBottom noWrap>
                      N
                      {(stats?.activations?.priceTotal?.toFixed(2) &&
                        parseFloat(
                          stats.activations.priceTotal.toFixed(2)
                        ).toLocaleString()) ||
                        '0.00'}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {stats?.activations?.completed.toLocaleString() || 0}{' '}
                      codes received
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={3} item>
              <Card
                sx={{
                  px: 1
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AvatarWrapper>
                    <ConnectWithoutContact color="secondary" fontSize="large" />
                  </AvatarWrapper>
                  <Typography variant="h5" noWrap>
                    Social Stats
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {stats?.socials?.total.toLocaleString() || 0} total social
                    bundles
                  </Typography>
                  <Box
                    sx={{
                      pt: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="h3" gutterBottom noWrap>
                      N
                      {(stats?.socials?.priceTotal?.toFixed(2) &&
                        parseFloat(
                          stats.socials.priceTotal.toFixed(2)
                        ).toLocaleString()) ||
                        '0.00'}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {stats?.socials?.completed.toLocaleString() || 0}{' '}
                      completed
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Click to add a new statistics">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1
                }}
              >
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default Wallets;
