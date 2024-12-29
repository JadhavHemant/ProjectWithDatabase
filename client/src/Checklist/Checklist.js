// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import Header from "../pages/header";
// import Footer from "../pages/footer";
// import * as API from '../endpoint';
// import axios from "axios";


// const Checklist = () => {
//   const location = useLocation();
//   const initialState = {
//     organization: "",
//     project: "",
//     projectcode: "",
//     responsibilitygroup: "",
//     responsibilitycenter: "",
//     objecttype: "",
//     object: "",
//     codename: "",
//     phase: "",
//     theme: "",
//     activitygroup: "",
//     activity: "",
//     expectedevidence: "",
//     remark: "",
//     percentagecompletion: "",
//     actualevidence: "",
//     status: "",
//     planstartdate: "",
//     planenddate: "",
//     actualstartdate: "",
//     actualenddate: "",
//     activitycode: "",
//     algorithminventoryid: null,
//   };
//   const navigate = useNavigate();
//   const { checklistid } = useParams();
//   // Extracting parameters from the URL
//   const searchParams = new URLSearchParams(location.search);
//   const organization = searchParams.get("organization");
//   const responsibilitycenter = searchParams.get("responsibilitycenter");
//   const responsibilitygroup = searchParams.get("responsibilitygroup");
//   const project = searchParams.get("project");
//   const projectcode = searchParams.get("projectcode");
//   const codename = searchParams.get("codename");
//   const objecttype = searchParams.get("objecttype");
//   const object = searchParams.get("object");
//   const theme = searchParams.get("theme");
//   const algorithminventoryid = searchParams.get("algorithminventoryid");
//   // State for the form input values

//   const [phaseName, setPhaseName] = useState([]);
//   const [state, setState] = useState(initialState);

//   const {
//     phase,
//     activitygroup,
//     activity,
//     expectedevidence,
//     remark,
//     percentagecompletion,
//     actualevidence,
//     status,
//     planstartdate,
//     planenddate,
//     actualstartdate,
//     actualenddate,
//     activitycode,
//   } = state;
//   useEffect(() => {
//     axios
//       .get(API.GET_PHASE_API)
//       .then((response) => {
//         setPhaseName(response.data);
//       })
//       .catch((error) => {
//         console.error("An error occurred while fetching Phase names:", error);
//       });

//     axios
//       .get(API.GET_CHECKLIST_API)
//       .then((response) => {
//         setState(response.data);
//       })
//       .catch((error) => {
//         console.error("An error occurred while fetching Phase names:", error);
//       });
//   });
//   // Function to handle changes in form fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     try {
//       setState({ ...state, [name]: value });
//     } catch (error) {
//       console.error("Error updating Checklist Details:", error);
//     }
//   };
//   // Function to handle changes in form fields for remaining parameters

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!project) {
//       toast.error("please provide the Input");
//     } else {
//       if (!checklistid) {
//         axios
//           .post(API.ADD_CHECKLIST_API, {
//             organization,
//             project,
//             projectcode,
//             responsibilitygroup,
//             responsibilitycenter,
//             objecttype,
//             object,
//             codename,
//             phase,
//             theme,
//             activitygroup,
//             activity,
//             expectedevidence,
//             remark,
//             percentagecompletion,
//             actualevidence,
//             status,
//             planstartdate,
//             planenddate,
//             actualstartdate,
//             actualenddate,
//             activitycode,
//             algorithminventoryid,
//           })
//           .then(() => {
//             setState({ initialState });
//           })
//           .catch((err) => toast.error(err.response.data));
//         toast.success("Project Added");
//       } else {
//         axios
//           .put(API.UPDATE_COMPANY_PROJECT(), {})
//           .then(() => {
//             setState(initialState);
//           })
//           .catch((err) => toast.error(err.response.data));
//         toast.success("Project Details Updated");
//       }
//       setTimeout(() => navigate(`/algorithminventory`), 500);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div>
//         {/* Master Section - Company and Project Details */}
//         <div
//           style={{
//             border: "3px solid #ccc",
//             padding: "5px",
//           }}
//         >
//           {/* Company Details */}
//           <div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr 1fr 1fr ",
//                 gap: "40px",
//               }}
//             >
//               <div>
//                 {" "}
//                 <p>
//                   <strong>Organization : </strong> {organization}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Responsibility Center : </strong>{" "}
//                   {responsibilitycenter}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Responsibility Group : </strong>
//                   {responsibilitygroup}''
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Object Type : </strong>
//                   {objecttype}
//                 </p>
//               </div>
//             </div>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr 1fr 1fr ",
//                 gap: "40px",
//               }}
//             >
//               <div>
//                 {" "}
//                 <p>
//                   <strong>Object : </strong> {object}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Project : </strong>
//                   {project}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Project Code : </strong>
//                   {projectcode}
//                 </p>
//               </div>
//               <div>
//                 <p>
//                   <strong>Code Name : </strong>
//                   {codename}
//                 </p>
//               </div>
//             </div>
//             {/* Vertical partition */}
//             <div
//               style={{
//                 width: "10px",
//                 background: "#ccc",
//                 alignContent: "end",
//               }}
//             ></div>
//             {/* Project Details */}
//           </div>
//         </div>
//         <div>
//           <div style={{ textAlign: "left", marginLeft: "3cm" }}>
//             <p>
//               <strong>Theme : </strong>
//               {theme}
//             </p>
//           </div>
//         </div>

//         <form
//           style={{
//             fontFamily: "Poppins",
//             margin: "auto",
//             padding: "5px",

//             alignContent: "center",
//           }}
//           onSubmit={handleSubmit}
//         >
//           <div
//             style={{
//               border: "3px solid #ccc",
//               padding: "5px",
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr 1fr 1fr ",
//               gap: "40px",
//             }}
//           >
//             {/* Add input boxes for the remaining parameters */}
//             <div>
//               {/* Input boxes for additional parameters */}
//               <label>Phase: </label>
//               <select
//                 id="phase"
//                 name="phase"
//                 type="text"
//                 value={state.phase || ""}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Phase Name</option>

//                 {phaseName.map((phase) => (
//                   <option key={phase.phaseid} value={phase.phasename}>
//                     {phase.phasename}
//                   </option>
//                 ))}
//               </select>

//               <label>
//                 Activity Group:
//                 <input
//                   id="activitygroup"
//                   name="activitygroup"
//                   type="text"
//                   value={state.activitygroup}
//                   onChange={handleInputChange}
//                 />
//               </label>

//               <label>
//                 Activity:
//                 <input
//                   name="activity"
//                   id="activity"
//                   type="text"
//                   value={state.activity}
//                   onChange={handleInputChange}
//                 />
//               </label>

//               <label>
//                 Expected Evidence:
//                 <input
//                   type="text"
//                   name="expectedevidence"
//                   id="expectedevidence"
//                   value={state.expectedevidence}
//                   onChange={handleInputChange}
//                 />
//               </label>
//             </div>
//             <div>
//               <label>
//                 Remark:
//                 <input
//                   name="remark"
//                   id="remark"
//                   type="text"
//                   value={state.remark}
//                   onChange={handleInputChange}
//                 />
//               </label>

//               <label>
//                 Percentage Completion:
//                 <input
//                   name="percentagecompletion"
//                   id="percentagecompletion"
//                   type="text"
//                   value={state.percentagecompletion}
//                   onChange={handleInputChange}
//                 />
//               </label>

//               <label>
//                 Actual Evidence:
//                 <input
//                   name="actualevidence"
//                   id="actualevidence"
//                   type="text"
//                   value={state.actualevidence}
//                   onChange={handleInputChange}
//                 />
//               </label>

//               <label>
//                 Status:
//                 <input
//                   name="status"
//                   id="status"
//                   type="text"
//                   value={state.status}
//                   onChange={handleInputChange}
//                 />
//               </label>
//             </div>
//             <div>
//               <label>Plan Start Date:</label>
//               <br></br>
//               <input
//                 style={{
//                   fontfamily: "Poppins",
//                   fontSize: "20px",
//                   margin: "6px",
//                   width: "200px",
//                   height: "40px",
//                 }}
//                 name="planstartdate"
//                 id="planstartdate"
//                 type="date"
//                 value={state.planstartdate}
//                 onChange={handleInputChange}
//               />

//               <br />
//               <br />

//               <label>
//                 Plan End Date:
//                 <br></br>
//                 <input
//                   style={{
//                     fontfamily: "Poppins",
//                     fontSize: "20px",
//                     margin: "6px",
//                     width: "200px",
//                     height: "40px",
//                   }}
//                   name="planenddate"
//                   id="planenddate"
//                   type="date"
//                   value={state.planenddate}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <br></br>
//               <br></br>
//               <label>
//                 Actual Start Date:
//                 <br></br>
//                 <input
//                   style={{
//                     fontfamily: "Poppins",
//                     fontSize: "20px",
//                     margin: "6px",
//                     width: "200px",
//                     height: "40px",
//                   }}
//                   name="actualstartdate"
//                   id="actualstartdate"
//                   type="date"
//                   value={state.actualstartdate}
//                   onChange={handleInputChange}
//                 />
//               </label>
//             </div>
//             <div>
//               <label>Actual End Date:</label>
//               <br></br>

//               <input
//                 style={{
//                   fontfamily: "Poppins",
//                   fontSize: "20px",
//                   margin: "6px",
//                   width: "200px",
//                   height: "40px",
//                 }}
//                 name="actualenddate"
//                 id="actualenddate"
//                 type="date"
//                 value={state.actualenddate}
//                 onChange={handleInputChange}
//               />
//               <br></br>
//               <br></br>
//               <label>
//                 Activity Code:
//                 <input
//                   name="activitycode"
//                   id="activitycode"
//                   type="text"
//                   value={state.activitycode}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <br></br>
//               <br></br>
//               <div>
//                 <input type="submit" value={checklistid ? "Update" : "Save"} />
//               </div>
//               {/* Repeat similar code for other parameters */}
//             </div>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Checklist;
