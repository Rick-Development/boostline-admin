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
import { Link } from 'react-router-dom';
import useSocials from 'src/hooks/useSocials';

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
    name: string;
    provider: string;
    sms: any;
    status: string;
    type: string;
    user_id: number;
  };
}

export default function ActivationDetails({ data: initData }: any) {
  const {
    data: smsData,
    loading,
    error,
    refetch
  } = useSocials(initData?.service_id);

  const [data, setData] = useState<any | null>(initData);

  useEffect(() => {
    if (smsData) {
      setData(smsData?.data);
    }
  }, [smsData]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
            alt={capitalizeFirstLetter(data?.name)}
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
                {capitalizeFirstLetter(data?.name)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                User ID - {data?.user_id}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Divider sx={{ my: 3, mb: 4 }} />

      {/* Transaction Info */}
      {loading ? (
        <>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
        </>
      ) : (
        <Box>
          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1" fontWeight={800}>
              <strong>Service ID:</strong>
            </Typography>
            <Typography>{data?.service_id}</Typography>
          </Box>

          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">
              <strong>Category:</strong>
            </Typography>
            <Typography>{data?.category}</Typography>
          </Box>

          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">
              <strong>Price:</strong>
            </Typography>
            <Typography>
              N{Number(data?.price)?.toLocaleString() || 'nill'}
            </Typography>
          </Box>

          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">
              <strong>Provider:</strong>
            </Typography>
            <Typography>{data?.service}</Typography>
          </Box>
        </Box>
      )}

      {loading ? (
        <>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="60%" />
        </>
      ) : (
        <>
          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">
              <strong>Creation Date:</strong>
            </Typography>
            <Typography>
              {format(new Date(data?.createdAt), 'MMM dd, yyyy h:mm a')}
            </Typography>
          </Box>

          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">
              <strong>Last Update Date:</strong>
            </Typography>
            <Typography>
              {format(new Date(data?.updatedAt), 'MMM dd, yyyy h:mm a')}
            </Typography>
          </Box>
        </>
      )}

      <Divider sx={{ my: 2 }} />
      <Divider sx={{ my: 2 }} />

      {/* Date and Expiry */}
      {loading ? (
        <>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="60%" />
        </>
      ) : (
        <>
          {/* <Typography gutterBottom my={3} fontWeight={800} variant="h4">
            Service Details:
          </Typography> */}
          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">
              <strong>Start Count At:</strong>
            </Typography>
            <Typography>
              {data?.start_count?.toLocaleString() || 'nill'}
            </Typography>
          </Box>

          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">
              <strong>Requested Volume:</strong>
            </Typography>
            <Typography>{data?.volume?.toLocaleString() || 'nill'}</Typography>
          </Box>
          <Box
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">
              <strong>Remaining:</strong>
            </Typography>
            <Typography>{data?.remains?.toLocaleString() || 'nill'}</Typography>
          </Box>
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
              data?.status.toLowerCase() === 'completed'
                ? 'Completed'
                : data?.status.charAt(0).toUpperCase() + data?.status.slice(1)
            }
            color={
              data?.status.toLowerCase() === 'completed'
                ? 'success'
                : data?.status.toLowerCase() === 'pending' ||
                  data?.status.toLowerCase() === 'processing'
                ? 'warning'
                : data?.status.toLowerCase() === 'in progress'
                ? 'info'
                : 'error'
            }
            size="small"
          />
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* SMS Details */}
      {!loading && data?.link && (
        <Box sx={{ my: 3 }}>
          <Typography gutterBottom mb={3} fontWeight={800} variant="h4">
            Service Link:
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
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
            >
              <a href={data?.link} target="_blank" rel="noopener noreferrer">
                {data?.link}
              </a>
            </Typography>
          </Box>
        </Box>
      )}

      {!loading &&
        (data?.status.toLowerCase() === 'pending' ||
          data?.status.toLowerCase() === 'in progress' ||
          data?.status.toLowerCase() === 'processing') && (
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
