import { Box, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

interface Render {
  label?: string;
  rawValue?: string | number;
  value?: string | number;
  fieldKey?: string;
  editable?: boolean | string;
  options?: { label: string; value: string | number }[]; // Options for the select
  userData?: any;
  setUserData: (data: any) => void;
}

export const RenderSelectField = ({
  label,
  value,
  fieldKey,
  editable,
  options = [],
  userData,
  setUserData,
  rawValue
}: Render) => {
  // Initialize state for the selected value
  const [selectedValue, setSelectedValue] = useState<any>(value);

  useEffect(() => {
    // Update the selected value if it's not editable
    if (!editable) {
      setSelectedValue(value);
    }
  }, [value, editable]);

  const handleChange = (e: SelectChangeEvent<any>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue); // Update selected value locally
    setUserData({ ...userData, [fieldKey]: newValue }); // Update in userData
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} sm={4} md={3}>
        <Box pr={3} mt={3}>
          {label}:
          {editable && (
            <Typography variant="body2" component="span">
              {' '}
              {rawValue}
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        {editable ? (
          <Select fullWidth value={selectedValue} onChange={handleChange}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography>
            <b>{value || 'N/A'}</b>
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
