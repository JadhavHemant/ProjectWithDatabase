import React, { useState } from 'react';
import {Link} from "react-router-dom";
import './AIMaster.css'; 


const AIMaster = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="aimaster-container">
      <center>
        <h1>AI Governance Master </h1>
        <button style={{border:"none" , background:"white" , color:"#0c5ca8"}} onClick={() => setShowLinks(!showLinks)}>
            <h2>AI Governance Master</h2></button>
      </center>
      {showLinks && (
        <div className="link-list" >
         <div>
      <nav>
        <ul className="link-list">
          <li>
           <Link to="/">Object Type</Link>
         </li>
          <li>
           <Link to="/secondTable">Object Name</Link>
            </li>
          <li>
            <Link to="/par">Parameter Category</Link>
            </li>
          <li>
           <Link to="/parameter">Parameter</Link>
            </li>
           <li>
         <Link to="/res">Responsibility Group</Link>
          </li> 
          <li>
        <Link to="/resp2">Responsibility Center</Link>
             </li>
        </ul>
      </nav>
    </div>
        </div>
      )}
    </div>
  );
};

export default AIMaster;
