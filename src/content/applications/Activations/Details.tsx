import { format } from 'date-fns';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Chip,
  Skeleton
} from '@mui/material';
import useCheckSms from 'src/hooks/useCheckSms';
import { useEffect, useState } from 'react';

interface ActivationDetailsProps {
  data: {
    activation_id: string;
    country: string;
    date: string;
    expires: string;
    id: number;
    img: string;
    is_job_running: boolean;
    iso: string;
    operator: string;
    phone: string;
    price: string;
    product: string;
    provider: string;
    sms: any;
    status: string;
    type: string;
    user_id: number;
  };
}

export default function ActivationDetails({
  data: initData
}: ActivationDetailsProps) {
  const { smsData, loading, error, refetch } = useCheckSms(
    initData?.activation_id,
    initData?.provider
  );

  const [data, setData] = useState<any | null>(initData);

  useEffect(() => {
    if (smsData) {
      setData(smsData.data);
    }
  }, [smsData]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const parseSmsData = (sms: any) => {
    try {
      if (typeof sms === 'string') {
        return JSON.parse(sms);
      }
      return sms;
    } catch (e) {
      console.error('Failed to parse SMS data:', e);
      return [];
    }
  };

  const smsDataArray = parseSmsData(data?.sms);

  return (
    <Box
      sx={{
        padding: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: '600px',
        margin: 'auto'
      }}
    >
      {/* Header Section with Avatar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        {loading ? (
          <Skeleton variant="circular" width={56} height={56} />
        ) : (
          <Avatar
            alt={capitalizeFirstLetter(data?.country)}
            src={
              process.env.REACT_APP_API_BASE + data?.img ||
              '/static/images/avatar/default.jpg'
            }
            sx={{ width: 56, height: 56 }}
          />
        )}
        <Box sx={{ textAlign: 'right' }}>
          {loading ? (
            <>
              <Skeleton variant="text" width={150} />
              <Skeleton variant="text" width={100} />
            </>
          ) : (
            <>
              <Typography variant="h6" fontWeight={700}>
                {capitalizeFirstLetter(data?.product)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {capitalizeFirstLetter(data?.country)} -{' '}
                {capitalizeFirstLetter(data?.operator)}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Transaction Info */}
      {loading ? (
        <>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
        </>
      ) : (
        <>
          <Typography variant="body1" gutterBottom mb={3}>
            <strong>User ID:</strong> {data?.user_id}
          </Typography>
          <Typography variant="body1" gutterBottom mb={3}>
            <strong>Activation ID:</strong> {data?.activation_id}
          </Typography>
          <Typography variant="body1" gutterBottom mb={3}>
            <strong>Phone:</strong> {data?.phone}
          </Typography>
          <Typography variant="body1" gutterBottom mb={3}>
            <strong>Price:</strong> N{Number(data?.price).toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom mb={3}>
            <strong>Provider:</strong> {capitalizeFirstLetter(data?.provider)}
          </Typography>
        </>
      )}

      {/* Date and Expiry */}
      {loading ? (
        <>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="60%" />
        </>
      ) : (
        <>
          <Typography variant="body2" color="textSecondary" mb={3}>
            <strong>Activation Date:</strong>{' '}
            {format(new Date(data?.date), 'MMM dd, yyyy h:mm a')}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            <strong>Expiry Date:</strong>{' '}
            {format(new Date(data?.expires), 'MMM dd, yyyy h:mm a')}
          </Typography>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Status */}
      {loading ? (
        <Skeleton variant="rectangular" height={40} width={100} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="body1">
            <strong>Status:</strong>
          </Typography>
          <Chip
            label={
              smsDataArray.length > 0
                ? 'Completed'
                : capitalizeFirstLetter(data?.status)
            }
            color={
              smsDataArray.length > 0
                ? 'success'
                : data?.status === 'pending' || data?.status === 'received'
                ? 'warning'
                : 'error'
            }
          />
        </Box>
      )}
      <Divider sx={{ my: 2 }} />

      {/* SMS Details */}
      {!loading && smsDataArray.length > 0 && (
        <Box sx={{ my: 3 }}>
          <Typography gutterBottom mb={3} fontWeight={800} variant="h4">
            SMS CODE
          </Typography>

          {smsDataArray.map((sms: any, index: number) => (
            <Box
              key={index}
              sx={{
                bgcolor: 'grey.100',
                padding: 2,
                borderRadius: 1,
                boxShadow: 1,
                mb: 2,
                width: '100%',
                maxWidth: '500px'
              }}
            >
              <Typography variant="body1" fontWeight={600} gutterBottom>
                Sender: {sms.sender}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Message: {sms.text}
              </Typography>
              <Typography variant="body1" fontWeight={500} gutterBottom>
                Code: <strong>{sms.code}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Received at: {format(new Date(sms.date), 'MMM dd, yyyy h:mm a')}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Refresh Code Button */}
      {!loading &&
        (data?.status.toLowerCase() === 'pending' ||
          data?.status.toLowerCase() === 'received') && (
          <Box
            onClick={refetch}
            my={5}
            mt={7}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Chip
              label={'Refresh Status'}
              color="primary"
              sx={{
                fontWeight: '800',
                padding: '14px'
              }}
            />
          </Box>
        )}
    </Box>
  );
}
