import React, { useState, useEffect } from "react";
import axios from "axios";
import * as API from "../endpoint";
import { Pie } from 'react-chartjs-2';
import ScorecardBarGraph from "./ScorecardBarGraph";
import { useParams } from "react-router-dom";
import Footer from "../pages/footer";
import Header from "../pages/header";
import './ScoreCardTable.css';
import ControlName from "../Framework/ControlName";
import SubControlName from "../Framework/SubControlName";

const initialState = {
  companyname: "",
  responsibilitygroup: "",
  responsibilitycenter: "",
  projectname: "",
  object: "",
  objecttype: "",
  controlweight: "5",
  subcontrolweight: "5",
  groupname: "",
};
const ScoreCardTable = () => {
  const [state, setState] = useState(initialState);
  const [user, setUser] = useState([]);
 const [totalFinalScore, setTotalFinalScore] = useState(0);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [selectedGraphData, setSelectedGraphData] = useState([]);
  const [respGroup, setRespGroup] = useState([]);
  const [respCenter, setRespCenter] = useState([]);
  const [objectType, setObjectType] = useState([]);
  const [objectName, setObjectName] = useState([]);
  const [organizationComp, setOrganizationComp] = useState([]);
  const [projectName, setProject] = useState([]);
  const [groupName, setGroupName] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { resultid } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [pieChartData, setPieChartData] = useState([]);
  const [scorecardData, setScorecardData] = useState([]);
  const [isVisible11, setIsVisible11] = useState(false);
  const [selectedItem1, setSelectedItem1] = useState(null);
  
const getScoreCounts = (data) => {
  let evidenceRemarkCount = 0;
  let auditScoreCount = 0;
  let assessmentScoreCount = 0;

  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (item.evidenceremark) {
        evidenceRemarkCount++;
      }
      if (item.auditremark) {
        auditScoreCount++;
      }
      if (item.assessmentremark) {
        assessmentScoreCount++;
      }
    });
  } else if (data && typeof data === 'object') {
    
   }
  return {
    evidenceRemarkCount,
    auditScoreCount,
    assessmentScoreCount,
  };
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          companyname: state.companyname,
          responsibilitygroup: state.responsibilitygroup,
          responsibilitycenter: state.responsibilitycenter,
          projectname: state.projectname,
          object: state.object,
          objecttype: state.objecttype,
          groupname: state.groupname,
        };
  
        const response = await axios.get(API.GET_SCORECARD_API, {
          params: queryParams,
        });
        setScorecardData(response.data);
        setUser(response.data);
        setSelectedGraphData(response.data);
        console.log(response.data)
  
        const totalScore = response.data.reduce(
          (total, item) => total + calculateFinalScore(item),
          0
        );
        setTotalFinalScore(totalScore);
  
        const groupedData = response.data.reduce((result, item) => {
          const groupName = item.groupname;
  
          if (!result[groupName]) {
            result[groupName] = 0;
          }
  
          result[groupName] += calculateFinalScore(item);
  
          return result;
        }, {});
  
        setPieChartData(mapDataToPieChart(groupedData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  
      setRespGroup(await fetchDataFromAPI(API.GET_GOVERNANCE_API));
      setRespCenter(await fetchDataFromAPI(API.GET_GOVERNANCE_API));
      setObjectType(await fetchDataFromAPI(API.GET_GOVERNANCE_API));
      setObjectName(await fetchDataFromAPI(API.GET_GOVERNANCE_API));
      setProject(await fetchDataFromAPI(API.GET_GOVERNANCE_API));
      setGroupName(await fetchDataFromAPI(API.GET_GOVERNANCE_API));
      setOrganizationComp(await fetchDataFromAPI(API.GET_GOVERNANCE_API));
    };
    if (selectedItem1) {

    }

  
    fetchData();
  }, [state, resultid, selectedItem1]);
  

  const fetchDataFromAPI = async (apiEndpoint) => {
    const response = await axios.get(apiEndpoint);
    return response.data;
  };

  const handleInputChange = (e) => {
    setIsVisible(Object.values(state).some((val) => val !== ""));
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };


  const handlSubmit = (e) => {
    e.preventDefault();
  };
  const handleTableRowClick = (item) => {
    setSelectedItem1(item);
    setIsVisible1(!isVisible1);
    setIsVisible11(true); // Set the visibility of ControlName to true
    // setIsVisible12(true); // Set the visibility of SubControlName to true
  };
  
  

  const calculateFinalScore = (item) => {
    return (
      ((item.controlwt * item.subcontrolwt * 100) /
        (state.controlweight * state.subcontrolweight)) *
      (item.assessmentscore + item.auditscore)
    );
  };

  const mapDataToPieChart = (groupedData) => {
    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          // ... add more colors if needed
        ],
      }],
    };
  };

  const calculatePieChartData = () => {
    const pieData = user.reduce((result, item) => {
      const groupName = item.groupname;

      if (!result[groupName]) {
        result[groupName] = 0;
      }

      result[groupName] += calculateFinalScore(item);

      return result;
    }, {});

    const labels = Object.keys(pieData);
    const data = Object.values(pieData);

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          // ... add more colors if needed
        ],
      }],
    };
  };

  const filterUniqueGroupNames = (data) => {
    const uniqueGroupNames = new Set();
    return data.filter((entry) => {
      if (!uniqueGroupNames.has(entry.groupname)) {
        uniqueGroupNames.add(entry.groupname);
        return true;
      }
      return false;
    });
  };  

const handleAdditionalFieldsClick = () => {
  setShowAdditionalFields(!showAdditionalFields);
};

const handleTogglePieChart = () => {
  console.log('Toggling Pie Chart Visibility');
  setIsVisible2(!isVisible2);
};
  return (
    <div>
      <Header />
      <div>
        <form onSubmit={handlSubmit}>
          <center>
            <h1 style={{ marginTop: "2px", marginBottom: "6px" }}>
              <label htmlFor="objecttype">
                AI Governance Audit & Assessment Score Card
              </label>
            </h1>
          </center>
          <hr />
          <div
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginBottom: "5px",
              marginTop: "2px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "10px",
            }}
          >
            <div>
              <label>Organization:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="companyname"
                name="companyname"
                value={state.companyname}
                onChange={handleInputChange}
              >
                <option value="">Organization </option>
                {filterUniqueGroupNames(organizationComp).map((comp) => (
                  <option key={comp.resultid} value={comp.companyname}>
                    {comp.companyname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Responsibility group:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="responsibilitygroup"
                name="responsibilitygroup"
                value={state.responsibilitygroup}
                onChange={handleInputChange}
              >
                
                <option value="">Responsibility Group</option>
                {filterUniqueGroupNames(respGroup).map((respgroup) => (
                  <option
                    key={respgroup.resultid}
                    value={respgroup.responsibilitygroup}
                  >
                    {respgroup.responsibilitygroup}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Responsibility Center:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="responsibilitycenter"
                name="responsibilitycenter"
                value={state.responsibilitycenter}
                onChange={handleInputChange}
              >
                <option value="">Responsibility Center</option>
                {filterUniqueGroupNames(respCenter).map((respcenter) => (
                  <option
                    key={respcenter.resultid}
                    value={respcenter.responsibilitycenter}
                  > {respcenter.responsibilitycenter}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Project:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="projectname"
                name="projectname"
                placeholder="Enter the Project"
                value={state.projectname}
                onChange={handleInputChange}
              >
                <option value="">Project</option>
                {filterUniqueGroupNames(projectName).map((project) => (
                  <option key={project.resultid} value={project.projectname}>
                    {project.projectname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Object Type:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="object"
                name="object"
                value={state.object}
                onChange={handleInputChange}
              >
                <option value="">Object Type</option>
                {filterUniqueGroupNames(objectType).map((objtype) => (
                  <option key={objtype.resultid} value={objtype.objecttype}>
                    {objtype.objecttype}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Object Name:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="objecttype"
                name="objecttype"
                value={state.objecttype}
                onChange={handleInputChange}
              >
                <option value="">Object Name</option>
                {filterUniqueGroupNames(objectName).map((objname) => (
                  <option key={objname.resultid} value={objname.object}>
                    {objname.object}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginBottom: "5px",
              marginTop: "2px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            <label>
              <h4>Governance Name:</h4>
            </label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="groupname"
              name="groupname"
              value={state.groupname}
              onChange={handleInputChange}
            >
              <option value="">Group Name</option>
              {filterUniqueGroupNames(groupName).map((grpname) => (
                <option key={grpname.resultid} value={grpname.groupname}>
                  {grpname.groupname}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              marginRight: "100px",
              marginLeft: "50px",
              marginBottom: "5px",
              marginTop: "2px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <label>Max Control Weight</label>
              <input
                type="text"
                id="controlweight"
                name="controlweight"
                value={state.controlweight}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label>Sub Control Weight</label>
              <input
                type="text"
                id="subcontrolweight"
                name="subcontrolweight"
                value={state.subcontrolweight}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="button" className="btn btn-edit" onClick={handleTogglePieChart}>
        Toggle Pie Chart
      </button>
      <button type="button" className="btn btn-edit" onClick={handleTableRowClick}>
        Show Graph
      </button>   
          {isVisible && (
            <table
              className="styled-table"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No</th>
                  <th>FrameWork</th>
                  <th>Thrust Area</th>
                  <th>Control</th>
                  <th>Sub Control</th>
                  <th style={{ textAlign: "center" }}>Control Weight</th>
                  <th style={{ textAlign: "center" }}>SubControl Weight</th>
                  <th style={{ textAlign: "center" }}>Evdience Remark</th>
                  <th style={{ textAlign: "center" }}>Assessment Score</th>
                  <th style={{ textAlign: "center" }}>Audit Score</th>
                  <th style={{ textAlign: "center" }}>Final Score</th>
                               </tr>
              </thead>
              <tbody>
                {Array.isArray(user) &&
                  user.map((item, index) => (
                    <tr key={index} onClick={() => handleTableRowClick(item)}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.groupname}</td>

                      <td>{item.thrustarea}</td>
                      <td>{item.controlname} </td>
                      <td>{item.subcontrolname} </td>
                      <td style={{ textAlign: "center" }}>{item.controlwt} </td>
                      <td style={{ textAlign: "center" }}>
                        {item.subcontrolwt}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item. evidenceremark}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.assessmentscore}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.auditscore}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {calculateFinalScore(item)}{" "}
                      </td>
                      {/* <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleTableRowClick(item)}
                        >
                          Show Graph
                        </button>
                      </td> */}
                    </tr>
                  ))}                     
              </tbody>
            </table>
          )}
    

<div className="grid-container">
  <div>
     {isVisible1 &&      
 // Inside the return statement of ScoreCardTable component
<ScorecardBarGraph
  graphData={scorecardData}
  evidenceRemarkCount={getScoreCounts(scorecardData).evidenceRemarkCount}
  auditScoreCount={getScoreCounts(scorecardData).auditScoreCount}
  assessmentScoreCount={getScoreCounts(scorecardData).assessmentScoreCount}
/> }
</div>
  <div>
  {/* <ControlName/>   */}
   {isVisible11 &&  <ControlName selectedItem={selectedItem1} /> } 
  </div>
  <div>
  <SubControlName/> 
  {/* {isVisible12 &&  <SubControlName/>   } */}
  
  </div>
</div>

         {isVisible2 && (
        <div className="chart-container" >
          <h2>Pie Chart</h2>
          <Pie data={pieChartData} />
        </div>
      )}
          <button type="button" onClick={handleAdditionalFieldsClick}>
            {showAdditionalFields ? "-" : "+"}
          </button>
          {showAdditionalFields && (
            <div style={{ fontSize: "18px", margin: "20px"}}>
              <p style={{ textAlign: "center" }}>
                <table>
                  <th>
                    {" "}
                    (Control Weight x Sub Control Weight x 100 ){" "}
                    <hr style={{ width: "11cm" }}></hr>( Max Control Weight x
                    Sub Control Weight)
                  </th>
                  <th>
                    <div style={{ marginLeft: "10px" }}>
                      X ( Assessment Score + Audit Score)
                    </div>
                  </th>
                </table>
              </p>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ScoreCardTable;