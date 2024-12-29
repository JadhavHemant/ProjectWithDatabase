import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
  processissue:" ",
  codingissue:" ",
  resourceissue:" ",
  dataissue:" ",
  infrastructureissue:" ",
  modelissue:" ",
  performanceissue:" ",
  resolution:" "
};

const IssueAddEdit = () => {
    const [state,setState]= useState(initialState);
    

    const {processissue,codingissue,resourceissue,dataissue,infrastructureissue,modelissue,performanceissue,resolution}=state;
    
    const navigate=useNavigate();
    
    const {issueid}= useParams();
  

    useEffect(() => {
      if(issueid){
      axios.get(API.VIEW_ISSUE_API(issueid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[issueid])

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!processissue){
        toast.error("please provider value into each input field");
    }else{
        if(!issueid){
          axios.post(API.ADD_ISSUE_API,{
            processissue,codingissue,resourceissue,dataissue,infrastructureissue,modelissue,performanceissue,resolution
        }).then(()=>{
          setState({processissue:" ",
          codingissue:" ",
          resourceissue:" ",
          dataissue:" ",
          infrastructureissue:" ",
          modelissue:" ",
          performanceissue:" ",
          resolution:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("added successfully");
        }
        else{
          
          axios.put(API.UPDATE_ISSUE_API(issueid),{
            processissue,codingissue,resourceissue,dataissue,infrastructureissue,modelissue,performanceissue,resolution
        }).then(()=>{
          setState({processissue:" ",
          codingissue:" ",
          resourceissue:" ",
          dataissue:" ",
          infrastructureissue:" ",
          modelissue:" ",
          performanceissue:" ",
          resolution:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("update successfully");
        }
        setTimeout(()=> navigate("/issue"),500);
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
                <label htmlFor="processissue">Process Issue</label>
                <input 
                type="text"
                id="processissue"
                name="processissue"
                placeholder="Enter Process Issue" 
                value={processissue || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="codingissue">Coding Issue</label>
                <input 
                type="text"
                id="codingissue"
                name="codingissue"
                placeholder="Enter Coding Issue" 
                value={codingissue || " "}
                onChange={handleInputChange}
                />
                 <label htmlFor="resourceissue">Resource Issue</label>
                <input 
                type="text"
                id="resourceissue"
                name="resourceissue"
                placeholder="Enter Resource Issue" 
                value={resourceissue || " "}
                onChange={handleInputChange}
                />
                 <label htmlFor="dataissue">Data Issue</label>
                <input 
                type="text"
                id="dataissue"
                name="dataissue"
                placeholder="Enter dataissue" 
                value={dataissue || " "}
                onChange={handleInputChange}
                />
                 <label htmlFor="infrastructureissue">Infrastructure Issue</label>
                <input 
                type="text"
                id="infrastructureissue"
                name="infrastructureissue"
                placeholder="Enter infrastructure issue" 
                value={infrastructureissue || " "}
                onChange={handleInputChange}
                />
                 <label htmlFor="modelissue">Model Issue</label>
                <input 
                type="text"
                id="modelissue"
                name="modelissue"
                placeholder="Enter model issue" 
                value={modelissue || " "}
                onChange={handleInputChange}
                />
                 <label htmlFor="performanceissue">Performance Issue</label>
                <input 
                type="text"
                id="performanceissue"
                name="performanceissue"
                placeholder="Enter performance issue" 
                value={performanceissue || " "}
                onChange={handleInputChange}
                />
              
                 <label htmlFor="codingissue">Resolution</label>
                <input 
                type="text"
                id="resolution"
                name="resolution"
                placeholder="Enter resolution" 
                value={resolution || " "}
                onChange={handleInputChange}
                />
                

               
          
                <input type="submit" value={issueid ? "update": "Save"}/>
                <Link to="/issue">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default IssueAddEdit
