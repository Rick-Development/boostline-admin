import { AccountBalanceWallet } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.primary.lighter};
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(5)};  // Reduced size
    height: ${theme.spacing(5)};  // Reduced size
`
);

export const Overview = ({ meta }) => {
  const theme = useTheme();

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {Object.entries(meta).map(([key, value]) => (
        <div key={key}>
          <Box px={2} py={2} display="flex" alignItems="flex-start">
            <AvatarPrimary>
              {key === 'balance' ? (
                <AccountBalanceWallet />
              ) : (
                <ShoppingBagTwoToneIcon />
              )}
            </AvatarPrimary>

            <Box pl={2} flex={1}>
              {/* Capitalize the first letter of the key */}
              <Typography variant="h4">{capitalizeFirstLetter(key)}</Typography>
              <Box pt={2} display="flex" justifyContent="space-between">
                {Object.entries(value).map(([k, v], index) => {
                  return (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      justifyContent="center"
                      style={{ height: '100%' }}
                    >
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{
                          fontSize: `${theme.typography.pxToRem(14)}`,
                          textAlign: 'center'
                        }}
                      >
                        {k}
                      </Typography>
                      <Typography
                        variant="h4"
                        // mr={2}
                        sx={{
                          display: 'flex',
                          alignItems: 'left',
                          height: '100%'
                        }}
                      >
                        {Number(v).toLocaleString()}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Divider />
        </div>
      ))}
    </>
  );
};
