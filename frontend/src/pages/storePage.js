import React from 'react';
import { Box,Button,Card } from '@mui/material';
import ShowStoreTable from '../components/store/StroeTable';
import AddMaterial from '../components/store/AddStore';
export default function StorePage() {
    const [loadAddPage, setLoadAddPage] = React.useState(false)
    return (
        <Box sx={{}}>
            <Card style={{marginTop:100,marginLeft:100, width: 1000, padding: 20, backgroundColor: 'rgba(247,247,248)'}}>
                <ShowStoreTable/>  
            </Card>
            <Card style={{marginTop:20,marginLeft:100, width: 1000, padding: 20, backgroundColor: 'rgba(247,247,248)'}}>
                { loadAddPage && <AddMaterial closeTriger = {setLoadAddPage}/>}
                {!loadAddPage && <Button onClick={() => setLoadAddPage(true)}>添加物料</Button>}
            </Card>
        </Box>
  );
}