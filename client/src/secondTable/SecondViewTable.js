import React ,{useState,useEffect}from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import * as API from "../endpoint";


const SecondViewTable = () => {
  const [user,setUser]= useState({});

  const {nameid} = useParams();

  useEffect(() => {
    axios.get(API.OBJECTVIEW_OBJECTNAME_API(nameid))
      .then((resp)=>setUser({...resp.data[0]}));

  },[nameid])

  return (
    <div style={{marginTop:"150px"}}>
      <div className="card">
      <div className="card-header">
        <p>User Object Type</p>
      </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{nameid}</span>
          <br/><br/>
          <strong>Object type:</strong>
          <span>{user.objecttype}</span>
          <br/><br/>
          <strong>Object Code:</strong>
          <span>{user.objectcode}</span>
          <br/><br/>
          <strong>Object Type Description</strong>
          <span>{user.objectdescription}</span>
          <br/><br/>
          <strong>dependent object code</strong>
          <span>{user.dependentobjectcode}</span>
          <br/><br/>
          <strong>Icon Upload</strong>
          <span>{user.iconupload}</span>
          <br/><br/>
          <strong>File Upload</strong>
          <span>{user.fileupload}</span>
          <br/><br/>

          <Link to="/secondTable">
                <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SecondViewTable