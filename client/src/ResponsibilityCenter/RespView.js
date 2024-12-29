import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";

const RespView = () => {
  const [user,setUser]= useState({});

  const {responsibilitynameid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_RESPONSIBILITYCENTER_API(responsibilitynameid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[responsibilitynameid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User responsibility Type</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{responsibilitynameid}</span>
          <br/><br/>
          <strong>responsibility type:</strong>
          <span>{user.responsibilitytype}</span>
          <br/><br/>
          <strong>responsibility Code:</strong>
          <span>{user.responsibilitycode}</span>
          <br/><br/>
          <strong>responsibility Type Description</strong>
          <span>{user.responsibilitydescription}</span>
          <br/><br/>
          <strong>dependent responsibility code</strong>
          <span>{user.dependentresponsibilitycode}</span>
          <br/><br/>
          <strong>Icon Upload</strong>
          <span>{user.iconupload}</span>
          <br/><br/>
          <strong>File Upload</strong>
          <span>{user.fileupload}</span>
          <br/><br/>

          <Link to="/resp2">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RespView;