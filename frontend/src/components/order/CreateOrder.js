import * as React from 'react';
import { Card, FormControl, InputLabel, Select, MenuItem, Button, TextField, Box } from '@mui/material';
import axions from 'axios'
import '../../index.css'
const initState = {
    description: '',
    client: '',
    deadline: 'yyyy/mm/dd',
    materials: [],
    selectedProduct: '' 
}
export default function OrderCreate(props) {
    const [orderImformation, setOrderImformation] = React.useState(initState);
    const [productsType,setProductsType] = React.useState([])
    const [materialsType,setMaterialsType] = React.useState([])
    React.useEffect(function() {
        console.log('run')
        axions.get('/product/type')
            .then(({data}) => {setProductsType(data.productsType)})
    }, [])
    React.useEffect(function() {
        console.log('run')
        axions.get('/material/type')
            .then(({data}) => {setMaterialsType(data.materialsType)})
    }, [])
    const handleAnyChange = event => {
    let newOrder
    if (event.target.name.startsWith('materialAmount')) {
        const index = event.target.name.match(/\d+$/)[0]
        newOrder = {...orderImformation}
        newOrder.materials[index].amount = event.target.value
    } else if (event.target.name.startsWith('materialName')) {
        const index = event.target.name.match(/\d+$/)[0]
        newOrder = {...orderImformation}
        newOrder.materials[index].material = event.target.value
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
    }
    setOrderImformation(newOrder)
    };

    const materialCreate = (event) => {
    event.preventDefault();
    const newOrder = {...orderImformation}
    newOrder.materials.push({
        amount: 0,
        material: '',
    })
    setOrderImformation(newOrder)
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        axions.post('/order/create',orderImformation)
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
                <form >
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
                </form>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ marginRight: '10px' }}>物料</h2>
                        <Button onClick={materialCreate} variant="contained" color="primary">添加物料需求</Button>
                    </div>
                    {orderImformation.materials.map((object, index) => 
                        <FormControl variant="outlined" style={{width:150}}>
                            <InputLabel>物料种类</InputLabel>
                            <Select
                                value={orderImformation.materials[index].material}
                                onChange={handleAnyChange}
                                label="Select an option"
                                name={'materialName' + index}
                            >
                                {materialsType.map((option, index) => (
                                <MenuItem key={index} value={option.material}>{option.material + '   [' + option.unit + ']'}</MenuItem>
                                ))}
                            </Select>
                            <TextField id= {index} label={'数量'} onChange={handleAnyChange} name= {'materialAmount' + index}/>
                        </FormControl>
                    )}
            </Card>
            <Button onClick={handleSubmit}  id='submitProduct' type="submit" variant="contained" color="primary" style={{marginLeft:100,marginTop:30}}>创建</Button>
        </Box>
    );
}
