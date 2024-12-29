import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Company = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/companyget/api");
      const sortedData = response.data.sort(
        (a, b) => b.companyid - a.companyid
      );
      setData(sortedData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const deleteCompany = async (companyid) => {
    if (window.confirm("Are you sure?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/companyremove/api/${companyid}`
        );
        if (response.status === 200) {
          toast.success("Company Deleted Successfully");
          loadData();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(
            "Cannot delete Company as there are associates present ."
          );
        } else {
          console.log(error);
          toast.error("An error occurred while deleting Company.");
        }
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
    
      <center><h1>Company List</h1></center>
      <div style={{ marginTop: "auto", paddingBottom: "100px" }}>
        <Link to="/addcompany">
          <center><button className="btn btn-contact">Add Company</button></center>
        </Link>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Company Name</th>
              <th style={{ textAlign: "center" }}>Contact Name</th>
              <th style={{ textAlign: "center" }}>Contact Email</th>
              <th style={{ textAlign: "center" }}>Contact Phone</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + indexOfFirstItem + 1}</th>
                  <td>{item.companyname}</td>
                  <td>{item.contactname}</td>
                  <td>{item.contactemail}</td>
                  <td>{item.contactphone}</td>
                  <td>
                    <Link to={`/editcompany/${item.companyid}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteCompany(item.companyid)}
                    >
                      Delete
                    </button>
                    <Link to={`/project/${item.companyid}`}>
                      <button className="btn btn-view">Project</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Company;
