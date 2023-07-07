
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {makeRequest} from '../../utils/requestWrapper'
const columns = [
    {field: 'id', headerName: 'ID'},
  { field: 'materialName', headerName: '物料', type:'text'},
  { field: 'consuming', headerName: '正在使用', type:'number'},
  {
    field: 'unitPrice',
    headerName: '单价',
    type: 'number',
  },{
    field: 'unit',
    headerName: '单位',
    type: 'string',
  },
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
      params.row.remaining + params.row.consuming
    },
];

export default function DataTable(props) {
    const [storeDate, setStroeData] = React.useState([])
    React.useEffect(function() {
      makeRequest('GET', 'STORE_LISTALL', {})
            .then(({data}) => {console.log(data)
              const newData = data.storeList.map((data, index) => {
                return {
                  ...data,
                  id: index
                }
              })
              setStroeData(newData)
            })
            .catch((e) => console.log(e))
    }, [props.update])

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
