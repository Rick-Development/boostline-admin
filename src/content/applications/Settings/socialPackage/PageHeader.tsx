import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Tooltip,
  Button,
  IconButton,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { AccountCircle, Loop } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import useGenerateSocials from 'src/hooks/useGenerateSocial';

// Define a type for the props of the rotating loop icon
interface RotatingLoopIconProps extends React.ComponentProps<typeof Loop> {
  loading: boolean;
}

// Create a custom styled component for the rotating loop icon
const RotatingLoopIcon = styled(
  ({ loading, ...other }: RotatingLoopIconProps) => <Loop {...other} />
)(({ loading }: RotatingLoopIconProps) => ({
  transition: 'transform 0.5s ease',
  ...(loading && {
    animation: 'spin 1s linear infinite' // Add spin animation when loading
  }),
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
}));

interface Header {
  data?: any;
  action?: (type: string) => void;
  viewMode?: string;
  userId?: string;
}

const PageHeader = ({ data, action, viewMode, userId }: Header) => {
  const navigate = useNavigate();
  const { loading, generate } = useGenerateSocials();

  return (
    <>
      <Box display="flex" mb={2}>
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
            Social Settings
          </Typography>
          <Typography variant="subtitle2">
            Social Boost settings here
          </Typography>
        </Box>
      </Box>

      {viewMode !== 'details' ? (
        <Grid container justifyContent="flex-end" mb={3}>
          <Grid item>
            <Button
              onClick={() => generate()}
              disabled={loading}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={
                <RotatingLoopIcon loading={loading} fontSize="small" />
              }
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="flex-end" mb={3}>
          <Grid item>
            <Button
              onClick={() =>
                navigate(`/management/profile/settings?user=${userId}`)
              }
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AccountCircle fontSize="small" />}
            >
              View Author
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PageHeader;
