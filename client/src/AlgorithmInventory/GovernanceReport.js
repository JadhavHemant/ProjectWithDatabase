import React from 'react'

const GovernanceReport = () => {
  return (
    <div>
        <center><h1>Governance Report</h1></center>
        <table className="styled-table">
      <thead>
        <tr>
          <th style={{textAlign:"center"}}>No</th>
          <th style={{textAlign:"center"}}>Company</th>
          <th style={{textAlign:"center"}}>Governance Control Area</th>
          <th style={{textAlign:"center"}}>Control</th>
          <th style={{textAlign:"center"}}>SubControl</th>
          <th style={{textAlign:"center"}}>Evidence</th>
          <th style={{textAlign:"center"}}>Assessment</th>
          <th style={{textAlign:"center"}}>Audit Plan</th>
          <th style={{textAlign:"center"}}>Audit</th>
          <th style={{textAlign:"center"}}>Responsibility Group</th>
          <th style={{textAlign:"center"}}>Responsibility Center</th>
          
        </tr>
      </thead>
      </table>
    </div>
  )
}

export default GovernanceReport