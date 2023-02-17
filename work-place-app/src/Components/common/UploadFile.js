import React from 'react'
import { TextField } from '@mui/material'

function UploadFile() {
  return (
    <div>
       <TextField
            size="small"
            fullWidth
            type="file"
            // onUpload={(url) => setUserData({ ...userData, resume: url })}
            // value={userData.resume}
          ></TextField>
    </div>
  )
}

export default UploadFile