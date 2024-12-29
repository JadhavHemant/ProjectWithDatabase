import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';


const AlgorithmInventoryTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    const response = await axios.get(API.GET_ALGORITHMINVENTORY_API);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteObject = (algorithminventoryid) => {
    if (window.confirm('Are you sure you want to delete')) {
      axios.delete(API.DELETE_ALGORITHMINVENTORY_API(algorithminventoryid));
      console.log('success:', 'deleted successfully');
      setTimeout(() => loadData(), 500);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/addalgorithminventory">
        <center>
          <button className="btn btn-contact">Add Algorithm Inventory</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Project</th>
            <th style={{ textAlign: 'center' }}>Project Code</th>
            <th style={{ textAlign: 'center' }}>Algorithm Remark</th>
            <th style={{ textAlign: 'center' }}>Data Remark</th>
            <th style={{ textAlign: 'center' }}>Code Vulnerability Remark</th>
            <th style={{ textAlign: 'center' }}>Privacydata Remark</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.project}</td>
              <td>{item.projectcode}</td>
              <td>{item.algorithmremark}</td>
              <td>{item.dataremark}</td>
              <td>{item.codevulnerabilityremark}</td>
              <td>{item.privacydataremark}</td>

              <td>
                <Link to={`/algorithminventoryupdate/${item.algorithminventoryid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteObject(item.algorithminventoryid)}
                >
                  Delete
                </button>
                <Link to={`/algorithminventoryview/${item.algorithminventoryid}`}>
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
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </center>
    </div>
  );
};

export default AlgorithmInventoryTable;
