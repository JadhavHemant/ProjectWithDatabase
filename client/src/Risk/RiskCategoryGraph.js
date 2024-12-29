import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
// import { useNavigate } from 'react-router-dom';
import * as API from '../endpoint';
import './RiskCategoryGraph.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Footer from "../pages/footer";
import Header from "../pages/header";

const RiskCategoryGraph = () => {
  const [riskData, setRiskData] = useState([]);
  // const navigate = useNavigate();

  const [user, setUser] = useState([]); 

  const [hoveredBar, setHoveredBar] = useState(null);

  const handleHover = (event, chartElements) => {
    if (chartElements.length > 0) {
      const hoveredIndex = chartElements[0].index;
      setHoveredBar(hoveredIndex);
    } else {
      setHoveredBar(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        axios.get(API.GET_RISK_API)
       .then((resp) => setUser(resp.data))
     
        const response = await axios.get(API.RISKCATEGORY_RISK_API);
        setRiskData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

   const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const labels = riskData.map((item) => item.category_name);
  const data = riskData.map((item) => item.category_count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Risk Category Distribution',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Risk Categories',
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
    onHover: handleHover, // Use onHover event handler to track bar hovering
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        handleCategoryClick(clickedIndex);
      }
    },
  };

  const handleCategoryClick = (index) => {
    const clickedCategory = labels[index];
    console.log('Bar clicked! Navigating to:', `/risksubcategory/${encodeURIComponent(clickedCategory)}`);
    const newTab = window.open(`/risksubcategory/${encodeURIComponent(clickedCategory)}`, '_blank');
  newTab.focus();
  };
   return (
    <div className="chart-container">
       <Header />
      <h2>Risk Category</h2>
      <div className="centered-chart">
        <Bar data={chartData} options={options} width={500} height={500} plugins={[ReactTooltip]} />
        {hoveredBar !== null && (
          <div className="hover-message">
             click Me 
          </div>
        )}
      </div>
       <table className="styled-table" style={{marginLeft:"15px",marginBottom:"3cm"}}>
        
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
          <th style={{textAlign:"center"}}>Risk Category</th>
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
                <td>{item.category}</td>
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

export default RiskCategoryGraph;
