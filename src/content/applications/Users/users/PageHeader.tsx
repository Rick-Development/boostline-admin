import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
interface Head {
  user?: any;
}
function PageHeader({ user }: Head) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create new User
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
