import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, orderImformation, MenuItem} from '@mui/material';
import axions from 'axios'
const AddMaterial = (props) => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [materialsOptions, setmaterialOptions] = useState([])
    const [selectedMaterial, setSelectedMaterial] = React.useState('')
    const [upLoadCount, setUploadCount] = React.useState(0)
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axions.post('/store/add',{amount, materialType: type})
            .catch((e) => console.log(e))
        setAmount('');
        setType('');
        setUploadCount(upLoadCount + 1)
    };
    React.useEffect(function() {
        axions.get('/product/type')
            .then(({data}) => {setmaterialOptions(data.productsType)})
    }, [upLoadCount])

  const handleAnyChange = (value) => {
    setSelectedMaterial(value.target.value)
  }
  return (
    <form style={{display:'flex'}}>
            <FormControl variant="outlined" style={{width:200, marginRight:10}}>
            <InputLabel>产品类型</InputLabel>
            <Select
                value={selectedMaterial}
                onChange={handleAnyChange}
                name= 'productOption'
            >
                {materialsOptions.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
            </Select>
            </FormControl>
        <TextField
        label="数量"
        value={amount}
        onChange={handleAmountChange}
        required
        />
        <Button onClick={handleSubmit}>提交</Button>
        <Button onClick={() => props.closeTriger(false)}>关闭</Button>
      
    </form>
  );
};

export default AddMaterial;