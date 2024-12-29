import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from '../endpoint';

const initialState = {
  responsibilitytype: '',
  responsibilitycode: '',
  responsibilitydescription: '',
  dependentresponsibilitycode: '',
  iconupload: '',
  fileupload: '',
  project: '',
};

const RespAddEdit = () => {
  const [state, setState] = useState(initialState);
  const { responsibilitytype, responsibilitycode, responsibilitydescription, dependentresponsibilitycode, iconupload, fileupload, project } = state;
  const navigate = useNavigate();
  const { responsibilitynameid } = useParams();
  const [projectalg, setProjecectAlg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (responsibilitynameid) {
          const resp = await axios.get(API.GET_RESPONSIBILITYCENTER_API(responsibilitynameid));
          setState({ ...resp.data[0] });
        }

        const response = await axios.get(API.GET_PROJECT_API);
        setProjecectAlg(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [responsibilitynameid]);

  const handlSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!responsibilitytype) {
        toast.error('Please provide a value for each input field');
      } else {
        if (!responsibilitynameid) {
          await axios.post(API.ADD_RESPONSIBILITYCENTER_API, {
            responsibilitytype,
            responsibilitycode,
            responsibilitydescription,
            dependentresponsibilitycode,
            iconupload,
            fileupload,
          });
          setState(initialState);
          toast.success('Responsibility added successfully');
        } else {
          await axios.put(API.UPDATE_RESPONSIBILITYCENTER_API(responsibilitynameid), {
            responsibilitytype,
            responsibilitycode,
            responsibilitydescription,
            dependentresponsibilitycode,
            iconupload,
            fileupload,
            project,
          });
          setState(initialState);
          toast.success('Responsibility updated successfully');
        }
        setTimeout(() => navigate('/resp2'), 500);
      }
    } catch (error) {
      toast.error(error.response?.data || 'An error occurred');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (


    <div style={{marginTop:" 100px"}}>
            <form style={{ 
                    margin:"auto",
                    padding:"15px",
                    maxWidth: "600px",
                    alignContent:"center"
              } }
                onSubmit={handlSubmit}
                >
                <label htmlFor="responsibilitytype">Responsibility Type</label>
                <input 
                type="text"
                id="responsibilitytype"
                name="responsibilitytype"
                placeholder="Enter Object Type" 
                value={responsibilitytype || " "}
                onChange={handleInputChange}
                />


               <label htmlFor="responsibilitycode">Responsibility code</label>
                <input 
                type="text"
                id="responsibilitycode"
                name="responsibilitycode"
                placeholder="Enter Object code" 
                value={responsibilitycode || " "}
                onChange={handleInputChange}
                />

                <label htmlFor="responsibilitydescription">Responsibility Type Description</label>
                <input 
                type="text"
                id="responsibilitydescription"
                name="responsibilitydescription"
                placeholder="Enter Object Type Description" 
                value={responsibilitydescription || " "}
                onChange={handleInputChange}
                />

                <label htmlFor="dependentresponsibilitycode">dependent Responsibility code</label>
                <input 
                type="text"
                id="dependentresponsibilitycode"
                name="dependentresponsibilitycode"
                placeholder="Enter Object Type" 
                value={dependentresponsibilitycode || " "}
                onChange={handleInputChange}
                />

                <label htmlFor="iconupload">Icon Upload</label>
                <input 
                type="text"
                id="iconupload"
                name="iconupload"
                placeholder="Enter your Icon upload Link" 
                value={iconupload || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="fileupload">File Upload</label>
                <input 
                type="text"
                id="fileupload"
                name="fileupload"
                placeholder="Enter your file upload link" 
                value={fileupload || " "}
                onChange={handleInputChange}
                />
                <div>
          <label>Project:</label>
          <select
            style={{ fontFamily: "Poppins" }}
            id="project"
            name="project"
            value={project || ""}
            onChange={handleInputChange}
          >
            <option value="">Project </option>
            {projectalg.map((proj) => (
              <option key={proj.projectid} value={proj.projectname}>
                {proj.projectname}
              </option>
            ))}
          </select>
          <br />
            </div>
                
                <input type="submit" value={responsibilitynameid ? "update": "Save"}/>
                <Link to="/resp2">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default RespAddEdit;