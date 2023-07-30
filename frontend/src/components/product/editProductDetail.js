import { Button, Box, TextField } from '@mui/material';
import React from 'react';
import { makeRequest } from '../../utils/requestWrapper';
import { NotificationManager } from 'react-notifications';
const Paths = {
  amount: 'PRODUCT_EDITMATERIALAMOUNT',
  description: 'PRODUCT_EDITDESCRIPTION'
};
export default function EditProductDetail (props) {
  const [text, setText] = React.useState('');
  const token = localStorage.getItem('token');
  function handleClick () {
    if (props.selected && props.selected.field in Paths) {
      makeRequest('PUT', Paths[props.selected.field], {
        [props.selected.field]: props.selected.field === 'amount' ? Number(text) : text,
        productId: Number(props.selected.productId),
        row: Number(props.selected.row)
      }, { token })
        .then(() => {
          props.selectedTriger(null);
          NotificationManager.success('修改成功');
        })
        .catch((e) => NotificationManager.error('修改失败'));
    }
  }
  return (
        <Box>
            <TextField onChange={(event) => setText(event.target.value)} variant="outlined" placeholder={props.selected && String(props.selected.value)} label={props.selected && String(props.selected.value)} ></TextField>
            <Button width='30' style={{ marginLeft: 10 }} variant="contained" onClick={handleClick}>确认修改 </Button>
            <Button width='30' style={{ marginLeft: 10 }} variant="contained" onClick={() => { props.closeModeTriger(null); NotificationManager.success('退出编辑模式'); }}>取消 </Button>
        </Box>
  );
}
