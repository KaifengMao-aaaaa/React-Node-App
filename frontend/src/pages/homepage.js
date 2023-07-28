import React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { makeRequest } from '../utils/requestWrapper'
export default function Body () {
  return (
      <Box sx={{ display: 'flex' }}>
          <Button onClick={() => {
            makeRequest('GET', 'CLEAR', {})
              .catch((e) => console.log(e))
          }}>刷新</Button>
        </Box>
  )
}
