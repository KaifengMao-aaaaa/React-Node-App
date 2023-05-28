import { Paper, TextField, Button, Select, MenuItem } from "@mui/material"
import React from "react"
import axions from 'axios'
const paths = {
    startDate: '/order/editStartDate', deadline: '/order/editDeadline',
    client: 'order/editClient', status: 'order/editStatus', unitPrice: 'order/editUnitPrice',
    amount: 'order/editAmout'
}

const statusItems = ['完成','未完成']
export default function EditOrder(props) {
    const [text, setText] = React.useState('')
    function handleChnage(event) {
        setText(event.target.value)
    }
    function editValue(event) {
        
        if (props.selected && props.selected.field in paths) {
            axions.put(paths[props.selected.field], {[props.selected.field]:text, orderId: props.selected.orderId}) 
                .then(props.selectedTriger(null))
               .catch((e)=> console.log(e))
        }
    }
    
    return (<Paper style={{display:"flex", marginLeft:60, marginTop:20}}>
            <TextField onChange={handleChnage} variant="outlined" label= {props.selected && props.selected.value} placeholder={props.selected && String(props.selected.value)}></TextField> 
            {props.selected && props.selected.field === 'status' && <Select>
                {statusItems.map((status) => <MenuItem onClick={(event) => setText(event.target.type)} type={status} >{status}</MenuItem>)}
            </Select>}
            <Button type="button" onClick={editValue} variant="contained"style={{marginLeft: 20}} >确认</Button>
            <Button style={{marginLeft: 10}} variant="outlined"  onClick={() => props.closeModeTriger(null)}>关闭</Button>
        </Paper>)
}
