import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {makeRequest} from '../../utils/requestWrapper'
import { Button } from '@mui/material';
import {NotificationManager} from 'react-notifications';
import { encrypt } from '../../utils/requestWrapper';
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
            return (<Button variant='contained' href={'/product/' + encrypt(String(params.row.productId))}>更多</Button>)
        },
        editable: false
    }
];

const cannotEdit = ['link', 'id']
export default function ProductTable(props) {
    const [productDate, setproductData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const token = localStorage.getItem('token')

    React.useEffect(function() {
        makeRequest('GET', 'PRODUCT_LISTALL', {}, {token})
            .then(({data}) => {
                if (data) {
                    setproductData(data.productsList)
                    setLoading(true)
                }
            })
            .catch((e) => NotificationManager.error(e.response.data))
    }, [props.selected])
    function clickTriger(event) {
        if (props.mode === 'editable') {
            if (cannotEdit.includes(event.field)) {
                NotificationManager.error('这一列不可以编辑')
            } else {
                const target = productDate.find((product) => product.id === event.id)[event.field]
                props.selectedTriger({field: event.field, id: event.id, value: target, productId: productDate.find((product) => {
                    if (product.id === event.id) {
                        return product
                    }
                }).productId}) 
                NotificationManager.success(`你选择了${target}`)
            }
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

