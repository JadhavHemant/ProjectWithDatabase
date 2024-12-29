import React ,{useState,useEffect} from 'react';
import {useNavigate,useParams ,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import './AlgorithmInventory.css'
import * as API from "../endpoint";

const initialState = {
    organization:" ", responsibilitygroup:" ", responsibilitycenter:" ",algorithminventorydate: null, project:" ",
    projectcode:" ",algorithminventorytime:" ",algorithm:" ", algorithmbias:null, algorithmremark:" ", dataset:" ",
    databias:null, dataremark:" ", codevulnerability:" ", codevulnerabilitybias:null, codevulnerabilityremark:" ", privacydata:" ",
    privacydatabias:null,privacydataremark:" ",algorithmtestoutputurl:" ",datasettestoutputurl:" ",codevulnerabilitytestoutputurl:" ",
    privacytestoutputurl:" ", datasetstatus:" ", algorithmstatus:" ", codevulnerabilitystatus:" ", privacydatastatus:" ",explanability:null,
    transparency:null,fairness:null,ethics:null,robustness:null,reliability:null,codename:" ",algorithmversionno:" ",datasetversionno:" ",
    codevulnerabilityversionno:" ",privacyversionno:" ",algorithmversiondate:" ",datasetversiondate:" ",codevulnerabilityversiondate:" ",
    privacyversiondate:" ",bias:null,security:null,robustnessremark:" ",explanabilityremark:" ",transparencyremark:" ",
    fairnessremark:" ",biasremark:" ",ethicsremark:" ",reliabilityremark:" ",securityremark:" ",performance:null, accountability:null, privacy:null,
    privacyremark:" ", performanceremark:" ",accountabilityremark:" ",assessmentremark:" ",assessmentfile:" ",assessmentdate:" ",
    auditremark:" ",auditfile: null,auditdate:" "
  }
const AlgorithmInventoryAddEdit = () => {

    const [state,setState]= useState(initialState);

    const[respGroup,setRespGroup]=useState([]);

    const[respCenter,setRespCenter]=useState([]);

    const [organizationComp,setOrganizationComp]=useState([]);

    const [projectalg,setProjecectAlg]=useState([]);  
        
    const [isReadOnly] = useState(false);
  
    const {organization,responsibilitygroup,responsibilitycenter,algorithminventorydate ,project,projectcode,algorithminventorytime,
      algorithm,algorithmbias,algorithmremark,algorithmbiasstatus, dataset, codevulnerability,
      codevulnerabilitybias, codevulnerabilityremark, databias,dataremark,privacydata,privacydatabias,
      privacydataremark,algorithmtestoutputurl,datasettestoutputurl,codevulnerabilitytestoutputurl,privacytestoutputurl,datasetstatus,
      algorithmstatus,codevulnerabilitystatus,privacydatastatus,explanability,transparency,fairness,ethics,robustness,reliability,
      codename,algorithmversionno,datasetversionno,codevulnerabilityversionno,privacyversionno,algorithmversiondate,datasetversiondate,
      codevulnerabilityversiondate,privacyversiondate,bias,security,robustnessremark,explanabilityremark,transparencyremark,
      fairnessremark,biasremark,ethicsremark,reliabilityremark,securityremark,performance,accountability,privacy,privacyremark,
      performanceremark,accountabilityremark,assessmentremark, assessmentfile, assessmentdate, auditremark, auditfile, auditdate}=state

    
  const navigate=useNavigate();
   
  const {algorithminventoryid}= useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for respGroup
        const respGroupData = await axios.get(API.GET_RESPONSIBILITYGROUP_API);
        setRespGroup(respGroupData.data);

        // Fetch data for respCenter
        const respCenterData = await axios.get(API.GET_RESPONSIBILITYCENTER_API);
        setRespCenter(respCenterData.data);

        // Fetch data for organizationComp
        const organizationCompData = await axios.get(API.GET_COMPANY_API);
        setOrganizationComp(organizationCompData.data);

        const projectalg = await axios.get(API.GET_PROJECT_API);
        setProjecectAlg(projectalg.data);

        // Fetch data for editing if algorithminventoryid is present
        if (algorithminventoryid) {
          const resp = await axios.get(API.VIEW_ALGORITHMINVENTORY_API(algorithminventoryid));
          setState({ ...resp.data[0] });
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching data');
      }
    };

    // if (props.location && props.location.state && props.location.state.algorithminventory) {
    //   const { algorithminventory } = props.location.state;
    //   setState((prevState) => ({
    //     ...prevState,
    //     algorithminventoryid: algorithminventory.algorithminventoryid,
    //     responsibilitygroup: algorithminventory.responsibilitygroup,
    //     responsibilitycenter: algorithminventory.responsibilitycenter,
    //     algorithminventorydate: algorithminventory.algorithminventorydate,
    //   }));
    // }
    fetchData();
  }, [algorithminventoryid])

  const handleAdditionalFieldsClick = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  
  const handlSubmit = (e) => {
        e.preventDefault();
        if (!organization ){
        toast.error("please provider value into each input field");
    }else{
        if(!algorithminventoryid){
          axios.post(API.ADD_ALGORITHMINVENTORY_API,{
            organization,responsibilitygroup,responsibilitycenter,algorithminventorydate, project, projectcode,algorithminventorytime,algorithm,
            algorithmbias,algorithmremark,algorithmbiasstatus,dataset,databias,dataremark,codevulnerability,codevulnerabilitybias, codevulnerabilityremark,  
            privacydata,privacydatabias,privacydataremark,algorithmtestoutputurl,datasettestoutputurl,codevulnerabilitytestoutputurl,
             privacytestoutputurl,datasetstatus,algorithmstatus,codevulnerabilitystatus, privacydatastatus,explanability,fairness,ethics,reliability,
             codename,algorithmversionno,datasetversionno,codevulnerabilityversionno,algorithmversiondate,codevulnerabilityversiondate,privacyversiondate,bias,security,
             robustnessremark,explanabilityremark,transparencyremark,fairnessremark,biasremark,ethicsremark,reliabilityremark,securityremark,performance,accountability,privacy,
             privacyremark,performanceremark,accountabilityremark,assessmentremark, assessmentfile, assessmentdate, auditremark, auditfile, auditdate 
        }).then(()=>{
            setState({organization:" ",responsibilitygroup:" ",responsibilitycenter:" ",algorithminventorydate:" ",algorithminventorytime:" ",project:" ",projectcode:" "
            ,algorithm:" ",algorithmbias:"",algorithmremark:" ",algorithmbiasstatus:" " , dataset:" ",databias:" ", dataremark:" ", codevulnerability:" ",
            codevulnerabilitybias:" ", codevulnerabilityremark:" ",privacydata:" ",privacydatabias:" ", privacydataremark:" ",algorithmtestoutputurl:" ",
            datasettestoutputurl:" ",codevulnerabilitytestoutputurl:" ",privacytestoutputurl:"",datasetstatus:" ",algorithmstatus:" ",codevulnerabilitystatus:" ",privacydatastatus:" ",
            explanability:" ",transparency:" ",fairness:" " ,ethics:" ",robustness:" ",reliability:" ",codename:" ",algorithmversionno:" ",datasetversionno:" ",
            codevulnerabilityversionno:" ",privacyversionno:" ",algorithmversiondate:" ",datasetversiondate:" ",bias:" ",security:" ",
            codevulnerabilityversiondate:" ",privacyversiondate:" ",robustnessremark:" ",explanabilityremark:" ",transparencyremark:" ",
            fairnessremark:" ",biasremark:" ",ethicsremark:" ",reliabilityremark:" ",securityremark:" ",performance:" ",accountability:" ",privacy:" ",privacyremark:" ",
            performanceremark:" ",accountabilityremark:" ", assessmentremark: "",assessmentfile: "",assessmentdate: "",
            auditremark:" ",auditfile:" ", auditdate:" "
        })
    }).catch((err)=>toast.error(err.response.data));
    toast.success(" added successfully");
    }
    else{  
      axios.put(API.UPDATE_ALGORITHMINVENTORY_API(algorithminventoryid),{
        organization,responsibilitygroup,responsibilitycenter,algorithminventorydate, project, projectcode,algorithminventorytime,algorithm,
        algorithmbias,algorithmremark,algorithmbiasstatus,dataset,databias,dataremark,codevulnerability,codevulnerabilitybias, codevulnerabilityremark,  
        privacydata,privacydatabias,privacydataremark,algorithmtestoutputurl,datasettestoutputurl,codevulnerabilitytestoutputurl,
         privacytestoutputurl,datasetstatus,algorithmstatus,codevulnerabilitystatus, privacydatastatus,explanability,transparency,fairness,ethics,robustness,
         reliability,codename,algorithmversionno,datasetversionno,codevulnerabilityversionno,privacyversionno,algorithmversiondate,
         datasetversiondate,codevulnerabilityversiondate,privacyversiondate,bias,security,robustnessremark,explanabilityremark,performance,accountability,privacy,
         privacyremark,performanceremark,accountabilityremark,assessmentremark, assessmentfile, assessmentdate, auditremark, auditfile,auditdate 

    }).then(()=>{
        setState({organization:" ",responsibilitygroup:" ",responsibilitycenter:" ",algorithminventorytime:" ",project:" ",projectcode:" ",algorithmremark:" ",
        algorithm:" ",algorithmbias:"",algorithmbiasstatus:" ", dataset:" ", databias:" ", dataremark:" ",codevulnerability:" ",
        codevulnerabilitybias:" ",codevulnerabilityremark:" ",privacydata:" ",privacydatabias:" ", privacydataremark:" ",algorithmtestoutputurl:" ",
        datasettestoutputurl:" ",codevulnerabilitytestoutputurl:" ",privacytestoutputurl:" ",datasetstatus:" ",algorithmstatus:" ",codevulnerabilitystatus:" ",privacydatastatus:" ",
        explanability1:" ",transparency:" ",ethics:" ",fairness:" ",robustness:" ",reliability:" ",codename:" ",algorithmversionno:" ",datasetversionno:" ",
        codevulnerabilityversionno:" ",privacyversionno:" ",algorithmversiondate,datasetversiondate:" ",codevulnerabilityversiondate:" ",privacyversiondate:" ",bias:" ",
        security:" ",robustnessremark:" ",explanabilityremark:" ",transparencyremark:" ",fairnessremark:" ",biasremark:" ",ethicsremark:" ",reliabilityremark:" ",
        securityremark:" ",performance:" ",accountability:" ",privacy:" ",privacyremark:" ",performanceremark:" ",accountabilityremark:" ",
        assessmentremark:" ",assessmentfile:" ",assessmentdate:" ",auditremark:" ",auditfile:" ", auditdate:" ",
    })
}).catch((err)=>toast.error(err.response.data));
toast.success("Risk update successfully");
}
setTimeout(()=> navigate("/algorithminventory"),500);
}}; 

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({...state,[name]:value})
}
  return (
    <div>
         <form onSubmit={handlSubmit}>  
     <center><h1  style={{ marginTop: "1%"}}><label htmlFor="objecttype">Algorithm Inventory</label></h1></center>
     <hr></hr>
     
      <div  
      
        style={{
          marginRight:"50px",
          marginLeft:"50px",
          marginBottom:"5px",
          marginTop: "2px" ,
          padding:"0px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "10px",}}
          >    

<div>
          <label>Organization:</label>
          <select
            style={{ fontFamily: "Poppins" }}
            id="organization"
            name="organization"
            value={organization || ""}
            onChange={handleInputChange}
          >
            <option value="">Organization </option>
            {organizationComp.map((comp) => (
              <option key={comp.companyid} value={comp.companyname}>
                {comp.companyname}
              </option>
            ))}
          </select>
          <br />
            </div>
        <div>
          <label> Responsibilty Group:</label>
          <select
            style={{ fontFamily: "Poppins" }}
            id="responsibilitygroup"
            name="responsibilitygroup"
            value={responsibilitygroup || ""}
            onChange={handleInputChange}
          >
            <option value="">Responsibilty Group</option>
            {respGroup.map((respgroup) => (
              <option key={respgroup.responsibilityid} value={respgroup.responsibilitytype}>
                {respgroup.responsibilitytype}
              </option>
            ))}
          </select>
          <br />
            </div><div>
          <label> Responsibilty Center:</label>
          <select
            style={{ fontFamily: "Poppins" }}
            id="responsibilitycenter"
            name="responsibilitycenter"
            value={responsibilitycenter || ""}
            onChange={handleInputChange}
          >
            <option value="">Responsibilty Center</option>
            {respCenter.map((respcenter) => (
              <option key={respcenter.responsibilitynameid} value={respcenter.responsibilitytype}>
                {respcenter.responsibilitytype}
              </option>
            ))}
          </select>
          <br />
            </div>
          
            <div>
          <label>Project:</label>
          <select
            style={{ fontFamily: "Poppins" }}
            id="project"
            name="project"
            value={project || ""}
            onChange={handleInputChange}
          >
            <option value="">Project </option>
            {projectalg.map((proj) => (
              <option key={proj.projectid} value={proj.projectname}>
                {proj.projectname}
              </option>
            ))}
          </select>
          <br />
            </div>
        <div>
          <label>Project Code:</label>
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="projectcode"
            name="projectcode"
            placeholder="Enter the Project Code"
            value={projectcode || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <br></br>
          <input
            style={{ fontFamily: "Poppins",
            margintop:"1px" ,
            fontSize: "16px", 
            margin:"6px",
              width: "200px", 
              height:"40px",
              
          }}
            type="date"
            id="algorithminventorydate"
            name="algorithminventorydate"
            placeholder="Enter the Algorithm Inventory Date"
            value={algorithminventorydate }
            onChange={handleInputChange}
          />
        </div> 
        <div>
          <label>Time:</label><br></br>
          <input
            style={{ fontFamily: "Poppins",
            margintop:"1px" ,
            marginLeft:"1px",
            fontSize: "16px", 
            margin:"6px",
              width: "200px", 
              height:"40px",
              
          }}
            type="time"
            id="algorithminventorytime"
            name="algorithminventorytime"
            placeholder="Enter the time"
            value={algorithminventorytime || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Code Name:</label>
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="codename"
            name="codename"
            placeholder="Enter the Code Name"
            value={codename || ""}
            onChange={handleInputChange}
          />
        </div>

        </div>      
        <div className="box-container">
         
        <div class="box1"    
      style={{
        marginRight:"5px",
        marginLeft:"50px",
        marginBottom:"5px",
        marginTop: "2px" ,
        padding:"0px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr ",
        gap: "10px",}}
        >  
          <h3 style={{ gridColumn: "span 3", textAlign: "center", marginTop: "2px" , marginBottom:"2px", }}>Algorithm</h3>
        <div>
        <label style={{marginLeft:"20px",}}>Algorithm File: </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px",marginLeft:"10px" }}
             type="text"
              id="algorithm"
              name="algorithm"
              
              value={state.algorithm || ""}
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
        </div>
           <div><button className="btn btn-contact" style={{marginTop:"30px",width:"150px", marginLeft:"20px",}}>Test</button></div>
        
           <div>
      <label htmlFor="algorithmbias">Algorithm Bias:</label>
      <select
      style={{maxWidth:"90%"}}
        id="algorithmbias"
        name="algorithmbias"
        value={algorithmbias}
        onChange={handleInputChange} >
        <option value="" >Select</option>
        <option value="1">Very Low</option>
        <option value="2">Low</option>
        <option value="3">Medium</option>
        <option value="4">High</option>
        <option value="5">Very High</option>
      </select>
    </div>
    <div>      
          <label htmlFor="algorithmstatus" style={{marginLeft:"20px"}}>Algorithm Status:</label>
          <select
          style={{maxWidth:"90%",marginLeft:"10px"}}
            id="algorithmstatus"
            name="algorithmstatus"
            value={algorithmstatus}
            onChange={handleInputChange}
          >

            <option value="">status</option>
            <option value="Open">Open</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Closed">Closed</option>
            <option value="Packed">Parked</option>
            <option value="Aborted">Aborted</option>
          </select>
        </div> 

        <div>
          <label style={{marginLeft:"10px",}}>Algorithm Version No:</label>
          <input
            style={{ fontFamily: "Poppins" ,marginLeft:"10px" }}
            type="text"
            id="algorithmversionno"
            name="algorithmversionno"
            placeholder="Enter the algorithm version no"
            value={algorithmversionno || ""}
            onChange={handleInputChange}
          />
        </div>  

        <div>
          <label style={{marginLeft:"10px",}}>Algorithm Version Date:</label>
          <br></br>
          <input
            style={{ fontFamily: "Poppins",
            margintop:"1px" ,
            fontSize: "16px", 
            margin:"6px",
              width: "200px", 
              height:"40px",
              
          }}
            type="date"
            id="algorithmversiondate"
            name="algorithmversiondate"
            placeholder="Enter the Algorithm Inventory Date"
            value={algorithmversiondate }
            onChange={handleInputChange}
          />
        </div>   
        <div>
          <label style={{marginLeft:"10px",}}>Algorithm Test Output URL:</label>
          <input
            style={{ fontFamily: "Poppins" ,marginLeft:"10px" }}
            type="text"
            id="algorithmtestoutputurl"
            name="algorithmtestoutputurl"
            placeholder="Enter the algorithm test output url"
            value={algorithmtestoutputurl || ""}
            onChange={handleInputChange}
          />
        </div>     
        <div style={{ gridColumn: "span 2" }}>
          <label style={{marginLeft:"10px"}}>Algorithm Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins" ,  marginTop: "2px",marginLeft:"10px" ,width:"95%"}}
         id="algorithmremark"
          name="algorithmremark"
            placeholder="Enter algorithm remark"
           value={algorithmremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
  />
        </div>
       </div>
        <div class="box2"  style={{
        marginRight:"50px",
        marginLeft:"4px",
        marginBottom:"5px",
        marginTop: "2px" ,
        padding:"0px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr ",
        gap: "10px",}}
        > 
         <h3 style={{ gridColumn: "span 3", textAlign: "center", marginTop: "2px" , marginBottom:"2px", }}>DataSet</h3> 
         <div>
        <label style={{marginLeft:"20px",}}>Data Set File: </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px",marginLeft:"10px" }}
              type="text"
              id="dataset"
              name="dataset"
              
              value={state.dataset || ""}
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
        </div>
           <div><button className="btn btn-contact" style={{marginTop:"30px",width:"150px", marginLeft:"20px",}}>Test</button></div>
           <div>
      <label htmlFor="databias">Data Bias:</label>
      <select
      style={{maxWidth:"90%"}}
        id="databias"
        name="databias"
        value={databias}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="1">Very Low</option>
        <option value="2">Low</option>
        <option value="3">Medium</option>
        <option value="4">High</option>
        <option value="5">Very High</option>
      </select>
    </div>        
      
    <div>
      <label htmlFor="datasetstatus"style={{marginLeft:"20px"}}>Data Set Status:</label>
      <select
      style={{maxWidth:"90%",marginLeft:"10px"}}
        id="datasetstatus"
        name="datasetstatus"
        value={datasetstatus}
        onChange={handleInputChange}
      >
        <option value="">status</option>
        <option value="Open">Open</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Closed">Closed</option>
        <option value="Packed">Parked</option>
        <option value="Aborted">Aborted</option>
      </select>
    </div>
  

        <div>
          <label style={{marginLeft:"10px",}}>DataSet Version No:</label>
          <input
            style={{ fontFamily: "Poppins" ,marginLeft:"10px" }}
            type="text"
            id="datasetversionno"
            name="datasetversionno"
            placeholder="Enter the Data Set version no"
            value={datasetversionno || ""}
            onChange={handleInputChange}
          />
        </div>    
        <div>
          <label style={{marginLeft:"10px",}}>DataSet Version Date:</label>
          <br></br>
          <input
            style={{ fontFamily: "Poppins",
            margintop:"1px" ,
            fontSize: "16px", 
            margin:"6px",
              width: "200px", 
              height:"40px",
              
          }}
            type="date"
            id="datasetversiondate"
            name="datasetversiondate"
            placeholder="Enter the data set version date"
            value={datasetversiondate }
            onChange={handleInputChange}
          />
        </div>  

        <div>
          <label style={{marginLeft:"10px"}}>DataSet Test Output URL:</label>
          <input
            style={{ fontFamily: "Poppins" ,marginLeft:"10px" }}
            type="text"
            id="datasettestoutputurl"
            name="datasettestoutputurl"
            placeholder="Enter the dataset test output url"
            value={datasettestoutputurl || ""}
            onChange={handleInputChange}
          />
        </div> 

        <div style={{ gridColumn: "span 2" }}>
          <label style={{marginLeft:"10px"}}>Data Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins", marginTop: "4px", marginLeft: "10px", width: "95%" }}
         id="dataremark"
          name="dataremark"
            placeholder="Enter data remark"
           value={dataremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>
       </div>
       </div>
       <div className="box-container">
        <div class="box3"    
      style={{
        marginRight:"5px",
        marginLeft:"50px",
        marginBottom:"5px",
        marginTop: "2px" ,
        padding:"0px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr ",
        gap: "10px",}}
        > 
         <h3 style={{ gridColumn: "span 3", textAlign: "center", marginTop: "2px" , marginBottom:"2px", }}>Code Vulnerability</h3> 
        <div>
        <label style={{marginLeft:"20px",}}>Code Vulnerability File: </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px",marginLeft:"10px" }}
              type="text"
              id="codevulnerability"
              name="codevulnerability"
              
              value={state.algorithm || ""}
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
        </div>
           <div><button className="btn btn-contact" style={{marginTop:"30px",width:"150px", marginLeft:"20px",}}>Test</button></div>
           <div>
      <label htmlFor="codevulnerabilitybias">Code Vulnerability Bias:</label>
      <select
      style={{maxWidth:"90%"}}
        id="codevulnerabilitybias"
        name="codevulnerabilitybias"
        value={codevulnerabilitybias}
        onChange={handleInputChange}
      >
        <option value="">Select</option>  <option value="1">Very Low</option> <option value="2">Low</option>
        <option value="3">Medium</option>  <option value="4">High</option>  <option value="5">Very High</option>
      </select>
    </div>
    <div>   
          <label htmlFor="codevulnerabilitystatus" style={{marginLeft:"20px"}}>Code Vulnerability Status:</label>
          <select
          style={{maxWidth:"90%",marginLeft:"10px"}}
            id="codevulnerabilitystatus"
            name="codevulnerabilitystatus"
            value={codevulnerabilitystatus}
            onChange={handleInputChange}
          >
            <option value="">status</option>
            <option value="Open">Open</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Closed">Closed</option>
            <option value="Packed">Parked</option>
            <option value="Aborted">Aborted</option>
          </select>
        </div>
        <div>
          <label style={{marginLeft:"10px",}}>Code Vulnerability Version No:</label>
          <input
            style={{ fontFamily: "Poppins" ,marginLeft:"10px" }}
            type="text"
            id="codevulnerabilityversionno"
            name="codevulnerabilityversionno"
            placeholder="Enter the code vulnerability version no"
            value={codevulnerabilityversionno || ""}
            onChange={handleInputChange}
          />
          </div>
          <div>
          <label style={{marginLeft:"10px",}}>Code Vulnerability Version Date:</label>
          <br></br>
          <input
            style={{ fontFamily: "Poppins",
            margintop:"1px" ,
            fontSize: "16px", 
            margin:"6px",
              width: "200px", 
              height:"40px",
              
          }}
            type="date"
            id="codevulnerabilityversiondate"
            name="codevulnerabilityversiondate"
            placeholder="Enter the Code Vulnerability Version Date"
            value={codevulnerabilityversiondate }
            onChange={handleInputChange}
          />
        </div>  

            <div>
          <label  style={{marginLeft:"10px"}}>Code Vulnerability Test Output URL:</label>
          <input
            style={{ fontFamily: "Poppins" ,marginLeft:"10px"}}
            type="text"
            id="codevulnerabilitytestoutputurl"
            name="codevulnerabilitytestoutputurl"
            placeholder="Enter the code vulnerability test output url"
            value={codevulnerabilitytestoutputurl || ""}
            onChange={handleInputChange}
          />
        </div>
 

        <div style={{ gridColumn: "span 2" }} >
          <label style={{marginLeft:"10px"}}>Code Vulnerability Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{fontFamily: "Poppins", marginTop: "4px", marginLeft: "10px", width: "95%" }}
         id="codevulnerabilityremark"
          name="codevulnerabilityremark"
            placeholder="Enter data code vulnerability remark"
           value={codevulnerabilityremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>
         </div>
         <div class="box4"
  style={{
    marginRight: "50px",
    marginLeft: "5px",
    marginBottom: "5px",
    marginTop: "2px",
    padding: "0px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
  }}
>
<h3 style={{ gridColumn: "span 3", textAlign: "center", marginTop: "2px" , marginBottom:"2px", }}>Privacy Data</h3>
  <div>
    <label style={{ marginLeft: "20px" }}>Privacy Data File: </label>
    <div style={{ display: "flex", alignItems: "center" }}>
      <br />
      <input
        style={{
          fontFamily: "Poppins",
          marginRight: "10px",
          marginLeft: "10px",
          width: "150px",
        }}
        type="text"
        id="privacydata"
        name="privacydata"
        value={state.dataset || ""}
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
  </div>
  <div>
    <button
      className="btn btn-contact"
      style={{ marginTop: "30px", width: "150px", marginLeft: "12px" }}
    >
      Test
    </button>
  </div>
  <div>
    <label htmlFor="privacydatabias">Privacy Data Bias:</label>
    <select
    style={{maxWidth:"90%"}}
      id="privacydatabias"
      name="privacydatabias"
      value={privacydatabias}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>
  <div>
          
          <label htmlFor="privacydatastatus"style={{marginLeft:"20px"}}>Privacy Data Status:</label>
          <select
          style={{maxWidth:"90%",marginLeft:"10px"}}
            id="privacydatastatus"
            name="privacydatastatus"
            value={privacydatastatus}
            onChange={handleInputChange}
          >
            <option value="">status</option>
            <option value="Open">Open</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Closed">Closed</option>
            <option value="Packed">Parked</option>
            <option value="Aborted">Aborted</option>
          </select>
        </div>     
        <div>
          <label style={{marginLeft:"10px",}}>Privacy Version No:</label>
          <input
            style={{ fontFamily: "Poppins" ,marginLeft:"10px" }}
            type="text"
            id="privacyversionno"
            name="privacyversionno"
            placeholder="Enter the Privacy version no"
            value={privacyversionno || ""}
            onChange={handleInputChange}
          />
        </div> 
        <div>
          <label style={{marginLeft:"10px",}}>Privacy Version Date:</label>
          <br></br>
          <input
            style={{ fontFamily: "Poppins",
            margintop:"1px" ,
            fontSize: "16px", 
            margin:"6px",
              width: "200px", 
              height:"40px",
              
          }}
            type="date"
            id="privacyversiondate"
            name="privacyversiondate"
            placeholder="Enter the privacy version date"
            value={privacyversiondate }
            onChange={handleInputChange}
          />
        </div> 

         <div>
          <label style={{marginLeft:"10px"}}>Privacy Test Output URL:</label>
          <input
            style={{ fontFamily: "Poppins",marginLeft:"10px" }}
            type="text"
            id="privacytestoutputurl"
            name="privacytestoutputurl"
            placeholder="Enter the privacytestoutputurl"
            value={privacytestoutputurl || ""}
            onChange={handleInputChange}
          />
        </div>    

  <div style={{ gridColumn: "span 2" }}>
    <label style={{ marginLeft: "10px" }}>Privacy Data Remark:</label>
    <textarea
      rows="3"
      cols="30"
      style={{ fontFamily: "Poppins", marginTop: "9px", marginLeft: "10px", width: "95%" }}
      id="privacydataremark"
      name="privacydataremark"
      placeholder="Enter the privacydata remark"
      value={privacydataremark}
      onChange={handleInputChange}
      disabled={isReadOnly}
    />
  </div>
</div>
    </div>
        <h4 style={{marginLeft:"50px", marginTop:"3px",marginBottom:"2px"}}>Trusted AI</h4>
        <div style={{
          marginRight:"50px",
          marginLeft:"50px",
          marginBottom:"5px",
          marginTop: "2px" ,
          padding:"0px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "10px",}}
          >
      
  <div>
    <label htmlFor="privacydatabias">Reliability:</label>
    <select
      id="reliability"
      name="reliability"
      value={reliability}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div> 

  <div>
    <label htmlFor="privacy">Privacy:</label>
    <select
      id="privacy"
      name="privacy"
      value={privacy}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>

  <div>
    <label htmlFor="bias"> Bias:</label>
    <select
      id="bias"
      name="bias"
      value={bias}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>
  <div>
    <label htmlFor="security">Security:</label>
    <select
      id="security"
      name="security"
      value={security}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>
  <div>
    <label htmlFor="performance">Performance:</label>
    <select
      id="performance"
      name="performance"
      value={performance}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>

  <div>
    <label htmlFor="privacydatabias">Robustness:</label>
    <select
      id="robustness"
      name="robustness"
      value={robustness}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>
  <div>
        <label style={{marginLeft:"10px"}}>Reliability Remark:</label>
        <br></br>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins"}}
         id="reliabilityremark"
          name="reliabilityremark"
            placeholder="Enter reliabilityremark"
           value={reliabilityremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
    </div>
    <div >
          <label style={{marginLeft:"10px"}}>Privacy Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins"}}
         id="privacyremark"
          name="privacyremark"
            placeholder="Enter privacy remark"
           value={privacyremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>
       
        <div >
          <label style={{marginLeft:"10px"}}>Bias Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins" }}
         id="biasremark"
          name="biasremark"
            placeholder="Enter bias remark"
           value={biasremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>
        <div>
          <label style={{marginLeft:"10px"}}>Security Remark:</label>
         
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins"}}
         id="securityremark"
          name="securityremark"
            placeholder="Enter security remark"
           value={securityremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>
        <div>
          <label style={{marginLeft:"10px"}}>Performance Remark:</label>
         
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins"}}
         id="performanceremark"
          name="performanceremark"
            placeholder="Enter performance remark"
           value={performanceremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>
        <div >
          <label style={{marginLeft:"10px"}}>Robustness Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins"}}
         id="robustnessremark"
          name="robustnessremark"
            placeholder="Enter robustness remark"
           value={robustnessremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>

        </div>
        <h4 style={{marginLeft:"50px", marginTop:"3px",marginBottom:"2px"}}>Responsible AI</h4>
        <div style={{
          marginRight:"50px",
          marginLeft:"50px",
          marginBottom:"5px",
          marginTop: "2px" ,
          padding:"0px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "10px",}}
          >
  <div>

    <label htmlFor="privacydatabias">Transparency:</label>
    <select
      id="transparency"
      name="transparency"
      value={transparency}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>
  <div>
    <label htmlFor="fairness">Fairness:</label>
    <select
      id="fairness"
      name="fairness"
      value={fairness}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>
  <div>
    <label htmlFor="accountability">Accountability:</label>
    <select
      id="accountability"
      name="accountability"
      value={accountability}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>
  <div>
    <label htmlFor="privacydatabias">Ethics:</label>
    <select
      id="ethics"
      name="ethics"
      value={ethics}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>
  <div>
    <label htmlFor="Explanability">Explanability:</label>
    <select
      id="explanability"
      name="explanability"
      value={explanability}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      <option value="1">Very Low</option>
      <option value="2">Low</option>
      <option value="3">Medium</option>
      <option value="4">High</option>
      <option value="5">Very High</option>
    </select>
  </div>

  {/* <div>
          <Link
          to={{pathname:"/assessmentaudit",state:{algorithminventory:state},}}><button  style={{marginTop:"10%" , height:" 50px" ,color:"white" ,border:"none", backgroundColor:"#3386ff"}}
             >
              Go to Assessment Audit
            </button></Link> 
          </div> */}
       
        {/* <div>
        <label htmlFor="security">Mean</label>
        <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="projectcode"
            name="projectcode"
            placeholder="Enter the Project Code"
            value={projectcode || ""}
            onChange={handleInputChange}
          />
        </div> */}
        </div>
        <div style={{
          marginRight:"50px",
          marginLeft:"50px",
          marginBottom:"5px",
          marginTop: "2px" ,
          padding:"0px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "10px",}}
          >


        <div>
          <label >Transparency Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins" }}
         id="transparencyremark"
          name="transparencyremark"
            placeholder="Enter transparency remark"
           value={transparencyremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>

        <div>
          <label style={{marginLeft:"10px"}}>Fairness Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins" }}
         id="fairnessremark"
          name="fairnessremark"
            placeholder="Enter fairness remark"
           value={fairnessremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>

        <div>
          <label style={{marginLeft:"10px"}}>Accountability Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins" }}
         id="accountabilityremark"
          name="accountabilityremark"
            placeholder="Enter accountability remark"
           value={accountabilityremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>
       
        <div>
          <label style={{marginLeft:"10px"}}>Ethics Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins"}}
         id="ethicsremark"
          name="ethicsremark"
            placeholder="Enter ethic sremark "
           value={ethicsremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div> 

        <div>
          <label style={{marginLeft:"10px"}}>Explanability Remark:</label>
          <textarea
          rows="3"
          cols="30"
            style={{ fontFamily: "Poppins" }}
         id="explanabilityremark"
          name="explanabilityremark"
            placeholder="Enter explanability remark"
           value={explanabilityremark}
            onChange={handleInputChange}
           disabled={isReadOnly}
         />
        </div>
         </div> 

         <center><h1>Assessment Audit</h1></center>
            <div style={{ marginRight:"50px",
          marginLeft:"50px",
          marginBottom:"5px",
          marginTop: "2px" ,}}>
          <label>Show Additional Fields</label>
          <button type="button" onClick={handleAdditionalFieldsClick}>
            {showAdditionalFields ? '-' : '+'}
          </button>
        </div>
        {showAdditionalFields && (
 
    <center>
    <table className="styled-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Remark</th>
          <th>Date</th>
          <th>File Upload</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h3>Assessment</h3>
          </td>
          <td>
            <div>
              <textarea
                rows="3"
                cols="30"
                style={{ fontFamily: "Poppins" }}
                id="assessmentremark"
                name="assessmentremark"
                placeholder="Enter Assessment Remark"
                value={assessmentremark}
                onChange={(e) => handleInputChange(e)}
                disabled={isReadOnly}
              />
            </div>
          </td>
          <td>
            <div>
              <label>Date:</label>
              <br />
              <input
                style={{ width: "150px", height: "30px" }}
                type="date"
                id="assessmentdate"
                name="assessmentdate"
                placeholder="Enter the assessmentDate"
                value={assessmentdate}
                onChange={handleInputChange}
              />
            </div>
          </td>
          <td>
            <div style={{ display: "flex", alignItems: "center" }}>
              <br />
              <input
                style={{
                  fontFamily: "Poppins",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
                type="text"
                id="assessmentfile"
                name="assessmentfile"
                value={assessmentfile}
                onChange={(e) => handleInputChange(e)}
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
          </td>
        </tr>
        <tr>
          <td>
            <h3>Audit</h3>
          </td>
          <td>
            <div>
              <textarea
                rows="3"
                cols="30"
                style={{ fontFamily: "Poppins" }}
                id="auditremark"
                name="auditremark"
                placeholder="Enter Audit Remark"
                value={auditremark}
                onChange={(e) => handleInputChange(e)}
                disabled={isReadOnly}
              />
            </div>
          </td>
          <td>
            <div>
              <label>Date:</label>
              <br />
              <input
                style={{ width: "150px", height: "30px" }}
                type="date"
                id="auditdate"
                name="auditdate"
                placeholder="Enter the auditDate"
                value={auditdate}
                onChange={handleInputChange}
              />
            </div>
          </td>
          <td>
            <div style={{ display: "flex", alignItems: "center" }}>
              <br />
              <input
                style={{
                  fontFamily: "Poppins",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
                type="text"
                id="auditfile"
                name="auditfile"
                value={auditfile}
                onChange={(e) => handleInputChange(e)}
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
          </td>
        </tr>
      </tbody>
    </table>
    </center>
  
)}
                        
   <center><div style={{width:"30%", marginTop:"20px"}}>
    <input type="submit" value={algorithminventoryid ? "update": "Save" }/>
                <Link to="/algorithminventory"> </Link>
                </div></center>
    </form>
    </div>
  )
}
export default AlgorithmInventoryAddEdit