import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AuthContext from '../AuthContext';
export const MainListItems = () => {
  const [uId, setUId] = React.useContext(AuthContext)
  return (
  <React.Fragment>
    <ListItemButton href='/'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="主页" />
    </ListItemButton>
    <ListItemButton href='/order'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="订单" />
    </ListItemButton>
    <ListItemButton  href='/store'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="仓库" />
    </ListItemButton>
    <ListItemButton  href='/product'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="产品" />
    </ListItemButton>

    <ListItemButton href='/user'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="用户" />
    </ListItemButton>
    <ListItemButton href='/history'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary="记录" />
    </ListItemButton>

    <ListItemButton style={{marginTop:200}} onClick={() => {
      localStorage.removeItem('uId')
      setUId(null)
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