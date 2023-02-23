import React from 'react'
import CommonNavbar from "../Components/common/CommonNavbar";

function EmployerNavBar() {
    
    const pages = [
        {
          name: "Jobs",
          path: "/employer/job",
        },
        {
          name: "Applicants",
          path: "/employer/applicants",
        },
        {
          name: "Conversation",
          path: "/employer/Conversation",
        },
        {
          name: "Profile",
          path: "/employer/profile",
        }
      ];
  return (
    <CommonNavbar pages={pages}/>
  )
}

export default EmployerNavBar
