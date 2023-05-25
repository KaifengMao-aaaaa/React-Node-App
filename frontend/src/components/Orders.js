import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {
  const rows = props.orders
    return (
        <React.Fragment>
        <Title>订单</Title>
        <Table size="large">
            <TableHead>
            <TableRow>
                <TableCell>时间</TableCell>
                <TableCell>用户</TableCell>
                <TableCell>客户</TableCell>
                <TableCell>支付方式</TableCell>
                <TableCell>状态</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
                <TableCell >more details</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>{row.good}</TableCell>
                <TableCell align="right">{`$${row.amount}`}</TableCell>
                <TableCell> 
                    <Link href="/order/{row.id}">Link</Link>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
            See more orders
        </Link>
        </React.Fragment>
    );
}