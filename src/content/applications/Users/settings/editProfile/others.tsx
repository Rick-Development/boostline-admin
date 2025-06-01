import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, List } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { RenderTextField } from '../components/renderTextField';

export const Others = ({
  isEditingOther,
  handleCancel,
  handleEdit,
  handleSave,
  initialUserData,
  loading = false
}) => {
  const [userData, setUserData] = useState(initialUserData || {});
  const [originalUserData, setOriginalUserData] = useState(
    initialUserData || {}
  );
  useEffect(() => {
    setUserData(initialUserData);
    setOriginalUserData(initialUserData);
  }, [initialUserData]);

  const handleSaveClick = () => {
    const payload = Object.keys(userData).reduce((acc, key) => {
      if (userData[key] !== originalUserData[key]) {
        acc[key] = userData[key];
      }
      return acc;
    }, {});

    handleSave('others', payload);
  };
  return (
    <List>
      <Grid container spacing={0}>
        <RenderTextField
          label={'Referral Commission'}
          value={userData?.referral_commision}
          fieldKey={'referral_commision'}
          editable={isEditingOther}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Last Login'}
          value={userData?.last_login}
          fieldKey={'last_login'}
          editable={false}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Last Update'}
          value={userData?.updatedAt}
          fieldKey={'updatedAt'}
          editable={false}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Registration Date'}
          value={userData?.createdAt}
          fieldKey={'registeredAt'}
          editable={false}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
      </Grid>

      <Box display="flex" justifyContent="space-between" mt={5}>
        {isEditingOther ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleCancel('other')}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditTwoToneIcon />}
            onClick={() => handleEdit('other')}
          >
            Edit
          </Button>
        )}
        {isEditingOther && (
          <Button
            variant="contained"
            disabled={loading}
            color="primary"
            onClick={handleSaveClick}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        )}
      </Box>
    </List>
  );
};
