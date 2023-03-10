import React, { useContext,useEffect, useState } from 'react'
import { userContext } from '../../../context/userContext'
import { collection, query, where,getDocs } from "firebase/firestore";
import {db} from '../../../firebaseconfig'


function Application() {
const [state,dispatch]=useContext(userContext)
const [allApplications,setAllApplications]=useState(null)

const fetchAllApplication=async ()=>{
  

const applicationRef = collection(db, "applications");

// Create a query against the collection.
const q = query(applicationRef, where("candidateId","==",state.user.email));
const querySnapshot = await getDocs(q);
const applications=[]
querySnapshot.forEach((doc) => {
  applications.push(doc)
  
  //console.log(doc.id, " => ", doc.data());
});
setAllApplications(applications)
}
useEffect(() => {
 
  fetchAllApplication()
 
  
}, [])


  return (
    <div>{
      allApplications?.map((application,index)=>{
        return <h2 >{application}</h2>
      })}</div>
  )
}

export default Application