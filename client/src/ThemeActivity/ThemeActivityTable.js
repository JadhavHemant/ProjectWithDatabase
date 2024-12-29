import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';

const ThemeActivityTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items to display per page

  const loadData = async () => {
    const response = await axios.get(API.GET_THEMEACTIVITY_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = (themeactivityid) => {
    if (window.confirm('Are you sure you want to delete')) {
      axios.delete(API.DELETE_THEMEACTIVITY_API(themeactivityid));
      console.log('success:', 'deleted successfully');
      setTimeout(() => loadData(), 500);
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/addthemeactivity">
        <center>
          <button className="btn btn-contact">Add Activity Group</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Theme</th>
            <th style={{ textAlign: 'center' }}>Phase</th>
            <th style={{ textAlign: 'center' }}>Activity Group</th>
            <th style={{ textAlign: 'center' }}>Activity</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.theme}</td>
                <td>{item.phase}</td>
                <td>{item.activitygroup}</td>
                <td>{item.activity}</td>

                <td>
                  <Link to={`/themeactivityupdate/${item.themeactivityid}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteObject(item.themeactivityid)}
                  >
                    Delete
                  </button>
                  <Link to={`/themeactivityview/${item.themeactivityid}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
     <center> <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div></center>
    </div>
  );
};

export default ThemeActivityTable;
