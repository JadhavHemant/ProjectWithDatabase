const BASE_URL ="http://localhost:5000/node-api/";
//const BASE_URL = "https://staging.apilayer.valuevalidator.com/risk-api/";
//const BASE_URL="http://34.135.211.91/node-api/";


/*********End points***** */

/************OBJECT TYPE********* */

export const GET_OBJECTTYPE_API =`${BASE_URL}api/get`;

export const ADD_OBJECTTYPE_API = `${BASE_URL}api/post`;

export const DELETE_OBJECTTYPE_API =(objectid)=> `${BASE_URL}api/delete/${objectid}`;

export const VIEW_OBJECTTYPE_API =(objectid)=>`${BASE_URL}api/get/${objectid}`;

export const UPDATE_OBJECTTYPE_API =(objectid)=> `${BASE_URL}api/update/${objectid}`;


/************OBJECT NAME*************************************/

export const OBJECTGET_OBJECTNAME_API =`${BASE_URL}api/add`;

export const OBJECTADD_OBJECTNAME_API = `${BASE_URL}api/save`;

export const OBJECTDELETE_OBJECTNAME_API =(nameid)=> `${BASE_URL}api/remove/${nameid}`;

export const OBJECTVIEW_OBJECTNAME_API =(nameid)=>`${BASE_URL}api/add/${nameid}`;

export const OBJECTUPDATE_OBJECTNAME_API =(nameid)=> `${BASE_URL}api/edit/${nameid}`;


/*---------------------------------------Responsibility_Group-------------------------------------------------------------------------------*/

export const GET_RESPONSIBILITYGROUP_API =`${BASE_URL}api/in`;

export const ADD_RESPONSIBILITYGROUP_API = `${BASE_URL}api/display`;

export const DELETE_RESPONSIBILITYGROUP_API =(responsibilityid)=> `${BASE_URL}api/dremoves/${responsibilityid}`;

export const VIEW_RESPONSIBILITYGROUP_API = (responsibilityid) =>`${BASE_URL}api/in/${responsibilityid}`;

export const UPDATE_RESPONSIBILITYGROUP_API =(responsibilityid)=> `${BASE_URL}api/change/${responsibilityid}`;

/*-------------------------------------------------------Responsibility_Center-------------------------------------------------------------------------*/

export const GET_RESPONSIBILITYCENTER_API =`${BASE_URL}api/adding`;

export const ADD_RESPONSIBILITYCENTER_API = `${BASE_URL}api/saving`;

export const DELETE_RESPONSIBILITYCENTER_API =(responsibilitynameid)=> `${BASE_URL}api/deleted/${responsibilitynameid}`;

export const VIEW_RESPONSIBILITYCENTER_API =(responsibilitynameid)=>`${BASE_URL}api/adding/${responsibilitynameid}`;

export const UPDATE_RESPONSIBILITYCENTER_API =(responsibilitynameid)=> `${BASE_URL}api/convert/${responsibilitynameid}`;

/*------------------------------------Project--------------------------------------------------*/

export const GET_PROJECT_API =`${BASE_URL}projectgetapi`;


/*------------------------------------Parameter Category-------------------------------------------------*/

export const GET_PARAMETERCATEGORY_API =`${BASE_URL}api/parameteradd`;

export const ADD_PARAMETERCATEGORY_API = `${BASE_URL}api/parametersaving`;

export const DELETE_PARAMETERCATEGORY_API =(categoryid)=> `${BASE_URL}api/parameterdeleted/${categoryid}`;

export const VIEW_PARAMETERCATEGORY_API =(categoryid)=>`${BASE_URL}api/parameteradd/${categoryid}`;

export const UPDATE_PARAMETERCATEGORY_API =(categoryid)=> `${BASE_URL}api/parameterupdate/${categoryid}`;

/*----------------------------------------parameter--------------------------------------------------------------*/

export const GET_PARAMETER_API =`${BASE_URL}api/parget`;

export const ADD_PARAMETER_API = `${BASE_URL}api/parpost`;

export const DELETE_PARAMETER_API =(parameterid)=> `${BASE_URL}api/pardelete/${parameterid}`;

export const VIEW_PARAMETER_API =(parameterid)=>`${BASE_URL}api/parget/${parameterid}`;

export const UPDATE_PARAMETER_API =(parameterid)=> `${BASE_URL}api/parput/${parameterid}`;


/*---------------------------risk_category---------------------------------------------------------*/

export const GET_RISKCATEGORY_API =`${BASE_URL}api/riskadd`;

export const ADD_RISKCATEGORY_API = `${BASE_URL}api/risksaving`;

export const DELETE_RISKCATEGORY_API =(riskcategoryid)=> `${BASE_URL}api/riskdeleted/${riskcategoryid}`;

export const VIEW_RISKCATEGORY_API =(riskcategoryid)=>`${BASE_URL}api/riskadd/${riskcategoryid}`;

export const UPDATE_RISKCATEGORY_API =(riskcategoryid)=> `${BASE_URL}api/riskupdate/${riskcategoryid}`;
//NOT YET

/*----------------------------subcategory------------------------------*/

export const GET_SUBCATEGORY_API =`${BASE_URL}api/subget`;

export const ADD_SUBCATEGORY_API = `${BASE_URL}api/subpost`;

export const DELETE_SUBCATEGORY_API =(subcategoryid)=> `${BASE_URL}api/riskdeleted/${subcategoryid}`;

export const VIEW_SUBCATEGORY_API =(subcategoryid)=>`${BASE_URL}api/subget/${subcategoryid}`;

export const UPDATE_SUBCATEGORY_API =(subcategoryid)=> `${BASE_URL}api/subupdate/${subcategoryid}`;
//NOT YET

/*------------------------------risk_group--------------------------------*/

export const GET_RISKGROUP_API =`${BASE_URL}api/riskgroupadd`;

export const ADD_RISKGROUP_API = `${BASE_URL}api/riskgroupsaving`;

export const DELETE_RISKGROUP_API =(riskgroupid)=> `${BASE_URL}api/riskgroupdeleted/${riskgroupid}`;

export const VIEW_RISKGROUP_API =(riskgroupid)=>`${BASE_URL}api/riskgroupadd/${riskgroupid}`;

export const UPDATE_RISKGROUP_API =(riskgroupid)=> `${BASE_URL}api/riskgroupupdate/${riskgroupid}`;


/*-----------------------risk_severit--------------------------------------*/


export const GET_RISKSEVERIT_API =`${BASE_URL}api/riskseverityget`;

export const ADD_RISKSEVERIT_API = `${BASE_URL}api/riskseveritypost`;

export const DELETE_RISKSEVERIT_API =(riskseverityid)=> `${BASE_URL}api/riskseveritydelete/${riskseverityid}`;

export const VIEW_RISKSEVERIT_API =(riskseverityid)=>`${BASE_URL}api/riskseverityget/${riskseverityid}`;

export const UPDATE_RISKSEVERIT_API =(riskseverityid)=> `${BASE_URL}api/riskseverityupdate/${riskseverityid}`;

/*-------------------------Risk Table----------------------------------------*/

export const GET_RISK_API =`${BASE_URL}api/risksget`;

export const ADD_RISK_API = `${BASE_URL}api/riskspost`;

export const DELETE_RISK_API =(riskid)=> `${BASE_URL}api/risksdelete/${riskid}`;

export const VIEW_RISK_API =(riskid)=>`${BASE_URL}api/risksget/${riskid}`;

export const UPDATE_RISK_API =(riskseverityid)=> `${BASE_URL}api/risksupdate/${riskseverityid}`;

export const RISKCODEVIEW_RISK_API =(riskcode)=>`${BASE_URL}api/riskcodeget/${riskcode}`;

export const MINRISKEXPOSURE_RISK_API = `${BASE_URL}api/riskexposure`;

export const  RISKCATEGORY_RISK_API = `${BASE_URL}api/riskcategory`;

export const  RISKSUBCATEGORY_RISK_API =(category)=> `${BASE_URL}api/risksubcategory/${category}`;

export const  RISKSEVERITYGRAPH_RISK_API =(riskgroup)=> `${BASE_URL}api/riskseveritygraph/${riskgroup}`;

export const RISKSUBCATEGORYREPORT_RISK_API =(category)=> `${BASE_URL}api/risksubcategoryreport/${category}`;

export const RISKGROUPGRAPH_RISK_API =(subcategory)=> `${BASE_URL}api/riskgroupgraph/${subcategory}`;

export const RISKGROUPREPORT_RISK_API =(subcategory)=> `${BASE_URL}api/riskgroupreport/${subcategory}`;

export const RISKSEVERITYREPORT_RISK_API =(riskgroup)=> `${BASE_URL}api/riskseverityreport/${riskgroup}`;
/*-----------------------------------------------------Company--------------------------------------------------------------------------------*/

export const GET_COMPANY_API =`${BASE_URL}companyget/api`;


/*-------------------------Algorithm Inventory-----------------------------------------------*/

export const GET_ALGORITHMINVENTORY_API =`${BASE_URL}api/algorithminventoryget`;

export const ADD_ALGORITHMINVENTORY_API = `${BASE_URL}api/algorithminventorypost`;

export const DELETE_ALGORITHMINVENTORY_API =(algorithminventoryid)=> `${BASE_URL}api/algorithminventorydelete/${algorithminventoryid}`;

export const VIEW_ALGORITHMINVENTORY_API =(algorithminventoryid)=>`${BASE_URL}api/algorithminventoryget/${algorithminventoryid}`;

export const UPDATE_ALGORITHMINVENTORY_API =(algorithminventoryid)=> `${BASE_URL}api/algorithminventoryupdate/${algorithminventoryid}`;


/*---------------------data lineage-------------------------------*/

export const GET_EVIDENCE_API =`${BASE_URL}api/datalineageget`;

export const ADD_EVIDENCE_API = `${BASE_URL}datalineagepost/api`;

// Assuming BASE_URL is defined in your endpoint module
export const DELETE_EVIDENCE_API =(datalineageid) =>`${BASE_URL}api/datalineagedelete/${datalineageid}`;

export const VIEW_EVIDENCE_API =(datalineageid)=>`${BASE_URL}api/datalineageget/${datalineageid}`;

export const UPDATE_EVIDENCE_API =(datalineageid)=> `${BASE_URL}api/datalineageupdate/${datalineageid}`;

export const GET_COMPANYPROJECT_API =`${BASE_URL}api/companyprojectget`;

/*-------------------------------Governance-----------------------------*/

export const GET_GOVERNANCE_API =`${BASE_URL}resultGovernanceget/api`;

export const VIEW_GOVERNANCE_API =(projectid, companyid)=>`${BASE_URL}api/evidence/${projectid},/${companyid}`;

export const COUNT_GOVERNANCE_API =(resultid)=>`${BASE_URL}resultGovernanceget/api/${resultid}`;

export const GROUPNAME_GOVERNANCE_API =`${BASE_URL}api/groupname`;

export const THRUSTAREA_GOVERNANCE_API =(groupname)=>`${BASE_URL}api/thrustareagraph/${groupname}`;

export const CONTROLNAMEGRAPH_GOVERNANCE_API =(thrustarea)=>`${BASE_URL}api/controlnamegraph/${thrustarea}`;

export const SUBCONTROLNAMEGRAPH_GOVERNANCE_API =(subcontrolname)=>`${BASE_URL}api/subcontrolnamegraph/${subcontrolname}`;

export const AEESESSMENTSTATUSGRAPH_GOVERNANCE_API =(controlname)=>`${BASE_URL}api/assessmentstatusgraph/${controlname}`;

export const AUDITSTATUSGRAPH_GOVERNANCE_API =(assessmentstatus)=>`${BASE_URL}api/auditstatusgraph/${assessmentstatus}`;

export const GETGROUPNAME_GOVERNANCE_API =(groupname)=>`${BASE_URL}api/groupnameget/${groupname}`;

export const GETTHRUSTGROUPNAME_GOVERNANCE_API =(thrustarea)=>`${BASE_URL}api/thrustareaget/${thrustarea}}`;


export const CONTRILNAMEREPORT_GOVERNANCE_API =(thrustarea)=>`${BASE_URL}api/controlnamereport/${thrustarea}`;

export const SUBCONTRILNAMEREPORT_GOVERNANCE_API =(subcontrolname)=>`${BASE_URL}api/subcontrolnamereport/${subcontrolname}`;

/*-----------------------------------theme master---------------------------------------*/
export const GET_THEMEMASTER_API =`${BASE_URL}api/thememasterget`;

export const ADD_THEMEMASTER_API = `${BASE_URL}api/thememasterpost`;

export const DELETE_THEMEMASTER_API =(thememasterid) =>`${BASE_URL}api/thememasterdelete/${thememasterid}`;

export const VIEW_THEMEMASTER_API =(thememasterid)=>`${BASE_URL}api/thememasterget/${thememasterid}`;

export const UPDATE_THEMEMASTER_API =(thememasterid)=> `${BASE_URL}api/thememasterupdate/${thememasterid}`;

/*-----------------------------------activity Group---------------------------------------*/
export const GET_ACTIVITYGROUP_API =`${BASE_URL}api/activitygroupget`;

export const ADD_ACTIVITYGROUP_API = `${BASE_URL}api/activitygrouppost`;

export const DELETE_ACTIVITYGROUP_API =(activitygroupid) =>`${BASE_URL}api/activitygroupdelete/${activitygroupid}`;

export const VIEW_ACTIVITYGROUP_API =(activitygroupid)=>`${BASE_URL}api/activitygroupget/${activitygroupid}`;

export const UPDATE_ACTIVITYGROUP_API =(activitygroupid)=> `${BASE_URL}api/activitygroupupdate/${activitygroupid}`; 


/*-----------------------------------Theme Activity---------------------------------------*/

export const GET_THEMEACTIVITY_API =`${BASE_URL}api/themeactivityget`;

export const ADD_THEMEACTIVITY_API = `${BASE_URL}api/themeactivitypost`;

export const DELETE_THEMEACTIVITY_API =(themeactivityid) =>`${BASE_URL}api/themeactivitydelete/${themeactivityid}`;

export const VIEW_THEMEACTIVITY_API =(themeactivityid)=>`${BASE_URL}api/themeactivityget/${themeactivityid}`;

export const UPDATE_THEMEACTIVITY_API =(themeactivityid)=> `${BASE_URL}api/themeactivityupdate/${themeactivityid}`; 


/*-----------------------------------Vendor Master---------------------------------------*/

export const GET_VENDORMASTER_API =`${BASE_URL}api/vendormasterget`;

export const ADD_VENDORMASTER_API = `${BASE_URL}api/vendormasterpost`;

export const DELETE_VENDORMASTER_API =(vendorid) =>`${BASE_URL}api/vendormasterdelete/${vendorid}`;

export const VIEW_VENDORMASTER_API =(vendorid)=>`${BASE_URL}api/vendormasterget/${vendorid}`;

export const UPDATE_VENDORMASTER_API =(vendorid)=> `${BASE_URL}api/vendormasterupdate/${vendorid}`; 

/*-----------------------------------Technology---------------------------------------*/
export const GET_TECHNOLOGY_API =`${BASE_URL}api/technologyget`;

export const ADD_TECHNOLOGY_API = `${BASE_URL}api/technologypost`;

export const DELETE_TECHNOLOGY_API =(technologymasterid) =>`${BASE_URL}api/technologydelete/${technologymasterid}`;

export const VIEW_TECHNOLOGY_API =(technologymasterid)=>`${BASE_URL}api/technologyget/${technologymasterid}`;

export const UPDATE_TECHNOLOGY_API =(technologymasterid)=> `${BASE_URL}api/technologyupdate/${technologymasterid}`; 

/*-----------------------------------vulnerability---------------------------------------*/

export const GET_VULNERABILITY_API =`${BASE_URL}api/vulnerabilityget`;

export const ADD_VULNERABILITY_API = `${BASE_URL}api/vulnerabilitypost`;

export const DELETE_VULNERABILITY_API =(vulnerabilityid) =>`${BASE_URL}api/vulnerabilitydelete/${vulnerabilityid}`;

export const VIEW_VULNERABILITY_API =(vulnerabilityid)=>`${BASE_URL}api/vulnerabilityget/${vulnerabilityid}`;

export const UPDATE_VULNERABILITY_API =(vulnerabilityid)=> `${BASE_URL}api/vulnerabilityupdate/${vulnerabilityid}`; 

/*-----------------------------------Resource---------------------------------------*/

export const GET_RESOURCE_API =`${BASE_URL}api/resourceget`;

export const ADD_RESOURCE_API = `${BASE_URL}api/resourcepost`;

export const DELETE_RESOURCE_API =(resourceid) =>`${BASE_URL}api/resourcedelete/${resourceid}`;

export const VIEW_RESOURCE_API =(resourceid)=>`${BASE_URL}api/resourceget/${resourceid}`;

export const UPDATE_RESOURCE_API =(resourceid)=> `${BASE_URL}api/resourceupdate/${resourceid}`; 

/*-----------------------------------Score Card---------------------------------------*/

export const GET_SCORECARD_API =`${BASE_URL}api/scorecard`;

export const GET_MULTIPLEGRAPH_API =`${BASE_URL}api/governancemultigraph`;

/*-----------------------------------Check List---------------------------------------*/
export const GET_CHECKLIST_API = `${BASE_URL}api/checklist`;

export const ADD_CHECKLIST_API = `${BASE_URL}api/addchecklist`;

export const GANTTCHART_CHECKLIST_API = `${BASE_URL}api/ganttchart`;

/*-----------------------------------Environment---------------------------------------*/
export const GET_ENVIRONMENT_API =`${BASE_URL}api/environmentget`;

export const ADD_ENVIRONMENT_API =`${BASE_URL}api/environmentpost`;

export const DELETE_ENVIRONMENT_API =(environmentid) =>`${BASE_URL}api/environmentdelete/${environmentid}`;

export const VIEW_ENVIRONMENT_API =(environmentid)=>`${BASE_URL}api/environmentset/${environmentid}`;

export const UPDATE_ENVIRONMENT_API =(environmentid)=> `${BASE_URL}api/environmentupdate/${environmentid}`; 


/*-----------------------------------Environment  Type---------------------------------------*/
export const GET_ENVIRONMENTTYPE_API =`${BASE_URL}api/environmenttypeget`;

export const ADD_ENVIRONMENTTYPE_API =`${BASE_URL}api/environmenttypepost`;

export const DELETE_ENVIRONMENTTYPE_API =(environmenttypeid) =>`${BASE_URL}api/environmenttypedelete/${environmenttypeid}`;

export const VIEW_ENVIRONMENTTYPE_API =(environmenttypeid)=>`${BASE_URL}api/environmenttypeset/${environmenttypeid}`;

export const UPDATE_ENVIRONMENTTYPE_API =(environmenttypeid)=> `${BASE_URL}api/environmenttypeupdate/${environmenttypeid}`; 

/*-----------------------------------Issue---------------------------------------*/

export const GET_ISSUE_API =`${BASE_URL}api/issueget`;

export const ADD_ISSUE_API =`${BASE_URL}api/issuepost`;

export const DELETE_ISSUE_API =(issueid) =>`${BASE_URL}api/issuedelete/${issueid}`;

export const VIEW_ISSUE_API =(issueid)=>`${BASE_URL}api/issueget/${issueid}`;

export const UPDATE_ISSUE_API =(issueid)=> `${BASE_URL}api/issueupdate/${issueid}`;