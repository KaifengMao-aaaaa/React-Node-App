import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AuthContext from '../AuthContext';
import { makeRequest } from '../utils/requestWrapper';
import { sections } from '../setting';
export const MainListItems = () => {
  const [token, setToken] = React.useContext(AuthContext)
  const availablePages = localStorage.getItem('availablePages').split(',');
  console.log(availablePages)
  return (
  <React.Fragment>
    {availablePages.includes(sections.HOME) && <ListItemButton href='/'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="主页" />
    </ListItemButton>}
    {availablePages.includes(sections.SALES) && <ListItemButton href='/order'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="订单" />
    </ListItemButton>}
    {availablePages.includes(sections.STORE) && <ListItemButton  href='/store'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="仓库" />
    </ListItemButton>}
    {availablePages.includes(sections.PRODUCTS) && <ListItemButton  href='/product'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="产品" />
    </ListItemButton>}
    {availablePages.includes(sections.USERS) && <ListItemButton href='/user'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="用户" />
    </ListItemButton>}
    {availablePages.includes(sections.HISTORY) && <ListItemButton href='/history'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="记录" />
    </ListItemButton>}
    {availablePages.includes(sections.PROFILE) && <ListItemButton href='/edit'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="个人信息修改" />
    </ListItemButton>}

    <ListItemButton style={{marginTop:200}} onClick={() => {
      localStorage.removeItem('token');
      makeRequest('DELETE','USER_LOGOUT', {token},{token:token})
        .then(setToken(null))
    }}>
      <ListItemIcon>
        < ArrowBackIcon/>
      </ListItemIcon>
      <ListItemText primary="退出"/>
    </ListItemButton>
  </React.Fragment>
)};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);