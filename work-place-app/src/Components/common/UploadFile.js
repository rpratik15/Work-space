import React,{useState} from 'react'
import { TextField } from '@mui/material'
import CircularProgressWithLabel from "./CircularProgressWithLabel"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../.././firebaseconfig"


function UploadFile({type, onUpload, value,disabled}) {
  const [progress,setProgress]=useState(0);
  const upload = (e) => {
    const file = e.target.files[0]

    const storageRef = ref(storage, `${type}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {

       const _progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

       
        setProgress(_progress)
      },
      (error) => {
       console.log(error)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          onUpload(downloadURL);
          //setProgress(0)
        });
      }
    );
  }
  return (
    <div style={{ gap: "20px"}}>
      <TextField
        size="small"
        fullWidth
        type="file"
        disabled={disabled}
        inputProps={{
          accept: type === "doc" ? ".doc,.docx,.pdf" : ".jpg,.jpeg,.png",
          // accept: ".doc,.docx,.pdf"
        
        }}
        onChange={(e) => upload(e)}
      ></TextField>
      <div style={{marginTop:"10px"}}>
       <CircularProgressWithLabel value={progress} />
       </div>
    </div>
  )
}

export default UploadFile