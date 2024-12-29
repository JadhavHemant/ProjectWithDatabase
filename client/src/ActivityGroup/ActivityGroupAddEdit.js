import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
    groupactivity:" ",
    theme:" ",
    phase:" ",
  };

const ActivityGroupAddEdit = () => {
    const [state,setState]= useState(initialState);
    console.log(API.GET_ACTIVITYGROUP_API)

    const {groupactivity,theme,phase}=state;
    
    const navigate=useNavigate();
    
    const {activitygroupid}= useParams();

    const [grouptheme, setThemeName] = useState([]);

    const [isReadOnly] = useState(false);
  

    useEffect(() => {
        if (activitygroupid) {
          axios.get(API.VIEW_ACTIVITYGROUP_API(activitygroupid))
            .then((resp) => setState({ ...resp.data[0] }))
            .catch((error) => console.error("Error fetching activity group:", error));
        }
      
        axios.get(API.GET_THEMEMASTER_API)
          .then((response) => {
            if (Array.isArray(response.data)) {
              setThemeName(response.data);
            } else {
              console.error("Invalid response for theme data:", response.data);
            }
          })
          .catch((error) => console.error("Error fetching theme data:", error));
      
      }, [activitygroupid])
      
      

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!groupactivity){
        toast.error("please provider value into each input field");
    }else{
        if(!activitygroupid){
          axios.post(API.ADD_ACTIVITYGROUP_API,{
            groupactivity,theme,phase
        }).then(()=>{
          setState({groupactivity:" ",
          theme:" ",
          phase:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("activity group successfully");
        }
        else{
          
          axios.put(API.UPDATE_ACTIVITYGROUP_API(activitygroupid),{
            groupactivity,theme,phase
        }).then(()=>{
          setState({groupactivity:" ",
          theme:" ",
          phase:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("activity group update successfully");
        }
        setTimeout(()=> navigate("/activitygroup"),500);
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
                <label htmlFor="groupactivity">Group Activity</label>
                <input 
                type="text"
                id="groupactivity"
                name="groupactivity"
                placeholder="Entergroupactivity" 
                value={groupactivity || " "}
                onChange={handleInputChange}
                />
                 <div>
            <label>Theme:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="theme"
              name="theme"
              value={theme || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Theme Name</option>
              {grouptheme.map((tname) => (
                <option
                  key={tname.thememasterid}
                  value={tname.themename}
                >
                  {tname.themename}
                </option>
              ))}
            </select>
            <br />
          </div>
                <label htmlFor="phase">Phase</label>
                <input 
                type="text"
                id="phase"
                name="phase"
                placeholder="Enter phase" 
                value={phase || " "}
                onChange={handleInputChange}
                />
                
                <input type="submit" value={activitygroupid ? "update": "Save"}/>
                <Link to="/activitygroup">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default ActivityGroupAddEdit