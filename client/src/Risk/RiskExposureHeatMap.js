import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './RiskExposureHeat.css';
import * as API from "../endpoint";

const customColorScale = [
  [0, 'green'],
  [0.5, 'yellow'],
  [1, 'red'],
];

const RiskExposureHeatMap = () => {
  const [heatmapData, setHeatmapData] = useState({
    x: [],
    y: [""],
    z: [[]],
    type: 'heatmap',
    colorscale: customColorScale,
    showscale: true,
    hoverinfo: 'z+text',
    hoverongaps: false,
    hovertemplate: '<b>Risk Code:</b> %{x}<br><b>Exposure:</b> %{z}<br><span class="click-me-message">Click me</span>',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(API.MINRISKEXPOSURE_RISK_API);
      const data = response.data;
  
      const xValues = data.map((entry) => entry.riskcode);
      console.log('xValues:', xValues);
  
      const zValues = [data.map((entry) => entry.min_exposure)];
  
      setHeatmapData((prevData) => ({
        ...prevData,
        x: xValues,
        z: zValues,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleHeatMapHover = (data) => {
    if (data.points.length > 0) {
      const selectedPointIndex = data.points[0].pointIndex;
      const updatedColorScale = heatmapData.z.map((row, rowIndex) =>
        row.map((value, colIndex) =>
          colIndex === selectedPointIndex ? 0.5 : value
        )
      );

      setHeatmapData((prevData) => ({
        ...prevData,
        z: updatedColorScale,
      }));
    }
  };

  const handleHeatMapClick = (data) => {
    if (data.points.length > 0) {
      const selectedRiskCode = data.points[0].x;
      // Assuming you're using React Router for navigation
      window.location.href = `/risktassessmenttable/${selectedRiskCode}`;
    }
  };

  return (
   <center> <div className="heatmap-container">
      <h2>Risk Exposure Heat Map</h2>
      <Plot
  onClick={handleHeatMapClick}
  onHover={handleHeatMapHover}
  data={[
    {
      x: heatmapData.x,
      y: heatmapData.y,
      z: heatmapData.z,
      type: heatmapData.type,
      colorscale: heatmapData.colorscale,
      showscale: heatmapData.showscale,
      hoverinfo: heatmapData.hoverinfo,
      hoverongaps: heatmapData.hoverongaps,
      hovertemplate: heatmapData.hovertemplate,
      colorbar: {
        tickvals: [0, 0.5, 1],
        ticktext: ['Green', 'Yellow', 'Red'],
      },
    },
  ]}
  layout={{
    title: 'Risk Exposure Heatmap',
    hovermode: 'closest',
    xaxis: { title: 'Risk Exposure Value' },
  }}
/>

    </div></center>
  );
};

export default RiskExposureHeatMap;
