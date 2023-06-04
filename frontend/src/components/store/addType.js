import React from "react"
import {makeRequest} from '../../utils/requestWrapper'
import { Box, Button, TextField } from "@mui/material"
export default function  AddMateriaType(props) {
    const [data, setdata] = React.useState({
        materialName:'',
        unitPrice: 0,
        unit: ''
    })
    function handleSubmit() {
        makeRequest('POST', 'STORE_ADDTYPE', data)
        .catch((e) => console.log(e))
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
            console.log(typeof event.target.value)
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