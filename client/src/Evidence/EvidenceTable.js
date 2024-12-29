import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';

const EvidenceTable = () => {
  const [evidenceList, setEvidenceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchEvidenceData = async () => {
    try {
      const response = await axios.get(API.GET_EVIDENCE_API);
      setEvidenceList(response.data);
    } catch (error) {
      console.error('Error fetching evidence data:', error.message);
    }
  };

  const deleteEvidence = async (datalineageid) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await axios.delete(API.DELETE_EVIDENCE_API(datalineageid));
        console.log('Success: Deleted successfully');
        fetchEvidenceData(); // No need for setTimeout
      }
    } catch (error) {
      console.error('Error deleting evidence:', error.message);
    }
  };

  useEffect(() => {
    fetchEvidenceData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = evidenceList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/adddatalineage">
        <center>
          <button className="btn btn-contact">Evidence</button>
        </center>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Organization</th>
            <th style={{ textAlign: 'center' }}>Responsibility Group</th>
            <th style={{ textAlign: 'center' }}>Project Name</th>
            <th style={{ textAlign: 'center' }}>Evidence Remark</th>
            <th style={{ textAlign: 'center' }}>Evidence Status</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((evidence, index) => (
            <tr key={evidence.datalineageid}>
              <th scope="row">{index + 1}</th>
              <td>{evidence.companyname}</td>
              <td>{evidence.responsibilitygroup}</td>
              <td>{evidence.projectname}</td>
              <td>{evidence.evidenceremark}</td>
              <td>{evidence.evidencestatus}</td>
              <td>
                {/* <Link to={`/datalineageupdate/${evidence.datalineageid}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link> */}
                <button
                  className="btn btn-delete"
                  onClick={() => deleteEvidence(evidence.datalineageid)}
                >
                  Delete
                </button>
                <Link to={`/datalineageview/${evidence.datalineageid}`}>
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
          {Array.from({ length: Math.ceil(evidenceList.length / itemsPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </center>
    </div>
  );
};

export default EvidenceTable;
