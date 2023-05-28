import { Button, Box, TextField } from "@mui/material"
import React from "react"
import axions from "axios"
const Paths = {
    'amount' : '/order/editProductAmount',
    'description': 'order/editDescription'
}
export default function EditOrderDetail(props) {
    const [text, setText] = React.useState('')
    console.log(props.selected)
    function handleClick() {
        let value = text
        if (['amount'].includes(props.selected.type)) {
            value = Number(text)
        }
        axions.put(Paths[props.selected.type], {[
            props.selected.type]: value, orderId:props.orderId, 
            productName: props.selected.productName, 
            row: props.selected.row})
            .catch((e) => console.log(e))
            .finally(setText(''))
            .finally(props.selectedTriger(null))
            .finally(props.closeModeTriger(null))
    }
    return (
        <Box marginTop={3}>
            <TextField onChange={(event) => setText(event.target.value)} variant="outlined" label= {props.selected && props.selected.value} >{props.selected && props.selected.value}</TextField>
            <Button  width='30' style={{marginLeft:10}} variant="contained" onClick={handleClick}>确认修改 </Button>
            <Button width='30' style={{marginLeft:10}} variant="contained" onClick={() =>props.closeModeTriger(null)}>取消 </Button>
        </Box>
    )
}