import * as React from 'react';
import { Card, FormControl, InputLabel, Select, MenuItem, Button, TextField, Box } from '@mui/material';
import axions from 'axios'
const initState = {
    description: '',
    unitPrice: 0,
    productName: 'yyyy/mm/dd',
    materials: [],
}
export default function AddProduct(props) {
    const [productImformation, setProductImformation] = React.useState(initState);
    const [materialType, setMaterialType] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(function() {
        axions.get('/material/type')
            .then(({data}) => {if (data) {setMaterialType(data.materialsType); setLoading(true)}})
            .catch((e) => console.log(e))
    }, [])
    
    const handleAnyChange = event => {
    let newProduct
    if (event.target.name.startsWith('materialAmount')) {
        const index = event.target.name.match(/\d+$/)[0]
        newProduct = {...productImformation}
        newProduct.materials[index].amount = event.target.value
    } else if (event.target.name.startsWith('materialName')) {
        const index = event.target.name.match(/\d+$/)[0]
        newProduct = {...productImformation}
        newProduct.materials[index].material = event.target.value
    } else if (event.target.name === 'unitPrice') {
        newProduct = {
            ...productImformation,
            unitPrice: event.target.value
        } 

    } else if (event.target.name === 'description') {
        newProduct = {
            ...productImformation,
            description: event.target.value
        } 
    } 
    setProductImformation(newProduct)
    };

    const materialCreate = (event) => {
        event.preventDefault();
        const newProduct = {...productImformation}
        newProduct.materials.push({
            amount: 0,
            material: '',
        })
        setProductImformation(newProduct)
        };  

    const handleSubmit = (event) => {
        event.preventDefault();
        axions.post('/product/create',productImformation)
            .then(setProductImformation(initState))
            .then(window.location.reload())
            .catch((e) => console.log(e))
    };
    return (
        <Box> 
            <Card style={{marginTop:60,marginLeft:100, width: 800, padding: 20, backgroundColor: 'rgba(247,247,248)'}}>
                <h2 >创建产品类型</h2>
                <TextField
                    label = '产品名字'
                    variant='standard'
                    style={{marginRight: 20, marginLeft:5}}
                    name='prodctName'
                    onChange={handleAnyChange}
                />
                <TextField
                    label = '单价'
                    variant='standard'
                    name='unitPrice'
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ marginRight: '10px' }}>物料需求</h2>
                        <Button onClick={materialCreate} variant="contained" color="primary">添加物料需求</Button>
                    </div>
                    {loading && productImformation.materials.map((object, index) => 
                        <FormControl variant="outlined" style={{width:150}}>
                            <InputLabel>物料种类</InputLabel>
                            <Select
                                value={productImformation.materials[index].material}
                                onChange={handleAnyChange}
                                label="Select an option"
                                name={'materialName' + index}
                            >
                                {materialType.map((option, index) => (
                                <MenuItem  key={index} value={option.material} >{option.material + '   [' + option.unit + ']'}</MenuItem>
                                ))}
                            </Select>
                            <TextField id= {index} label={'数量'} onChange={handleAnyChange} name= {'materialAmount' + index}/>
                        </FormControl>
                    )}
            </Card>
            <Button onClick={handleSubmit}  id='submitProduct' type="submit" variant="contained" color="primary" style={{marginLeft:100,marginTop:30}}>创建</Button>
            <Button onClick={() => props.closeTriger(false)} variant="outlined" color="primary" style={{marginLeft:20,marginTop:30}}>返回</Button>
        </Box>
    );
}
