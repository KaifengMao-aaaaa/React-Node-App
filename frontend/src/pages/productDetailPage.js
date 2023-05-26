import { Box, Button, Paper, TextField } from "@mui/material"
import ProductDetail from "../components/product/productDetail"
import EditProductDetail from "../components/product/editProductDetail"
import React from "react"
import { useParams } from "react-router-dom"

const EDIT = 'editable'
export default function ProductDetailPage() {
    const [selected, setSelected] = React.useState(null)
    const [mode, setMode] = React.useState(null)
    console.log(selected)
    return (<Box sx={{margin:15,marginLeft:20, width: 900}}>
        <ProductDetail selectedTriger = {setSelected} mode = {mode}/>
            {mode !== EDIT && <Button width='30' variant="contained" onClick={() => setMode(EDIT)}>修改 </Button>}
            {mode === EDIT && <EditProductDetail selected = {selected} closeModeTriger = {setMode}/>}
    </Box>
    )
}