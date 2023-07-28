import { Paper, TextField, Button, Select, MenuItem } from '@mui/material'
import React from 'react'
import { makeRequest } from '../../utils/requestWrapper'
import { NotificationManager } from 'react-notifications'
const paths = {
  deadline: 'ORDER_EDITDEADLINE',
  client: 'ORDER_EDITCLIENT',
  status: 'ORDER_EDITSTATUS',
  unitPrice: 'ORDER_UNITPRICE',
  amount: 'ORDER_EDITAMOUNT'
}

export default function EditOrder (props) {
  const [text, setText] = React.useState('')
  const token = localStorage.getItem('token')
  function handleChnage (event) {
    setText(event.target.value)
  }
  function editValue (event) {
    if (props.selected && props.selected.field in paths) {
      makeRequest('PUT', paths[props.selected.field], { [props.selected.field]: text, orderId: props.selected.orderId }, { token })
        .then(() => { props.selectedTriger(null); NotificationManager.success('编辑成功') })
        .catch((e) => NotificationManager.error(e.response.data))
    }
  }

  return (<Paper style={{ display: 'flex', marginLeft: 60, marginTop: 20 }}>
            {props.selected && props.selected.field === 'status' && <Select onChange={(event) => setText(event.target.value)}>
                <MenuItem value = '完成'>完成</MenuItem>
                <MenuItem value = '未完成'>未完成</MenuItem>
            </Select>}
            {props.selected && props.selected.field !== 'status' && <TextField onChange={handleChnage} variant="outlined" label= {props.selected && props.selected.value} placeholder={props.selected && String(props.selected.value)}></TextField>}
            <Button type="button" onClick={editValue} variant="contained"style={{ marginLeft: 20 }} >确认</Button>
            <Button style={{ marginLeft: 10 }} variant="outlined" onClick={() => { props.closeModeTriger(null); NotificationManager.success('关闭编辑模式') }}>关闭</Button>
        </Paper>)
}
