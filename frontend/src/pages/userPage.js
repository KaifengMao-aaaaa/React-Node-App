import { Box } from '@mui/material';
import React from 'react';
import ListUsers from '../components/user/listUser';
export default function UserPage () {
  return (
        <Box margin={10} marginLeft={15}>
            <ListUsers/>
        </Box>
  );
}
