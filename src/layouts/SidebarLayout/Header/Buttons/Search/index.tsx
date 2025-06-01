import { forwardRef, Ref, useState, ReactElement, ChangeEvent } from 'react';
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Theme,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import useUserData from 'src/hooks/useUserData';
import { useNavigate } from 'react-router';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
  .MuiDialog-container {
    height: auto;
  }
  
  .MuiDialog-paperScrollPaper {
    max-height: calc(100vh - 64px);
  }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
  background: ${theme.colors.alpha.white[100]};

  .MuiInputBase-input {
    font-size: ${theme.typography.pxToRem(17)};
  }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
  background: ${theme.colors.alpha.black[5]};
  padding: ${theme.spacing(3)};
`
);

function HeaderSearch() {
  const navigate = useNavigate();
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
    setOpenSearchResults(event.target.value.length > 0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { users, loading, error } = useUserData(0, 5, searchValue);

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search users here..."
            fullWidth
            label="Search"
          />
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2" component="span">
                Search results for{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                  component="span"
                >
                  {searchValue}
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />

            {loading && (
              <List disablePadding>
                {Array.from(new Array(5)).map((_, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Skeleton variant="circular">
                        <Avatar />
                      </Skeleton>
                    </ListItemAvatar>
                    <Box flex="1">
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}

            {error && (
              <Typography color="error" align="center" variant="body2">
                {error}
              </Typography>
            )}

            {!loading && !error && users.length > 0 && (
              <List disablePadding>
                {users.map((user: any) => (
                  <ListItem key={user.id}>
                    <Hidden>
                      <ListItemAvatar>
                        <Avatar
                          alt={`${user.fname} ${user.lname}`}
                          src={
                            user.profilePicture ||
                            '/static/images/avatar/default.jpg'
                          }
                        />
                      </ListItemAvatar>
                    </Hidden>
                    <Box
                      flex="1"
                      onClick={() => {
                        setOpen(false);
                        navigate(
                          `/management/profile/settings?user=${user.id}`
                        );
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Link
                          href="#"
                          underline="hover"
                          sx={{ fontWeight: 'bold' }}
                          variant="body2"
                        >
                          {user.fname} {user.lname}
                        </Link>
                      </Box>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          color: (theme: Theme) =>
                            lighten(theme.palette.secondary.main, 0.5)
                        }}
                      >
                        {user.email}
                      </Typography>
                    </Box>
                    <ChevronRightTwoToneIcon />
                  </ListItem>
                ))}
              </List>
            )}
            {!loading && error && (
              <Typography align="center" variant="body2">
                {error}
              </Typography>
            )}
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box
              sx={{ textAlign: 'center' }}
              onClick={() => {
                setOpen(false);
                navigate(`/management/users`);
              }}
            >
              <Button color="primary">View all users</Button>
            </Box>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
