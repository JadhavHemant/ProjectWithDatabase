import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";

const View = () => {
  const [user,setUser]= useState({});
  console.log(API.GET_OBJECTTYPE_API)

  const {vendorid} = useParams();

  useEffect(() => {
    axios.get(API.VIEW_VENDORMASTER_API(vendorid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[vendorid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User Vendor</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{vendorid}</span>
          <br/><br/>
          <strong>Vendor Name:</strong>
          <span>{user.vendorname}</span>
          <br/><br/>
          <strong>Vendor Contact:</strong>
          <span>{user.vendorcontact}</span>
          <br/><br/>
          <strong>Vendor Email:</strong>
          <span>{user.vendoremail}</span>
          <br/><br/>
                   <Link to="/vendormaster">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View