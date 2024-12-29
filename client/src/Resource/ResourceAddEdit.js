import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
    resourcename:" ",
    designation:" ",
    status:" "
   
};

const ResourceAddEdit = () => {
    const [state,setState]= useState(initialState);
    console.log(API.GET_RESOURCE_API)

    const {resourcename,designation,status}=state;
    
    const navigate=useNavigate();
    
    const {resourceid}= useParams();
  

    useEffect(() => {
      if(resourceid){
      axios.get(API.VIEW_RESOURCE_API(resourceid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[resourceid])

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!resourcename){
        toast.error("please provider value into each input field");
    }else{
        if(!resourceid){
          axios.post(API.ADD_RESOURCE_API,{
            resourcename,designation,status
        }).then(()=>{
          setState({ resourcename:" ",
          designation:" ",
          status:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success(" added successfully");
        }
        else{
          
          axios.put(API.UPDATE_RESOURCE_API(resourceid),{
            resourcename,designation,status
        }).then(()=>{
          setState({ resourcename:" ",
          designation:" ",
          status:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success(" update successfully");
        }
        setTimeout(()=> navigate("/resource"),500);
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
                <label htmlFor="resourcename">Resource Name</label>
                <input 
                type="text"
                id="resourcename"
                name="resourcename"
                placeholder="Enter resource name" 
                value={resourcename || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="designation">Designation</label>
                <input 
                type="text"
                id="designation"
                name="designation"
                placeholder="Enter designation" 
                value={designation || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="designation">Status</label>
                <input 
                type="text"
                id="status"
                name="status"
                placeholder="Enter status" 
                value={status || " "}
                onChange={handleInputChange}
                />



          
                <input type="submit" value={resourceid ? "update": "Save"}/>
                <Link to="/resource">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default ResourceAddEdit