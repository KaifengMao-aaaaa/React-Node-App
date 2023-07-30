import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { makeRequest } from '../utils/requestWrapper';
import { NotificationManager } from 'react-notifications';
function Copyright (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function SignUp (props) {
  const [otp, setOtp] = React.useState('');
  const [timer, setTimer] = React.useState({
    startDate: new Date(),
    remainingTine: 0
  });
  const [email, setEmail] = React.useState('');
  const history = useNavigate();
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const handleEmail = (value) => {
    setEmail(value.target.value);
  };
  React.useEffect(() => {
    if (timer.remainingTine > 0) {
      setTimer({
        remainingTine: timer.remainingTine - (Math.abs((new Date() - timer.startDate) / 1000)),
        startDate: new Date()
      });
    }
  }, [timer.remainingTine]);
  const resetTimer = () => {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (timer.remainingTine > 0) {
      NotificationManager.warning('请稍微等待一会');
    } else if (!pattern.test(email)) {
      NotificationManager.warning('邮箱无效');
    } else {
      makeRequest('POST', 'USER_SENDCODE', { email, type: '注册' })
        .then(NotificationManager.success('验证码发送成功'))
        .catch(e => NotificationManager.error(e.response.data));
      setTimer({
        remainingTine: 30,
        startDate: new Date()
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    makeRequest('POST', 'USER_REGISTER', {
      name: data.get('firstName') + data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      verficationCode: otp
    })
      .then(({ data }) => { props.saveId(data.userId); NotificationManager.success('注册成功'); history('/user/login'); })
      .catch((e) => NotificationManager.error(e.response.data));
  };

  return (

    <ThemeProvider theme={defaultTheme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item>
                <Button variant = "outlined" onClick={resetTimer}>
                  {(timer.remainingTine !== 0 && parseInt(timer.remainingTine)) || '发送验证码到邮箱'}
                 </Button>
              </Grid>
              <Grid item xs={12}>
                <MuiOtpInput value={otp} onChange={handleChange} length={6} />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
