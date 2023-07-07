import { Box, Button, Paper } from "@mui/material";
import OrderDetail from "../components/order/OrderDetail";
import EditOrderDetail from "../components/order/editOrderDetail";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeRequest } from "../utils/requestWrapper";
const EDIT = 'editable'

export default function OrderDetailPage(props) {
    const history = useNavigate();
    const {orderId} = useParams();
    const [selected, setSelected] = React.useState(null)
    const [mode, setMode] = React.useState(null)
    const [orderStatus, setOrderStatus] = React.useState(false)
    useEffect(function () {
        makeRequest('GET', 'ORDER_CHECKSTATUS', {orderId})
            .then(({data}) => {setOrderStatus(data.orderFinished)})
    },[])
    const finishedOrder = (event) => {
        console.log(event.target.value[1])
        const orderId = event.target.value
        makeRequest('PUT', 'ORDER_EDITSTATUS', {orderId: orderId, status:'完成'})
            .catch((e) => console.log(e))
            .then(history('/order'))
    }
    return (
        <Box sx={{marginLeft: 15, marginTop: 15, width: 900}}>
            <OrderDetail setSelectedTriger = {setSelected} mode = {mode} orderId = {orderId} selected={selected} />  
            <Box>
                {mode !== EDIT && <Button style={{marginTop:5}} width='30' variant="contained" onClick={() => setMode(EDIT)}>修改 </Button>}
                { !orderStatus &&mode != EDIT && <Button width='30'style={{marginLeft: 15, marginTop:5}} variant="contained" value= {orderId} onClick={finishedOrder}>完成订单</Button>}
                {mode != EDIT && <Button width='30'style={{marginLeft: 15, marginTop:5}} variant="contained" value= {orderId} onClick={()=>history('/order')}>返回</Button>}
            </Box>
            { mode === EDIT && <EditOrderDetail closeModeTriger={setMode} selectedTriger = {setSelected} selected={selected} orderId={Number(orderId)}/> }
        </Box>
    )
}