import { Button, Box, TextField } from "@mui/material"
import React from "react"
import axions from "axios"
const Paths = {
    'amount' : '/order/editMaterialAmount',
}
export default function EditOrderDetail(props) {
    const [text, setText] = React.useState('')
    function handleClick() {
        let value = text
        if (['amount'].includes(props.selected.type)) {
            value = Number(text)
        }
        axions.put(Paths[props.selected.type], {[props.selected.type]: value, orderId:props.orderId})
            .catch((e) => console.log(e))
            .finally(setText(''))
            .finally(props.closeModeTriger(null))
    }
    return (
        <Box marginTop={3}>
            <TextField onChange={(event) => setText(event.target.value)} ></TextField>
            <Button  width='30' style={{marginLeft:10}} variant="contained" onClick={handleClick}>确认修改 </Button>
            <Button width='30' style={{marginLeft:10}} variant="contained" onClick={() =>props.closeModeTriger(null)}>取消 </Button>
        </Box>
    )
}