import React from 'react';
import { Box,Button,Card, TextField } from '@mui/material';
import ProductTable from '../components/product/AllProduct';
import AddProduct from '../components/product/addProduct';
import EditProduct from '../components/product/editProduct';


export default function ProductPage() {
    const [loadAddPage, setLoadAddPage] = React.useState(false)
    const [selected, setSelected] = React.useState(null)
    const [mode, setMode] = React.useState(null)
    return (
        <Box sx={{}}>
            {!loadAddPage && <Card style={{marginTop:100,marginLeft:100, width: 1000, padding: 20, backgroundColor: 'rgba(247,247,248)'}}>
                <ProductTable mode = {mode} selectedTriger = {setSelected}/>
                <div style={{display:'flex'}}>
                    {mode && <EditProduct selected = {selected}/>}
                    {(mode&&!loadAddPage) && <Button onClick={() => {setMode(null); setSelected(null)}} style={{marginLeft:10}} variant='outlined'>关闭</Button>}
                </div>
            </Card>}
            <Card style={{marginTop:20,marginLeft:100, width: 1000, padding: 20, backgroundColor: 'rgba(247,247,248)'}}>
                { loadAddPage && <AddProduct closeTriger = {setLoadAddPage}/>}
                {!loadAddPage && <Button onClick={() => setLoadAddPage(true)}>添加产品</Button>}
                {(!loadAddPage&&!mode) && <Button onClick={() => setMode('editable')}>修改</Button>}
            </Card>
        </Box>
  );
}