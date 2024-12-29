import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';

const IssueTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    const response = await axios.get(API.GET_ISSUE_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = async (issueid) => {
    if (window.confirm("Are you sure you want to delete")) {
      await axios.delete(API.DELETE_ISSUE_API(issueid));
      console.log('Success: Deleted successfully');
      loadData();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/issueaddedit">
        <center>
          <button className="btn btn-contact">Add Issues</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Process Issue</th>
            <th style={{ textAlign: 'center' }}>Coding Issue</th>
            <th style={{ textAlign: 'center' }}>Resource Issue</th>
            <th style={{ textAlign: 'center' }}>Data Issue</th>
            <th style={{ textAlign: 'center' }}>Infrastructure Issue</th>
            <th style={{ textAlign: 'center' }}>Model Issue</th>
            <th style={{ textAlign: 'center' }}>Performance Issue</th>
            <th style={{ textAlign: 'center' }}>Resolution</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.processissue}</td>
              <td>{item.codingissue}</td>
              <td>{item.resourceissue}</td>
              <td>{item.dataissue}</td>
              <td>{item.infrastructureissue}</td>
              <td>{item.modelissue}</td>
              <td>{item.performanceissue}</td>
              <td>{item.resolution}</td>
              <td>
                <Link to={`/issueupdate/${item.issueid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteObject(item.issueid)}
                >
                  Delete
                </button>
                <Link to={`/issueview/${item.issueid}`}>
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

export default IssueTable;
