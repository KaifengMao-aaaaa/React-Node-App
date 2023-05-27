import React from "react"
import axios from "axios"
import { Box, Button, TextField } from "@mui/material"
export default function  AddMateriaType(props) {
    const [text, setText] = React.useState('')
    function handleSubmit() {
        axios.post('/store/addType', {materialName:text})
        .catch((e) => console.log(e))
        props.closePageTriger(null)
        props.updateTableTriger((prev) => prev + 1)
    }
    function handleChange(event) {
        setText(event.target.value)
    }
    return (<Box>
        <TextField type="text"  onChange={handleChange}></TextField>
        <Button onClick={handleSubmit}>确认</Button>
        <Button onClick={() => props.closePageTriger(null)}>返回</Button>
        </Box>)
}