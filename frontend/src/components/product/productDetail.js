import * as React from 'react';

import { Box,Paper,TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';
import '../../index.css'
import axions from 'axios'
const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ amount, unitPrice }) => amount * unitPrice).reduce((sum, i) => sum + i, 0);
}

// const rows = [
//   createRow('Paperclips (Box)', 100, 1.15),
//   createRow('Paper (Case)', 10, 45.99),
//   createRow('Waste Basket', 2, 17.99),
// ];



export default function ProductDetail(props) {
	const [productDetail, setOrderDetail] = React.useState({})
	const [loading, setLoading] = React.useState(false)
    React.useEffect(function() {
        axions.get("/product/detail", {params: {productId:props.productId}})
            .then(({data}) => {
				if (data) {setOrderDetail(data.productDetail); setLoading(true)}})
			.catch(e => console.log(e))
    }, [props.selected])
    // console.log(productDetail[0])
    function handleClick(event) {
        const type = event.target.id.match(/[a-zA-Z]+/)[0]; // Matches alphabetic characters
        const row = event.target.id.match(/\d+/)[0];
        if (props.mode === 'editable') {
            props.selectedTriger({field:type, 
              row, 
              materialName: productDetail.materials[row].materialName, 
              productId: props.productId, 
              value: type!=='description' ?productDetail.materials[row][type] : productDetail.description})
        }
    }
	let invoiceSubtotal 
	// let invoiceTaxes
	let invoiceTotal 
	if (loading) {
		invoiceSubtotal = subtotal(productDetail.materials);
	// 	invoiceTaxes = TAX_RATE * invoiceSubtotal;
		invoiceTotal = invoiceSubtotal;
	}
  return (
    <Box >

    <Paper style={{}}>
    {loading && <TableContainer component={Paper} >
      <Table key={'id'} sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
				物料需求
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell>材料</TableCell>
            <TableCell align="right" >数量</TableCell>
            <TableCell align="right">单价</TableCell>
            <TableCell align="right">合计</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productDetail.materials.map((row,index) => (
            <TableRow key={row.ID}>
              <TableCell id={'material' + String(index)}>{row.materialName}</TableCell>
              <TableCell align="right" id={'amount' + String(index)} onDoubleClick={handleClick} >{row.amount}</TableCell>
              <TableCell align="right" id={'unitPrice' + String(index)} >{row.unitPrice}</TableCell>
              <TableCell align="right" >{ccyFormat(row.unitPrice * row.amount)}</TableCell>
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
    </Paper>
    <Paper style={{padding: 10, marginTop: 30}}>
        <h2>备注</h2>
        <p onDoubleClick={handleClick} id='description0'>{productDetail.description}</p>
    </Paper>
    </Box>
  );

}