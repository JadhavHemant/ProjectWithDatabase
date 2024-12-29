import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";

const View = () => {
  const [user,setUser]= useState({});
  console.log(API.GET_THEMEACTIVITY_API)

  const {themeactivityid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_THEMEACTIVITY_API(themeactivityid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[themeactivityid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User Object Type</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{themeactivityid}</span>
          <br/><br/>
          <strong>Theme:</strong>
          <span>{user.theme}</span>
          <br/><br/>
          <strong>Phase</strong>
          <span>{user.phase}</span>
          <br/><br/>
          <strong>Activity Group</strong>
          <span>{user.activitygroup}</span>
          <br/><br/>
          <strong>Activity</strong>
          <span>{user.activity}</span>
          <br/><br/>

          <Link to="/themeactivity">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View