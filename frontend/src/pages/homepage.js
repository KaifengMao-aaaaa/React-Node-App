import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from '../components/Deposite';
import Orders from '../components/Orders';
import Copyright from '../components/Layout/Copyright';
import axions from 'axios'
export default function Body() {
  // const [ordersList,setOrdersList] = useState([])
  const [ordersdetails,setOrdersDetails] = useState([])
  const [loadCreatePage, setLoadCreatePage] = useState(false)
  useEffect(function() {
    console.log('run')
    axions.get('/orders/details')
      .then(({data}) => {setOrdersDetails(data.orders)})
  }, [loadCreatePage])
  console.log(loadCreatePage)
  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders orders = {ordersdetails}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}