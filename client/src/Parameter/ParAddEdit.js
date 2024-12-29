import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
    categorycode: "",
    parametercode: "",
    evidence: "",
    fileupload: "",
  };

const  ParAddEdit = () => {
    const [state,setState]= useState(initialState);

    const {categorycode,parametercode,evidence,fileupload}=state;
    
    const navigate=useNavigate();
    
    const {parameterid}= useParams();

    

    useEffect(() => {
      if(parameterid){
      axios.get(API.VIEW_PARAMETER_API(parameterid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[parameterid])

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!categorycode ){
        toast.error("please provider value into each input field");
    }else{
        if(!parameterid){
          axios.post(API.ADD_PARAMETER_API,{
        categorycode ,
        parametercode ,
        evidence ,
        fileupload,
        }).then(()=>{
          setState({categorycode:" " ,parametercode:" ",evidence:" ",fileupload:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Object added successfully");
        }
        else{
          axios.put(API.UPDATE_PARAMETER_API(parameterid),{
            categorycode ,
            parametercode ,
            evidence ,
            fileupload,
        }).then(()=>{
          setState({categorycode:" " ,parametercode:" ",evidence:" ",fileupload:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("parameter update successfully");
        }
        setTimeout(()=> navigate("/parameter"),500);
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
                    maxWidth: "600px",
                    alignContent:"center"
              } }
                onSubmit={handlSubmit}
                >
                
               <label htmlFor="categorycode">Category Code</label>
                <input 
                type="text"
                id="categorycode"
                name="categorycode"
                placeholder="Enter category code" 
                value={categorycode || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="parametercode">Parameter Code</label>
                <input 
                type="text"
                id="parametercode"
                name="parametercode"
                placeholder="parametercode" 
                value={ parametercode || " "}
                onChange={handleInputChange}
                />

          <label>Evidence Upload: </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px" }}
              type="text"
              id="evidence"
              name="evidence"
              
              value={state.evidence || ""}
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
          </div><label>File Upload: </label>
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
                <br></br>
                <input type="submit" value={parameterid ? "update": "Save"}/>
                <Link to="/parameter">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default ParAddEdit;