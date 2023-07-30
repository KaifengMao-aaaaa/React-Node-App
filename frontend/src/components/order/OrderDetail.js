import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../index.css';
import { makeRequest } from '../../utils/requestWrapper';
import { NotificationManager } from 'react-notifications';

function ccyFormat (num) {
  return `${num.toFixed(2)}`;
}

function subtotal (items) {
  return items.map(({ amount, unitPrice }) => amount * unitPrice).reduce((sum, i) => sum + i, 0);
}

export default function OrderDetail (props) {
  const orderId = props.orderId;
  const [orderDetail, setOrderDetail] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem('token');
  React.useEffect(function () {
    makeRequest('GET', 'ORDER_DETAIL', { orderId }, { token })
      .then(({ data }) => {
        if (data) { setOrderDetail(data.orderDetail); setLoading(true); }
      })
      .catch((e) => NotificationManager.error(e.response.data));
  }, [props.selected]);

  function handleClick (event) {
    const type = event.target.id.match(/[a-zA-Z]+/)[0]; // Matches alphabetic characters
    const row = event.target.id.match(/\d+/)[0];
    if (props.mode === 'editable') {
      props.setSelectedTriger({
        type,
        row: Number(row),
        productName: type === 'description' ? null : orderDetail.requiredProducts[row].productName,
        orderId,
        value: type === 'description' ? orderDetail.description : Number(orderDetail.requiredProducts[row].amount)
      });
      NotificationManager.success(`你选择了${type === 'description' ? orderDetail.description : Number(orderDetail.requiredProducts[row].amount)}`);
    }
  }
  let invoiceSubtotal;
  let invoiceTotal;
  if (loading) {
    invoiceSubtotal = subtotal(orderDetail.requiredProducts);
    invoiceTotal = invoiceSubtotal;
  }
  return (
    <Paper style={{}}>
    {loading && <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>明细</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>材料</TableCell>
            <TableCell align="right">数量</TableCell>
            <TableCell align="right">单价</TableCell>
            <TableCell align="right">合计</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetail.requiredProducts.map((row, index) => (
            <TableRow key={row.productId}>
              <TableCell>{row.productName}</TableCell>
              <TableCell align="right" id={'amount' + String(index)} onDoubleClick={handleClick}>{row.amount}</TableCell>
              <TableCell align="right">{row.unitPrice}</TableCell>
              <TableCell align="right">{ccyFormat(row.unitPrice * row.amount)}</TableCell>
            </TableRow>
          ))}

          {/* <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow> */}
          {/* <TableRow>
            <TableCell>税</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell colSpan={2}>总计</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </TableContainer>}
      <Paper style={{ backgroundColor: 'rgba(247,247,248)', padding: 5, paddingLeft: 20, marginTop: 20 }}>
        <h2>备注</h2>
        <p id='description0' onDoubleClick={handleClick}>{orderDetail.description}</p>
      </Paper>
    </Paper>
  );
}
