import { format } from 'date-fns';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Chip,
  Skeleton,
  Button
} from '@mui/material';
import useCheckSms from 'src/hooks/useCheckSms';
import { useEffect, useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import useCreateMail from 'src/hooks/useCreateMail';

interface ActivationDetailsProps {
  data: {
    slug: string;
    title: string;
    updatedAt: string;
    craetedAt: string;
    id: number;
    image: string;
    status: string;
    location: string;
    user_id: number;
  };
}

export default function PageDetails({
  data: initData
}: ActivationDetailsProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(initData);
  const [loading, setLoading] = useState<any | null>(false);

  const { loading: submitLoading, deletePage } = useCreateMail();

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    setData(initData);
  }, [initData]);

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      deletePage({ id: data?.id });
    }
  };

  const recipients = JSON.parse(data?.recipients?.replace(/,\s*$/, ''));

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
            alt={capitalizeFirstLetter(data?.title)}
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
              <Typography variant="body2" color="textSecondary" mb={1}>
                <strong>Created:</strong>{' '}
                {format(new Date(data?.createdAt), 'MMM dd, yyyy h:mm a')}
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={1}>
                <strong>Updated:</strong>{' '}
                {format(new Date(data?.updatedAt), 'MMM dd, yyyy h:mm a')}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Page Title */}
      {loading ? (
        <>
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{
              padding: 1.5,
              paddingX: 2,
              borderRadius: 1,
              boxShadow: 1,
              mb: 1
            }}
          />
        </>
      ) : (
        <>
          <Box sx={{ my: 3 }}>
            <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
              Subject
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.100',
                padding: 1.5,
                paddingX: 2,
                borderRadius: 1,
                boxShadow: 1,
                mb: 1,
                width: '100%',
                maxWidth: '500px',
                height: '100%',
                maxHeight: '200px'
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                dangerouslySetInnerHTML={{
                  __html: capitalizeFirstLetter(data?.title)
                }}
              />
            </Box>
          </Box>
        </>
      )}

      {/* Greetings */}
      {loading ? (
        <>
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{
              padding: 1.5,
              paddingX: 2,
              borderRadius: 1,
              boxShadow: 1,
              mb: 1
            }}
          />
        </>
      ) : (
        <>
          <Box sx={{ my: 3 }}>
            <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
              Greetings
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.100',
                padding: 1.5,
                paddingX: 2,
                borderRadius: 1,
                boxShadow: 1,
                mb: 1,
                width: '100%',
                maxWidth: '500px',
                height: '100%',
                maxHeight: '200px'
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                dangerouslySetInnerHTML={{
                  __html: data?.greetings
                }}
              />
            </Box>
          </Box>
        </>
      )}

      {/* Mail Signature */}
      {loading ? (
        <>
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{
              padding: 1.5,
              paddingX: 2,
              borderRadius: 1,
              boxShadow: 1,
              mb: 1
            }}
          />
        </>
      ) : (
        <>
          <Box sx={{ my: 3 }}>
            <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
              Signature
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.100',
                padding: 1.5,
                paddingX: 2,
                borderRadius: 1,
                boxShadow: 1,
                mb: 1,
                width: '100%',
                maxWidth: '500px',
                height: '100%',
                maxHeight: '200px'
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                dangerouslySetInnerHTML={{
                  __html: data?.signature
                }}
              />
            </Box>
          </Box>
        </>
      )}

      {/* Page Content */}
      {loading ? (
        <>
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            sx={{
              padding: 1.5,
              paddingX: 2,
              borderRadius: 1,
              boxShadow: 1,
              mb: 1
            }}
          />
        </>
      ) : (
        <Box sx={{ my: 3 }}>
          <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
            Body
          </Typography>
          <Box
            sx={{
              bgcolor: 'grey.100',
              padding: 2,
              borderRadius: 1,
              boxShadow: 1,
              mb: 2,
              width: '100%',
              maxWidth: '500px',
              height: '100%',
              maxHeight: '300px',
              overflow: 'scroll'
            }}
          >
            <Typography
              variant="body1"
              gutterBottom
              dangerouslySetInnerHTML={{ __html: data?.body }}
            />
          </Box>
        </Box>
      )}

      {/* Recipients */}
      {loading ? (
        <>
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{
              padding: 1.5,
              paddingX: 2,
              borderRadius: 1,
              boxShadow: 1,
              mb: 1
            }}
          />
        </>
      ) : (
        <>
          <Box sx={{ my: 3 }}>
            <Typography gutterBottom mb={1} fontWeight={800} variant="h4">
              Recipients: ({recipients.length.toLocaleString()})
            </Typography>
            <Box
              sx={{
                bgcolor: 'grey.100',
                padding: 2,
                borderRadius: 1,
                boxShadow: 1,
                mb: 2,
                width: '100%',
                maxWidth: '500px',
                // height: '100%',
                maxHeight: '300px',
                overflow: 'scroll'
              }}
            >
              <Typography variant="body1" gutterBottom>
                {recipients.map((mail) => (
                  <Typography
                    key={mail}
                    variant="body1"
                    gutterBottom
                    sx={{
                      display: 'inline-block', // Ensures the width matches the content
                      bgcolor: 'grey.300',
                      padding: 0.5,
                      paddingX: 1,
                      borderRadius: '50px',
                      marginRight: 1 // Optional: Adds space between elements
                    }}
                  >
                    {mail}
                  </Typography>
                ))}
              </Typography>
            </Box>
          </Box>
        </>
      )}
      <Divider sx={{ my: 2 }} />

      {/* Status */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton
            variant="rectangular"
            width="30%"
            height={30}
            sx={{
              padding: 1.5,
              paddingX: 2,
              borderRadius: 1,
              boxShadow: 1
            }}
          />
        </Box>
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
              data?.status === 'sent'
                ? 'Sent'
                : capitalizeFirstLetter(data?.status)
            }
            color={
              data?.status === 'sent'
                ? 'success'
                : data?.status === 'draft'
                ? 'warning'
                : 'error'
            }
          />
        </Box>
      )}

      {/* Status */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton
            variant="rectangular"
            width="30%"
            height={30}
            sx={{
              padding: 1.5,
              paddingX: 2,
              borderRadius: 1,
              boxShadow: 1
            }}
          />
        </Box>
      ) : (
        <Box
          my={6}
          mt={10}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="button"
            disabled={loading}
            onClick={() => navigate('/mail/edit?id=' + data?.id)}
            sx={{
              width: '50%',
              borderRadius: '50px',
              mr: 2
            }}
          >
            <Edit sx={{ mr: 1 }} /> Resent
          </Button>

          <Button
            variant="contained"
            size="small"
            color="error"
            type="button"
            disabled={submitLoading}
            onClick={handleDelete}
            sx={{
              width: '50%',
              borderRadius: '60px'
            }}
          >
            {submitLoading ? (
              'Deleting...'
            ) : (
              <>
                <Delete sx={{ mr: 1 }} /> Delete mail
              </>
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}
