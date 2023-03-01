import { Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useState } from 'react'
import './Job.css'
import SideJobCard from './SideJobCard';
import {userContext} from '../../../context/userContext'

function Sidebar({postAJob,selectedJob,selectedJobFun}) {
  const [state,dispatch]=useContext(userContext)
  
    
  return (

    <div className='sidebar-panel'>
        <Button variant="contained" style={{width:'100%'} } className='post-btn'
        
        onClick={postAJob}
        >+ Post a Job</Button>
        
          <TextField 
          size="small"
          fullWidth
          placeholder='Search by job title'
          sx={{
            '& fieldset':{
              borderRadius:'20px'
            },
            marginTop:'5pX'

          
          }}
          InputProps={{
            startAdornment:(<SearchIcon 
            sx={{color:'gray',margin:'0 0px', fontSize:'20px'}}
            
            />)
             
            
          }}
          ></TextField>
        
        <div>
            {
                [{ jobTitle:'Software Developer',
                  createdAt:'a day ago',
                  jobType:'Permanant',jobLocation:'pune',jobId:'1'},
                  { jobTitle:'SDE-2',
                    createdAt:'a sec ago',
                    jobType:'Remote',jobLocation:'Mumbai',jobId:'2'}].map((item,i)=>{

                    return <SideJobCard selectedJob={selectedJob} selectedJobFun={selectedJobFun} item={item} index={i}/>

                })
            }
        </div>
    </div>
  )
}

export default Sidebar