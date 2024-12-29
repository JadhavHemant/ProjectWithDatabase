import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
    technologyname:" ",
    technologyversion:" "
  };

const TechnologyAddEdit = () => {
    const [state,setState]= useState(initialState);
    console.log(API.GET_TECHNOLOGY_API)

    const {technologyname,technologyversion}=state;
    
    const navigate=useNavigate();
    
    const {technologymasterid}= useParams();
  

    useEffect(() => {
      if(technologymasterid){
      axios.get(API.VIEW_TECHNOLOGY_API(technologymasterid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[technologymasterid])

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!technologyname){
        toast.error("please provider value into each input field");
    }else{
        if(!technologymasterid){
          axios.post(API.ADD_TECHNOLOGY_API,{
            technologyname,technologyversion
        }).then(()=>{
          setState({ technologyname:" ",
          technologyversion:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Object added successfully");
        }
        else{
          
          axios.put(API.UPDATE_TECHNOLOGY_API(technologymasterid),{
            technologyname,technologyversion
        }).then(()=>{
          setState({ technologyname:" ",
          technologyversion:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success(" update successfully");
        }
        setTimeout(()=> navigate("/technology"),500);
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
                <label htmlFor="technologyname">Technology Name</label>
                <input 
                type="text"
                id="technologyname"
                name="technologyname"
                placeholder="Enter technology name" 
                value={technologyname || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="technologyversion">Technology Version</label>
                <input 
                type="text"
                id="technologyversion"
                name="technologyversion"
                placeholder="Enter technology version" 
                value={technologyversion || " "}
                onChange={handleInputChange}
                />
                
                <input type="submit" value={technologymasterid ? "update": "Save"}/>
                <Link to="/technology">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default TechnologyAddEdit