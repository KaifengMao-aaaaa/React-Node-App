import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ListOrders from '../components/order/AllOrder';
import OrderCreate from '../components/order/CreateOrder';
import { Button, Paper } from '@mui/material';
import EditOrder from '../components/order/editOrder';
import '../index.css'
export default function OrderPage() {
  const [loadCreatePage, setLoadCreatePage] = React.useState(false)
  const [mode, setMode] = React.useState(null)
  const [selected, setSelected] = React.useState(null)
  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box sx={{}}>
            {loadCreatePage && <OrderCreate />}
            {!loadCreatePage && <ListOrders mode = {mode} selectedTriger = {setSelected} selected = {selected}/> }
            {mode && !loadCreatePage && <EditOrder  selected = {selected} selectedTriger = {setSelected} closeModeTriger = {setMode}/>}
            <Button style={{marginLeft:50, marginTop: 30}} variant='outlined' onClick={() => setLoadCreatePage(!loadCreatePage)}>{!loadCreatePage? '创建订单' : '返回'}</Button>
            {(!loadCreatePage&&!mode) && <Button style={{marginLeft:10, marginTop: 30}} onClick={() => setMode('editable')}>修改</Button>}
        </Box>
      </Box>
  );
}