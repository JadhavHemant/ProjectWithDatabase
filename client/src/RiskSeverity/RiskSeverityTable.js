import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';

const RiskSeverityTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const loadData = async () => {
    const response = await axios.get(API.GET_RISKSEVERIT_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = async (riskSeverityId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(API.DELETE_RISKSEVERIT_API(riskSeverityId));
        console.log('Success: Deleted successfully');
        loadData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/riskseverityTable">
        <center>
          <button className="btn btn-contact">Add Risk Severity Type</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Risk Severity Type</th>
            <th style={{ textAlign: 'center' }}>Risk Severity Type Description</th>
            {/* <th style={{textAlign:"center"}}>Icon Upload</th> */}
            <th style={{ textAlign: 'center' }}>File Upload</th>
            <th style={{ textAlign: 'center' }}>Risk Severity</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.riskseveritytype}</td>
              <td>{item.riskseveritytypedescription}</td>
              {/* <td>{item.iconupload}</td> */}
              <td>{item.fileupload}</td>
              <td>{item.riskseverityvalue}</td>
              <td>
                <Link to={`/riskseverityupdate/${item.riskseverityid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteObject(item.riskseverityid)}
                >
                  Delete
                </button>
                <Link to={`/riskseverityView/${item.riskseverityid}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <center>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(data.length / itemsPerPage) },
            (_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            )
          )}
        </div>
      </center>
    </div>
  );
};

export default RiskSeverityTable;
