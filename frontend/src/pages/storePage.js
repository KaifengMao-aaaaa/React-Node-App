import React, { useState } from 'react';
import { Box, Button, Card } from '@mui/material';
import ShowStoreTable from '../components/store/StroeTable';
import AddMaterial from '../components/store/AddStore';
import AddMateriaType from '../components/store/addType';
export default function StorePage () {
  const [openPage, setopenPage] = React.useState(null);
  const [updateTable, setUpdateTable] = useState(0);
  return (
        <Box sx={{}}>
            <Card style={{ marginTop: 100, marginLeft: 100, width: 1000, padding: 20, backgroundColor: 'rgba(247,247,248)' }}>
                <ShowStoreTable update = {updateTable}/>
            </Card>
            <Card style={{ marginTop: 20, marginLeft: 100, width: 1000, padding: 20, backgroundColor: 'rgba(247,247,248)' }}>
                { openPage === 'addMaterial' && <AddMaterial closeTriger = {setopenPage} updateTableTriger = {setUpdateTable}/>}
                { openPage === null && <Button onClick={() => setopenPage('addMaterial')}>添加物料</Button>}
                { openPage === null && <Button onClick={() => setopenPage('addMaterialType')}>添加物料类型</Button>}
                { openPage === 'addMaterialType' && <AddMateriaType closePageTriger = {setopenPage} updateTableTriger = {setUpdateTable}/>}
            </Card>
        </Box>
  );
}
