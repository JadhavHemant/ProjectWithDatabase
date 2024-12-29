import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./TableRisk.css";
import * as API from "../endpoint";

const initialState = {
  organization: " ",
  responsibilitygroup: " ",
  responsibilitycenter: " ",
  riskdate: " ",
  project: " ",
  object: " ",
  riskname: " ",
  riskcode: " ",
  category: " ",
  severity: " ",
  riskgroup: " ",
  subcategory: " ",
  description: " ",
  owner: " ",
  actionplan: " ",
  assigned: " ",
  status: " ",
  expectedcompletiondate: " ", // Add this line
  actualcompletiondate: " ",
  complianceimplication: " ",
  fileupload: " ",
  vulnerability: " ",
  threat: " ",
  confidentiality: 1,
  availability: 1,
  integrity: 1,
  probability: 1,
  impact: 1,
  riskexposure: 1,
  objectname: " ",
  newvalue: 0,
  oldvalue: 0,
  residualrisk: 0,
  controlowner: " ",
  mitigationstrategy: " ",
  contingencystrategy: " ",
  groupname: " ",
  thrustarea: " ",
  controlname: " ",
  controlwt: " ",
  subcontrolname: " ",
  subcontrolwt: " ",
  remark: " ",
  updatedate: " ",
  confidentialitySecondAsset: " ",
  availabilitySecondAsset: " ",
  integritySecondAsset: " ",
  impactSecondAsset: " ",
  probabilitySecondAsset: " ",
  riskExposureSecondAsset: " ",
  residualRiskSecondAsset: " ",
};
const ControlUpadte = (props) => {
  const [state, setState] = useState(initialState);
  const [riskNames, setRisk] = useState([]);
  const [respGroup, setRespGroup] = useState([]);
  const [respCenter, setRespCenter] = useState([]);
  const [objectType, setObjectType] = useState([]);
  const [riskSeverity, setRiskSeverity] = useState([]);
  const [riskCategory, setRiskCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [objectName, setObjectName] = useState([]);
  const [organizationComp, setOrganizationComp] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true); // Added state
  const [group, setGroup] = useState([]);
  const [thrust, setThrust] = useState([]);
  const [subControlNames, setSubControlNames] = useState([]);
  const [controlNames, setControlNames] = useState([]);
  const [projectName, setProject] = useState([]);

  const {
    organization,
    responsibilitygroup,
    responsibilitycenter,
    riskdate,
    project,
    object,
    riskname,
    riskcode,
    category,
    severity,
    riskgroup,
    subcategory,
    description,
    owner,
    actionplan,
    assigned,
    status,
    expectedcompletiondate,
    actualcompletiondate,
    complianceimplication,
    fileupload,
    vulnerability,
    threat,

    objectname,
    newvalue,
    oldvalue,

    controlowner,
    mitigationstrategy,
    contingencystrategy,
    groupname,
    thrustarea,
    controlname,
    controlwt,
    subcontrolname,
    subcontrolwt,
    remark,
    updatedate,
    confidentialitySecondAsset,
    impactSecondAsset,
    probabilitySecondAsset,
    availabilitySecondAsset,
    integritySecondAsset,
    riskExposureSecondAsset,
    residualRiskSecondAsset,
  } = state;

  const navigate = useNavigate();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const { riskid } = useParams();

  useEffect(() => {
    if (riskid) {
      axios
        .get(
          API.VIEW_RISK_API(riskid)
        )
        .then((resp) => {
          const editedData = resp.data[0];
          setState({
            ...editedData,
            asset: true,
            calculateriskexposure: true,
            secondAsset: true,
            calculateSecondRiskExposure: true,
            groupname: " ",
            thrustarea: " ",
            controlname: " ",
            controlwt: " ",
            subcontrolname: " ",
            subcontrolwt: " ",
            remark: " ",
            updatedate: " ",
            controlowner: "",
            riskdate: new Date(editedData.riskdate).toLocaleDateString("en-CA"),
            expectedcompletiondate: new Date(
              editedData.expectedcompletiondate
            ).toLocaleDateString("en-CA"),
            actualcompletiondate: new Date(
              editedData.actualcompletiondate
            ).toLocaleDateString("en-CA"),
          });
        });
    }
    axios
      .get(
        API.GET_RISKGROUP_API
      )
      .then((resp) => setRisk(resp.data));
    axios
      .get(API.GET_RESPONSIBILITYGROUP_API)
      .then((resp) => setRespGroup(resp.data));
    axios
      .get(API.GET_RESPONSIBILITYCENTER_API)
      .then((resp) => setRespCenter(resp.data));
    axios
      .get(API.GET_OBJECTTYPE_API)
      .then((resp) => setObjectType(resp.data));
    axios
      .get(
        API.GET_RISKSEVERIT_API
      )
      .then((resp) => setRiskSeverity(resp.data));
    axios
      .get(API.GET_RISKCATEGORY_API)
      .then((resp) => setRiskCategory(resp.data));
    axios
      .get(API.GET_SUBCATEGORY_API)
      .then((resp) => setSubCategory(resp.data));
    axios
      .get(API.OBJECTGET_OBJECTNAME_API)
      .then((resp) => setObjectName(resp.data));
    axios
      .get(
        API.GET_COMPANY_API
      )
      .then((resp) => setOrganizationComp(resp.data));
    axios
      .get(
        "https://staging.apilayer.valuevalidator.com/risk-api/GovernanceGroupget/api"
      )
      .then((resp) => setGroup(resp.data));
    axios
      .get(
        "https://staging.apilayer.valuevalidator.com/risk-api/thrustarea/api"
      )
      .then((resp) => setThrust(resp.data));
    axios
      .get(
        "https://staging.apilayer.valuevalidator.com/risk-api/getGovernancesubcontrol/api"
      )
      .then((response) => {
        setSubControlNames(response.data);
      });
    axios
      .get(
        "https://staging.apilayer.valuevalidator.com/risk-api/controlGovernance/api"
      )
      .then((response) => {
        setControlNames(response.data);
      });
    axios
      .get(
        "https://staging.apilayer.valuevalidator.com/risk-api/getprojectnames/api"
      )
      .then((response) => {
        setProject(response.data);
      });

    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.riskDetails
    ) {
      const { riskDetails } = props.location.state;
      setState((prevState) => ({
        ...prevState,
        organization: riskDetails.organization,
        responsibilitygroup: riskDetails.responsibilitygroup,
        responsibilitycenter: riskDetails.responsibilitycenter,
        riskdate: riskDetails.riskdate,
        project: riskDetails.project,
        object: riskDetails.object,
        riskname: riskDetails.riskname,
        riskcode: riskDetails.riskcode,
        category: riskDetails.category,
        severity: riskDetails.severity,
        riskgroup: riskDetails.riskgroup,
        subcategory: riskDetails.subcategory,
        description: riskDetails.description,
        actionplan: riskDetails.actionplan,
        assigned: riskDetails.assigned,
        status: riskDetails.status,
        expectedcompletiondate: riskDetails.expectedcompletiondate,
        actualcompletiondate: riskDetails.actualcompletiondate,
        complianceimplication: riskDetails.complianceimplication,
        fileupload: riskDetails.fileupload,
        vulnerability: riskDetails.vulnerability,
        threat: riskDetails.threat,
        objectname: riskDetails.objectname,
        newvalue: riskDetails.newvalue,
        oldvalue: riskDetails.oldvalue,
        mitigationstrategy: riskDetails.mitigationstrategy,
        contingencystrategy: riskDetails.contingencystrategy,
        remark: riskDetails.remark,
        updatedate: riskDetails.updatedate,
      }));
      setIsReadOnly(true); // Set readonly mode
    } else {
      setIsReadOnly(false);
    }
  }, [riskid, props && props.location && props.location.state, props]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!organization) {
      toast.error("Please provide a value for each input field");
    } else {
      const requestData = {
        organization,
        responsibilitygroup,
        responsibilitycenter,
        riskdate,
        project,
        object,
        riskname,
        riskcode,
        category,
        severity,
        riskgroup,
        subcategory,
        description,
        owner,
        actionplan,
        assigned,
        status,
        expectedcompletiondate,
        actualcompletiondate,
        complianceimplication,
        fileupload,
        vulnerability,
        threat,
        confidentiality: confidentialitySecondAsset,
        availability: availabilitySecondAsset,
        integrity: integritySecondAsset,
        probability: probabilitySecondAsset,
        impact: impactSecondAsset,
        riskexposure: riskExposureSecondAsset,
        objectname,
        newvalue,
        oldvalue,
        residualrisk: residualRiskSecondAsset,
        controlowner,
        mitigationstrategy,
        contingencystrategy,
        updatedate,
        groupname,
        thrustarea,
        controlname,
        controlwt,
        subcontrolname,
        subcontrolwt,
        remark,
      };

      if (!riskid) {
        axios
          .post(
           API.ADD_RISK_API,
            requestData
          )
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));

        toast.success("Risk added successfully");
      } else {
        axios
          .put(
            API.GET_RISKCATEGORY_API,
            requestData
          )
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));

        toast.success("Risk Added successfully");
      }

      setTimeout(() => navigate("/riskmanagement"), 500);
    }
  };

  const handleAdditionalFieldsClick = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };
  const handleInputChangeGov = (e) => {
    const { name, value } = e.target;

    if (name === "controlname") {
      const selectedControl = controlNames.find(
        (control) => control.controlname === value
      );

      console.log("Selected Control:", selectedControl);

      setState((prevState) => ({
        ...prevState,
        [name]: value,
        controlwt: selectedControl ? selectedControl.controlwt : "",
        controlname: selectedControl ? selectedControl.controlname : "", // Add this line
      }));
    } else if (name === "subcontrolname") {
      const selectedSubControl = subControlNames.find(
        (subcontrol) => subcontrol.subcontrolname === value
      );

      console.log("Selected SubControl:", selectedSubControl);

      setState((prevState) => ({
        ...prevState,
        [name]: value,
        subcontrolwt: selectedSubControl ? selectedSubControl.subcontrolwt : "",
        subcontrolname: selectedSubControl
          ? selectedSubControl.subcontrolname
          : "", // Add this line
      }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setState((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };

      const {
        asset,
        calculateriskexposure,
        confidentiality,
        availability,
        integrity,
        probability,
        impact,
      } = updatedState;

      let riskexposure = 0;

      if (asset) {
        if (calculateriskexposure) {
          riskexposure =
            parseFloat(confidentiality) *
            parseFloat(availability) *
            parseFloat(integrity) *
            parseFloat(probability) *
            parseFloat(impact);
        } else {
          riskexposure =
            parseFloat(confidentiality) *
            parseFloat(availability) *
            parseFloat(integrity);
        }
      } else if (calculateriskexposure) {
        riskexposure = parseFloat(probability) * parseFloat(impact);
      }

      updatedState.riskexposure = riskexposure;
      updatedState.newvalue = riskexposure;
      updatedState.oldvalue = riskexposure;

      if (
        updatedState.secondAsset &&
        updatedState.calculateSecondRiskExposure
      ) {
        const riskExposureSecondAsset =
          parseFloat(updatedState.confidentialitySecondAsset) *
          parseFloat(updatedState.availabilitySecondAsset) *
          parseFloat(updatedState.integritySecondAsset) *
          parseFloat(updatedState.probabilitySecondAsset) *
          parseFloat(updatedState.impactSecondAsset);

        updatedState.riskExposureSecondAsset =
          riskExposureSecondAsset.toString();
      } else if (updatedState.secondAsset) {
        const riskExposureSecondAsset =
          parseFloat(updatedState.confidentialitySecondAsset) *
          parseFloat(updatedState.availabilitySecondAsset) *
          parseFloat(updatedState.integritySecondAsset);
        updatedState.riskExposureSecondAsset =
          riskExposureSecondAsset.toString();
      } else if (updatedState.calculateSecondRiskExposure) {
        const riskExposureSecondAsset =
          parseFloat(updatedState.probabilitySecondAsset) *
          parseFloat(updatedState.impactSecondAsset);
        updatedState.riskExposureSecondAsset =
          riskExposureSecondAsset.toString();
      } else {
        updatedState.riskExposureSecondAsset = "";
      }

      const residualRiskDifference =
        parseFloat(updatedState.riskexposure || 0) -
        parseFloat(updatedState.riskExposureSecondAsset || 0);

      updatedState.residualRiskSecondAsset = residualRiskDifference.toString();

      return updatedState;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <center>
          <h1 style={{ marginTop: "2px", marginBottom: "2px" }}>
            <label htmlFor="objecttype">Risk</label>
          </h1>
        </center>
        <hr></hr>
        <div
          style={{
            marginRight: "50px",
            marginLeft: "50px",
            marginBottom: "5px",
            marginTop: "2px",
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "10px",
          }}
        >
          <div>
            <label>Organization:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="organization"
              name="organization"
              value={organization || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
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
            <label> Responsibilty group:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="responsibilitygroup"
              name="responsibilitygroup"
              value={responsibilitygroup || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Responsibilty Group</option>
              {respGroup.map((respgroup) => (
                <option
                  key={respgroup.responsibilityid}
                  value={respgroup.responsibilitytype}
                >
                  {respgroup.responsibilitytype}
                </option>
              ))}
            </select>
            <br />
          </div>
          <div>
            <label> Responsibilty Center:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="responsibilitycenter"
              name="responsibilitycenter"
              value={responsibilitycenter || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Responsibilty Center</option>
              {respCenter.map((respcenter) => (
                <option
                  key={respcenter.responsibilitynameid}
                  value={respcenter.responsibilitytype}
                >
                  {respcenter.responsibilitytype}
                </option>
              ))}
            </select>
            <br />
          </div>
          <div>
            <label>Date:</label>
            <br />
            <input
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                marginTop: "8px",
                width: "300px",
                height: "42px",
              }}
              type="date"
              id="riskdate"
              name="riskdate"
              placeholder="Enter the Date"
              value={riskdate || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Project:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="project"
              name="project"
              placeholder="Enter the Project"
              value={project || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              {" "}
              <option value="">Project</option>
              {projectName.map((project) => (
                <option key={project.projectname} value={project.projectname}>
                  {project.projectname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Object Type:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="object"
              name="object"
              value={object}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Object Type</option>
              {objectType.map((objtype) => (
                <option key={objtype.objectid} value={objtype.objecttype}>
                  {objtype.objecttype}
                </option>
              ))}
            </select>
            <br />
          </div>
          <div>
            <label>Object Name:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="objectname"
              name="objectname"
              value={objectname}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Object Name</option>
              {objectName.map((objname) => (
                <option key={objname.nameid} value={objname.objecttype}>
                  {objname.objecttype}
                </option>
              ))}
            </select>
            <br />
          </div>
          <div>
            <label>Risk Name:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="riskname"
              name="riskname"
              placeholder="Enter the Risk Name"
              value={riskname || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Risk Code:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="riskcode"
              name="riskcode"
              placeholder="Enter the risk Code"
              value={riskcode || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Risk category:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="category"
              name="category"
              value={category || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Select Risk Category</option>
              {riskCategory.map((riskcateg) => (
                <option
                  key={riskcateg.riskcategoryid}
                  value={riskcateg.riskcategoryid}
                >
                  {riskcateg.categoryname}
                </option>
              ))}
            </select>
          </div>{" "}
          <div>
            <label>Sub Category:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="subcategory"
              name="subcategory"
              value={subcategory || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Select SubCategory</option>
              {subCategory.map((subcateg) => (
                <option
                  key={subcateg.subcategorypid}
                  value={subcateg.subcategorytype}
                >
                  {subcateg.subcategorytype}
                </option>
              ))}
            </select>
          </div>{" "}
          <div>
            <label>Risk Severity:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="severity"
              name="severity"
              value={severity || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Select Risk Severity</option>
              {riskSeverity.map((riskseverity) => (
                <option
                  key={riskseverity.riskseverityid}
                  value={riskseverity.riskseveritytype}
                >
                  {riskseverity.riskseveritytype}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Risk Group:</label>
            <select
              style={{ fontFamily: "Poppins" }}
              id="riskgroup"
              name="riskgroup"
              value={riskgroup || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            >
              <option value="">Select Risk</option>
              {riskNames.map((riskg) => (
                <option key={riskg.riskgroupid} value={riskg.riskgroupname}>
                  {riskg.riskgroupname}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/**** OLD CAPAI Display  **************
         * *
         * *
         * *
         * *
         * *
         * *
         * *
         * *
         */}

        <div
          style={{
            margin: "50px",
            marginTop: "1px",
            marginBottom: "1px",
            paddingTop: "0px",
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr  ",
            gap: "0px",
          }}
        >
          <div style={{ marginTop: "1px" }}>
            <label>Old Asset:</label>
            <input
              type="checkbox"
              name="secondAsset"
              checked={state.secondAsset}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Calculate Risk Exposure Old:</label>
            <input
              type="checkbox"
              name="calculateSecondRiskExposure"
              checked={state.calculateSecondRiskExposure}
              onChange={handleInputChange}
            />
          </div>
          <label> Old Risk Value :</label>
        </div>

        <div
          className="input-container"
          style={{
            marginRight: "50px",
            marginLeft: "50px",
            marginBottom: "2px",
            marginTop: "1px",
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <label>Confidentiality:</label>
            <input
              type="text"
              id="confidentiality"
              name="confidentiality"
              value={state.confidentiality}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label>Availability:</label>
            <input
              type="text"
              id="availability"
              name="availabilit"
              value={state.availability}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label>Integrity:</label>
            <input
              type="text"
              id="integrity"
              name="integrity"
              value={state.integrity}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label>Probability:</label>
            <input
              type="text"
              id="probability"
              name="probability"
              value={state.probability}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label>Impact:</label>
            <input
              type="text"
              id="impact"
              name="impact"
              value={state.impact}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label> Risk Exposure:</label>
            <input
              type="text"
              id="riskExposure"
              name="riskExposure"
              value={state.riskexposure || " "}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label>Residual Value:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="residualrisk"
              name="residualRisk"
              value={state.newvalue || " "}
              readOnly
            />
          </div>
        </div>
        {/***
         * *
         * *
         * *
         * *
         * *
         * *
         * *
         * *
         * *
         * *
         * *
         * *
         */}
        <div
          style={{
            margin: "50px",
            marginTop: "1px",
            marginBottom: "1px",
            paddingTop: "0px",
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr  ",
            gap: "0px",
          }}
        >
          <div style={{ marginTop: "1px" }}>
            <label>
              Asset:
              <input
                type="checkbox"
                name="asset"
                checked={state.asset}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <label>
            Calculate Risk Exposure:
            <input
              type="checkbox"
              name="calculateriskexposure"
              checked={state.calculateriskexposure}
              onChange={handleInputChange}
            />
          </label>
          <label>Risk Value:</label>{" "}
        </div>

        <div
          className="input-container"
          style={{
            marginRight: "50px",
            marginLeft: "50px",
            marginBottom: "2px",
            marginTop: "1px",
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <label>Confidentiality:</label>
            <input
              type="text"
              id="confidentialitySecondAsset"
              name="confidentialitySecondAsset"
              value={state.asset ? state.confidentialitySecondAsset : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Availability:</label>
            <input
              type="text"
              id="availabilitySecond"
              name="availabilitySecondAsset"
              value={state.asset ? state.availabilitySecondAsset : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Integrity:</label>
            <input
              type="text"
              id="integritySecond"
              name="integritySecondAsset"
              value={state.asset ? state.integritySecondAsset : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Probability:</label>
            <input
              type="text"
              id="probabilitySecond"
              name="probabilitySecondAsset"
              value={
                state.calculateriskexposure ? state.probabilitySecondAsset : ""
              }
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Impact: </label>
            <input
              type="text"
              id="impactSecond"
              name="impactSecondAsset"
              value={state.calculateriskexposure ? state.impactSecondAsset : ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label> Risk Exposure:</label>
            <input
              type="text"
              id="riskexposureSecond"
              name="riskexposureSecondAsset"
              value={state.riskExposureSecondAsset || " "}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          <div>
            <label>Residual Value:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="residualriskSecond"
              name="residualriskSecondAsset"
              value={state.residualRiskSecondAsset || " "}
              readOnly
            />
          </div>
        </div>
        <div
          style={{
            marginRight: "50px",
            marginLeft: "50px",
            marginBottom: "2px",
            marginTop: "2px",
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            Description:
            <textarea
              rows="2"
              cols="50"
              style={{ fontFamily: "Poppins", marginTop: "9px" }}
              type=""
              id="description"
              name="description"
              placeholder="Enter the Description"
              value={description || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Risk Owner:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="owner"
              name="owner"
              placeholder="Enter the owner"
              value={owner || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Action Plan:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="actionplan"
              name="actionplan"
              placeholder="Enter the Action Plan"
              value={actionplan || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Assigned:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="assigned"
              name="assigned"
              placeholder="Enter the Assigned"
              value={assigned || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="status"
              name="status"
              placeholder="Enter the Status"
              value={status || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>{" "}
          <div>
            <label>Expected Completion Date:</label>
            <input
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                marginTop: "8px",
                width: "300px",
                height: "42px",
              }}
              type="date"
              id="expectedcompletiondate"
              name="expectedcompletiondate"
              placeholder="Enter the Expected Completion Date"
              value={expectedcompletiondate || ""}
              onChange={handleInputChange}
            />
          </div>{" "}
          <div>
            <label>Actual Completion Date:</label>
            <input
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                margin: "6px",
                width: "200px",
                height: "40px",
              }}
              type="date"
              id="actualcompletiondate"
              name="actualcompletiondate"
              placeholder="Enter the Actual Completion Date"
              value={actualcompletiondate || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Compliance Implication:</label>
            <input
              style={{ fontFamily: "Poppins" }}
              type="text"
              id="complianceimplication"
              name="complianceimplication"
              placeholder="Enter the Compliance Implication"
              value={complianceimplication || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>{" "}
          <div>
            <label> File Upload: </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <br />
              <input
                style={{ fontFamily: "Poppins", marginRight: "10px" }}
                type="text"
                id="fileupload"
                name="fileupload"
                placeholder="Enter the file upload link"
                value={fileupload || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
              <div style={{ position: "relative" }}></div>
              <a
                href="https://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                file Upload here
              </a>
            </div>
          </div>
          <div>
            <label>Vulnerability:</label>
            <textarea
              rows="2"
              cols="30"
              style={{ fontFamily: "Poppins", marginTop: "9px" }}
              type="text"
              id="vulnerability"
              name="vulnerability"
              placeholder="vulnerability"
              value={vulnerability || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Threat:</label>
            <textarea
              rows="2"
              cols="30"
              style={{ fontFamily: "Poppins", marginTop: "9px" }}
              type="text"
              id=""
              name="threat"
              placeholder="threat"
              value={threat || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Mitigation Strategy:</label>
            <input
              type="text"
              value={state.mitigationstrategy}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Contingency Strategy:</label>
            <input
              type="text"
              value={state.contingencystrategy}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
          <div>
            <label>Update Date:</label>
            <input
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                margin: "6px",
                width: "200px",
                height: "40px",
              }}
              type="date"
              id="updatedate"
              name="updatedate"
              placeholder="Enter the Actual Completion Date"
              value={updatedate || ""}
              onChange={handleInputChange}
              disabled={isReadOnly}
            />
          </div>
        </div>
        <center>
          <h1>Governance</h1>
        </center>
        <div
          style={{
            marginRight: "50px",
            marginLeft: "50px",
            marginBottom: "5px",
            marginTop: "2px",
          }}
        >
          <label>Show Additional Fields:</label>
          <button type="button" onClick={handleAdditionalFieldsClick}>
            {showAdditionalFields ? "-" : "+"}
          </button>
        </div>
        {/************
         *
         *
         *
         *
         *
         *
         * Aditional Features of governance
         *
         *
         *
         *
         *
         *
         *
         */}

        {showAdditionalFields && (
          <div
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginBottom: "5px",
              marginTop: "2px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <label>Control Owner:</label>
              <input
                type="text"
                id="controlowner"
                name="controlowner"
                placeholder="Enter Control Owner"
                value={controlowner}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Group Name:</label>
              <select
                type="text"
                id="groupname"
                name="groupname"
                placeholder="Enter Group Name"
                value={groupname}
                onChange={handleInputChange}
              >
                <option value="">Group Name</option>
                {group.map((group) => (
                  <option key={group.groupid} value={group.groupname}>
                    {group.groupname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Thrust Area:</label>
              <select
                type="text"
                id="thrustarea"
                name="thrustarea"
                placeholder="Enter Thrust Area"
                value={thrustarea}
                onChange={handleInputChange}
              >
                <option value="">Thrust Area</option>
                {thrust.map((thrust) => (
                  <option key={thrust.thrustid} value={thrust.thrustarea}>
                    {thrust.thrustarea}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="controlname">Control:</label>
              <select
                id="controlname"
                name="controlname"
                value={controlname || ""}
                onChange={handleInputChangeGov}
              >
                <option value="">Control</option>
                {controlNames.map((control) => (
                  <option key={control.controlname} value={control.controlname}>
                    {control.controlname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Control Weight:</label>
              <input
                type="text"
                id="controlwt"
                name="controlwt"
                placeholder="Enter Control Weight"
                value={controlwt}
                onChange={handleInputChangeGov}
                disabled
              />
            </div>
            <div>
              <label htmlFor="subcontrolname">Sub-Control:</label>
              <select
                id="subcontrolname"
                name="subcontrolname"
                value={subcontrolname}
                onChange={handleInputChangeGov}
              >
                <option value="">Sub Control</option>
                {subControlNames.map((subcontrol) => (
                  <option
                    key={subcontrol.subcontrolname}
                    value={subcontrol.subcontrolname}
                  >
                    {subcontrol.subcontrolname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Sub-Control Weight:</label>
              <input
                type="text"
                id="subcontrolwt"
                name="subcontrolwt"
                placeholder="Enter Sub-Control Weight"
                value={subcontrolwt}
                onChange={handleInputChangeGov}
                disabled
              />
            </div>
            <div>
              <label>Remark:</label>
              <br></br>
              <textarea
                rows="2"
                cols="30"
                style={{ fontFamily: "Poppins", marginTop: "9px" }}
                id="remark"
                name="remark"
                placeholder="Enter Remark"
                value={remark}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div style={{ justifyContent: "center", marginTop: "23px" }}>
              <input type="submit" value={"Save"}></input>
            </div>
            <Link to="/riskmanagement"></Link>
          </div>
        )}
      </form>
    </div>
  );
};
export default ControlUpadte;