import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import * as API from '../endpoint';

const SubControlName = () => {
  const [subControlNames, setSubControlName] = useState([]);
  const { subcontrolname } = useParams();

 //  const navigate = useNavigate();

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
    const fetchSubControlName = async () => {
      try {
         const riskResponse = await axios.get(API.SUBCONTRILNAMEREPORT_GOVERNANCE_API(subcontrolname));
        setUser(riskResponse.data);

       const response = await axios.get(API.SUBCONTROLNAMEGRAPH_GOVERNANCE_API(subcontrolname));


          console.log('Response:', response.data);
          setSubControlName(response.data);

      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubControlName();
  },[]);

  const chartLabels = subControlNames.map(subcontrolName => subcontrolName.controlname);
  const chartData = subControlNames.map(subcontrolName => subcontrolName.controlname_count
    );

  const handleSubControlNameClick = (_, elements) => {
    if (elements && elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedSubControlname = chartLabels[clickedIndex];
      console.log('Clicked SubControl Name:', clickedSubControlname);

    const newTab=window.open(`/assessmentstatusgraph/${encodeURIComponent(clickedSubControlname)}`,'_blank');
    newTab.focus();

    }
  };

  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: 'SubControl Name Count',
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
          text: 'subControlname',
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
    onClick: handleSubControlNameClick,
  };

  return (
    <div className="container">
        {/* <Header /> */}
        <h2>{`${subcontrolname}`}</h2>
      {subControlNames.length > 0 ? (
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

export default  SubControlName;
