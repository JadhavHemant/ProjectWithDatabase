import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";

const View = () => {
  const [user,setUser]= useState({});
  console.log(API.GET_ISSUE_API)

  const {issueid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_ISSUE_API(issueid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[issueid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>ISSUE</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{issueid}</span>
          <br/><br/>
          <strong>Process Issue:</strong>
          <span>{user.processissue}</span>
          <br/><br/>
          <strong>Coding Issue:</strong>
          <span>{user.codingissue}</span>
          <br/><br/>
          <strong>Resource Issue:</strong>
          <span>{user.resourceissue}</span>
          <br/><br/>
          <strong>Data Issue</strong>
          <span>{user.dataissue}</span>
          <br/><br/>
          <strong>Infrastructure Issue</strong>
          <span>{user.infrastructureissue}</span>
          <br/><br/>
          <strong>Model Issue</strong>
          <span>{user.modelissue}</span>
          <br/><br/>
          <strong>Performance Issue</strong>
          <span>{user.performanceissue}</span>
          <br/><br/>
          <strong>Resolution</strong>
          <span>{user.resolution}</span>
          <br/><br/>

          <Link to="/issue">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View