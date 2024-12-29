import React, { useEffect, useState,useNavigate } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import * as API from '../endpoint';
// import Footer from "../pages/footer";
// import Header from "../pages/header";
 //import { Tooltip as ReactTooltip } from 'react-tooltip';

const ControlName = () => {
  const [controlNames, setControlName] = useState([]);
  const { thrustarea } = useParams();
// const navigate = useNavigate();

  const [setGroupNames]=useState([]);
   const [user, setUser] = useState([]);

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
    const fetchControlName = async () => {
      try {
        const response = await axios.get(API.CONTROLNAMEGRAPH_GOVERNANCE_API(thrustarea));
        setControlName(response.data);

        const groupNamesResponse = await axios.get(API.CONTRILNAMEREPORT_GOVERNANCE_API(thrustarea));
        setUser(groupNamesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchControlName();
  }, [thrustarea]);

  // Extract labels and data for the chart
  const chartLabels = controlNames.map(controlName => controlName.subcontrolname);
  const chartData = controlNames.map(controlName => controlName.subcontrolname_count
    );

  // Handle click on subcategory
  const handleControlNameClick = (_, elements) => {
    if (elements && elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedControlname = chartLabels[clickedIndex];
      console.log('Clicked Control:', clickedControlname);

      // Navigate to the new page with severity information
    const newTab=window.open(`/subcontrolnamegraph/${encodeURIComponent(clickedControlname)}`,'_blank');
    newTab.focus();

    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Chart data
  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Control Name Count',
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
          text: 'Controlname',
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
    onClick: handleControlNameClick,
  };

  return (
    <div className="container">
        {/* <Header /> */}
        <h3 style={{ textAlign: 'left' , marginLeft:" 30px" }}>{`${thrustarea}`}</h3>

      {/* <h2>{`${thrustarea}`}</h2> */}
      {controlNames.length > 0 ? (
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
    </div>
  );
};

export default  ControlName;
