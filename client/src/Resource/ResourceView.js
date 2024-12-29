import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";

const View = () => {
  const [user,setUser]= useState({});
  console.log(API.GET_RESOURCE_API)

  const {resourceid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_RESOURCE_API(resourceid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[resourceid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User Object Type</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{resourceid}</span>
          <br/><br/>
          <strong>Resource Name:</strong>
          <span>{user.resourcename}</span>
          <br/><br/>
          <strong>Designation</strong>
          <span>{user.designation}</span>
          <br/><br/>
          <strong>Status</strong>
          <span>{user.status}</span>
          <br/><br/>
            <Link to="/resource">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View