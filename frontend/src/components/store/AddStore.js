import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { makeRequest } from '../../utils/requestWrapper';
import { NotificationManager } from 'react-notifications';
const AddMaterial = (props) => {
  const [amount, setAmount] = useState('');
  const [materialsOptions, setmaterialOptions] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedMaterial, setSelectedMaterial] = React.useState(null);
  const token = localStorage.getItem('token');
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    makeRequest('POST', 'STORE_ADD', { description, amount: Number(amount), materialName: selectedMaterial }, { token })
      .then(() => {
        NotificationManager.success(`成功添加${selectedMaterial} ${amount} 单位`);
      })
      .catch((e) => NotificationManager.error(e.response.data))
      .finally(() => {
        setAmount('');
        setDescription('');
        setSelectedMaterial(null);
        props.updateTableTriger((prev) => prev + 1);
      });
  };
  React.useEffect(function () {
    makeRequest('GET', 'STORE_ALLTYPE', {}, { token })
      .then(({ data }) => {
        setmaterialOptions(data.allMaterialType);
        NotificationManager.success('信息已经全部更新');
      })
      .catch((e) => NotificationManager.error(e.response.data));
  }, []);

  const handleAnyChange = (value) => {
    setSelectedMaterial(value.target.value);
  };
  const handleDescriptionChnage = (value) => {
    setDescription(value.target.value);
  };
  return (
    <form style={{ display: 'flex' }}>
            <FormControl variant="outlined" style={{ width: 200, marginRight: 10 }}>
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
        style={{ marginRight: 10 }}
        />
        <TextField label='描述' value = {description} onChange={handleDescriptionChnage} />
        <Button onClick={handleSubmit}>提交</Button>
        <Button onClick={() => props.closeTriger(null)}>关闭</Button>
    </form>
  );
};

export default AddMaterial;
