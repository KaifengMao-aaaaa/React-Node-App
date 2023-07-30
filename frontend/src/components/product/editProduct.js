import { Button, Paper, TextField } from '@mui/material';
import { makeRequest } from '../../utils/requestWrapper';
import React from 'react';
import { NotificationManager } from 'react-notifications';
const paths = {
  productName: 'PRODUCT_EDITNAME',
  unit: 'PRODUCT_EDITUNIT',
  available: 'PRODUCT_EDITREMAINING',
  utilization: 'PRODUCT_EDITUNITPRICE'
};

export default function EditProduct (props) {
  const [text, setText] = React.useState('');
  const token = localStorage.getItem('token');
  function editValue (event) {
    event.preventDefault();
    if (props.selected && props.selected.field in paths) {
      makeRequest('PUT', paths[props.selected.field], { [props.selected.field]: text, productId: props.selected.productId }, { token })
        .then(() => {
          props.updateSelected(null);
          NotificationManager.success('修改成功');
        })
        .catch((e) => NotificationManager.error(e.response.data));
    }
  }
  function handleChnage (event) {
    setText(event.target.value);
  }
  return (<Paper style={{ display: 'flex' }}>
            <TextField onChange={handleChnage} variant="outlined" label= {props.selected && String(props.selected.value)} placeholder={props.selected && String(props.selected.value)}></TextField>
            <Button type="button" onClick={editValue} variant="contained">确认</Button>
        </Paper>
  );
}
