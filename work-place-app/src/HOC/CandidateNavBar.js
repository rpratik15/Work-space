import React from 'react'
import CommonNavbar from "../Components/common/CommonNavbar";

function CandidateNavBar() {

    const pages = [
        {
          name: "Jobs",
          path: "/candidate/jobs",
        },
        {
          name: "Applications",
          path: "/candidate/applications",
        },
        {
          name: "Conversation",
          path: "/candidate/Conversation",
        },
        {
          name: "Profile",
          path: "/candidate/profile",
        }
      ];
  return (
    <CommonNavbar pages={pages}/>
  )
}

export default CandidateNavBar