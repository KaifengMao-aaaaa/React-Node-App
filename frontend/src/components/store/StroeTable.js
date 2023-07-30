import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeRequest } from '../../utils/requestWrapper';
import { NotificationManager } from 'react-notifications';
const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'materialName', headerName: '物料', type: 'text' },
  { field: 'inventoryGap', headerName: '物料缺口', type: 'number' },
  { field: 'utilization', headerName: '正在使用', type: 'number' },
  {
    field: 'unitPrice',
    headerName: '单价',
    type: 'number'
  }, {
    field: 'unit',
    headerName: '单位',
    type: 'string'
  },
  {
    field: 'available',
    headerName: '剩余',
    type: 'number'
  },
  {
    field: 'total',
    headerName: '合计',
    type: 'number',
    valueGetter: (params) =>
      params.row.available + params.row.utilization
  }
];

export default function DataTable (props) {
  const [storeDate, setStroeData] = React.useState([]);
  const token = localStorage.getItem('token');
  React.useEffect(function () {
    makeRequest('GET', 'STORE_LISTALL', {}, { token })
      .then(({ data }) => {
        console.log(data);
        const newData = data.storeList.map((data, index) => {
          return {
            ...data,
            id: index
          };
        });
        setStroeData(newData);
      })
      .catch((e) => NotificationManager.error(e.response.data));
  }, [props.update]);

  return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={storeDate}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
        </div>
  );
}
