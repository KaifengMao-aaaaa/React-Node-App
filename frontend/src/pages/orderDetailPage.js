import { Box, Button, Paper } from "@mui/material";
import OrderDetail from "../components/order/OrderDetail";
import EditOrderDetail from "../components/order/editOrderDetail";
import React from "react";
import { useParams } from "react-router-dom";
const EDIT = 'editable'
export default function OrderDetailPage(props) {
    const {orderId} = useParams()
    const [selected, setSelected] = React.useState(null)
    const [mode, setMode] = React.useState(null)
    console.log(selected)
    return (
        <Box sx={{marginLeft: 15, marginTop: 15, width: 900}}>
            <OrderDetail setSelectedTriger = {setSelected} mode = {mode} orderId = {orderId} selected={selected} />  
            {mode !== EDIT && <Button style={{marginTop:10}} width='30' variant="contained" onClick={() => setMode(EDIT)}>修改 </Button>}
            { mode === EDIT && <EditOrderDetail closeModeTriger={setMode} selectedTriger = {setSelected} selected={selected} orderId={Number(orderId)}/> }
        </Box>
    )
}