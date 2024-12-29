import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom"
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
   themecode:" ",
   themename:" "
};

const ThemeAddEdit = () => {
    const [state,setState]= useState(initialState);
    console.log(API.GET_OBJECTTYPE_API)

    const {themecode,themename}=state;
    
    const navigate=useNavigate();
    
    const {thememasterid}= useParams();
  

    useEffect(() => {
      if (thememasterid) {
        axios.get(API.VIEW_THEMEMASTER_API(thememasterid))
          .then((resp) => setState({ ...resp.data[0] }));
      }
    }, [thememasterid]);
    

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!themecode){
        toast.error("please provider value into each input field");
    }else{
        if(!thememasterid){
          axios.post(API.ADD_THEMEMASTER_API,{
            themecode,themename
        }).then(()=>{
          setState({ themecode:" ",
          themename:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("theme master added successfully");
        }
        else{
          
          axios.put(API.UPDATE_THEMEMASTER_API(thememasterid),{
            themecode,themename
        }).then(()=>{
          setState({ themecode:" ",
          themename:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Object update successfully");
        }
        setTimeout(()=> navigate("/thememaster"),500);
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
                <label htmlFor="themecode">Theme Code</label>
                <input 
                type="text"
                id="themecode"
                name="themecode"
                placeholder="Enter theme code" 
                value={themecode || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="themename">Theme Name</label>
                <input 
                type="text"
                id="themename"
                name="themename"
                placeholder="Enter themename" 
                value={themename || " "}
                onChange={handleInputChange}
                />
            
                <input type="submit" value={thememasterid ? "update": "Save"}/>
                <Link to="/thememaster">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default ThemeAddEdit