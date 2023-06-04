import { Button, Paper, TextField } from "@mui/material";
import {makeRequest} from '../../utils/requestWrapper'
import React from "react";
const paths = {
    productName: 'PRODUCT_EDITNAME', 
    unit: 'PRODUCT_EDITUNIT',
    remaining: 'PRODUCT_EDITREMAINING', 
    unitPrice: 'PRODUCT_EDITUNITPRICE'
}

export default function EditProduct(props) {
    const [text, setText] = React.useState('')
    function editValue(event) {
        event.preventDefault();
        if (props.selected && props.selected.field in paths) {
            makeRequest('PUT',paths[props.selected.field], {[props.selected.field]: text, productId: props.selected.productId} )
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