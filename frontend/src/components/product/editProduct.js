import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import axions from 'axios'
const paths = {
    productName: '/product/editName', 
    unit: '/product/editUnit',
    remaining: '/product/editRemaining', 
    unitPrice: '/product/editUnitPrice'
}

export default function EditProduct(props) {
    const [text, setText] = React.useState('')
    function editValue(event) {
        event.preventDefault();
        if (props.selected && props.selected.field in paths) {
            axions.put(paths[props.selected.field], {[props.selected.field]: text, productId: props.selected.productId})
                .then(props.updateSelected(null))
                .catch((e)=> console.log(e))
        }
    }
    function handleChnage(event) {
       setText(event.target.value)
    }
    return (<Paper style={{display:"flex"}}>
            <TextField onChange={handleChnage} variant="outlined" label= {props.selected && String(props.selected.value)} placeholder={props.selected && String(props.selected.value)}></TextField> 
            <Button type="button" onClick={editValue} variant="contained">确认</Button>
        </Paper>
    )
}