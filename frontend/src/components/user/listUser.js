import { Box, Button, Paper } from '@mui/material'
import { makeRequest } from '../../utils/requestWrapper'
import React from 'react'
import { backgroundColour } from '../../setting'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { NotificationManager } from 'react-notifications'
export default function ListUsers () {
  const [usersList, setUsersList] = React.useState([])
  const [permission, editPermission] = React.useState('')
  const [targetUser, editPermissionBox] = React.useState(-1)
  const token = localStorage.getItem('token')
  console.log(permission)
  const handleChange = (event) => {
    editPermission(event.target.value)
  }
  const handleOpenEdit = (event) => {
    if (targetUser === -1) {
      editPermissionBox(Number(event.target.value))
    } else {
      editPermissionBox(-1)
    }
  }
  const handleSubmit = (event) => {
    makeRequest('PUT', 'USER_PERMISSION_MODIFY', { staffId: event.target.value, toPermission: permission }, { token })
      .then(() => {
        editPermission('')
        editPermissionBox(false)
        NotificationManager.success('编辑成功')
      })
      .catch(e => NotificationManager.error(e.response.data))
  }
  React.useEffect(function () {
    makeRequest('GET', 'USER_LISTALL', {}, { token })
      .then(({ data }) => {
        if (data) {
          setUsersList(data.users)
        }
      })
      .catch((e) => NotificationManager.error(e.response.data))
  }, [targetUser])
  return (<Paper style={{ flexWrap: 'wrap', display: 'flex', backgroundColor: backgroundColour, width: 1000 }}>
        {usersList.map((user) =>
            <Paper key={user.id} style={{ width: 800, margin: 15, height: 300, padding: 15 }}>
                {`id : ${user.id}`}
                <div style={{ fontSize: 30 }}>
                    {<b>{user.name}</b>}
                </div>
                <div>
                    {`邮箱 : ${user.email}`}
                </div>
                <div style={{ marginBottom: 20 }}>
                    {`权限: ${user.role}`}
                </div>
                <Box>
                    {targetUser === user.ID && <Select style={{ marginRight: 10, width: 120 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={'admin'}>管理员</MenuItem>
                        <MenuItem value={'salesManager'}>销售管理</MenuItem>
                        <MenuItem value={'storeManager'}>仓库管理</MenuItem>
                        <MenuItem value={'newUser'}>新员工</MenuItem>
                    </Select>}
                    <Button style={{ marginRight: 10 }} value = {user.ID} onClick={handleOpenEdit} variant="outlined">{targetUser === user.ID ? '退出' : '编辑权限'}</Button>
                    {permission && targetUser === user.ID && <Button variant="contained" value = {user.ID} onClick={handleSubmit}>确认修改</Button>}
                </Box>
            </Paper>
        )}
    </Paper>)
}
