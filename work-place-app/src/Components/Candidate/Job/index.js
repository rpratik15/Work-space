import React, { useEffect, useState } from 'react'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../../../firebaseconfig'
import Jobcards from './JobsCards'
import JobsCards from './JobsCards';

function Job() {
  const [allJobs, setAllJobs] = useState(null)

  const fetchAllJobs = async () => {
    const q = query(collection(db, "jobs"));

    const querySnapshot = await getDocs(q);
    let jobs = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      jobs.push(doc.data())


    });
    setAllJobs(jobs)

  }

  const applyonJob=(job)=>{
    console.log(job)
    
  }
  useEffect(() => {
    fetchAllJobs()

  }, [])
  return (
    allJobs && allJobs.length === 0 ? (
      <div>No Data</div>
    ) : allJobs && allJobs.length > 0 ? ( 
       <div>
      {
        allJobs.map((job)=>{
          return (<JobsCards  key={job.jobId} job={job} applyonJob={()=>applyonJob(job)}  />)
        })
      }

    </div>    
    ) : (<div>Loading....</div>)


  )


}

export default Job