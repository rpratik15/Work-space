import React, { useContext,useEffect, useState } from 'react'
import { userContext } from '../../../context/userContext'
import { collection, query, where,getDocs, deleteDoc,doc, onSnapshot,setDoc} from "firebase/firestore";
import {db} from '../../../firebaseconfig'

import  CommonTable  from '../../common/CommonTable'
import { async } from '@firebase/util';

const columns = [
  {
    label: "Name",
    datakey: "candidateName",
    style: {
      width: "20%",
    },
  },
  {
    label: "Job Title",
    datakey: "jobTitle",
    style: {
      width: "10%",
    },
  },
  {
    label: "Experience",
    datakey: "experience",
    style: {
      width: "15%",
    },
  },
  {
    label: "Expected Salary",
    datakey: "expectedSalary",
    style: {
      width: "20%",
    },
  },
  {
    label: "Resume",
    datakey: "resume",
    type: "url",
    style: {
      width: "5%",
    },
  },
  {
    label: "Action",
    type: "action",
    style: {
      width: "30%",
    },
  },
];
function Applicant() {
  
  const [state, dispatch] = useContext(userContext);
  const [applications, setApplications] = useState(null);

const fetchAllApplications = async () => {
  // fetch all applications from applications collection where candidate id is equal to current user id
  const q = query(
    collection(db, "applications"),
    where("employerId", "==", state.user.email)
  );
  /*const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});*/
const unsubscribe=onSnapshot(q,(querySnapshot)=>{
  let a = [];
  querySnapshot.forEach((doc) => {
  
    a.push(doc.data());
  });
  setApplications(a);
})
  // const querySnapshot = await getDocs(q);
  // let a = [];
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.data());
  //   a.push(doc.data());
  // });
  // setApplications(a);
};
useEffect(() => {
 
  fetchAllApplications()
 
  
}, [])

const btnAction=async (data,type)=>{
  //console.log(data,type)
  if(type==='rejected')
  {
    try{
      const docRef=doc(db,"applications",data.applicationId)
      await deleteDoc(docRef)
      postMessage("Success","Application Rejected")
    }
    catch(e)
    {
      console.log(e)
    }
  }
  else 
  {
    await setDoc(
      doc(db, "applications", data.applicationId),
      {
        status: "accepted",
      },
      { merge: true });
  }
}
  return (
    applications&&applications.length===0?<div>NO APPLICATIONS</div>:
    applications&&applications.length>0?(<div><CommonTable columns={columns} data={applications} btnAction={btnAction}/> </div>):<div>Loading....</div>
  )
}

export default Applicant