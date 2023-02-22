import React, { useContext, useState,useEffect } from 'react'
import "./onboarding.css"
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { userContext } from '../../../context/userContext';
import { primaryRole, skills,experience,expectedSalary } from '../../../constants';
import SearchableDropDown from "../../common/SearchableDropDown"
import UploadFile from '../../common/UploadFile';
import {db} from "../../../firebaseconfig"
import { setDoc,doc,getDoc } from "firebase/firestore";


import {postMessage} from "../../../utils/postMessage"
import { useNavigate } from 'react-router-dom';


function Onboarding() {
  const navigate=useNavigate()

  const [state, dispatch] = useContext(userContext)
  const [userData, setUserData] = useState({
    name: state.user.displayName,
    email: state.user.email,
    phone: "",
    primaryRole: "",
    linkedin: "",
    skills: [],
    experience: "",
    bio: "",
    resume: "",
    expectedSalary: "",
  })

const fetchUserData= async()=>{
  const userId = state.user.email;
  const docRef = doc(db,"userInfo",userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    navigate("/candidate/profile");
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
  useEffect(() => {
   
  fetchUserData()

  }, [])
  
  const setSkills=(skill)=>{

    if(userData.skills.includes(skill))
    {
      setUserData({
        ...userData,
        skills:userData.skills.filter((item)=>item!==skill)
      })

    }
    else
    {
      setUserData({
        ...userData,skills:[...userData.skills,skill]
      })
    }
  }

  const submitData= async(e)=>{
    e.preventDefault();
    console.log(userData)
    try
    {
    const userId=state.user.email
    await setDoc(doc(db,"userInfo",userId),
    {
      ...userData,
      userId,
      userType:'candidate'
    })
    postMessage("success","Data Save Successfully!!!")
    navigate("/candidate/profile");
  }
  catch(err)
  {
    postMessage("error","Error in Saving data!!!")
  }

  }
  return (
    <form onSubmit={submitData}>
      <div style={{float:'right',margin:"15px"}}>
        <Button variant="contained" endIcon={<LogoutIcon />}>Logout</Button>
      </div>
      <Grid className="grid-container" container spacing={2}>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Name</label>
          <TextField
            size="small"
            fullWidth
            required
            disabled
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            value={userData.name}
            onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }}
          ></TextField>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Email Id</label>
          <TextField
            size="small"
            fullWidth
            required
            disabled
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            value={userData.email}
            onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
          ></TextField>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Phone No.</label>
          <TextField
            size="small"
            fullWidth
            required

            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            value={userData.phone}
            onChange={(e) => { setUserData({ ...userData, phone: e.target.value }) }}
          ></TextField>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Primary Role</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            fullWidth
            value={userData.primaryRole}
            
            onChange={(e) => { setUserData({ ...userData, primaryRole: e.target.value }) }}
          >
            {primaryRole.map((item,index)=>{
                return <MenuItem value={item} key={index}>{item}</MenuItem>
            })}
           
          </Select>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Linkedin ID</label>
          <TextField
            size="small"
            fullWidth
            required
            type="url"
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            value={userData.linkedin}
            onChange={(e) => { setUserData({ ...userData, linkedin: e.target.value }) }}
          ></TextField>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Skills</label>
          <SearchableDropDown
          options={skills}
          onChange={(newvalue)=>setSkills(newvalue)}
          />
          <div className='skills-container'>
        {
          userData.skills.map((item)=>{
            return <div 
            onClick={()=>{setSkills(item)}}
            >{item}</div>
          })
        }
        </div>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Experiance</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            fullWidth
            value={userData.experience}
            
            onChange={(e) => { setUserData({ ...userData, experience: e.target.value }) }}
          >
            {experience.map((item,index)=>{
                return <MenuItem value={item} key={index}>{item}</MenuItem>
            })}
           
          </Select>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Expected Salary</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            fullWidth
            value={userData.expectedSalary}
            
            onChange={(e) => { setUserData({ ...userData, expectedSalary: e.target.value }) }}
          >
            {expectedSalary.map((item,index)=>{
                return <MenuItem value={item} key={index}>{item}</MenuItem>
            })}
           
          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={12}>
          <label>Bio</label>
          <TextField
            size="small"
            fullWidth
            multiline
            minRows={5}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            value={userData.bio}
            onChange={(e) => { setUserData({ ...userData, bio: e.target.value }) }}
          ></TextField>
        </Grid>
        <Grid className="grid-item" item xs={12} >
          <label>Resume </label>
         <UploadFile
         type="doc"
         onUpload={(url) => setUserData({ ...userData, resume: url })}
         value={userData.resume}
        
         />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          className="grid-item"
          item
          xs={12}
        >
          <Button variant="contained" type="sumbit">Submit</Button>
        </Grid>
      </Grid>

    </form>
  )
}

export default Onboarding