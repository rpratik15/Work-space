import * as React from "react";
import CommonNavbar from "../common/CommonNavbar";
const pages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Find Candidates",
    path: "employer/auth",
  },
  {
    name: "Find Jobs",
    path: "candidate/auth",
  }
];


function TopNav() {
  return (
    <CommonNavbar pages={pages}/>
  )
}

export default TopNav