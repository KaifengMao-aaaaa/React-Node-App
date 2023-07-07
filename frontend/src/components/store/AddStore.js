import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, orderImformation, MenuItem} from '@mui/material';
import {makeRequest} from '../../utils/requestWrapper'
import AuthContext from '../../AuthContext';
const AddMaterial = (props) => {
    const [amount, setAmount] = useState('');
    const [materialsOptions, setmaterialOptions] = useState([])
    const [description, setDescription] = useState('')
    const [selectedMaterial, setSelectedMaterial] = React.useState(null)
    const [uId, setUid] = React.useContext(AuthContext)
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        makeRequest('POST', 'STORE_ADD', {userId: uId ,description: description,amount: Number(amount), materialName: selectedMaterial})
            .catch((e) => console.log(e))
        setAmount('');
        setSelectedMaterial(null)
        props.updateTableTriger((prev) => prev + 1)
    };
    React.useEffect(function() {
        makeRequest('GET', 'STORE_ALLTYPE', {})
            .then(({data}) => {setmaterialOptions(data.allMaterialType)})
    }, [])

  const handleAnyChange = (value) => {
    setSelectedMaterial(value.target.value)
  }
  const handleDescriptionChnage = (value) => {
    setDescription(value.target.value)
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
                <MenuItem key={index} value={option.materialName}>{option.materialName}</MenuItem>
                ))}
            </Select>
            </FormControl>
        <TextField
        label="数量"
        value={amount}
        onChange={handleAmountChange}
        required
        style={{marginRight:10}}
        />
        <TextField label='描述' value = {description} onChange={handleDescriptionChnage} />
        <Button onClick={handleSubmit}>提交</Button>
        <Button onClick={() => props.closeTriger(null)}>关闭</Button>
      
    </form>
  );
};

export default AddMaterial;