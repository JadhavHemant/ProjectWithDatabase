import React ,{useState,useEffect} from 'react';
import {} from "react-toastify";
import {useParams} from "react-router-dom";
import axios from 'axios';
import {Link} from "react-router-dom";
import * as API from "../endpoint";

const ControlRiskTable = () => {
  const [user, setUser] = useState([]);

  const { riskcode } = useParams();

  useEffect(() => {
    axios.get(API.RISKCODEVIEW_RISK_API(riskcode))
      .then((resp) => setUser(resp.data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle error, e.g., show an error message or redirect to an error page
      });
  }, [riskcode]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

return (
  <div style={{marginTop:"30px"}}>
  <center><Link to={`/residualriskchart/${riskcode}`}>
                  <button className="btn btn-edit" >Risk Graph</button>
                  </Link></center>
  
    <div style={{marginTop:"30px"}}>
     <table className="styled-table">
      <thead>
        <tr>
        <th style={{textAlign:"center"}}>No</th>
          <th style={{textAlign:"center"}}>Risk Name</th>
          <th style={{textAlign:"center"}}>Risk Code</th>
          <th style={{textAlign:"center"}}>Risk Severity</th>
          <th style={{textAlign:"center"}}>Risk Group</th>
          <th style={{textAlign:"center"}}>Date</th>
          <th style={{textAlign:"center"}}>Confidentiality</th>
          <th style={{textAlign:"center"}}>Availability</th>
          <th style={{textAlign:"center"}}>Integrity</th>
          <th style={{textAlign:"center"}}>Probability</th>
          <th style={{textAlign:"center"}}>Impact</th>
          <th style={{textAlign:"center"}}>Risk Exposure</th>
          <th style={{textAlign:"center"}}>Residual Risk</th>
          <th style={{textAlign:"center"}}>Control Owner</th>
          <th style={{textAlign:"center"}}>Group Name</th>
          <th style={{textAlign:"center"}}>Thrust Area</th>
          <th style={{textAlign:"center"}}>Control</th>
          <th style={{textAlign:"center"}}>Control Weight</th>
          <th style={{textAlign:"center"}}>Sub-Control</th>
          <th style={{textAlign:"center"}}>Sub-Control Weight</th>
          <th style={{textAlign:"center"}}>Remark</th>
        </tr>
      </thead>
      <tbody>
      {Array.isArray(user) && user.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index+1}</th>
                <td>{item.riskname}</td>
                <td>{item.riskcode}</td>
                <td>{item.severity}</td>
                <td>{item.riskgroup}</td>
                <td>{formatDate(item.riskdate)}</td>
                <td>{item.confidentiality}</td>
                <td>{item.availability}</td>
                <td>{item.integrity}</td>
                <td>{item.probability}</td>
                <td>{item.impact}</td>
                <td>{item.riskexposure}</td>
                <td>{item.residualrisk}</td>
                <td>{item.controlowner}</td>  
                <td>{item.groupname}</td>
                <td>{item.thrustarea}</td>
                <td>{item.control}</td>
                <td>{item.controlweigth}</td>
                <td>{item.subcontrol}</td>
                <td>{item.subcontrolweigth}</td>
                <td>{item.remark}</td>
                </tr>
       ))} </tbody>
     </table>

    </div>
    </div>
  )
}
export default ControlRiskTable