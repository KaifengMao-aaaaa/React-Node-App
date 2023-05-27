import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, orderImformation, MenuItem} from '@mui/material';
import axions from 'axios'
const AddMaterial = (props) => {
    const [amount, setAmount] = useState('');
    const [materialsOptions, setmaterialOptions] = useState([])
    const [selectedMaterial, setSelectedMaterial] = React.useState(null)
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axions.post('/store/add',{amount: amount, materialName: selectedMaterial})
            .catch((e) => console.log(e))
        setAmount('');
        setSelectedMaterial(null)
        props.updateTableTriger((prev) => prev + 1)
    };
    React.useEffect(function() {
        axions.get('/store/alltype')
            .then(({data}) => {setmaterialOptions(data.allMaterialType)})
    }, [])

  const handleAnyChange = (value) => {
    setSelectedMaterial(value.target.value)
  }
  console.log(materialsOptions)
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
                <MenuItem key={index} value={option.materialName}>{option.materialName}</MenuItem>
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
        <Button onClick={() => props.closeTriger(null)}>关闭</Button>
      
    </form>
  );
};

export default AddMaterial;