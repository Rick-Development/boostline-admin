import { Box, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Render {
  label?: string;
  rawValue?: string | number;
  value?: string | number;
  fieldKey?: string;
  editable?: boolean | string;
  showBalance?: boolean;
  userData?: any;
  setUserData: (data: any) => void;
}

export const RenderTextField = ({
  label,
  value,
  fieldKey,
  editable,
  showBalance,
  userData,
  setUserData,
  rawValue
}: Render) => {
  // Initialize balance state based on showBalance conditionally
  const [balance, setBalance] = useState<any>(showBalance ? 0 : value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setBalance(newValue); // Update balance locally
    setUserData({ ...userData, [fieldKey]: newValue }); // Update in userData
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} sm={4} md={3}>
        <Box pr={3} mt={3}>
          {label}:{' '}
          {editable &&
            showBalance &&
            (Number(rawValue) + Number(balance)).toLocaleString()}
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        {editable ? (
          <TextField
            fullWidth
            value={balance}
            onChange={handleChange}
            inputProps={
              showBalance
                ? {
                    inputMode: 'decimal',
                    pattern: '[0-9]*(.[0-9]+)?',
                    step: '0.01'
                  }
                : {}
            }
          />
        ) : (
          <Typography>
            <b>
              {showBalance ? Number(rawValue).toLocaleString() : value || 'N/A'}
            </b>
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
