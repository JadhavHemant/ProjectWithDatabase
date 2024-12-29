import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';

const TechnologyTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const loadData = async () => {
    const response = await axios.get(API.GET_TECHNOLOGY_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = async (technologyMasterId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(API.DELETE_TECHNOLOGY_API(technologyMasterId));
        console.log('Success: Deleted successfully');
        loadData(); // Refresh the data after deletion.
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
      <Link to="/addtechnology">
        <center>
          <button className="btn btn-contact">Add Technology</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Technology Name</th>
            <th style={{ textAlign: 'center' }}>Technology Version</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.technologyname}</td>
              <td>{item.technologyversion}</td>
              <td>
                <Link to={`/addtechnologyupdate/${item.technologymasterid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteObject(item.technologymasterid)}
                >
                  Delete
                </button>
                <Link to={`/technologyview/${item.technologymasterid}`}>
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

export default TechnologyTable;
