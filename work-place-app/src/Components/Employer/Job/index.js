import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Forms from './Forms'
import { Grid } from '@mui/material'

function Job() {
  const [mobileView,setMobileView]=useState(false)
  const [selectedJob,setSelectedJob]=useState(null)
  const postAJob=()=>{
    setMobileView(true)
    setSelectedJob(null)
   
  }

  const selectedJobFun=(item)=>{
    setMobileView(true)
    setSelectedJob(item)
    // console.log(item)
  }


  
  return (
    <Grid container spacing={2}
    sx={{
      margin:'5px auto',
      maxWidth:{xs:'95%',md:'95%'}
    }}
    >
      <Grid 
      sx={{
        display:{xs:mobileView?"none":"block", md:'block'},
        background: '#fff',
        padding:'12px'


      }}
      item xs={12} md={4}>
      <Sidebar postAJob={postAJob} selectedJob={selectedJob}  selectedJobFun={selectedJobFun}/>
      </Grid>
      <Grid 
       sx={{
        display:{xs:mobileView?"block":"none", md:'block'}
      }}
      item xs={12} md={8}>
        <Forms selectedJob={selectedJob} setMobileView={setMobileView}/>
      </Grid>
    </Grid>
  )
}

export default Job