import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import * as API from '../endpoint';
import Footer from "../pages/footer";
import Header from "../pages/header";
// import { Tooltip as ReactTooltip } from 'react-tooltip';

const ThrustArea = () => {
  const [thrustAreas, setThrustArea] = useState([]);
  const { groupname } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState([]);
 
  const [hoveredBar, setHoveredBar] = useState(null);

  const handleHover = (_, chartElements) => {
    if (chartElements.length > 0) {
      const hoveredIndex = chartElements[0].index;
      setHoveredBar(hoveredIndex);
    } else {
      setHoveredBar(null);
    }
  };

  useEffect(() => {
    const fetchThrustArea = async () => {
      try {
        // const riskResponse = await axios.get(API.RISKSUBCATEGORYREPORT_RISK_API(groupname));
        // setUser(riskResponse.data);

        const response = await axios.get(API.THRUSTAREA_GOVERNANCE_API(groupname));
        setThrustArea(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchThrustArea();
  }, [groupname]);

  // Extract labels and data for the chart
  const chartLabels = thrustAreas.map(thrustArea => thrustArea.thrustarea);
  const chartData = thrustAreas.map(thrustArea => thrustArea.thrustarea_count);

  // Handle click on subcategory
  const handleThrustAreaClick = (_, elements) => {
    if (elements && elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedThrustarea = chartLabels[clickedIndex];
      console.log('Clicked Thrust Area:', clickedThrustarea);

      // Navigate to the new page with severity information
    const newTab=window.open(`/controlnamegraph/${encodeURIComponent(clickedThrustarea)}`,'_blank');
    newTab.focus();

    }
  };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Date(dateString).toLocaleDateString('en-IN', options);
//   };

  // Chart data
  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Thrust Area Count',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: chartData,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'ThrustArea',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        suggestedMin: 25,
      },
    },
    onClick: handleThrustAreaClick,
  };

  return (
    <div className="chart-container">
        <Header />
      <h2>{`${groupname}`}</h2>
      {thrustAreas.length > 0 ? (
        <div className="centered-chart">
          <Bar
            data={chartDataConfig}
            options={{
              ...options,
              onHover: handleHover,
            }}
            width={500} // Adjust the width as needed
            height={500} // Adjust the height as needed
          />
          {hoveredBar !== null && (
            <div className="hover-message">
              Click Me
            </div>
          )}
        </div>
      ) : (
        <p></p>
      )}

{/* <table className="styled-table" style={{ marginLeft: "15px",marginBottom:"3cm" }}>
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
     </table> */}
     <Footer />
    </div>
  );
};

export default  ThrustArea;
