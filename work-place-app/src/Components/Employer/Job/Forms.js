import { Button } from '@mui/material'
import React from 'react'

function Forms({setMobileView}) {
  return (
    <div>
        <Button variant="contained"
        sx={{
            display:{xs:'block',md:'none'},
            width:"100%"
        }}
        onClick={()=>setMobileView(false)}>
            Back
        </Button>
        Forms</div>
  )
}

export default Forms