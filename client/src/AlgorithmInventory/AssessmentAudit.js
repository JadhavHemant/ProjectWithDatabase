import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as API from "../endpoint";

const initialState = {
  assessmentRemark: "",
  assessmentfile: "",
  assessmentDate: "",
  auditRemark: "",
  auditFile: null,
  auditDate: "",
};

const AssessmentAuditForm = (props) => {
  const { algorithminventoryid } = useParams();
  const [state, setState] = useState(initialState);
  const { assessmentRemark, assessmentfile, assessmentDate, auditRemark, auditFile, auditDate } = state;
  const formattedDate = assessmentDate ? new Date(assessmentDate).toISOString().split('T')[0] : null;

  const navigate = useNavigate();
  const isReadOnly = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (algorithminventoryid) {
          const resp = await axios.get(API.VIEW_ALGORITHMINVENTORY_API(algorithminventoryid));
          setState({ ...resp.data[0] });
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching data');
      }
    };
    if (props.location && props.location.state && props.location.state.algorithminventory) {
      const { algorithminventory } = props.location.state;
      setState((prevState) => ({
        ...prevState,
        algorithminventoryid: algorithminventory.algorithminventoryid,
        responsibilitygroup: algorithminventory.responsibilitygroup,
        responsibilitycenter: algorithminventory.responsibilitycenter,
        algorithminventorydate: algorithminventory.algorithminventorydate,
      }));
    }
    fetchData();
  }, [algorithminventoryid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assessmentRemark) {
      toast.error("Please provide a value for each input field");
    } else {
      const apiData = {
        
        assessmentRemark,
        assessmentfile,
        assessmentDate: formattedDate,
        auditRemark,
        auditFile,
        auditDate
      };

      const apiRequest = algorithminventoryid
        ? axios.put(API.UPDATE_ALGORITHMINVENTORY_API(algorithminventoryid), apiData)
        : axios.post(API.ADD_ALGORITHMINVENTORY_API, apiData);

      apiRequest
        .then(() => {
          setState(initialState);
          toast.success(algorithminventoryid ? "Risk updated successfully" : "Added successfully");
        })
        .catch((err) => toast.error(err.response.data));

      setTimeout(() => navigate("/addalgorithminventory"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <center>
        <h2>Assessment & Audit</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Remark</th>
              <th>Date</th>
              <th>File Upload</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h3>Assessment</h3>
              </td>
              <td>
                <div>
                  <textarea
                    rows="3"
                    cols="30"
                    style={{ fontFamily: 'Poppins' }}
                    id="assessmentRemark"
                    name="assessmentRemark"
                    placeholder="Enter Assessment Remark"
                    value={assessmentRemark}
                    onChange={(e) => handleInputChange(e)}
                    disabled={isReadOnly}
                  />
                </div>
              </td>
              <td>
                {/* <input
                  style={{ width: '150px', height: '30px' }}
                  type="date"
                  value={assessmentDate}
                  onChange={(e) => handleInputChange(e)}
                /> */}


<div>
          <label>Date:</label>
          <br></br>
          <input
            style={{ width: '150px', height: '30px'
              
          }}
            type="date"
            id="assessmentDate"
            name="assessmentDate"
            placeholder="Enter the assessmentDate"
            value={assessmentDate }
            onChange={handleInputChange}
          />
        </div> 
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <br />
                  <input
                    style={{
                      fontFamily: 'Poppins',
                      marginRight: '10px',
                      marginLeft: '10px',
                    }}
                    type="text"
                    id="assessmentfile"
                    name="assessmentfile"
                    value={assessmentfile}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div style={{ position: 'relative' }}></div>
                  <a
                    href="https://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Upload file here
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Audit</h3>
              </td>
              <td>
                <div>
                  <textarea
                    rows="3"
                    cols="30"
                    style={{ fontFamily: 'Poppins' }}
                    id="auditRemark"
                    name="auditRemark"
                    placeholder="Enter Audit Remark"
                    value={auditRemark}
                    onChange={(e) => handleInputChange(e)}
                    disabled={isReadOnly}
                  />
                </div>
              </td>
              <td>
                {/* <input
                  style={{ width: '150px', height: '30px' }}
                  type="date"
                  value={auditDate}
                  onChange={(e) => handleInputChange(e)}
                /> */}


<div>
          <label>Date:</label>
          <br></br>
          <input
            style={{ width: '150px', height: '30px'
              
          }}
            type="date"
            id="auditDate"
            name="auditDate"
            placeholder="Enter the auditDate"
            value={auditDate }
            onChange={handleInputChange}
          />
        </div> 
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <br />
                  <input
                    style={{
                      fontFamily: 'Poppins',
                      marginRight: '10px',
                      marginLeft: '10px',
                    }}
                    type="text"
                    id="auditFile"
                    name="auditFile"
                    value={auditFile}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div style={{ position: 'relative' }}></div>
                  <a
                    href="https://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Upload file here
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <center>
          <div style={{ width: '30%', marginTop: '2%' }}>
            <input
              type="submit"
              value={algorithminventoryid ? 'Update' : 'Save'}
            />
            <Link to="/addalgorithminventory"> </Link>
          </div>
        </center>
      </form>
    </div>
  );
};

export default AssessmentAuditForm;
