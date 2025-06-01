import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
  Skeleton,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Chip,
  Grid,
  List
} from '@mui/material';

import { Fragment, useEffect, useState } from 'react';
import useUserData from 'src/hooks/useUserData';
import {
  Preview,
  LockOpen,
  AccountBalance,
  AssuredWorkload,
  AltRoute,
  ArrowForwardIos,
  AccountCircle
} from '@mui/icons-material';
import { Personal } from './editProfile/personal';
import { Account } from './editProfile/account';
import { Banking } from './editProfile/banking';
import { Others } from './editProfile/others';
import { Overview } from './editProfile/overview';
import { Login } from './editProfile/login';
import useUpdateUser from 'src/hooks/useUpdateUser';

interface UserDetailsProps {
  userId?: any;
}

const QuickView = ({ userId }: UserDetailsProps) => {
  const { updateUser, loading: updateLoading } = useUpdateUser();
  const [meta, setMeta] = useState<any | null>(null);
  const { user, loading, error } = useUserData(null, null, null, userId);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingLogin, setIsEditingLogin] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingBanking, setIsEditingBanking] = useState(false);
  const [isEditingOther, setIsEditingOther] = useState(false);

  const [userData, setUserData] = useState<any>();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user?.meta) {
      setMeta(user.meta);
    }

    if (user) {
      setUserData(user?.data);
    }
  }, [user, userId]);

  const [backupData, setBackupData] = useState({ ...userData });

  const handleFormToggle = (product: any) => {
    if (selectedProduct?.name === product.name) {
      setSelectedProduct(null);
      setFormData({});
    } else {
      setSelectedProduct(product);
      // try {
      //   const parsedData = JSON.parse(product.value);
      //   setFormData(parsedData);
      // } catch (error) {
      //   console.error('Error parsing JSON', error);
      // }
    }
  };

  const handleEdit = (section) => {
    setBackupData({ ...userData });
    if (section === 'personal') setIsEditingPersonal(true);
    if (section === 'login') setIsEditingLogin(true);
    if (section === 'account') setIsEditingAccount(true);
    if (section === 'banking') setIsEditingBanking(true);
    if (section === 'other') setIsEditingOther(true);
  };

  const handleCancel = (section) => {
    setUserData(backupData);
    if (section === 'personal') setIsEditingPersonal(false);
    if (section === 'login') setIsEditingLogin(false);
    if (section === 'account') setIsEditingAccount(false);
    if (section === 'banking') setIsEditingBanking(false);
    if (section === 'other') setIsEditingOther(false);
  };

  const handleSave = async (section: any, payload: any) => {
    await updateUser(userId, payload);

    // Add API call to save user data
    if (section === 'personal') setIsEditingPersonal(false);
    if (section === 'login') setIsEditingLogin(false);
    if (section === 'account') setIsEditingAccount(false);
    if (section === 'banking') setIsEditingBanking(false);
    if (section === 'other') setIsEditingOther(false);
  };

  const Menu = [
    {
      name: 'Overview',
      desc: 'General Account Overview',
      section: 'overview',
      card: <Overview meta={meta} />,
      icon: <Preview />
    },
    {
      name: 'Personal Details',
      desc: 'Manage personal details',
      section: 'personal',
      card: (
        <Personal
          loading={updateLoading}
          isEditingPersonal={isEditingPersonal}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleSave={handleSave}
          initialUserData={userData}
        />
      ),
      icon: <AccountCircle />
    },
    {
      name: 'Login & Security',
      desc: 'Manage login credentials',
      section: 'login',
      card: (
        <Login
          loading={updateLoading}
          isEditingLogin={isEditingLogin}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleSave={handleSave}
          initialUserData={userData}
        />
      ),
      icon: <LockOpen />
    },
    {
      name: 'Account & Balance',
      desc: 'Manage account status',
      section: 'account',
      card: (
        <Account
          loading={updateLoading}
          isEditingAccount={isEditingAccount}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleSave={handleSave}
          initialUserData={userData}
          rawData={userData}
        />
      ),
      icon: <AccountBalance />
    },
    {
      name: 'Banking Details',
      desc: 'Manage your banking details',
      section: 'banking',
      card: (
        <Banking
          loading={updateLoading}
          isEditingBanking={isEditingBanking}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleSave={handleSave}
          initialUserData={userData}
        />
      ),
      icon: <AssuredWorkload />
    },
    {
      name: 'Others',
      desc: 'Additional account details',

      section: 'others',
      card: (
        <Others
          loading={updateLoading}
          isEditingOther={isEditingOther}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleSave={handleSave}
          initialUserData={userData}
        />
      ),
      icon: <AltRoute />
    }
  ];

  if (loading) {
    return (
      <Card>
        <CardHeader
          title={<Skeleton width={200} />}
          subheader={<Skeleton width={150} />}
        />
        <Divider />
        <Box px={2} py={4} display="flex" alignItems="flex-start">
          <Skeleton variant="circular" width={56} height={56} />
          <Box pl={2} flex={1}>
            <Skeleton width="40%" />
            <Box pt={2} display="flex">
              <Box pr={8}>
                <Skeleton width={50} />
                <Skeleton width={30} />
              </Box>
              <Box>
                <Skeleton width={50} />
                <Skeleton width={30} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="center" py={2}>
          <Skeleton width={100} />
        </Box>
      </Card>
    );
  }

  if (!meta) {
    return (
      <Typography variant="body2">No recent activity available.</Typography>
    );
  }

  return (
    <Card
      sx={{
        py: 3
      }}
    >
      <List>
        {Menu.map((data) => (
          <Fragment key={data?.section}>
            <ListItem
              // button
              alignItems="center"
              onClick={() => handleFormToggle(data)}
              sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              >
                <ListItemAvatar>
                  <Avatar>{data.icon}</Avatar>
                </ListItemAvatar>
                <Box onClick={() => handleFormToggle(data)}>
                  <Typography variant="h4" gutterBottom>
                    {data?.name}
                  </Typography>
                  {/* <Typography variant="subtitle2">{data?.desc}</Typography> */}
                </Box>
              </Box>
              <ArrowForwardIos sx={{ fontSize: 15 }} />
            </ListItem>
            {selectedProduct?.section === data?.section && (
              <Box
                p={2}
                mt={2}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2
                }}
              >
                <Grid item xs={12} md={8}>
                  <Box>
                    <Box>{data.card}</Box>
                  </Box>
                </Grid>
              </Box>
            )}
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
    </Card>
  );
};

export default QuickView;
