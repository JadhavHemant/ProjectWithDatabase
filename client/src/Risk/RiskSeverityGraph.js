import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import * as API from '../endpoint';
import Footer from "../pages/footer";
import Header from "../pages/header";

const RiskSeverityGraph = () => {
  const [severityData, setSeverityData] = useState([]);
  const { riskgroup } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchSeverityData = async () => {
      try {
        const riskResponse = await axios.get(API.RISKSEVERITYREPORT_RISK_API(riskgroup));
        setUser(riskResponse.data);

        const response = await axios.get(API.RISKSEVERITYGRAPH_RISK_API(riskgroup));
        setSeverityData(response.data);
      } catch (error) {
        console.error('Error fetching severity data:', error);
      }
    };

    fetchSeverityData();
  }, [riskgroup]);

  console.log('Severity Data:', severityData);

  // Extract labels and data for the chart
  const chartLabels = severityData.map(severity => severity.severity);
  const chartData = severityData.map(severity => severity.severity);

  // Chart data
  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Severity',
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.6)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: chartData,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Severity Levels',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        suggestedMin: 0,
      },
    },
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };


  return (
    <div>
       <Header />
      <center>
      <h2>{` ${riskgroup}`}</h2>
      {severityData.length > 0 ? (
        <div className="centered-chart">
          <Bar
            data={chartDataConfig}
            options={options}
            width={500}
            height={500}
          />
        </div>
      ) : (
        <p>No severity data available.</p>
      )}
      </center>
      <table className="styled-table" style={{ marginLeft: "15px",marginBottom:"3cm"}}>
  <thead>
    <center><h1>Risk</h1></center>
    <tr>
    <th style={{textAlign:"center"}}>No</th>
    <th style={{textAlign:"center"}}>Organization</th>
          <th style={{textAlign:"center"}}>Responsibility Group</th>
          <th style={{textAlign:"center"}}>Responsibility Center</th>
          <th style={{textAlign:"center"}}>Risk Date</th>
          <th style={{textAlign:"center"}}>Project</th>
          <th style={{textAlign:"center"}}>Object</th>
          <th style={{textAlign:"center"}}>Risk Name</th>
          <th style={{textAlign:"center"}}>Risk Code</th>
          <th style={{textAlign:"center"}}>Risk severity</th>
          <th style={{textAlign:"center"}}>Risk Group</th>
          <th style={{textAlign:"center"}}>Risk SubCategory</th>
          <th style={{textAlign:"center"}}>Risk Type</th>
          <th style={{textAlign:"center"}}>RACI Type</th>
    </tr>
  </thead>
  <tbody>
  {Array.isArray(user) && user.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index+1}</th>
                <td>{item.organization}</td>
                <td>{item.responsibilitygroup}</td>
                <td>{item.responsibilitycenter}</td>
                <td>{formatDate(item.riskdate)}</td>
                <td>{item.project}</td>
                <td>{item.object}</td>
                <td>{item.riskname}</td>
                <td>{item.riskcode}</td>
                <td>{item.severity}</td>
                <td>{item.riskgroup}</td>
                <td>{item.subcategory}</td>
                <td>{item.risktype}</td>
                <td>{item.racitype}</td>
                </tr>
                
       ))} </tbody>
     </table>
     <Footer />
    </div>
  );
};

export default RiskSeverityGraph;
