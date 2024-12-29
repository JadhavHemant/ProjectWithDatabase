import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";


const ResponsibilityView = () => {
  const [user,setUser]= useState({});

  const {responsibilityid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_RESPONSIBILITYGROUP_API(responsibilityid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[responsibilityid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User Responsibility Type</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{responsibilityid}</span>
          <br/><br/>
          <strong>Responsibility type:</strong>
          <span>{user.responsibilitytype}</span>
          <br/><br/>
          <strong>Responsibility Type Description</strong>
          <span>{user.responsibilitytypedescription}</span>
          <br/><br/>
          <strong>Icon Upload</strong>
          <span>{user.iconupload}</span>
          <br/><br/>
          <strong>File Upload</strong>
          <span>{user.fileupload}</span>
          <br/><br/>

          <Link to="/res">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResponsibilityView;