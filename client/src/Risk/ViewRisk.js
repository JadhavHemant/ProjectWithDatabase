import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";

const ViewRisk = () => {
    const [user,setUser]= useState({});

  const {riskid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_RISK_API(riskid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[riskid])
  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>Risk</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{riskid}</span>
          <br/><br/>
          <strong>Organization:</strong>
          <span>{user.organization}</span>
          <br/><br/>
          <strong>Responsibility Group:</strong>
          <span>{user.responsibilitygroup}</span>
          <br/><br/>
          <strong>Responsibility Center:</strong>
          <span>{user.responsibilitycenter}</span>
          <br/><br/>
          <strong>Date:</strong>
          <span>{user.date }</span>
          <br/><br/>
          <strong>Project:</strong>
          <span>{user.project}</span>
          <br/><br/>
          <strong>Object:</strong>
          <span>{user.object}</span>
          <br/><br/>
          <strong>Risk Name:</strong>
          <span>{user.riskname}</span>
          <br/><br/>
          <strong>Risk category:</strong>
          <span>{user.riskcode}</span>
          <br/><br/>
          <strong>Sub category:</strong>
          <span>{user.subcategory}</span>
          <br/><br/>
          <strong>Subcategory:</strong>
          <span>{user.subcategory}</span>
          <br/><br/>
          <strong>Asset:</strong>
          <span>{user.asset}</span>
          <br/><br/> 
          <strong>Calculate Risk:</strong>
          <span>{user.calculaterisk}</span>
          <br/><br/>
          <strong>Category:</strong>
          <span>{user.category}</span>
          <br/><br/>
          <strong>Severity:</strong>
          <span>{user.severity}</span>
          <br/><br/> 
          <strong>Risk Group:</strong>
          <span>{user.riskgroup}</span>
          <br/><br/> 
          <strong>Description:</strong>
          <span>{user.description}</span>
          <br/><br/>
          <strong>Risk Owner:</strong>
          <span>{user.owner}</span>
          <br/><br/>
           <strong>Action Plan:</strong>
          <span>{user.actionplan}</span>
          <br/><br/>
          <strong>Assigned:</strong>
          <span>{user.assigned}</span>
          <br/><br/>
          <strong>Status:</strong>
          <span>{user.status}</span>
          <br/><br/>
          <strong>Expected Completion Date:</strong>
          <span>{user.expectedcompletiondate}</span>
          <br/><br/>
          <strong>Actual Completion Date:</strong>
          <span>{user.actualcompletiondate}</span>
          <br/><br/>
          <strong>Compliance Implication:</strong>
          <span>{user.complianceimplication}</span>
          <br/><br/>
          <strong>File Upload:</strong>
          <span>{user.fileupload}</span>
          <br/><br/>
          <strong>Vulnerability:</strong>
          <span>{user.vulnerability}</span>
          <br/><br/>
          <strong>Threat:</strong>
          <span>{user.threat}</span>
          <br/><br/>
          <strong>Mitigation Strategy:</strong>
          <span>{user.miligationstrategy}</span>
          <br/><br/>
          <strong>Contingency Strategy:</strong>
          <span>{user.contingencystrategy}</span>
          <br/><br/>
          <strong>File Upload:</strong>
          <span>{user.fileupload}</span>
          <br/><br/>


          

          <Link to="/riskt">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewRisk