import { Divider } from "@mui/material";
import moment from "moment";
import React from 'react'

function SideJobCard({ selectedJob, selectedJobFun, item, index }) {
    const { jobTitle,
        createdAt,
        jobType, jobLocation, jobId } = item
    return (
        <div className={`sideJobCard ${selectedJob && selectedJob.jobId === jobId && 'sideJobCard-select'}`}
            onClick={() => selectedJobFun(item)}
            key={index} >
            <h4>
                {
                    createdAt?.toDate().toDateString()

                }
            </h4>
            <h1>{jobTitle}</h1>
            <h2>{jobLocation}</h2>
            <h3>{jobType}</h3>
            <Divider />
        </div>
    )
}

export default SideJobCard