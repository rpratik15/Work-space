import React from 'react'
import { TextField } from '@mui/material'

function UploadFile(type="doc",onUpload,value) {
  return (
    <div>
       <TextField
            size="small"
            fullWidth
            type="file"
            
            
          ></TextField>
    </div>
  )
}

export default UploadFile