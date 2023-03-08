import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import "./auth.css"
import { Button, Grid, Pagination } from "@mui/material";
import authimg from "../../assets/authimg.png";
import googlebtn from "../../assets/google-btn.png";
import { auth, db } from "../../firebaseconfig"
import { doc, getDoc } from "firebase/firestore";
import {userContext} from "../../context/userContext"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { async } from '@firebase/util';




function Auth({ type }) {
  const [state, dispatch] = useContext(userContext);
  const navigate=useNavigate()

  const  redirectUser=async(email)=>{
   const docRef=doc(db,"userInfo",email)
   const userData= await getDoc(docRef)
   let userInformation=null
   if(userData.exists())
   {
    userInformation=userData.data()
     console.log(userInformation)
   }
    if (userInformation) // user exists
    {
      if (userInformation.userType===type) // user exist check its type
       {
        dispatch({
          type:"ADDUSERINFO",
          payload:userInformation
        })
        navigate(`/${type}/profile`);
      } 
      else
      {
        alert(`You are register as ${userInformation.userType} & trying with ${type} Id ` )
      }
      
    } 
    else
    {
    if(type==="candidate")
    {
      navigate("/candidate/onboarding")
    }
    else
    {
      navigate("/employer/onboarding")
    }
  }
  }
  const singIn = () => {


    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result.user)
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;
        dispatch({
          type: "LOGIN",
          payload: {
            displayName, email, photoURL, uid
          }
        })
        redirectUser(email);
      }).catch((error) => {
        console.log(error)
      });
     
      

  }
  return (
    <Grid container>
      <Grid className="auth-btn-container" item xs={12} md={8}>
        <h1>welcome {type}</h1>
        <h3>Please Sign IN</h3>
        <div onClick={singIn} className="auth-btn">
          <img src={googlebtn} alt="googlebtn" />
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div>
          <img width="100%" src={authimg} alt="authimg" />
        </div>
      </Grid>
    </Grid>
  );
}

export default Auth