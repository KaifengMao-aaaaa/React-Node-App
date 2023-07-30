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
import { sections, SL } from '../setting';
import { languageTable } from '../book';
export const MainListItems = () => {
  const [token, setToken] = React.useContext(AuthContext);
  const availablePages = localStorage.getItem('availablePages').split(',');
  return (
  <React.Fragment>
    {availablePages.includes(sections.HOME) && <ListItemButton href='/'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary={languageTable.list[sections.HOME][SL]} />
    </ListItemButton>}
    {availablePages.includes(sections.SALES) && <ListItemButton href='/order'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary={languageTable.list[sections.SALES][SL]} />
    </ListItemButton>}
    {availablePages.includes(sections.STORE) && <ListItemButton href='/store'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary={languageTable.list[sections.STORE][SL]} />
    </ListItemButton>}
    {availablePages.includes(sections.PRODUCTS) && <ListItemButton href='/product'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary={languageTable.list[sections.PRODUCTS][SL]} />
    </ListItemButton>}
    {availablePages.includes(sections.USERS) && <ListItemButton href='/user'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary={languageTable.list[sections.USERS][SL]} />
    </ListItemButton>}
    {availablePages.includes(sections.HISTORY) && <ListItemButton href='/history'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary={languageTable.list[sections.HISTORY][SL]} />
    </ListItemButton>}
    {availablePages.includes(sections.PROFILE) && <ListItemButton href='/edit'>
      <ListItemIcon>
        < ArrowOutwardIcon/>
      </ListItemIcon>
      <ListItemText primary={languageTable.list[sections.PROFILE][SL]} />
    </ListItemButton>}

    <ListItemButton style={{ marginTop: 200 }} onClick={() => {
      localStorage.removeItem('token');
      makeRequest('DELETE', 'USER_LOGOUT', { token }, { token })
        .then( () => {
          setToken(null);
          localStorage.removeItem('availablePages');
        });
    }}>
      <ListItemIcon>
        < ArrowBackIcon/>
      </ListItemIcon>
      <ListItemText primary={languageTable.list.EXIT[SL]} />
    </ListItemButton>
  </React.Fragment>
  );
};

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
