import React, { useContext, useEffect, useState } from 'react'
import { collection, query, getDocs, doc, setDoc,getDoc } from "firebase/firestore";

import { db } from '../../../firebaseconfig'
import { v4 as uuidv4 } from "uuid";
import JobsCards from './JobsCards';
import { userContext } from '../../../context/userContext'
import {postMessage} from '../../../utils/postMessage'
import { async } from '@firebase/util';
function Job() {
  const [allJobs, setAllJobs] = useState(null)
  const [state, dispatch] = useContext(userContext)
  const [employerInfo,setEmployerInfo]=useState(null)
  const [employerId,setEmployerId]=useState("")
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

  const applyonJob = async (job) => {
    
    // create a new collection in firestore call applications
    // create a new document in applications collection
    // store job id, candidate id,employer id, and all the relevant data
    // store a status field in the document
    const applicationId = uuidv4();
    setEmployerId(job.employerId)
    
    try{
      
      console.log(job)
      
     console.log(employerId)
      await fetchEmployerInfo()
    // Add a new document in collection "Application"
    await setDoc(doc(db, "applications", applicationId), {

      applicationId,
       jobId: job.jobId,
       candidateId: state.user.email,
      employerId: job.employerId,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      createdAt: new Date(),
      candidateName: state.user.displayName,
      experience: state.userInfo?.experience,
      resume: state.userInfo?.resume,
      expectedSalary: state.userInfo?.expectedSalary,
      status: "Pending",

    });
    postMessage("Success","Application Save Successfully!!!!")
  }
  catch(e)
  {
    postMessage("Error","There is some error!!!!")
    console.log(e)
    
  }


  }
  const fetchEmployerInfo= async ()=>{
    console.log(employerId)
    const docRef = doc(db, "userInfo",employerId);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
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
          allJobs.map((job) => {
            return (<JobsCards key={job.jobId} job={job} applyonJob={ applyonJob} />)
          })
        }

      </div>
    ) : (<div>Loading....</div>)


  )


}

export default Job