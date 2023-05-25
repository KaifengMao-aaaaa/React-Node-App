
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axions from 'axios'
const columns = [
    {field: 'id', headerName: 'ID'},
  { field: 'material', headerName: '物料', type:'text'},
  { field: 'using', headerName: '正在使用', type:'number'},
  {
    field: 'remaining',
    headerName: '剩余',
    type: 'number',
  },
  {
    field: 'total',
    headerName: '合计',
    type: 'number',
    valueGetter: (params) =>
      params.row.remaining + params.row.using
    },
];

export default function DataTable() {
    const [storeDate, setStroeData] = React.useState([])
    React.useEffect(function() {
        axions.get('/store/listall')
            .then(({data}) => {setStroeData(data.storeList)})
            .catch((e) => console.log(e))
    }, [])
    console.log(storeDate)

    function handleClickBox(event) {
        console.log(event)
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={storeDate}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
        </div>
  );
}
