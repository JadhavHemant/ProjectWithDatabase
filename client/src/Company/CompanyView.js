import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CompanyView = () => {
  const [user, setUser] = useState({});
  const { companyid } = useParams();

  useEffect(() => {
    if (companyid) {
      axios
        .get(`http://localhost:5000/companyget/api/${companyid}`)
        .then((resp) => setUser({ ...resp.data[0] }))
        .catch((error) => {
          console.error(
            "An error occurred while fetching the Project Phase:",
            error
          );
        });
    }
  }, [companyid]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card-header">
        <p>Company Details</p>
      </div>
      <div className="container">
        <strong>Company ID : </strong>
        <span>{companyid}</span>
        <br />
        <br />
        <strong>Company Name : </strong>
        <span>{user.companyname}</span>
        <br />
        <br />
        <strong>Contact Name: </strong>
        <span>{user.contactname}</span>
        <br />
        <br />
        <strong>contact Email: </strong>
        <span>{user.contactemail}</span>
        <br />
        <br />
        <strong>Contact Phone : </strong>
        <span>{user.contactphone}</span>
        <br />
        <br />
        <Link to={`/project/${companyid}`}>
          <div className="btn btn-edit">Project Details</div>
        </Link>
        <Link to="/company">
          <div className="btn btn-edit">Go Back</div>
        </Link>
      </div>
    </div>
  );
};

export default CompanyView;
