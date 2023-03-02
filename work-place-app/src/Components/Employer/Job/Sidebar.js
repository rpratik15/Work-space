import { Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useEffect, useState } from 'react'
import './Job.css'
import SideJobCard from './SideJobCard';
import { userContext } from '../../../context/userContext'
import { collection, query, where,onSnapshot } from "firebase/firestore";
import { db } from '../../../firebaseconfig'


function Sidebar({ postAJob, selectedJob, selectedJobFun }) {
  const  [allJobs,setAllJobs]=useState(null)
  const [state, dispatch] = useContext(userContext)
  const fetchAll = async () => {
    const currentUserId = state.user.email
    // const jobsRef = await collection(db, "jobs");
    const q = query(collection(db, "jobs"), where("employerId", "==", currentUserId));
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const jobs=[]
      querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
      });
      setAllJobs(jobs)
      console.log(allJobs)
    });
    
  //  return ()=>unsubscribe //use to stop listner after unmounting componant
  }

  useEffect(()=>{
   fetchAll();  
  
},[])

  return (

    <div className='sidebar-panel'>
      <Button variant="contained" style={{ width: '100%' }} className='post-btn'

        onClick={postAJob}
      >+ Post a Job</Button>

      <TextField
        size="small"
        fullWidth
        placeholder='Search by job title'
        sx={{
          '& fieldset': {
            borderRadius: '20px'
          },
          marginTop: '5pX'


        }}
        InputProps={{
          startAdornment: (<SearchIcon
            sx={{ color: 'gray', margin: '0 0px', fontSize: '20px' }}

          />)


        }}
      ></TextField>

      
      {
        allJobs && allJobs.length==0?(
          <div>No Data Present</div>

        ):allJobs && allJobs.length>0?(<div>
          {
            
           allJobs?.map((item, i) => {
  
              return <SideJobCard selectedJob={selectedJob} selectedJobFun={selectedJobFun} item={item} index={i} />
  
            })
          }
        </div>):

          (<div> Loading.... </div>)
        
        
        
      }
    </div>
  )
}

export default Sidebar