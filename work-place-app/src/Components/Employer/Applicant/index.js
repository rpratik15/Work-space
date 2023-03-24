import React, { useContext,useEffect, useState } from 'react'
import { userContext } from '../../../context/userContext'
import { collection, query, where,getDocs } from "firebase/firestore";
import {db} from '../../../firebaseconfig'

import  CommonTable  from '../../common/CommonTable'

const columns = [
  {
    label: "Company ",
    datakey:'companyName',
    style:{
      width: '25%'
    }
  },
  {
    label: "Job Title",
    datakey:'jobTitle',
    style:{

      width: '25%'
    }
  },
  {
    label: "Intrest shown",
    datakey:'createdAt',
    type: "date",
    style:{
      width: '25%'
    }
  },
  {
    label: "Status",
    datakey:'status',
    type:"action",
    style:{
      width: '25%'
    }
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
  const querySnapshot = await getDocs(q);
  let a = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.data());
    a.push(doc.data());
  });
  setApplications(a);
};
useEffect(() => {
 
  fetchAllApplications()
 
  
}, [])

const btnAction=(data,type)=>{
  console.log(data,type)
}
  return (
    applications&&applications.length===0?<div>NO APPLICATIONS</div>:
    applications&&applications.length>0?(<div><CommonTable columns={columns} data={applications} btnAction={btnAction}/> </div>):<div>Loading....</div>
  )
}

export default Applicant