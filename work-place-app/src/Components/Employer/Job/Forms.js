import { Button, Grid, Select, TextField, MenuItem} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import {setDoc,doc} from 'firebase/firestore' 
import { db } from '../../../firebaseconfig'
import { v4 as uuidv4 } from 'uuid'
import { skills, primaryRole, experience, currency } from '../../../constants'
import SearchableDropDown from '../../common/SearchableDropDown'
import './Job.css'
import {userContext} from '../../../context/userContext'
import {postMessage} from "../../../utils/postMessage"

function Forms({ setMobileView,selectedJob }) {
  const initialState={
    jobTitle: "",
    jobDescription: "",
    jobType: "",
    primaryRole: "",
    jobLocation: "",
    salaryRange: {
      currency: "",
      min: "",
      max: "",
    },
    skills: [],
    experience: ""
  }
  const [disabledField, setDisabledField] = React.useState(false);
  const [state,dispatch]=useContext(userContext)
  const [data, setData] = useState(initialState)
    const setSkills = (skill) => {
      //if skill is already present in the array then remove it
      // else add it
  
      if (data.skills.includes(skill)) {
        setData({
          ...data,
          skills: data.skills.filter((item) => item !== skill),
        });
      } else {
        setData({ ...data, skills: [...data.skills, skill] });
      }
    };

    const submit=async(e)=>{
      
      const jobId= selectedJob?selectedJob.jobId: uuidv4()
      e.preventDefault();
      try
      {
      await setDoc(
        //doc ref,
        doc(
          db,"jobs",jobId
          //db ref,collection name & doc id
        ),
        //data
        {...data,
          employerId:state.user.email,
          companyName:state.userInfo?.companyName,
          companyTag:state.userInfo?.companyTag,
          companySize:state.userInfo?.companySize,
          jobId,
          createdAt: new Date(),
          companyLogo:state.userInfo?.companyLogo
        },{ merge: true }
      )
      postMessage("Success","Data Save Successfully!!!")
      }
      catch(e)
      {
        console.log(e)
      }
    }

    useEffect(()=>{
        if(selectedJob)
        {
          setData(selectedJob)
        }
        else
        {
         
          setData(initialState)
        }
    },[selectedJob])
  return (
    <form onSubmit={(e)=>submit(e)}>
      <Button variant="contained"
        sx={{
          display: { xs: 'block', md: 'none' },
          width: "100%",
          background: '#e30707b8'
        }}
        onClick={() => setMobileView(false)}>
        Back
      </Button>
      <Grid container spacing={2} >
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Job Title</label>
          <TextField
            size="small"
            fullWidth
            required
            disabled={disabledField}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            value={data.jobTitle}
            onChange={(e) => { setData({ ...data, jobTitle: e.target.value }) }}
          ></TextField>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Job Type</label>
          <TextField
            size="small"
            fullWidth
            required
            disabled={disabledField}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            value={data.jobType}
            onChange={(e) => { setData({ ...data, jobType: e.target.value }) }}
          ></TextField>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Primary Role</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            fullWidth
            value={data.primaryRole}
            disabled={disabledField}
            onChange={(e) => { setData({ ...data, primaryRole: e.target.value }) }}
          >
            {primaryRole.map((item, index) => {
              return <MenuItem value={item} key={index}>{item}</MenuItem>
            })}

          </Select>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Job Location</label>
          <TextField
            size="small"
            fullWidth
            required
            disabled={disabledField}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            value={data.jobLocation}
            onChange={(e) => { setData({ ...data, jobLocation: e.target.value }) }}
          ></TextField>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={12}>
          <label>Salary Range</label>
          <Grid container spacing={2}>
            <Grid item xs={4} md={4}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                fullWidth
                value={data.currency}
                placeholder='Currency'
                defaultValue='INR'
                disabled={disabledField}
                onChange={(e) => { setData({ ...data, currency: e.target.value }) }}
              >
                {currency.map((item, index) => {
                  return <MenuItem value={item} key={index}>{item}</MenuItem>
                })}

              </Select>
            </Grid>
            <Grid item xs={4} md={4}>
              <TextField
                size="small"
                fullWidth
                placeholder='Min'
                disabled={disabledField}
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                    border: "1px solid #00000036",
                  },
                }}
                value={data.salaryRange.min}
                onChange={(e) => { setData({ ...data, salaryRange: { ...data.salaryRange, min: e.target.value } }) }}
              ></TextField>
            </Grid>
            <Grid item xs={4} md={4}>
              <TextField
                size="small"
                fullWidth
                placeholder='Max'
                disabled={disabledField}
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                    border: "1px solid #00000036",
                  },
                }}
                value={data.salaryRange.max}
                onChange={(e) => { setData({ ...data, salaryRange: { ...data.salaryRange, max: e.target.value } }) }}
              ></TextField>
            </Grid>

          </Grid>

        </Grid>



        <Grid className="grid-item" item xs={12} sm={6}>
        <label>Skills </label>
          <SearchableDropDown
            disabled={disabledField}
            options={skills}
            onChange={(newValue) => setSkills(newValue)}
          />
          <div className="skills-container">
            {data.skills.map((item) => {
              return (
                <div
                  onClick={() => {
                    !disabledField && setSkills(item);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Experiance</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            fullWidth
            value={data.experience}
            disabled={disabledField}
            onChange={(e) => { setData({ ...data, experience: e.target.value }) }}
          >
            {experience.map((item, index) => {
              return <MenuItem value={item} key={index}>{item}</MenuItem>
            })}

          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={12}>
        <label>Job Discription</label>
        <TextField
          size="small"
          fullWidth
          multiline
          minRows={4}
          disabled={disabledField}
          sx={{
            fieldset: {
              borderRadius: "10px",
              border: "1px solid #00000036",
            },
          }}
          value={data.jobDescription}
          onChange={(e) => { setData({ ...data, jobDescription:  e.target.value }) }}
        ></TextField>
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
          <Button variant="contained" type="sumbit" className='post-form-btn'>
            {
              selectedJob?"SAVE":"POST JOB"
            }
            </Button>
        </Grid>
      </Grid>
    </form>

  )
}

export default Forms