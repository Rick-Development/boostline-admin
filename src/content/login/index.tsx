import {
  Box,
  Container,
  Card,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  Button,
  Divider
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import { useState, useEffect, useRef } from 'react';
import { LoadingButton } from '@mui/lab';
import { Navigate, useNavigate } from 'react-router';
import { login } from 'src/logic/loginLogic';
import useCheckTokenValidity from 'src/hooks/useCheckTokenValidity';
import SuspenseLoader from 'src/components/SuspenseLoader';
import toast from 'react-hot-toast';

const LoginWrapper = styled(Box)(
  () => `
  overflow: auto;
  flex: 1;
  overflow-x: hidden;
  align-items: center;
`
);

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isValid, error: tokenError } = useCheckTokenValidity();
  const [loadings, setLoadings] = useState(true);

  // Ref to track if component is mounted
  const isMounted = useRef(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (isValid) {
      // setRedirect(true);
      navigate('/dashboard');
    } else {
      setLoadings(false);
    }
  }, [isValid, tokenError]);
  useEffect(() => {
    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    event.preventDefault();

    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const userID = data.get('email');
      const password = data.get('password');
      const deviceToken = 'ExponentPushToken[EBrW7qOqGP_Cmb0z5ZhUVZ]';

      const loginResponse = await login(userID, password, deviceToken);

      if (loginResponse.status === true) {
        localStorage.setItem('accessToken', loginResponse.data.Authorization);
        toast.success(loginResponse.message);
        if (isMounted.current) {
          navigate('/dashboard');
          // setRedirect(true);
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setError(error.message);
        toast.error(error.message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      setError(null); // Reset error state if the component unmounts
    };
  }, []);

  // if (redirect) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid username or email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  if (loadings) {
    return <SuspenseLoader />;
  }
  return (
    <LoginWrapper>
      <Helmet>
        <title>Boostline Admin Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          {/* <Logo /> */}
        </Box>
        <Card variant="outlined" sx={{ p: 4, mb: 10, borderRadius: 2 }}>
          <Logo />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              textAlign: 'center',
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              my: 3
            }}
          >
            Sign in
          </Typography>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              textAlign: 'center',
              width: '100%',
              fontSize: 16,
              lineHeight: 1.5,
              pb: 4,
              color: 'text.secondary'
            }}
            color="text.secondary"
            fontWeight="normal"
          >
            {error ? error : 'Login to access admin panel.'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              loading={loading}
              size="medium"
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              sx={{ py: 1.5 }}
            >
              Sign in
            </LoadingButton>

            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <span>
                <Link
                  href="/auth/signup"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </Container>
    </LoginWrapper>
  );
}
