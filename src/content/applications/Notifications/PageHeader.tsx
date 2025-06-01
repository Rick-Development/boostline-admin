import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Button,
  IconButton,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

interface Header {
  data?: any;
  action?: (type: string) => void;
  viewMode?: string;
  userId?: string;
}

const PageHeader = ({ data, action, viewMode, userId }: Header) => {
  const navigate = useNavigate();

  return (
    <>
      <Box display="flex" mb={2}>
        {/* Use viewMode to determine if we should show the 'back' button */}
        {viewMode === 'details' && (
          <Tooltip
            arrow
            placement="top"
            title="Go back"
            onClick={() => action && action('list')}
          >
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
        )}
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Notification Panel
          </Typography>
          <Typography variant="subtitle2">
            You have {data?.data?.total?.toLocaleString()} total Notifications
          </Typography>
        </Box>
      </Box>

      {viewMode !== 'details' ? (
        <Grid container justifyContent="flex-end" mb={3}>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Create new
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="flex-end"
          mb={3}
          onClick={() =>
            navigate(`/management/profile/settings?user=${userId}`)
          }
        >
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AccountCircle fontSize="small" />}
            >
              View User
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PageHeader;
