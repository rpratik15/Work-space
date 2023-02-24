import { Button } from '@mui/material'
import React from 'react'

function Sidebar({postAJob,selectedJob}) {
    
  return (

    <div className='sidebar-panel'>
        <Button variant="contained" style={{width:'100%'}}
        
        onClick={postAJob}
        >Post a Job</Button>
        <div>
            {
                [1,2,3,4,5].map((item,i)=>{

                    return <div 
                    onClick={()=>selectedJob(item)}
                    key={i} >{item}</div>

                })
            }
        </div>
    </div>
  )
}

export default Sidebar