

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as API from "../endpoint";

const ResidualRiskChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Risk Exposure',
        data: [],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  });
  const [tableData, setTableData] = useState([]);
  const { riskcode } = useParams();
  const chartRef = useRef(null);

   // Sort tableData based on riskexposure in descending order
   const sortedTableData = [...tableData].sort((a, b) => b.riskexposure - a.riskexposure);

  const fetchData = async () => {
    try {
      const response = await axios.get(API.RISKCODEVIEW_RISK_API(riskcode));
      const data = response.data;
     

      const updatedates = data.map((entry) => entry.updatedate || '');
      const labels = updatedates.map((date, index) => {
        const formattedDate = formatDate(date);
        const difference = index > 0 ? ` (${calculateDateDifference(updatedates)[index]} days)` : '';
        const control = data[index].control || '';
        const subcontrol = data[index].subcontrol || '';
        return `${formattedDate} - ${control}\n${subcontrol ? ` - ${subcontrol}` : ''}${difference}`;
      });

      const riskexposureValues = data.map((entry) => {
        const value = entry.riskexposure;

        if (value !== undefined && value !== null && !isNaN(value)) {
          return parseFloat(value);
        } else {
          console.warn('Invalid Risk Exposure value:', entry);
          return 0;
        }
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Risk exposure',
            data: riskexposureValues,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      });

      // Update table data
      const tableValues = labels.map((label, index) => ({
        label,
        organization: data[index].organization,  // Replace with actual property names
        responsibilitygroup: data[index].responsibilitygroup,
        responsibilitycenter: data[index].responsibilitycenter,
        subcategory: data[index].subcategory,
        category: data[index].category,
        riskexposure: data[index].riskexposure,
        riskname: data[index].riskname,
        riskcode: data[index].riskcode,
        severity: data[index].severity,
        riskgroup: data[index].riskgroup,
        updatedate: data[index].updatedate,
        riskdate: data[index].riskdate,
        confidentiality: data[index].confidentiality,
        availability: data[index].availability,
        integrity: data[index].integrity,
        probability: data[index].probability,
        impact: data[index].impact,
        residualrisk: data[index].residualrisk,
        controlowner: data[index].controlowner,
        groupname: data[index].groupname,
        thrustarea: data[index].thrustarea,
        controlname: data[index].controlname,
        controlwt: data[index].controlwt,
        subcontrolname: data[index].subcontrolname,
        subcontrolwt: data[index].subcontrolwt,
        subcontrol: data[index].subcontrol,
        remark: data[index].remark,
      }));

      setTableData(tableValues);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const calculateDateDifference = (dates) => {
    const differences = [0];
    for (let i = 1; i < dates.length; i++) {
      const diffInMs = new Date(dates[i]) - new Date(dates[i - 1]);
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      differences.push(diffInDays);
    }
    return differences;
  };

  useEffect(() => {
    fetchData();
  }, [riskcode]);

  useEffect(() => {
    if (chartRef.current && chartData.labels.length > 0) {
      const context = chartRef.current.getContext('2d');
      const newChart = new Chart(context, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: [{
              type: 'category',
              labels: chartData.labels,
              title: {
                display: true,
                text: 'Update Date and Control',
                fontSize: 14,
              },
              maxTicksLimit: chartData.labels.length,
            }],
            y: {
              title: {
                display: true,
                text: 'Risk Exposure',
              },
            },
          },
        },
      });

      return () => {
        newChart.destroy();
      };
    }
  }, [chartData]);



  const filterUniqueOrganizations = (data) => {
    const uniqueOrganizations = new Set();
    return data.filter((entry) => {
      if (!uniqueOrganizations.has(entry.organization)) {
        uniqueOrganizations.add(entry.organization);
        return true;
      }
      return false;
    });
  };

  // Filter unique entries before rendering the table
  const uniqueTableData = filterUniqueOrganizations(tableData);



  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Risk Exposure</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Responsibility Group</th>
            <th>Responsibility Center</th>
            <th>Risk Group</th>
          </tr>
        </thead>
        <tbody>
          {uniqueTableData.map((row, index) => (
            <tr key={index}>
              <td>{row.organization}</td>
              <td>{row.responsibilitygroup}</td>
              <td>{row.responsibilitycenter}</td>
              <td>{row.riskgroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Risk Exposure Chart</h2>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas
          ref={chartRef}
          id="riskcode"
          style={{ width: '700px', height: '150px' }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Risk Exposure</h3>
        <table className="styled-table">
          <thead>
            <tr>
            {/* <th style={{textAlign:"center"}}>No</th> */}
          <th style={{textAlign:"center"}}>Risk Name</th>
          <th style={{textAlign:"center"}}>Risk Code</th>
          <th style={{textAlign:"center"}}>Risk Severity</th>
          <th style={{textAlign:"center"}}>Risk Group</th>
          <th style={{textAlign:"center"}}>Date</th>
          <th style={{textAlign:"center"}}>Confidentiality</th>
          <th style={{textAlign:"center"}}>Availability</th>
          <th style={{textAlign:"center"}}>Integrity</th>
          <th style={{textAlign:"center"}}>Probability</th>
          <th style={{textAlign:"center"}}>Impact</th>
          <th style={{textAlign:"center"}}>Risk Exposure</th>
          <th style={{textAlign:"center"}}>Residual Risk</th>
          <th style={{textAlign:"center"}}>Control Owner</th>
          <th style={{textAlign:"center"}}>Group Name</th>
          <th style={{textAlign:"center"}}>Thrust Area</th>
          <th style={{textAlign:"center"}}>Control</th>
          <th style={{textAlign:"center"}}>Control Weight</th>
          <th style={{textAlign:"center"}}>Sub-Control</th>
          <th style={{textAlign:"center"}}>Sub-Control Weight</th>
          <th style={{textAlign:"center"}}>Remark</th>
                 </tr>
          </thead>
          <tbody>
            {sortedTableData.map((row, index) => (
              <tr key={index}>
               <td>{row.riskname}</td>
                <td>{row.riskcode}</td>
                <td>{row.severity}</td>
                <td>{row.riskgroup}</td>
                <td>{formatDate(row.riskdate)}</td>
                <td>{row.confidentiality}</td>
                <td>{row.availability}</td>
                <td>{row.integrity}</td>
                <td>{row.probability}</td>
                <td>{row.impact}</td>
                <td>{row.riskexposure}</td>
                <td>{row.residualrisk}</td>
                <td>{row.controlowner}</td>  
                <td>{row.groupname}</td>
                <td>{row.thrustarea}</td>
                <td>{row.controlname}</td>
                <td>{row.controlwt}</td>
                <td>{row.subcontrolname}</td>
                <td>{row.subcontrolwt}</td>
                <td>{row.remark}</td>

                 </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidualRiskChart;





























