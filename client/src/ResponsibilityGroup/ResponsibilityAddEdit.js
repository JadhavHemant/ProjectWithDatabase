import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
    responsibilitytype:" ",
    responsibilitytypedescription:" ",
    iconupload:" ",
    fileupload:" ",
};

const ResponsibilityAddEdit   = () => {
    const [state,setState]= useState(initialState);
    // console.log(API.GET_RESPONSIBILITYGROUP_API)
    // console.log(API.VIEW_RESPONSIBILITYGROUP_API)

    const {responsibilitytype,responsibilitytypedescription,iconupload,fileupload}=state;
    
    const navigate=useNavigate();
    
    const {responsibilityid}= useParams();

    

    useEffect(() => {
      if(responsibilityid){
      axios.get(API.VIEW_RESPONSIBILITYGROUP_API(responsibilityid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[responsibilityid])

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!responsibilitytype|| !responsibilitytypedescription|| !iconupload|| !fileupload){
        toast.error("please provider value into each input field");
    }else{
        if(!responsibilityid){
          axios.post(API.ADD_RESPONSIBILITYGROUP_API,{
          responsibilitytype,
          responsibilitytypedescription,
          iconupload,
          fileupload,
        }).then(()=>{
          setState({responsibilitytype:" ",responsibilitytypedescription:" ",iconupload:" ",fileupload:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Object added successfully");
        }
        else{
          
          axios.put(API.UPDATE_RESPONSIBILITYGROUP_API(responsibilityid),{
          responsibilitytype,
          responsibilitytypedescription,
          iconupload,
          fileupload,
        }).then(()=>{
          setState({responsibilitytype:" ",responsibilitytypedescription:" ",iconupload:" ",fileupload:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Object update successfully");
        }
        setTimeout(()=> navigate("/res"),500);
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
                <label htmlFor="responsibilitytype">Responsibility Type</label>
                <input 
                type="text"
                id="responsibilitytype"
                name="responsibilitytype"
                placeholder="Enter Object Type" 
                value={responsibilitytype || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="responsibilitytypedescription">Responsibility Type Description</label>
                <input 
                type="text"
                id="responsibilitytypedescription"
                name="responsibilitytypedescription"
                placeholder="Enter Object Type Description" 
                value={responsibilitytypedescription || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="iconupload">Icon Upload</label>
                <input 
                type="text"
                id="iconupload" 
                name="iconupload"
                placeholder="Enter your Icon upload Link" 
                value={iconupload || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="fileupload">File Upload</label>
                <input 
                type="text"
                id="fileupload"
                name="fileupload"
                placeholder="Enter your file upload link" 
                value={fileupload || " "}
                onChange={handleInputChange}
                />
                <input type="submit" value={responsibilityid ? "update": "Save"}/>
                <Link to="/res">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default ResponsibilityAddEdit;