import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { makeRequest } from "../utils/requestWrapper";
import AuthContext from "../AuthContext";
import { NotificationManager } from 'react-notifications';
export default function EditPage() {
    const [uId, setUId] = React.useContext(AuthContext)
    const token = localStorage.getItem('token')
    const [editPrompt, setEditPrompt] = React.useState({
        Password: false,
    })
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState({
        oldPassword: '',
        newPassword: ''
    })
    React.useEffect(() => {
        makeRequest('GET','USER_GETEMAIL', {}, {token})
            .then(({data}) => setEmail(data.email))
            .catch((e) => NotificationManager.error(e.response.data))
    })
    const handelEditPassword = (event) => {
        setPassword({...password, [event.target.id]:event.target.value})
    }
    const handleChange = (event) => {
        if (event.target.value == 'Password' && !editPrompt[event.target.value]) {
            NotificationManager.success('开始编辑密码')
        } else if (event.target.value == 'Password' && editPrompt[event.target.value]) {
            NotificationManager.success('退出编辑')
        }
        setEditPrompt({...editPrompt ,[event.target.value]:!editPrompt[event.target.value]})
    }
    const editPassword = (event) => {
        makeRequest('PUT', 'USER_EDITPASSWORD', {newPassword: password.newPassword, oldPassword: password.oldPassword}, {token})
            .then(() => {
                setPassword('')
                setEditPrompt({...editPrompt, Password: false})
                NotificationManager.success('修改成功')
            })
            .catch((e) => NotificationManager.error(e.response.data))
    }
    return (
        <Box margin={10} marginLeft={15} width={400}>
            <h3>{`目前账号的邮箱是`}</h3>
            <h2>{email}</h2>
            <Button onClick={handleChange} value='Password' sx={{mt:2,mb:2, height:50}} variant={editPrompt.Password ? "outlined" : "contained"} fullWidth>{editPrompt.Password && '取消修改密码' || `修改密码`}</Button>
            {editPrompt.Password && <TextField type="password" onChange={handelEditPassword} id= 'oldPassword' fullWidth label='旧密码'/>}
            {editPrompt.Password && <TextField type="password" onChange={handelEditPassword} id='newPassword' fullWidth label='新密码'/>}
            {editPrompt.Password && <Button onClick={editPassword} value='Password' sx={{mt:2,mb:2, height:50}} variant={"contained"} fullWidth>{'确认修改'}</Button>}
        </Box>
    )
}