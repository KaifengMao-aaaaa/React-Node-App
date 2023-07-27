import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import AuthContext from '../AuthContext';
import axions from 'axios'
import { Button } from '@mui/material';
import { makeRequest } from '../utils/requestWrapper';
export default function Body() {
  // const [ordersList,setOrdersList] = useState([])
  const [token, setToken] = React.useContext(AuthContext);
  const [ordersdetails,setOrdersDetails] = useState([])
  const [loadCreatePage, setLoadCreatePage] = useState(false)

  return (
      <Box sx={{ display: 'flex' }}>
          <Button onClick={() => {
            makeRequest('GET', 'CLEAR', {})
              .catch((e) => console.log(e))
          }}>刷新</Button>
        </Box>
  );
}