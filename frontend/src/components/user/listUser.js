import { Box,Button,Paper } from "@mui/material";
import { makeRequest } from "../../utils/requestWrapper";
import React from "react";
import{backgroundColour} from '../../setting'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AuthContext from "../../AuthContext";
import { NotificationManager } from "react-notifications";
export default function ListUsers() {
    const [usersList, setUsersList] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [permission, editPermission] = React.useState('')
    const [permissionBox,editPermissionBox] = React.useState(false)
    const token = localStorage.getItem('token')
    const handleChange = (event) => {
        editPermission(event.target.value);
    };
    const handleSubmit = (event) => {
        makeRequest('PUT', 'USER_PERMISSION_MODIFY', {staffId: event.target.value, toPermission: permission}, {token})
            .then(() =>{
                editPermission('')
                editPermissionBox(false)
                NotificationManager.success('编辑成功')
            })
            .catch(e => NotificationManager.error(e.response.data))
    }
    React.useEffect(function() {
        makeRequest('GET', 'USER_LISTALL', {}, {token})
            .then(({data}) => {
                if (data) {
                    setUsersList(data.users)
                    setLoading(true)
                }
            })
            .catch((e) => NotificationManager.error(e.response.data))
    }, [permissionBox])
    return (<Paper style={{flexWrap: 'wrap',display:'flex', backgroundColor: backgroundColour,width:1000}}>
        {usersList.map((user) => 
            <Paper style={{width: 300,margin:15, height: 300, padding:15}}>
                {`id : ${user.id}`}
                <br/>
                {`邮箱 : ${user.email}`}
                {<h2>{user.name}</h2>}
                {`权限: ${user.role}`}
                <Box>
                    {permissionBox && <Select style={{marginRight:10}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>}
                    <Button style={{marginRight:10}} onClick={() => editPermissionBox(!permissionBox)} variant="outlined">{!permissionBox && '编辑权限' || '关闭'}</Button>
                    {permission && <Button variant="contained" value = {user.ID} onClick={handleSubmit}>确认修改</Button>}
                </Box>
            </Paper>
        )}
    </Paper>)
}