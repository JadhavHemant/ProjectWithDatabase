import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import "./View.css";
import * as API from "../endpoint";

const View = () => {
  const [user,setUser]= useState({});
  console.log(API.GET_OBJECTTYPE_API)

  const {objectid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_OBJECTTYPE_API(objectid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[objectid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User Object Type</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{objectid}</span>
          <br/><br/>
          <strong>Object type:</strong>
          <span>{user.objecttype}</span>
          <br/><br/>
          <strong>Object Type Description</strong>
          <span>{user.objecttypedescription}</span>
          <br/><br/>
          <strong>Icon Upload</strong>
          <span>{user.iconupload}</span>
          <br/><br/>
          <strong>File Upload</strong>
          <span>{user.fileupload}</span>
          <br/><br/>

          <Link to="/">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View