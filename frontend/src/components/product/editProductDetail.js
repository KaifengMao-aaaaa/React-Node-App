import { Button, Box, TextField } from "@mui/material"
import axions from 'axios'
import React from "react"
const Paths = {
    'amount' : '/product/editMaterialAmount',
    'description':'/product/editDescription' 
}
export default function EditProductDetail(props) {
    const [text, setText] = React.useState('')
    console.log(props.selected)
    function handleClick() {
        if (props.selected && props.selected.field in Paths) {
            console.log(props.selected)
            axions.put(Paths[props.selected.field], {[props.selected.field]:props.selected.field === 'amount'? Number(text) : text, 
                productId: Number(props.selected.productId), 
                row: Number(props.selected.row)}) 
                .then(props.selectedTriger(null))
                .catch((e)=> console.log(e))
        }
    }
    return (
        <Box>
            <TextField onChange={(event) => setText(event.target.value)} variant="outlined" placeholder={props.selected&&String(props.selected.value)} label={props.selected&&String(props.selected.value)} ></TextField>
            <Button width='30' style={{marginLeft:10}} variant="contained" onClick={handleClick}>确认修改 </Button>
            <Button width='30' style={{marginLeft:10}} variant="contained" onClick={() =>props.closeModeTriger(null)}>取消 </Button>
        </Box>
    )
}