import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { encrypt, makeRequest } from '../utils/requestWrapper'
import { DataGrid } from '@mui/x-data-grid'
import { NotificationManager } from 'react-notifications'
const data = [{
  id: 1
}]
const ordersColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'client', width: 150, headerName: '客户' },
  { field: 'time', width: 150, headerName: '时间' },
  { field: 'orderPrice', width: 80, headerName: '成交价格' },
  { field: 'staffName', width: 80, headerName: '员工' },
  {
    headerName: '更多',
    renderCell: (params) => {
      return (<Button variant='contained' href={'/order/' + encrypt(String(params.row.orderId))}>
        订单信息
    </Button>)
    }
  },
  { field: 'description', width: '100%', headerName: '描述' }

]
const storeColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'time', width: 150, headerName: '时间' },
  { field: 'type', width: 80, headerName: '物料' },
  { field: 'staffName', width: 80, headerName: '员工' },
  { field: 'alteration', width: 80, headerName: '变化' },
  { field: 'description', width: '100%', headerName: '描述' }

]

export default function HistoryPage () {
  const [orderHistory, setOrderHistory] = useState([])
  const [storeHistory, setStoreHistory] = useState([])
  const token = localStorage.getItem('token')
  useEffect(function () {
    makeRequest('GET', 'ORDERS_TIMESTAMP', {}, { token })
      .then(({ data }) => { setOrderHistory(data.ordersTimeStamp) })
      .catch((e) => NotificationManager.error(e.response.data))
    makeRequest('GET', 'STORE_TIMESTAMP', {}, { token })
      .then(({ data }) => setStoreHistory(data.storeTimeStamp))
      .catch((e) => NotificationManager.error(e.response.data))
  }, [])
  return (
    <Box sx={{ marginLeft: 15, marginTop: 10, width: '60%' }}>
        <h3>订单记录</h3>
        <div style={{ height: 400 }}>
            <DataGrid rowHeight={25} key={data.id} rows={orderHistory} columns={ordersColumns} />
        </div>
        <h3>物料记录</h3>
        <div style={{ height: 400, marginBottom: 100 }}>
            <DataGrid rowHeight={25} key={data.id} rows={storeHistory} columns={storeColumns} />
        </div>
    </Box>
  )
}
