import * as React from 'react';
import { Card, FormControl, InputLabel, Select, MenuItem, Button, TextField, Box } from '@mui/material';
import axions from 'axios'
import '../../index.css'
const initState = {
    description: '',
    client: '',
    deadline: 'yyyy/mm/dd',
    products: [],
    unitPrice: 0 
}
export default function OrderCreate(props) {
    const [orderImformation, setOrderImformation] = React.useState(initState);
    const [productsType,setProductsType] = React.useState([])
    const uId = localStorage.getItem('uId')
    console.log(uId)
    React.useEffect(function() {
        console.log('run')
        axions.get('/product/allType')
            .then(({data}) => {setProductsType(data.allProductType)})
    }, [])
    const handleAnyChange = event => {
    let newOrder
    if (event.target.name.startsWith('productAmount')) {
        const index = event.target.name.match(/\d+$/)[0]
        newOrder = {...orderImformation}
        newOrder.products[index].amount = Number(event.target.value)
    } else if (event.target.name.startsWith('productName')) {
        const index = event.target.name.match(/\d+$/)[0]
        newOrder = {...orderImformation}
        newOrder.products[index].productName = event.target.value
    } else if (event.target.name === 'client') {
        newOrder = {
            ...orderImformation,
            client: event.target.value
        } 

    } else if (event.target.name === 'description') {
        newOrder = {
            ...orderImformation,
            description: event.target.value
        } 
    } else if (event.target.name === 'deadline') {
        newOrder = {
            ...orderImformation,
            deadline: event.target.value
        } 
    } else if (event.target.name === 'productOption') {
        newOrder = {
            ...orderImformation,
            selectedProduct: event.target.value
        }
    } else if (event.target.name === 'unitPrice') {
        newOrder = {
            ...orderImformation,
            unitPrice: Number(event.target.value)
        }
    } 
    setOrderImformation(newOrder)
    };

    const productCreate = (event) => {
        event.preventDefault();
        const newOrder = {...orderImformation}
        newOrder.products.push({
            amount: 0,
            productName: '',
    })
    setOrderImformation(newOrder)
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        axions.post('/order/create',{...orderImformation, creatorId:Number(uId)})
            .then(setOrderImformation(initState))
            .then(window.location.reload())
            .catch((e) => console.log(e))
    };
    return (
        <Box>
            <Card style={{marginLeft:100, marginTop: 100, padding: 20 ,backgroundColor: 'rgba(247,247,248)'}}>
                <h2 >创建订单</h2>
                <TextField
                    label = '客户'
                    variant='standard'
                    style={{marginRight: 20, marginLeft:5}}
                    name='client'
                    onChange={handleAnyChange}
                />
                <TextField
                    label = '截止日期'
                    variant='standard'
                    name='deadline'
                    onChange={handleAnyChange}
                />
                <TextField
                    label = '单价'
                    variant='standard'
                    name='unitPrice'
                    type='number'
                    onChange={handleAnyChange}
                />
                <br/>
                <TextField
                    label = '备注'
                    variant='outlined'
                    fullWidth
                    multiline
                    style={{margin: 5}}
                    name='description'
                    onChange={handleAnyChange}
                />
            </Card>
            <br></br>
            <Card   style={{marginTop:'auto',marginLeft:100, width: 800, padding: 20, backgroundColor: 'rgba(247,247,248)'}}>
                {/* <form >
                    <FormControl variant="outlined" fullWidth>
                    <InputLabel>产品类型</InputLabel>
                    <Select
                        value={orderImformation.selected}
                        onChange={handleAnyChange}
                        name= 'productOption'
                    >
                        {productsType.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                </form> */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ marginRight: '10px' }}>产品</h2>
                        <Button onClick={productCreate} variant="contained" color="primary">添加产品需求</Button>
                    </div>
                    {orderImformation.products.map((object, index) => 
                        <FormControl variant="outlined" style={{width:150}}>
                            <InputLabel>产品种类</InputLabel>
                            <Select
                                value={orderImformation.products[index].productName}
                                onChange={handleAnyChange}
                                label="Select an option"
                                name={'productName' + index}
                            >
                                {productsType.map((option, index) => (
                                <MenuItem key={index} value={option.productName}>{option.productName + '   [' + option.unit + ']'}</MenuItem>
                                ))}
                            </Select>
                            <TextField id= {index} label={'数量'} onChange={handleAnyChange} name= {'productAmount' + index}/>
                        </FormControl>
                    )}
            </Card>
            <Button onClick={handleSubmit}  id='submitProduct' type="submit" variant="contained" color="primary" style={{marginLeft:100,marginTop:30}}>创建</Button>
        </Box>
    );
}
