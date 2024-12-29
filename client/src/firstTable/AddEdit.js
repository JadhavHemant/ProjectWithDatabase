import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import "./AddEdit.css" 
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
    objecttype:" ",
    objecttypedescription:" ",
    iconupload:" ",
    fileupload:" ",
};

const AddEdit = () => {
    const [state,setState]= useState(initialState);
    console.log(API.GET_OBJECTTYPE_API)

    const {objecttype,objecttypedescription,iconupload,fileupload}=state;
    
    const navigate=useNavigate();
    
    const {objectid}= useParams();
  

    useEffect(() => {
      if(objectid){
      axios.get(API.VIEW_OBJECTTYPE_API(objectid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[objectid])

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!objecttype|| !objecttypedescription|| !iconupload|| !fileupload){
        toast.error("please provider value into each input field");
    }else{
        if(!objectid){
          axios.post(API.ADD_OBJECTTYPE_API,{
          objecttype,
          objecttypedescription,
          iconupload,
          fileupload,
        }).then(()=>{
          setState({objecttype:" ",objecttypedescription:" ",iconupload:" ",fileupload:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Object added successfully");
        }
        else{
          
          axios.put(API.UPDATE_OBJECTTYPE_API(objectid),{
          objecttype,
          objecttypedescription,
          iconupload,
          fileupload,
        }).then(()=>{
          setState({objecttype:" ",objecttypedescription:" ",iconupload:" ",fileupload:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Object update successfully");
        }
        setTimeout(()=> navigate("/"),500);
    }
  
  }; 
    const handleInputChange= (e) => {
            const {name,value} = e.target;
            setState({...state,[name]:value});
    }
  return (


    <div style={{marginTop:" 100px"}}>
            <form style={{ 
                    margin:"auto",
                    padding:"15px",
                    maxWidth: "400px",
                    alignContent:"center"
              } }
                onSubmit={handlSubmit}
                >
                <label htmlFor="objecttype">Object Type</label>
                <input 
                type="text"
                id="objecttype"
                name="objecttype"
                placeholder="Enter Object Type" 
                value={objecttype || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="objecttypedescription">Object Type Description</label>
                <input 
                type="text"
                id="objecttypedescription"
                name="objecttypedescription"
                placeholder="Enter Object Type Description" 
                value={objecttypedescription || " "}
                onChange={handleInputChange}
                />
                <label>Icon Upload: </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px" }}
              type="text"
              id="iconupload"
              name="iconupload"
              
              value={state.iconupload || ""}
              onChange={handleInputChange}
            />
            <div style={{ position: "relative" }}></div>
            <a
              href="https://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              icon file here
            </a>
          </div>


                <label>File Upload: </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px" }}
              type="text"
              id="fileupload"
              name="fileupload"
              
              value={state.fileupload || ""}
              onChange={handleInputChange}
            />
            <div style={{ position: "relative" }}></div>
            <a
              href="https://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Upload file here
            </a>

          </div>
                <input type="submit" value={objectid ? "update": "Save"}/>
                <Link to="/">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default AddEdit