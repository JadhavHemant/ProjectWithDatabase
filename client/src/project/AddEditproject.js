import React, { useState, useEffect } from "react";
import {useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const initialState = {
  projectname: "",
  fromdate: "",
  todate: "",
};
const AddEditproject = () => {
  const [state, setState] = useState(initialState);
  const { projectname, fromdate, todate } = state;

  const navigate=useNavigate();

  const { projectid, companyid } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (projectid && companyid) {
      try {
        axios
          .get(`http://localhost:5000/projectApiGet/${projectid}/${companyid}`)
          .then((resp) => setState({ ...resp.data[0] }))
          .catch((error) => {
            // Handle error from the axios request
            console.error("Error fetching data:", error);
            // You might want to set an error state or handle the error in some way
          });
      } catch (error) {
        // Handle any synchronous errors that might occur within the useEffect
        console.error("Error in useEffect:", error);
        // You might want to set an error state or handle the error in some way
      }
    }
  }, [projectid, companyid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectname || !fromdate || !todate) {
      toast.error("please provide the Input");
    } else {
      if (!projectid) {
        axios
          .post(`http://localhost:5000/projectadd/api/${companyid}`, {
            projectname,
            fromdate,
            todate,
          })
          .then(() => {
            setState({ projectname: "", fromdate: "", todate: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Project Added");
      } else {
        axios
          .put(
            `http://localhost:5000/projectUpdate/api/${projectid}/${companyid}`,
            {
              projectname,
              fromdate,
              todate,
            }
          )
          .then(() => {
            setState({ projectname: "", fromdate: "", todate: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Project Details Updated");
      }
      setTimeout(()=> navigate("/project"),500);
    }
  };

  return (
    <div>
      
      <h1>Project Description</h1>
      <div style={{ marginTop: "20px" }}>
        <form
          style={{
            fontFamily: "Poppins",
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <h2>Enter Project Details</h2>
          <br />
          <br />
          <label htmlFor="projectname">Project Name</label>
          <input
            style={{
              fontFamily: "Poppins",
            }}
            type="text"
            id="projectname"
            name="projectname"
            placeholder=""
            onChange={handleInputChange}
            value={projectname || ""}
          />
          <br />
          <br />
          <label htmlFor="projectname">Start Date : </label>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            style={{
              fontFamily: "Poppins",
              margin: "auto",
              padding: "10px",
              maxWidth: "400px",
              alignContent: "center",
            }}
            type="date"
            id="fromdate"
            name="fromdate"
            placeholder=""
            onChange={handleInputChange}
            value={fromdate || ""}
          />
          <br />
          <br />
          <label htmlFor="todate">End Date : </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            style={{
              fontFamily: "Poppins",
              margin: "auto",
              padding: "10px",
              maxWidth: "400px",
              alignContent: "center",
            }}
            type="date"
            id="todate"
            name="todate"
            placeholder=""
            onChange={handleInputChange}
            value={todate || ""}
          />
          <br />
          <br />
          <input type="submit" value={projectid ? "Update" : "Save"} />
          <Link to={`/project/${companyid}`}>
            <input
              style={{ fontFamily: "Poppins", backgroundColor: "#3386ff" }}
              type="button"
              value="Go back"
            ></input>
          </Link>
        </form>
      </div>


      
    </div>
  );
};

export default AddEditproject;
