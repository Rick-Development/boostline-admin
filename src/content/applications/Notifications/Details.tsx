import { format } from 'date-fns';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Chip,
  Skeleton
} from '@mui/material';
import { useEffect, useState } from 'react';
import useNotification from 'src/hooks/useNotification';

interface ActivationDetailsProps {
  data: {
    id: number;
    img: string;
    type: string;
    user_id: number;
    time: string;
  };
}

export default function Details({ data: initData }: ActivationDetailsProps) {
  const { data: smsData, loading } = useNotification(initData?.id);
  const [data, setData] = useState<any | null>(initData);

  useEffect(() => {
    if (smsData) {
      setData(smsData.data);
    }
  }, [smsData]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Box
      my={5}
      sx={{
        padding: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: '600px'
      }}
    >
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
            alt={capitalizeFirstLetter(data?.type)}
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
                {capitalizeFirstLetter(data?.type)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                User ID - {data?.user_id}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />

      {loading ? (
        <>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="60%" />
        </>
      ) : (
        <Typography variant="body2" color="textSecondary" mb={3}>
          <strong>Date:</strong>{' '}
          {format(new Date(data?.time), 'MMM dd, yyyy h:mm a')}
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

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
            label={data?.seen === 1 ? 'Read' : 'Unread'}
            color={data?.seen === 1 ? 'success' : 'warning'}
            size="small"
          />
        </Box>
      )}
      <Divider sx={{ my: 2 }} />

      {!loading && (
        <Box sx={{ my: 3 }}>
          <Typography gutterBottom mb={3} fontWeight={800} variant="h4">
            Details
          </Typography>
          <Box
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
              Sender: {data.text}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
