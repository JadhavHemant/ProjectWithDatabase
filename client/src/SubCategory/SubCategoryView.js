import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import * as API from '../endpoint';

const SubCategoryView = () => {
  const [user, setUser] = useState({});
  const { subcategoryid } = useParams();

  useEffect(() => {
    axios.get(API.VIEW_SUBCATEGORY_API(subcategoryid))
      .then((resp) => {
        console.log('API Response:', resp.data); // Log the response data
        setUser({ ...resp.data[0] });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, [subcategoryid]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Subcategory</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{subcategoryid}</span>
          <br /><br />
          <strong>Subcategory Type:</strong>
          <span>{user.subcategorytype}</span>
          <br /><br />
          <strong>Subcategory Type Description:</strong>
          <span>{user.subcategorytypedescription}</span>
          <br /><br />
          <strong>Icon Upload:</strong>
          <span>{user.iconupload}</span>
          <br /><br />
          <strong>File Upload:</strong>
          <span>{user.fileupload}</span>
          <br /><br />

          <Link to="/sub">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryView;
