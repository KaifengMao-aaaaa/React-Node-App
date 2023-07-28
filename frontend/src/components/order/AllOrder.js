import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { DataGrid } from '@mui/x-data-grid'
import { makeRequest, encrypt } from '../../utils/requestWrapper'
import { NotificationManager } from 'react-notifications'
import '../../index.css'
import { Button } from '@mui/material'
const paths = {
  deadline: 'ORDER_EDITDEADLINE',
  client: 'ORDER_EDITCLIENT',
  status: 'ORDER_EDITSTATUS',
  unitPrice: 'ORDER_UNITPRICE',
  amount: 'ORDER_EDITAMOUNT'
}
const columns = [
  { field: 'id', headerName: 'ID', type: 'number' },
  { field: 'startDate', headerName: '创建日期', type: 'text' },
  { field: 'deadline', headerName: '截至日期', type: 'text' },
  { field: 'client', headerName: '客户', type: 'text' },
  {
    field: 'userName',
    headerName: '用户',
    type: 'text'
  },
  {
    field: 'status',
    headerName: '状态',
    type: 'text'
  },

  {
    field: 'orderPrice',
    headerName: '订单价',
    type: 'number'
  },
  // {
  //     field: 'totalPrice',
  //     headerName:'总价',
  //     type: 'number',
  //     valueGetter: (params) =>
  //     params.row.unitPrice * params.row.amount
  // },
  {
    field: 'link',
    headerName: '物料',
    renderCell: (params) => {
      return (<Button variant='contained' href={'/order/' + encrypt(String(params.row.orderId))}>
                查看
            </Button>)
    }
  }

]

export default function ListOrders (props) {
  const [orderList, setOrderList] = useState([])
  const [loadCreatePage, _setLoadCreatePage] = useState(false)
  const token = localStorage.getItem('token')
  useEffect(function () {
    makeRequest('GET', 'ORDER_LISTALL', {}, { token })
      .then(({ data }) => { setOrderList(data.ordersList) })
      .catch((e) => NotificationManager.error(e.response.data))
  }, [loadCreatePage, props.selected])
  return (
      <Box sx={{ display: 'flex' }}>
        <Paper className='traditionPaper' style={{ backgroundColor: 'rgba(247,247,248)' }}>
                <Grid item xs={12} >
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <DataGrid
                            key={orderList.id}
                            rows={orderList}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: { page: 0, pageSize: 5 }
                              }
                            }}
                            pageSizeOptions={[5, 10]}
                            onCellDoubleClick={(event) => {
                              if (props.mode === 'editable') {
                                props.selectedTriger({
                                  id: event.id,
                                  field: event.field,
                                  value: orderList.find((order) => order.id === event.id)[event.field],
                                  orderId: orderList.find((order) => order.id === event.id).orderId
                                })
                                if (!(event.field in paths)) {
                                  NotificationManager.warning('这一列数据不可编辑')
                                } else {
                                  NotificationManager.success(`你选择了${orderList.find((order) => order.id === event.id)[event.field]}`)
                                }
                              }
                            }}
                        />
                        </Paper>
                </Grid>
        </Paper>
      </Box>
  )
}
