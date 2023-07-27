import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { makeRequest } from '../utils/requestWrapper';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
function Copyright(props) {
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

export default function RetrievePasswordPage() {
    const [timer, setTimer] = React.useState({
      startDate: new Date(),
      remainingTine: 0
    })

    const history = useNavigate()
    const [otp, setOtp] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [codeSend, setSendCode] = React.useState(false)
    const handleChange = (newValue) => {
      setOtp(newValue)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('firstPassword') !== data.get('secondPassword')) {
            NotificationManager.warning('两次密码不一致')
        } else if (data.get('firstPassword') === '' || data.get('secondPassword') === '') {
          NotificationManager.warning('请填写新密码')
        } else if (data.get('firstPassword') === data.get('secondPassword')) {
            makeRequest('PUT', 'USER_RETRIEVEPASSWORD', {verficationCode: otp, email: email, newPassword: data.get('firstPassword')})
                .then(() => history('/user/login'))
                .catch((e) => NotificationManager.error(e.response.data))
            
        }
    };
    React.useEffect(() => {
        if (timer.remainingTine > 0) {
            setTimer({
            remainingTine: timer.remainingTine - (Math.abs((new Date() - timer.startDate) / 1000)),
            startDate: new Date(),
            })
        }
        if (timer.remainingTine <= 0) {
            setSendCode(false)
        }
    }, [timer.remainingTine])
    const resetTimer = () => {

      const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (timer.remainingTine > 0) {
        NotificationManager.warning('请稍微等待一会')
      } else if (!pattern.test(email)) {
        NotificationManager.warning('无效邮箱')
      } else  {
        makeRequest('POST', 'USER_SENDCODE',{email:email, type: '找回密码'})
          .then(NotificationManager.success('成功发送验证码'))
          .catch(e => NotificationManager.error(e.response.data))
        setTimer({
          remainingTine: 30,
          startDate: new Date()
        })
        setSendCode(true)
      }
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />

            </Avatar>

            <Typography component="h1" variant="h5">
            新的密码
            </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid item xs={12} >
                <TextField margin='normal' fullWidth label='邮箱' onChange={handleEmail}/>
                <Button sx={{mt:1,mb: 1}} fullWidth margin='normal' variant='outlined' onClick={resetTimer}>{(codeSend && parseInt(timer.remainingTine)) || '发送验证码到这个邮箱'}</Button>
            </Grid>
            <Grid margin='normal' item xs={12}>
                <MuiOtpInput margin='normal' value={otp} onChange={handleChange} length={6} />
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              label="新密码"
              type='password'
              name="firstPassword"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="secondPassword"
              label="确认新密码"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              确定
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}