import React from 'react';
import Box from '@mui/material/Box';
// import Bars from '../components/home/barchart';
import { Button } from '@mui/material';
import { makeRequest } from '../utils/requestWrapper';
// import PieChartBody from '../components/home/piechart';
export default function Body () {
  return (
      <Box sx={{ width: '80%', backgroundColor: 'rgb(247, 247, 248)' }}>
          <Button onClick={() => {
            makeRequest('GET', 'CLEAR', {})
              .catch((e) => console.log(e));
          }}>刷新</Button>
        {/* <div style={ { marginTop: 120, marginLeft: 120 } }>
          <PieChartBody/>
        </div>
        <div style={ { marginLeft: 120 } }>
          <Bars/>
        </div> */}
        </Box>
  );
}
