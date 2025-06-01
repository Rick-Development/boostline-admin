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

const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box display="flex" mb={2}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Create Page
          </Typography>
          <Typography variant="subtitle2">
            Creating new page is now seamless
          </Typography>
        </Box>
      </Box>
      {/* Align the button to the right */}
      <Grid container justifyContent="flex-end" mb={3}>
        <Grid item>
          <Button
            onClick={() => navigate(`/management/pages`)}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
          >
            See All Pages
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PageHeader;
