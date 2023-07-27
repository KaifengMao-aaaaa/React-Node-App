import React from "react"
import {makeRequest} from '../../utils/requestWrapper'
import { Box, Button, TextField } from "@mui/material"
import AuthContext from '../../AuthContext';
import {NotificationManager} from 'react-notifications';
export default function  AddMateriaType(props) {
    const [data, setdata] = React.useState({
        materialName:'',
        unitPrice: 0,
        unit: ''
    })
    const token = localStorage.getItem('token')
    console.log(`token is ${token}`)
    function handleSubmit() {
        makeRequest('POST', 'STORE_ADDTYPE', {...data},{token})
        .then(() => NotificationManager.success(`成功添加物料类型${data.materialName}`))
        .catch((e) => {NotificationManager.error(e.response.data)})
        .finally( () => {
            props.closePageTriger(null)
            props.updateTableTriger((prev) => prev + 1)
        })
    }
    function handleChange(event) {
        let newData
        if (event.target.name === 'materialName') {
            newData = {...data,materialName:event.target.value}
        } else if (event.target.name === 'unit') {
            newData = {...data, unit: event.target.value}
        } else if (event.target.name === 'unitPrice') {
            newData = {...data, unitPrice: Number(event.target.value)}
        }
        setdata(newData)
    }
    return (<Box>
        <TextField type="text"  onChange={handleChange} label='名字' name="materialName"></TextField>
        <TextField type="number"  onChange={handleChange} label= '单价' name='unitPrice'></TextField>
        <TextField type="text"  onChange={handleChange} label='单位' name="unit"></TextField>
        <Button onClick={handleSubmit}>确认</Button>
        <Button onClick={() => props.closePageTriger(null)}>返回</Button>
        </Box>)
}