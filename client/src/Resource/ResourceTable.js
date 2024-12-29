import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';

const Table1 = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    const response = await axios.get(API.GET_RESOURCE_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = async (resourceid) => {
    if (window.confirm("Are you sure you want to delete")) {
      await axios.delete(API.DELETE_RESOURCE_API(resourceid));
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
      <Link to="/addresource">
        <center>
          <button className="btn btn-contact">Add Resource</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Resource Name</th>
            <th style={{ textAlign: 'center' }}>Designation</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.resourcename}</td>
              <td>{item.designation}</td>
              <td>{item.status}</td>
              
              <td>
                <Link to={`/resourceupdate/${item.resourceid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteObject(item.resourceid)}
                >
                  Delete
                </button>
                <Link to={`/resourceview/${item.resourceid}`}>
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

export default Table1;
