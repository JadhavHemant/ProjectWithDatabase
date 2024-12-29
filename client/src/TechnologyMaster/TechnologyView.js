import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";

const TechnologyView = () => {
  const [user,setUser]= useState({});
  console.log(API.GET_TECHNOLOGY_API)

  const {technologymasterid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_TECHNOLOGY_API(technologymasterid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[technologymasterid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User Technology</p>
      </div>
      
        <div className="container">
          <strong>ID:</strong>
          <span>{technologymasterid}</span>
          <br/><br/>
          <strong>Technology Name:</strong>
          <span>{user.technologyname}</span>
          <br/><br/>
          <strong>Technology Version</strong>
          <span>{user.technologyversion}</span>
          <br/><br/>
           <Link to="/technology">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TechnologyView