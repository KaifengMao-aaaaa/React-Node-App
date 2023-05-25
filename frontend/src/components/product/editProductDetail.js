import { Button, Box, TextField } from "@mui/material"
import React from "react"
const Paths = {
    'amount' : '/product/editMaterialAmount',
    'material': 'product/editMaterial'
}
export default function EditProductDetail(props) {
    const [text, setText] = React.useState('')
    // function handleClick() {

    // }
    return (
        <Box>
            <TextField onChange={(event) => setText(event.target.value)} ></TextField>
            <Button width='30' style={{marginLeft:10}} variant="contained" onClick={() => props.closeModeTriger(null)}>确认修改 </Button>
            <Button width='30' style={{marginLeft:10}} variant="contained" onClick={() =>props.closeModeTriger(null)}>取消 </Button>
        </Box>
    )
}