import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as API from "../endpoint";
import Footer from "../pages/footer";
import Header from "../pages/header";

const Risk1 = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get(API.GET_RISK_API);
      // Sort the data based on risk id in descending order (newest first)
      const sortedData = response.data.sort((a, b) => b.riskid - a.riskid);
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., show an error message or redirect to an error page
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = (riskid) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios.delete(API.DELETE_RISK_API(riskid));
      console.log("success:", "deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: "15px" }}>
        <Link to="/TableRisks">
          <center>
            <button className="btn btn-contact">Add Risk</button>
          </center>
        </Link>
        <center>
          <Link to={"/riskexposureheatmap"}>
            <button className="btn btn-view">Risk Heat Graph</button>
          </Link>
          <Link to={"/riskcategory"}>
                    <button className="btn btn-edit">Risk Category Graph</button>
                  </Link>
        </center>

        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Risk Name</th>
              <th style={{ textAlign: "center" }}>Risk Code</th>
              <th style={{ textAlign: "center" }}>Risk Severity</th>
              <th style={{ textAlign: "center" }}>Risk Group</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.riskname}</td>
                <td>{item.riskcode}</td>
                <td>{item.severity}</td>
                <td>{item.riskgroup}</td>
                <td>
                  <Link to={`/risksupdate/${item.riskid}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteObject(item.riskid)}
                  >
                    Delete
                  </button>
                  <Link to={`/Viewview/${item.riskid}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                  <Link to={`/controlupdate/${item.riskid}`}>
                    <button className="btn btn-edit">Control Update</button>
                  </Link>
                  <Link to={`/risktassessmenttable/${item.riskcode}`}>
                    <button className="btn btn-edit">Risk Assessment</button>
                  </Link>
                  <Link to={`/residualriskChart/${item.riskcode}`}>
                    <button className="btn btn-edit">Risk Graph</button>
                  </Link>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Risk1;