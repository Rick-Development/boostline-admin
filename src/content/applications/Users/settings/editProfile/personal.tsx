import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  TextField,
  Typography
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { RenderTextField } from '../components/renderTextField';
import { RenderSelectField } from '../components/renderSelect';

export const Personal = ({
  isEditingPersonal,
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

    handleSave('personal', payload);
  };

  return (
    <List>
      <Grid container spacing={0}>
        <RenderTextField
          label={'First Name'}
          value={userData?.fname}
          fieldKey={'fname'}
          editable={isEditingPersonal}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Last Name'}
          value={userData?.lname}
          fieldKey={'lname'}
          editable={isEditingPersonal}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Phone'}
          value={userData?.phone}
          fieldKey={'phone'}
          editable={isEditingPersonal}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderSelectField
          label={'Gender'}
          value={userData?.gender}
          fieldKey={'gender'}
          editable={isEditingPersonal}
          options={[
            { label: 'Male', value: 'mail' },
            { label: 'Female', value: 'female' }
          ]}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Date of Birth'}
          value={userData?.dob}
          fieldKey={'dob'}
          editable={isEditingPersonal}
          showBalance={undefined}
          userData={userData}
          setUserData={setUserData}
        />
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={5}>
        {/* Left-aligned button */}
        <Box>
          {isEditingPersonal ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleCancel('personal')}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditTwoToneIcon />}
              onClick={() => handleEdit('personal')}
            >
              Edit
            </Button>
          )}
        </Box>

        {/* Right-aligned button */}
        <Box>
          {isEditingPersonal && (
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleSaveClick}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          )}
        </Box>
      </Box>
    </List>
  );
};
