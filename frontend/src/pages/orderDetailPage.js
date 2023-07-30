import { Box, Button } from '@mui/material';
import OrderDetail from '../components/order/OrderDetail';
import EditOrderDetail from '../components/order/editOrderDetail';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { makeRequest } from '../utils/requestWrapper';
import { NotificationManager } from 'react-notifications';
const EDIT = 'editable';

export default function OrderDetailPage (props) {
  const history = useNavigate();
  const orderId = useParams().orderId;
  const [selected, setSelected] = React.useState(null);
  const [mode, setMode] = React.useState(null);
  const [orderStatus, setOrderStatus] = React.useState(false);
  const token = localStorage.getItem('token');
  useEffect(function () {
    makeRequest('GET', 'ORDER_CHECKSTATUS', { orderId }, { token })
      .then(({ data }) => { setOrderStatus(data.orderFinished); })
      .catch((e) => NotificationManager.error(e.response.data));
  }, []);
  const deleteOrder = (event) => {
    makeRequest('DELETE', 'ORDER_DELETE', { orderId }, { token })
      .then(() => {
        NotificationManager.success('订单删除成功');
      })
      .catch(() => NotificationManager.error('订单删除失败'));
  };
  const finishedOrder = (event) => {
    const orderId = event.target.value;
    makeRequest('PUT', 'ORDER_EDITSTATUS', { orderId, status: '完成' }, { token })
      .then(history('/order'))
      .catch((e) => NotificationManager.error(e.response.data));
  };
  return (
        <Box sx={{ marginLeft: 15, marginTop: 15, width: 900 }}>
            <OrderDetail setSelectedTriger = {setSelected} mode = {mode} orderId = {orderId} selected={selected} />
            <Box>
                {mode !== EDIT && <Button style={{ marginTop: 5 }} width='30' variant="contained" onClick={() => { setMode(EDIT); NotificationManager.success('打开编辑模式'); }}>修改 </Button>}
                { !orderStatus && mode !== EDIT && <Button width='30'style={{ marginLeft: 15, marginTop: 5 }} variant="contained" value= {orderId} onClick={finishedOrder}>完成订单</Button>}
                { !orderStatus && mode !== EDIT && <Button width='30'style={{ marginLeft: 15, marginTop: 5 }} variant="contained" value= {orderId} onClick={deleteOrder}>删除订单</Button>}
                {mode !== EDIT && <Button width='30'style={{ marginLeft: 15, marginTop: 5 }} variant="contained" value= {orderId} onClick={() => history('/order')}>返回</Button>}
            </Box>
            { mode === EDIT && <EditOrderDetail closeModeTriger={setMode} selectedTriger = {setSelected} selected={selected} orderId={Number(orderId)}/> }
        </Box>
  );
}
