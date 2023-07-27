import { Box, Button, Paper, TextField } from "@mui/material"
import ProductDetail from "../components/product/productDetail"
import EditProductDetail from "../components/product/editProductDetail"
import React from "react"
import { decrypt } from "../utils/requestWrapper"
import { useNavigate, useParams } from "react-router-dom";
import {NotificationManager} from 'react-notifications';
const EDIT = 'editable'
export default function ProductDetailPage() {
    const history = useNavigate();
    const [selected, setSelected] = React.useState(null)
    const [mode, setMode] = React.useState(null)
    const productId = decrypt(useParams().productId);
    return (<Box sx={{margin:15,marginLeft:20, width: 900}}>
        <ProductDetail selectedTriger = {setSelected} productId = {productId} mode = {mode} selected={selected}/>
            {mode !== EDIT && <Button width='30' variant="contained" onClick={() => {setMode(EDIT);NotificationManager.success('打开编辑模式,可以开始编辑产品信息')}} style={{marginRight:10}}>修改 </Button>}
            {mode !== EDIT && <Button width='30' variant="contained" onClick={() => {history('/product')}}>返回 </Button>}
            {mode === EDIT && <EditProductDetail selected = {selected} closeModeTriger = {setMode} selectedTriger = {setSelected}/>}
    </Box>
    )
}