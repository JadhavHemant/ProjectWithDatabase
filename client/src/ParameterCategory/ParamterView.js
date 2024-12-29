import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";


const ParmterView = () => {
  const [user,setUser]= useState({});

  const {categoryid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_PARAMETERCATEGORY_API(categoryid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[categoryid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User parameter Category</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{categoryid}</span>
          <br/><br/>
          <strong>Category Code:</strong>
          <span>{user.categorycode}</span>
          <br/><br/>
          <strong>Category Name</strong>
          <span>{user.categoryname}</span>
          <br/><br/>
          <strong>file Upload</strong>
          <span>{user.fileupload}</span>
          <br/><br/>
          <strong>Category Type</strong>
          <span>{user.categorytype}</span>
          <br/><br/>
          <strong>checkbox</strong>
          <span>{user.checkbox}</span>
          <br/><br/>
          <strong>Radio Button</strong>
          <span>{user.radiobutton}</span>
          <br/><br/>
          <strong>Date</strong>
          <span>{user.date}</span>
          <br/><br/>
          <strong>Continue Text</strong>
          <span>{user.continuetext}</span>
          <br/><br/>
          <strong>Continue Number</strong>
          <span>{user.continuenumber}</span>
          <br/><br/>

          <Link to="/par">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default  ParmterView;