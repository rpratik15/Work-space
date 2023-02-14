import React ,{useContext} from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Auth from "../components/Auth";
import Onboarding from "../components/Candidate/Onboarding";
import Profile from "../components/Candidate/Profile";
import Jobs from "../components/Candidate/Jobs";
import Applications from "../components/Candidate/Applications";
import Conversation from "../components/Candidate/Conversation";

import EmployerOnboarding from "../components/Employer/Onboarding";
import EmployerProfile from "../components/Employer/Profile";
import EmployerJob from "../components/Employer/Job";
import EmployerApplicants from "../components/Employer/Applicants";
import EmployerConversation from "../components/Employer/Conversation";
import Landingpage from "../components/LandingPage";
import {userContext} from "../context/userContext"
function Navs() {
  const [state,dipatch]=useContext(userContext)
  const CandidateProtected = () => {
    const isAuth=state.isAuth
    // isAuth is a boolean value
    if (isAuth) {
      return <Outlet/>
    }
    else{
      return <Navigate to="/candidate/auth" />
    }
  }

  const EmployerProtected = () => {
    const isAuth=state.isAuth
  
    if (isAuth) {
      return <Outlet/>
    }
    else{
      return <Navigate to="/employer/auth" />
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/candidate/auth" element={<Auth type={'candidate'} />} />

        <Route element={<CandidateProtected />}>
          <Route path="/candidate/onboarding" element={<Onboarding />} />
          <Route path="/candidate/profile" element={<Profile />} />
          <Route path="/candidate/jobs" element={<Jobs />} />
          <Route path="/candidate/applications" element={<Applications />} />
          <Route path="/candidate/Conversation" element={<Conversation />} />
        </Route>

        <Route path="/employer/auth" element={<Auth type={'employer'} />} />
        <Route element={<EmployerProtected />}>
        <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
        <Route path="/employer/profile" element={<EmployerProfile />} />
        <Route path="/employer/job" element={<EmployerJob />} />
        <Route path="/employer/applicants" element={<EmployerApplicants />} />
        <Route
          path="/employer/Conversation"
          element={<EmployerConversation />}
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;

// path / is for the landing page
// path /candididate/auth is for the auth page
// path /employer/auth is for the auth page

// path /candididate/onboarding is for the candidate onboarding page
// path /employer/onboarding is for the employer onboarding page

// path /candididate/profile is for the candidate profile page
// path /employer/profile is for the employer profile page

// path /candididate/jobs is for the candidate jobs page
// path /employer/jobs is for the employer jobs page

// path /candidate/applications is for the candidate applications page
// path /employer/applicants is for the employer applicants page

// path / candidate/conversations is for the candidate conversations page
// path / employer/conversations is for the employer conversations page
