import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import * as API from '../endpoint';

const Table1 = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    const response = await axios.get(API.GET_OBJECTTYPE_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = async (objectId) => {
    if (window.confirm("Are you sure you want to delete")) {
      await axios.delete(API.DELETE_OBJECTTYPE_API(objectId));
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
      <Link to="/addobject">
        <center>
          <button className="btn btn-contact">Add Object Type</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Object Type</th>
            <th style={{ textAlign: 'center' }}>Object Type Description</th>
            <th style={{ textAlign: 'center' }}>Icon Upload</th>
            <th style={{ textAlign: 'center' }}>File Upload</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.objecttype}</td>
              <td>{item.objecttypedescription}</td>
              <td>{item.iconupload}</td>
              <td>{item.fileupload}</td>
              <td>
                <Link to={`/update/${item.objectid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteObject(item.objectid)}
                >
                  Delete
                </button>
                <Link to={`/view/${item.objectid}`}>
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
