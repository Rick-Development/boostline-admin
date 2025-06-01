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
import { AccountCircle, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

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
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            App & Site Settings
          </Typography>
          <Typography variant="subtitle2">All your settings is here</Typography>
        </Box>
      </Box>

      {/* Align the button to the right */}

      <Grid container justifyContent="flex-end" mb={3}>
        <Grid item>
          <Button
            onClick={() => {
              toast.dismiss();
              toast('Feature is Coming Soon...', {
                style: {
                  background: 'orange',
                  color: 'white'
                }
              });
            }}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<Edit fontSize="small" />}
          >
            Add Settings
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PageHeader;
