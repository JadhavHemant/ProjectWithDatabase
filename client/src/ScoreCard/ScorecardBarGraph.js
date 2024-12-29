import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as API from "../endpoint";

const ScorecardBarGraph = ({ graphData }) => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const handleBarClick = (event, elements) => {
    try {
      if (elements && elements.length > 0) {
        const clickedIndex = elements[0].index;
        const thrustArea = data[clickedIndex].thrustarea;
        console.log("fhgasjhsjakdgfkjg"+thrustArea)
        navigate(`/controlNameGraph/${thrustArea}`);

      }
    } catch (error) {
      console.error("Error handling bar click:", error);
      window.alert("No data Available");
    }
  };

  useEffect(() => {
    setData(graphData)
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Extract counts grouped by thrust area
      const countsGroupedByThrustArea = data.reduce((result, item) => {
        const thrustArea = item.thrustarea;

        if (!result[thrustArea]) {
          result[thrustArea] = {
            evidenceremarkCount: 0,
            assessmentremarkCount: 0,
            auditremarkCount: 0,
          };
        }

        // Increment counts based on the presence of the corresponding remark
        if (item.evidenceremark !== null) {
          result[thrustArea].evidenceremarkCount += 1;
        }

        if (item.assessmentremark !== null) {
          result[thrustArea].assessmentremarkCount += 1;
        }

        if (item.auditremark !== null) {
          result[thrustArea].auditremarkCount += 1;
        }

        return result;
      }, {});

      // Convert countsGroupedByThrustArea into the format needed for the chart
      const labels = Object.keys(countsGroupedByThrustArea);
      const evidenceremarkCount = labels.map((thrustArea) => countsGroupedByThrustArea[thrustArea].evidenceremarkCount);
      const assessmentremarkCount = labels.map((thrustArea) => countsGroupedByThrustArea[thrustArea].assessmentremarkCount);
      const auditremarkCount = labels.map((thrustArea) => countsGroupedByThrustArea[thrustArea].auditremarkCount);

      const ctx = document.getElementById("multipleBarGraph").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Evidence",
              backgroundColor: "#d0efff",
              borderColor: "#d0efff",
              borderWidth: 1,
              data: evidenceremarkCount,
            },
            {
              label: "Assessment",
              backgroundColor: "#187bcd",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              data: assessmentremarkCount,
            },
            {
              label: "Audit",
              backgroundColor: "#03254c",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              data: auditremarkCount,
            },
          ],
        },
        options: {
          scales: {
            x: {
              center: "center",
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          onClick: handleBarClick,
        },
      });
    }
  }, [data]);

  return (
    <center>
      <div
        style={{
          height: "300px",
          width: "85%",
          margin: "auto",
          marginBottom: "3cm",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Score Counts by Thrust Area</h1>
        <canvas id="multipleBarGraph"></canvas>
      </div>
    </center>
  );
};

export default ScorecardBarGraph;