import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";

const SecondViewTable = () => {
  const [user,setUser]= useState({});

  const {parameterid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_PARAMETER_API(parameterid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[parameterid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User Object Type</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{parameterid}</span>
          <br/><br/>
          <strong>Category Code:</strong>
          <span>{user.categorycode}</span>
          <br/><br/>
          <strong>Parameter code</strong>
          <span>{user.parametercode}</span>
          <br/><br/>
          <strong>Evidence</strong>
          <span>{user.evidence}</span>
          <br/><br/>
          <strong>File Upload</strong>
          <span>{user.fileupload}</span>
          <br/><br/>

          <Link to="/parameter">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SecondViewTable