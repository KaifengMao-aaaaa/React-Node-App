import { Paper, TextField, Button } from "@mui/material"
import React from "react"
import axions from 'axios'
const paths = {
    startDate: '/order/editStartDate', deadline: '/order/editDeadline',
    client: 'order/editClient', status: 'order/editStatus', unitPrice: 'order/editUnitPrice',
    amount: 'order/editAmout'
}


export default function EditOrder(props) {
    const [text, setText] = React.useState('')
    function handleChnage(event) {
        setText(event.target.value)
    }
    function editValue(event) {
        
        if (props.selected.field in paths) {
            axions.put(paths[props.selected.field], {[props.selected.field]:text}) 
               .catch((e)=> console.log(e))
        }
    }
    
    return (<Paper style={{display:"flex", marginLeft:60, marginTop:20}}>
            <TextField onChange={handleChnage} variant="outlined" label= '修改成' placeholder={props.selected && props.selected.value}></TextField> 
            <Button type="button" onClick={editValue} variant="contained">确认</Button>
            <Button style={{marginLeft: 10}} variant="outlined"  onClick={() => props.closeModeTriger(null)}>关闭</Button>
        </Paper>)
}
