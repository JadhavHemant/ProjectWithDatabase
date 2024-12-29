import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../pages/header";
import Footer from "../pages/footer";
import { toast } from "react-toastify";
import axios from "axios";
import * as API from "../endpoint";

const EnvironmentTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const loadData = async () => {
    try {
      const response = await axios.get(API.GET_ENVIRONMENT_API);
      const sortedData = response.data.sort(
        (a, b) => b.environmentid - a.environmentid
      );
      setData(sortedData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const deleteDataset = async (environmentid) => {
    if (window.confirm("Are you sure?")) {
      try {
        const response = await axios.delete(API.DELETE_ENVIRONMENT_API(environmentid));
        if (response.status === 200) {
          toast.success("Data Set Deleted Successfully");
          loadData();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(
            "Cannot delete Data set as there are associates present ."
          );
        } else {
          console.log(error);
          toast.error("An error occurred while deleting Data Set.");
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
    <div style={{ fontFamily: "Poppins" }}>
      <Header />
      <div style={{ marginTop: "1cm" }}>
       <center> <h1>Environment </h1></center>
        <div style={{ marginTop: "auto", paddingBottom: "100px" }}>
          <Link to="/addenvironment">
           <center> <button className="btn btn-contact">Add Environment</button></center>
          </Link>
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Environment Name</th>
                <th style={{ textAlign: "center" }}>Environment Description </th>

                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{index + indexOfFirstItem + 1}</th>
                    <td>{item.environmentname}</td>
                    <td>{item.environmentdescription}</td>

                    <td>
                      <Link to={`/environmentupdate/${item.environmentid}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteDataset(item.environmentid)}
                      >
                        Delete
                      </button>
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
      <Footer />
    </div>
  );
};

export default EnvironmentTable;