import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
    theme:" ",
    phase:" ",
    activitygroup:" ",
    activity:" "
  };

const ThemeActivityAddEdit = () => {
    const [state,setState]= useState(initialState);
    console.log(API.GET_THEMEACTIVITY_API)

    const {theme,phase,activitygroup,activity}=state;
    
    const navigate=useNavigate();
    
    const {themeactivityid}= useParams();

    const [grouptheme, setThemeName] = useState([]);

    const [phaseTheme, setPhaseActivity] = useState([]);

    const [activityGrp, setGroupActivity] = useState([]);

    const [isReadOnly] = useState(false);
  

    useEffect(() => {
        if (themeactivityid) {
          axios.get(API.VIEW_THEMEACTIVITY_API(themeactivityid))
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


          axios.get(API.GET_ACTIVITYGROUP_API)
          .then((response) => {
            if (Array.isArray(response.data)) {
                setPhaseActivity(response.data);
            } else {
              console.error("Invalid response for theme data:", response.data);
            }
          })
          .catch((error) => console.error("Error fetching theme data:", error));
      

          axios.get(API.GET_ACTIVITYGROUP_API)
          .then((response) => {
            if (Array.isArray(response.data)) {
                setGroupActivity(response.data);
            } else {
              console.error("Invalid response for theme data:", response.data);
            }
          })
          .catch((error) => console.error("Error fetching theme data:", error));

      }, [themeactivityid])
      
      

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!theme){
        toast.error("please provider value into each input field");
    }else{
        if(!themeactivityid){
          axios.post(API.ADD_THEMEACTIVITY_API,{
            theme,phase,activitygroup,activity
        }).then(()=>{
          setState({theme:" ",
          phase:" ",
          activitygroup:" ",
          activity:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("successfully");
        }
        else{
          
          axios.put(API.UPDATE_THEMEACTIVITY_API(themeactivityid),{
            theme,phase,activitygroup,activity
        }).then(()=>{
          setState({theme:" ",
          phase:" ",
          activitygroup:" ",
          activity:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("update successfully");
        }
        setTimeout(()=> navigate("/themeactivity"),500);
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


          <div>
            <label>Phase:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="phase"
              name="phase"
              value={phase || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Phase</option>
              {phaseTheme.map((phasetheme) => (
                <option
                  key={phasetheme.activitygroupid}
                  value={phasetheme.phase}
                >
                  {phasetheme.phase}
                </option>
              ))}
            </select>
            <br />
          </div>



          <div>
            <label>Activity Group:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="activitygroup"
              name="activitygroup"
              value={activitygroup || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Activity Group</option>
              {activityGrp.map((grpactivity) => (
                <option
                  key={grpactivity.activitygroupid}
                  value={grpactivity.groupactivity}
                >
                  {grpactivity.groupactivity}
                </option>
              ))}
            </select>
            <br />
          </div>




                <label htmlFor="phase">Activity</label>
                <input 
                type="text"
                id="activity"
                name="activity"
                placeholder="Enter activity" 
                value={activity || " "}
                onChange={handleInputChange}
                />
                
                <input type="submit" value={themeactivityid ? "update": "Save"}/>
                <Link to="/themeactivity">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default ThemeActivityAddEdit