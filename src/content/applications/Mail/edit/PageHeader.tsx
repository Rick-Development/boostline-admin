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
import { AccountCircle, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import useQuery from 'src/hooks/useQuery';

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

const PageHeader = ({ viewMode, userId }: Header) => {
  const navigate = useNavigate();

  return (
    <>
      <Box display="flex" mb={2}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Edit Mail
          </Typography>
          <Typography variant="subtitle2">
            You are currently editing mail: {viewMode}
          </Typography>
        </Box>
      </Box>

      {/* Align the button to the right */}

      {userId ? (
        <Grid container justifyContent="flex-end" mb={3}>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              onClick={() =>
                navigate(`/management/profile/settings?user=${userId}`)
              }
              startIcon={<AccountCircle fontSize="small" />}
            >
              View Author
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="flex-end" mb={3}>
          <Grid item>
            <Button
              onClick={() => navigate(`/mail/compose`)}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<Edit fontSize="small" />}
            >
              Compose
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PageHeader;
