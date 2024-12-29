import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";

const initialState = {
    subcategorytype:" ",
    subcategorytypedescription:" ",
    iconupload:" ",
    fileupload:" ",
};
const SubCategoryAddEdit = () => {
    const [state,setState]= useState(initialState);

    const {subcategorytype,subcategorytypedescription,iconupload,fileupload}=state;
    
    const navigate=useNavigate();
    
    const {subcategoryid}= useParams();

    useEffect(() => {
      if(subcategoryid){
      axios.get(API.VIEW_SUBCATEGORY_API(subcategoryid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[subcategoryid])

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!subcategorytype){
        toast.error("please provider value into each input field");
    }else{
        if(!subcategoryid){
          axios.post(API.ADD_SUBCATEGORY_API,{
          subcategorytype,
          subcategorytypedescription,
          iconupload,
          fileupload,
        }).then(()=>{
          setState({subcategorytype:" ",subcategorytypedescription:" ",iconupload:" ",fileupload:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("SubCategory added successfully");
        }
        else{
          axios.put(API.ADD_OBJECTTYPE_API(subcategoryid),{
          subcategorytype,
          subcategorytypedescription,
          iconupload,
          fileupload,
        }).then(()=>{
          setState({subcategorytype:" ",subcategorytypedescription:" ",iconupload:" ",fileupload:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("SubCategory ate successfully");
        }
        setTimeout(()=> navigate("/sub"),500);
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
                <label htmlFor="subcategorytype">subcategory Type</label>
                <input 
                type="text"
                id="subcategorytype"
                name="subcategorytype"
                placeholder="Enter subcategory " 
                value={subcategorytype || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="subcategorytypedescription">subcategory Type Description</label>
                <input 
                type="text"
                id="subcategorytypedescription"
                name="subcategorytypedescription"
                placeholder="Enter Object Type Description" 
                value={subcategorytypedescription || " "}
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
              Icon file here
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
                <input type="submit" value={subcategoryid ? "update": "Save"}/>
                <Link to="/sub">
                    <input type="button" value="go back"/>
                </Link>
              </form>
     </div>
  )
}
export default SubCategoryAddEdit;