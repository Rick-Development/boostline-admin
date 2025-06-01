import React, { useEffect, useState } from 'react';
import { Grid, List } from '@mui/material';
import { RenderTextField } from '../components/renderTextField';

export const Banking = ({
  isEditingBanking,
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
  const [banking, setBanking] = useState<any>();
  useEffect(() => {
    if (initialUserData?.bank_account) {
      setBanking(JSON.parse(initialUserData?.bank_account));
    }

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

    handleSave('banking', payload);
  };

  return (
    <List>
      <Grid container spacing={0}>
        <RenderTextField
          label={'Bank Name'}
          value={banking?.bank_name}
          fieldKey={'bank_name'}
          editable={isEditingBanking}
          showBalance={false}
          userData={undefined}
          setUserData={undefined}
        />
        <RenderTextField
          label={'Account Number'}
          value={banking?.account_number}
          fieldKey={'account_number'}
          editable={isEditingBanking}
          showBalance={false}
          userData={banking?.account_number}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Note'}
          value={banking?.note}
          fieldKey={'note'}
          editable={isEditingBanking}
          showBalance={false}
          userData={banking?.note}
          setUserData={setUserData}
        />
        <RenderTextField
          label={'Creation Date'}
          value={banking?.created_at}
          fieldKey={'createion_date'}
          editable={false}
          showBalance={false}
          userData={banking?.created_at}
          setUserData={setUserData}
        />
      </Grid>
      {/* <Box display="flex" justifyContent="space-between" mt={5}>
        {isEditingBanking ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleCancel('banking')}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditTwoToneIcon />}
            onClick={() => handleEdit('banking')}
          >
            Edit
          </Button>
        )}
        {isEditingBanking && (
          <Button
            variant="contained"
            disabled={loading}
            color="primary"
            onClick={handleSaveClick}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        )}
      </Box> */}
    </List>
  );
};
