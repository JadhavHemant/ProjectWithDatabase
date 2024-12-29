import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";


const RiskGroupView = () => {
  const [user,setUser]= useState({});

  const {riskgroupid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_RISKGROUP_API(riskgroupid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[riskgroupid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User parameter Category</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{riskgroupid}</span>
          <br/><br/>
          <strong>risk group Code:</strong>
          <span>{user.riskgroupcode}</span>
          <br/><br/>
          <strong>risk group Name</strong>
          <span>{user.riskgroupname}</span>
          <br/><br/>
          <strong>file Upload</strong>
          <span>{user.fileupload}</span>
          <br/><br/>
          <strong>risk group Type</strong>
          <span>{user.riskgrouptype}</span>
          <br/><br/>
          <strong>checkbox</strong>
          <span>{user.checkbox}</span>
          <br/><br/>
          <strong>Radio Button</strong>
          <span>{user.radiobutton}</span>
          <br/><br/>
          <strong>Date</strong>
          <span>{user.date}</span>
          <br/><br/>
          <strong>Continue Text</strong>
          <span>{user.continuetext}</span>
          <br/><br/>
          <strong>Continue Number</strong>
          <span>{user.continuenumber}</span>
          <br/><br/>

          <Link to="/riskgroup">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default  RiskGroupView;