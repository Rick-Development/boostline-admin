import { useEffect, useRef, useState } from 'react';

import { Navigate, NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import useUserData from 'src/hooks/useAdminData';
import { Mail } from '@mui/icons-material';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const users = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Project Manager'
  };

  const { userData, loading, error } = useUserData();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={`${user?.firstName} ${user?.lastName}`}
          src={users.avatar}
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {user?.firstName} for {user?.lastName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.type}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            variant="rounded"
            alt={`${user?.firstName} ${user?.firstName}`}
            src={users.avatar}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {user?.firstName} {user?.firstName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.type}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem
            button
            to={`/management/profile/settings?user=${user?.id}`}
            component={NavLink}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem button to="/mail" component={NavLink}>
            <Mail fontSize="small" />
            <ListItemText primary="Send Mail" />
          </ListItem>
          <ListItem button to="/system" component={NavLink}>
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="App Settings" />
          </ListItem>
        </List>
        <Divider />

        <ListItem onClick={handleLogout}>
          <Box sx={{ m: 1 }}>
            <Button color="primary" fullWidth onClick={handleLogout}>
              <LockOpenTwoToneIcon sx={{ mr: 1 }} />
              Sign out
            </Button>
          </Box>
        </ListItem>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
