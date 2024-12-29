import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";


const RiskSeverityView = () => {
  const [user,setUser]= useState({});

  const {riskseverityid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_RISKSEVERIT_API(riskseverityid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[riskseverityid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User risk severity Type</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{riskseverityid}</span>
          <br/><br/>
          <strong>Riskseverity Type:</strong>
          <span>{user.riskseveritytype}</span>
          <br/><br/>
          <strong>Risk Severity Type Description</strong>
          <span>{user.riskseveritytypedescription}</span>
          <br/><br/>
          <strong>Icon Upload</strong>
          <span>{user.iconupload}</span>
          <br/><br/>
          <strong>File Upload</strong>
          <span>{user.fileupload}</span>
          <br/><br/>

          <strong>Risk Severity</strong>
          <span>{user.riskseverityvalue}</span>
          <br/><br/>


          <Link to="/riskseverity">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RiskSeverityView;