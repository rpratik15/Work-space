import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import "./auth.css"
import { Button, Grid, Pagination } from "@mui/material";
import authimg from "../../assets/authimg.png";
import googlebtn from "../../assets/google-btn.png";
import { auth } from "../../firebaseconfig"
import {userContext} from "../../context/userContext"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";




function Auth({ type }) {
  const [state, dispatch] = useContext(userContext);
  const navigate=useNavigate()

  const  redirectUser=()=>{
   
    if (false) // user exists
    {
      if (false) // user exist as candidate but trying to login as employer
       {
        //alert user he exist as candidate
      } else if (
        // user exist as employer but trying to login as candidate
        false
      ) {
        //alert user he exist as employer
      } else if (
        // user exist as candidate and trying to login as candidate
        true
      ) {
        // redirect to candidate profile
        navigate("/candidate/profile");
      } else if (
        // user exist as employer and trying to login as employer
        true
      ) {
        // redirect to employer profile
        navigate("/employer/profile");
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
        redirectUser();
      }).catch((error) => {
        console.log(error)
      });
     
      

  }
  return (
    <Grid container>
      <Grid className="auth-btn-container" item xs={12} md={8}>
        <h1>welcome {type}</h1>
        <h3>please Sign IN</h3>
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