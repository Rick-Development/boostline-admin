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
import {
  RenderTextField
  // renderTextField
} from '../components/renderTextField';
import { RenderSelectField } from '../components/renderSelect';

export const Account = ({
  isEditingAccount,
  handleCancel,
  handleEdit,
  handleSave,
  initialUserData,
  rawData: realRaw = null,
  loading = false
}) => {
  const [userData, setUserData] = useState(initialUserData || {});
  const [originalUserData, setOriginalUserData] = useState(
    initialUserData || {}
  );

  const [rawData, setRawData] = useState<any>(realRaw);
  useEffect(() => {
    setUserData(initialUserData);
    setOriginalUserData(initialUserData);
    setRawData(realRaw);
  }, [initialUserData, realRaw]);

  const handleSaveClick = () => {
    const payload = Object.keys(userData).reduce((acc, key) => {
      if (userData[key] !== originalUserData[key]) {
        acc[key] = userData[key];
      }
      return acc;
    }, {});

    handleSave('account', payload);
  };

  return (
    <List>
      <Grid container spacing={0}>
        <RenderSelectField
          label={'Status'}
          value={userData?.status}
          fieldKey={'status'}
          editable={isEditingAccount}
          userData={userData}
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Disabled', value: 'disabled' },
            { label: 'Deleted', value: 'deleted' }
          ]}
          setUserData={setUserData}
        />
        <RenderSelectField
          label={'Email Verified?'}
          value={userData?.email_verified}
          fieldKey={'email_verified'}
          editable={isEditingAccount}
          userData={userData}
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          setUserData={setUserData}
        />
        <RenderSelectField
          label={'Role'}
          value={userData?.type}
          fieldKey={'type'}
          editable={isEditingAccount}
          userData={userData}
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Moderator', value: 'mod' },
            { label: 'User', value: 'user' }
          ]}
          setUserData={setUserData}
        />
        <RenderSelectField
          label={'KYC Verified'}
          value={userData?.kyc_verified}
          fieldKey={'kyc_verified'}
          editable={isEditingAccount}
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ]}
          userData={userData}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Current Balance'}
          value={userData?.balance}
          rawValue={rawData?.balance}
          fieldKey={'balance'}
          editable={isEditingAccount}
          showBalance={true}
          userData={userData}
          setUserData={setUserData}
        />
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={5}>
        {isEditingAccount ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleCancel('account')}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditTwoToneIcon />}
            onClick={() => handleEdit('account')}
          >
            Edit
          </Button>
        )}
        {isEditingAccount && (
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
