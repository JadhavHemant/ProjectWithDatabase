import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';


const SecondTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const loadData = async () => {
    const response = await axios.get(API.OBJECTGET_OBJECTNAME_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = async (nameId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(API.OBJECTDELETE_OBJECTNAME_API(nameId));
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
      <Link to="/addobj">
        <center>
          <button className="btn btn-contact">Add Object</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Object Type</th>
            <th style={{ textAlign: 'center' }}>Object code</th>
            <th style={{ textAlign: 'center' }}>Object Type Description</th>
            <th style={{ textAlign: 'center' }}>Dependent Object code</th>
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
              <td>{item.objectcode}</td>
              <td>{item.objectdescription}</td>
              <td>{item.dependentobjectcode}</td>
              <td>{item.iconupload}</td>
              <td>{item.fileupload}</td>
              <td>
                <Link to={`/edit/${item.nameid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteObject(item.nameid)}
                >
                  Delete
                </button>
                <Link to={`/see/${item.nameid}`}>
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

export default SecondTable;
