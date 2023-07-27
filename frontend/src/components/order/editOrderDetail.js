import { Button, Box, TextField } from "@mui/material"
import React from "react"
import { makeRequest } from "../../utils/requestWrapper"
import { NotificationManager } from "react-notifications"
const Paths = {
    'amount' : 'ORDER_EDITPRODUCTAMOUNT',
    'description': 'ORDER_EDITDESCRIPTION'
}
export default function EditOrderDetail(props) {
    const [text, setText] = React.useState('')
    const token = localStorage.getItem('token')
    function handleClick() {
        let value = text
        if (['amount'].includes(props.selected.type)) {
            value = Number(text)
        }
        makeRequest('PUT', Paths[props.selected.type], {[
            props.selected.type]: value, orderId:props.orderId, 
            productName: props.selected.productName, 
            row: props.selected.row}, {token})
            .then(NotificationManager.success('编辑成功'))
            .catch((e) => NotificationManager.error('编辑失败'))
            .finally(setText(''))
            .finally(props.selectedTriger(null))
            .finally(props.closeModeTriger(null))
    }
    return (
        <Box marginTop={3}>
            <TextField onChange={(event) => setText(event.target.value)} variant="outlined" label= {props.selected && props.selected.value} >{props.selected && props.selected.value}</TextField>
            <Button  width='30' style={{marginLeft:10}} variant="contained" onClick={handleClick}>确认修改 </Button>
            <Button width='30' style={{marginLeft:10}} variant="contained" onClick={() =>{props.closeModeTriger(null);NotificationManager.success('退出编辑模式')}}>取消 </Button>
        </Box>
    )
}