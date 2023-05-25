import { Box, Button, Paper } from "@mui/material";
import OrderDetail from "../components/order/OrderDetail";
import EditOrderDetail from "../components/order/editOrderDetail";
import React from "react";
import { useParams } from "react-router-dom";
const EDIT = 'editable'
export default function OrderDetailPage() {
    const {orderId} = useParams()
    const [selected, setSelected] = React.useState(null)
    const [mode, setMode] = React.useState(null)
    console.log(mode, selected)
    return (
        <Box sx={{marginLeft: 15, marginTop:15, width:900}}>
            <OrderDetail setSelectedTriger = {setSelected} mode = {mode} />  
            {mode !== EDIT && <Button style={{marginTop:10}} width='30' variant="contained" onClick={() => setMode(EDIT)}>修改 </Button>}
            {mode === EDIT && selected &&<EditOrderDetail closeModeTriger = {setMode} selected = {selected} orderId = {Number(orderId)}/>}
        </Box>
    )
}