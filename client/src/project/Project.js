import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"

const Project = () => {
  const [project, setProjects] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { companyid } = useParams();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const responseProjects = await axios.get(
          "http://localhost:5000/projectgetApi/"
        );
        const sortedProjects = responseProjects.data.sort(
          (a, b) => b.projectid - a.projectid
        );
        setProjects(sortedProjects);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanyData();
  }, [companyid]);

  const deleteProject = async (projectid) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/projectRemove/${projectid}`);
        toast.success("Project Deleted Successfully");
        // Fetch updated projects after deletion
        const responseProjects = await axios.get(
          "http://localhost:5000/projectgetApi/"
        );
        setProjects(responseProjects.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const indexOfLastTerm = currentPage * itemsPerPage;
  const indexOfFirstTerm = indexOfLastTerm - itemsPerPage;
  const currentProject = project.slice(indexOfFirstTerm, indexOfLastTerm);

  const totalPages = Math.ceil(project.length / itemsPerPage);

  return (
    <div>
      
      <center><h1>Project List</h1></center>
      <div style={{ marginTop: "10px" }}>
    <Link to="/addproject">
   <center> <button className="btn btn-contact">Add Project</button></center>
            
    </Link>
        <div>
          <div className="container">
            <div style={{ marginTop: "30px" }}>
              <div></div>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Project No.</th>
                    <th style={{ textAlign: "center" }}>Project Name</th>
                    <th style={{ textAlign: "center" }}>Start Date</th>
                    <th style={{ textAlign: "center" }}>End Date</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProject.map((project, index) => (
                    <tr key={project.projectid}>
                      <th scope="row">{indexOfFirstTerm + index + 1}</th>
                      <td>{project.projectname}</td>
                      <td>{formatDate(project.fromdate)}</td>{" "}
                      {/* Format fromdate */}
                      <td>{formatDate(project.todate)}</td>{" "}
                      {/* Format todate */}
                      <td>
                        <Link
                          to={`/projectedit/${project.companyid}/${project.projectid}`}
                        >
                          <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button
                          className="btn btn-delete"
                          onClick={() => deleteProject(project.projectid)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/Viewproject/${project.projectid}/${project.companyid}`}
                        >
                          <button className="btn btn-view">View</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <br />

            <div style={{ marginTop: "1px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Project;
