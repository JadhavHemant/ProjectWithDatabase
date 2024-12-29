// import React,{useState , useEffect} from 'react'
// import {Link,useNavigate,useParams} from "react-router-dom";
// import { toast } from 'react-toastify';
// import * as API from '../endpoint';
// import axios from 'axios';


// const initialState = {
//   companyname: ' ',
//   projectname: ' ',
//   evidence:' ',
//   assessment:' ',
//   auditplan:' ',
//   audit:' ',
// };

// const DashBoardTable = () => {
//     const [state, setState] = useState(initialState);
//     const [data, setData] = useState([]);
//     const {companyname,projectname,evidence,assessment,auditplan,audit}=state;
//     const navigate = useNavigate();
//     const { dashboardid } = useParams();
//     const [respGroup, setRespGroup] = useState([]);
    

//      useEffect(() => {
//       const fetchData = async () => {
//         try {
//           // Fetch data for respGroup
//           const respGroupData = await axios.get(API.GET_RESPONSIBILITYGROUP_API);
//           setRespGroup(respGroupData.data);
//         }
//           catch (error) {
//             console.error(error);
//             toast.error('An error occurred while fetching data');
//           }
//       }
//         fetchData();
//       }, [dashboardid]);

//     const handlSubmit = (e) => {
//     e.preventDefault();
    
//     console.log("Submitting form with data:", {
//       companyname,projectname,evidence,assessment,auditplan,audit});

//         if (!companyname) {
//       toast.error('Please provide a value into each input field');
//     } else {
//       if (!dashboardid) {
//         console.log("Adding new evidence...");
  
//          axios
//           .post(API.ADD_EVIDENCE_API, {
//               companyname,projectname,evidence,assessment,auditplan,audit
//                })
//           .then((response) => {
//             console.log("Add evidence response:", response.data);
//             setState({
//               companyname,projectname,evidence,assessment,auditplan,audit

//                });
//           })
//           .catch((err) => {
//             console.error("Error adding evidence:", err.response.data);
//             toast.error(err.response.data);
//           });
  
//         toast.success('Added successfully');
//       } 
//       setTimeout(() => navigate('/dashboard'), 500);
//     }
  
//     }
//     const handleInputChange= (e) => {
//       const {name,value} = e.target;
//       setState({...state,[name]:value});
// }
    
//   return (
//     <div style={{marginTop:"150px"}}>
//     <Link to="/dashboardtable">
//    <center><h1>Dashboard</h1></center>
//     </Link>
    
//    <table className="styled-table">
//     <thead>
//       <tr>
//         <th style={{textAlign:"center"}}>Sr.No</th>
//         <th style={{textAlign:"center"}}>Company Name</th>
//         <th style={{textAlign:"center"}}>Project Name</th>
//         <th style={{textAlign:"center"}}>Evidence</th>
//         <th style={{textAlign:"center"}}>Assessment</th>
//         <th style={{textAlign:"center"}}>Audit Plan</th>
//         <th style={{textAlign:"center"}}>Audit</th>
//         </tr>
//     </thead>
//     <tbody>
//       {data.map((item,index)=>{
//         return(
//             <tr key={item.id}>
//               <th scope="row">{index+1}</th>
//               <td>{item}</td>
//               <td>{item}</td>
//               <td>{item}</td>
//               <td>{item}</td>
//               <td>{item}</td>
//               <td>{item}</td>
//               </tr>
//         );
//       }
//       )}
//     </tbody>
//    </table>

//   </div>
// );
// };


// export default DashBoardTable












import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as API from '../endpoint';
import {
  useParams} from "react-router-dom";

const DashBoardTable = () => {
  const [countData, setCountData] = useState({});
  const { resultid } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API.COUNT_GOVERNANCE_API(resultid));
        console.log('countData:', response.data); // Add this line for debugging
        setCountData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [resultid]);
  
  return (
    <div style={{ marginTop: '150px' }}>
      <center>
        <h1>Dashboard</h1>
      </center>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Column</th>
            <th style={{ textAlign: 'center' }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(countData).map(([columnName, count], index) => (
            <tr key={index}>
              <td>{columnName}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoardTable;
