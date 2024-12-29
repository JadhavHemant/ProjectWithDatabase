import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';

const ParameterTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    const response = await axios.get(API.GET_PARAMETERCATEGORY_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = async (categoryId) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await axios.delete(API.DELETE_PARAMETERCATEGORY_API(categoryId));
        console.log('Success: Deleted successfully');
        loadData();
      }
    } catch (error) {
      console.error('Error deleting object:', error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/parTable">
        <center>
          <button className="btn btn-contact">Parameter Category</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Category Code</th>
            <th style={{ textAlign: 'center' }}>Category Name</th>
            <th style={{ textAlign: 'center' }}>Category Name</th>
            <th style={{ textAlign: 'center' }}>File Upload</th>
            <th style={{ textAlign: 'center' }}>Category Type</th>
            <th style={{ textAlign: 'center' }}>Checkbox</th>
            <th style={{ textAlign: 'center' }}>Radio button</th>
            <th style={{ textAlign: 'center' }}>Date</th>
            <th style={{ textAlign: 'center' }}>Continue Text</th>
            <th style={{ textAlign: 'center' }}>Continue Number</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.categorycode}</td>
              <td>{item.categoryname}</td>
              <td>{item.categoryname}</td>
              <td>{item.fileupload}</td>
              <td>{item.categorytype}</td>
              <td>{item.checkbox}</td>
              <td>{item.radiobutton}</td>
              <td>{item.date}</td>
              <td>{item.continuetext}</td>
              <td>{item.continuenumber}</td>
              <td>
                <Link to={`/parameterupdate/${item.categoryid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteObject(item.categoryid)}
                >
                  Delete
                </button>
                <Link to={`/parameterView/${item.categoryid}`}>
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

export default ParameterTable;
