import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axions from 'axios'
import { Button } from '@mui/material';
const columns = [
    {field: 'id'},
    { field: 'productName', headerName: '产品', type:'text', editable: false},
    { field: 'unitPrice', headerName: '单价', type:'number', editable: false},
    {
        field: 'remaining',
        headerName: '剩余',
        type: 'number',
        editable: false
    },
    {
        field: 'unit',
        headerName: '单位',
        type: 'text',editable: false
    },
    {
        field: 'link',
        headerName: '更多',
        renderCell: (params) => {
            return (<Button variant='contained' href={'/product/' + String(params.row.productId)}>更多</Button>)
        },
        editable: false
    }
];


export default function ProductTable(props) {
    const [productDate, setproductData] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(function() {
        axions.get('/product/listall')
            .then(({data}) => {
                if (data) {

                    setproductData(data.productsList)
                    setLoading(true)
                }
            })
            .catch((e) => console.log(e))
    }, [props.selected])
    function clickTriger(event) {
        if (props.mode === 'editable') {
            props.selectedTriger({field: event.field, id: event.id, value: productDate.find((product) => product.id === event.id)[event.field], productId: productDate.find((product) => {
                if (product.id === event.id) {
                    return product
                }
            }).productId}) 
        }
    } 
    return (
        <div style={{ height: 400, width: '100%' }}>
        {loading && <DataGrid
            key={productDate.id}
            rows={productDate}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            onCellDoubleClick={clickTriger}
        />}
        </div>
  );
}

