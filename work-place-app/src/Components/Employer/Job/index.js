import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Forms from './Forms'
import { Grid } from '@mui/material'

function Job() {
  const [mobileView,setMobileView]=useState(false)
  const postAJob=()=>{
    setMobileView(true)
  }

  const selectedJob=()=>{
    setMobileView(true)
  }
  return (
    <Grid container spacing={3}>
      <Grid 
      sx={{
        display:{xs:mobileView?"none":"block", md:'block'}
      }}
      item xs={12} md={3}>
      <Sidebar postAJob={postAJob} selectedJob={selectedJob}/>
      </Grid>
      <Grid 
       sx={{
        display:{xs:mobileView?"block":"none", md:'block'}
      }}
      item xs={12} md={9}>
        <Forms setMobileView={setMobileView}/>
      </Grid>
    </Grid>
  )
}

export default Job