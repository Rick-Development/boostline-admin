import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, List } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { RenderTextField } from '../components/renderTextField';

export const Login = ({
  isEditingLogin,
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

    handleSave('login', payload);
  };

  return (
    <List>
      <Grid container spacing={0}>
        <RenderTextField
          label={'Username'}
          value={userData?.username}
          fieldKey={'username'}
          editable={isEditingLogin}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Email'}
          value={userData?.email}
          fieldKey={'email'}
          editable={isEditingLogin}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Password'}
          value={'******'}
          fieldKey={'password'}
          editable={isEditingLogin}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={5}>
        {isEditingLogin ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleCancel('login')}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditTwoToneIcon />}
            onClick={() => handleEdit('login')}
          >
            Edit
          </Button>
        )}
        {isEditingLogin && (
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
