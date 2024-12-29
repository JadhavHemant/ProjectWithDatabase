
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
/*----------------object type----------------*/


import Table1 from './firstTable/Table1';
import AddEdit from './firstTable/AddEdit';
import View from './firstTable/View';

/*----------------obect name-----------*/
import SecondTable from './secondTable/SecondTable';
import AddEditSecond from './secondTable/AddEditSecond';
import SecondViewTable from './secondTable/SecondViewTable';

/*-------------------------Responsibility Group-----------------------*/
import ResponsibilityTable from './ResponsibilityGroup/ResponsibilityTable';
import ResponsibilityAddEdit from './ResponsibilityGroup/ResponsibilityAddEdit';
import ResponsibilityView from './ResponsibilityGroup/ResponsibilityView';

/*-------------------------Responsibility Center-----------------------*/
import RespAddEdit from './ResponsibilityCenter/RespAddEdit';
import RespView from './ResponsibilityCenter/RespView';
import RespTable from './ResponsibilityCenter/RespTable';

/*-------------------------Parameter_Category-----------------------*/
import ParameterTable from './ParameterCategory/ParameterTable';
import ParamterAddEdit from './ParameterCategory/ParamterAddEdit';
import ParamterView from './ParameterCategory/ParamterView';

/*-------------------------Parameter-----------------------*/
import ParTable from './Parameter/ParTable';
import ParView from './Parameter/ParView';
import ParAddEdit from './Parameter/ParAddEdit';


/*-------------------Risk Category-----------------------------*/
import RiskTable from './RiskCategory/RiskTable';
import RiskAddEdit from './RiskCategory/RiskAddEdit';  
import RiskView from './RiskCategory/RiskView';

/*-------------------Sub Category-----------------------------*/
import SubCategoryTable from './SubCategory/SubCategoryTable';
import SubCategoryView from './SubCategory/SubCategoryView';
import SubCategoryAddEdit from './SubCategory/SubCategoryAddEdit';

/*-------------------Risk Group-----------------------------*/
import RiskGroupTable from './RiskGroup/RiskGroupTable';
import RiskGroupAddEdit from './RiskGroup/RiskGroupAddEdit';
import RiskGroupView from './RiskGroup/RiskGroupView';

/*-------------------Risk serverity-----------------------------*/
import RiskSeverityTable from './RiskSeverity/RiskSeverityTable';
import RiskSeverityAddEdit from './RiskSeverity/RiskSeverityAddEdit';
import RiskSeverityView from './RiskSeverity/RiskSeverityView';

/*-------------------Risk-----------------------------*/
import TableRisk from './Risk/TableRisk'
import Risk1 from './Risk/Risk1';
import ViewRisk from './Risk/ViewRisk';
import ControlUpdate from './Risk/ControlUpdate';
import ControlRiskTable from './Risk/ControlRiskTable';
import ResidualRiskChart from './Risk/ResidualRiskChart';
import Task from './Risk/Task';
import RiskExposureHeatMap from './Risk/RiskExposureHeatMap';

import RiskCategoryGraph from './Risk/RiskCategoryGraph';
import RiskSubCategoryGraph from './Risk/RiskSubCategoryGraph';
import RiskSeverityGraph from './Risk/RiskSeverityGraph';
// import CombinedRiskGraphs from './Risk/CombinedRiskGraphs';
import RiskGroupGraph from './Risk/RiskGroupGraph';
/*-------------------Company-----------------------------*/
import Company from './Company/Company';
import CompanyView from './Company/CompanyView';
import AddEditCompany from './Company/AddEditCompany';


/*-------------------------------------------------------*/
import Project from './project/Project';
import AddEditproject from './project/AddEditproject';


/*----------------------------------------------------*/
import AIMaster from './AIMaster/AIMaster';



/*------------------------Algorithm Inventory----------------------------*/
import AlgorithmInventoryTable from './AlgorithmInventory/AlgorithmInventoryTable';
import AlgorithmInventoryAddEdit from './AlgorithmInventory/AlgorithmInventoryAddEdit';
import AlgorithmInventoryView from './AlgorithmInventory/AlgorithmInventoryView';
import GovernanceReport from './AlgorithmInventory/GovernanceReport';
import AssessmentAudit from './AlgorithmInventory/AssessmentAudit';


/*---------------------Evidence-------------------------------*/
import EvidenceTable from './Evidence/EvidenceTable';
import EvidenceAddEdit from './Evidence/EvidenceAddEdit';
import EvidenceView from  './Evidence/EvidenceView';

/*---------------------dashboard-------------------------------*/
import DashBoardTable from './DashBoard/DashBoardTable';


/*---------------------dashboard-------------------------------*/
import ThemeAddEdit from './ThemeMaster/ThemeAddEdit';
import ThemeTable from './ThemeMaster/ThemeTable';
import ThemeView from './ThemeMaster/ThemeView';

/*------------------------Activity Group----------------------------*/

import ActivityGroupTable from './ActivityGroup/ActivityGroupTable';
import ActivityGroupAddEdit from './ActivityGroup/ActivityGroupAddEdit';
import ActivityGroupView from './ActivityGroup/ActivityGroupView';

/*------------------------Theme Activity----------------------------*/
import ThemeActivityAddEdit from './ThemeActivity/ThemeActivityAddEdit';
import ThemeActivityTable from './ThemeActivity/ThemeActivityTable';
import ThemeActivityView from './ThemeActivity/ThemeActivityView';


/*------------------------Vendor Master----------------------------*/
import VendorMasterTable from './VendorMaster/VendorMasterTable';
import VendorMasterAddEdit from './VendorMaster/VendorMasterAddEdit';
import VendorMasterView from './VendorMaster/VendorMasterView';


/*------------------------Vendor Master----------------------------*/
import TechnologyTable from './TechnologyMaster/TechnologyTable';
import TechnologyAddEdit from './TechnologyMaster/TechnologyAddEdit';
import TechnologyView from './TechnologyMaster/TechnologyView';

/*------------------------Vulnerability----------------------------*/
import VulnerabilityTable from './Vulnerability/VulnerabilityTable';
import VulnerabilityAddEdit from './Vulnerability/VulnerabilityAddEdit';
import VulnerabilityView from './Vulnerability/VulnerabilityView';


/*------------------------Resource----------------------------*/
import ResourceTable from './Resource/ResourceTable';
import ResourceAddEdit from './Resource/ResourceAddEdit';
import ResourceView from './Resource/ResourceView';

/*------------------------Framework----------------------------*/
import Framework from './Framework/Framework';
import ThrustArea from './Framework/ThrustArea';
import ControlName from './Framework/ControlName';
import SubControlName from './Framework/SubControlName';
import AssessmentStatus from './Framework/AssessmentStatus';
import AuditStatus from './Framework/AuditStatus';

/*------------------------Score Card----------------------------*/
import ScoreCardTable from './ScoreCard/ScoreCardTable';
import ScorecardBarGraph from './ScoreCard/ScorecardBarGraph';
// import ScoreCardSubControl from './ScoreCard/ScoreCardSubControl'


/*------------------------CheckList----------------------------*/
import Checklist from './Checklist/Checklist';
import Gantt from './Checklist/Gantt';


/*------------------------Environment----------------------------*/
import EnvironmentTable from './Environment/EnvironmentTable';
import EnvironmentAddEdit from './Environment/EnvironmentAddEdit';
import EnvironmentView from './Environment/EnvironmentView';


/*------------------------Environment  Type----------------------------*/
import EnvironmentTypeTable from './EnvironmentType/EnvironmentTypeTable';
import EnvironmentTypeAddEdit from './EnvironmentType/EnvironmentTypeAddEdit';
// import EnvironmentTypeView from './EnvironmentType/EnvironmentView';

/*------------------------Environment  Type----------------------------*/
import IssueTable from './Issue/IssueTable';
import IssueAddEdit from './Issue/IssueAddEdit';
import IssueView from './Issue/IssueView';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        {/*----------------object type----------------*/}
          <Route path="/" element={<Table1/>}/>
          <Route path="/addobject" element={<AddEdit/>}/>
          <Route path="/update/:objectid" element={<AddEdit/>}/>
          <Route path="/view/:objectid" element={<View/>}/>

          {/*----------------obect name-----------*/}
          <Route path="/secondTable" element={<SecondTable/>}/>
          <Route path="/addobj" element={<AddEditSecond/>}/>
          <Route path="/edit/:nameid" element={<AddEditSecond/>}/>
          <Route path="/see/:nameid" element={<SecondViewTable/>}/>


        {/*-------------------------Responsibility Group-----------------------*/}
          <Route path="/res" element={<ResponsibilityTable/>}/>
          <Route path="/resTable" element={<ResponsibilityAddEdit/>}/>
          <Route path="/change/:responsibilityid" element={<ResponsibilityAddEdit/>}/>
          <Route path="/seen/:responsibilityid" element={<ResponsibilityView/>}/>

          {/*-------------------------Responsibility Center-----------------------*/}
          <Route path="/resp2" element={<RespTable/>}/>
          <Route path="/restable2" element={<RespAddEdit/>}/>
          <Route path="/convert/:responsibilitynameid" element={<RespAddEdit/>}/>
          <Route path="/focus/:responsibilitynameid" element={<RespView/>}/>

          {/*-------------------------Parameter_Category-----------------------*/}
          <Route path="/par" element={<ParameterTable/>}/>
          <Route path="/parTable" element={<ParamterAddEdit/>}/>
          <Route path="/parameterupdate/:categoryid" element={<ParamterAddEdit/>}/>
          <Route path="/parameterView/:categoryid" element={<ParamterView/>}/>


          {/*-------------------------Parameter-----------------------*/}
          <Route path="/parameter" element={<ParTable/>}/>
          <Route path="/parameterTable" element={<ParAddEdit/>}/>
          <Route path="/parput/:parameterid" element={<ParAddEdit/>}/>
          <Route path="/parView/:parameterid" element={<ParView/>}/>


          {/*-------------------Risk Category-----------------------------*/}
          <Route path="/risk" element={<RiskTable/>}/>
          <Route path="/riskTable" element={<RiskAddEdit/>}/>
          <Route path="/riskupdate/:riskcategoryid" element={<RiskAddEdit/>}/>
          <Route path="/riskView/:riskcategoryid" element={<RiskView/>}/>


          {/*-------------------Sub Category-----------------------------*/}
          <Route path="/sub" element={<SubCategoryTable/>}/>
          <Route path="/subTable" element={<SubCategoryAddEdit/>}/>
          <Route path="/subupdate/:subcategoryid" element={<SubCategoryAddEdit/>}/>
          <Route path="/riskView/:subcategoryid" element={<SubCategoryView/>}/>

         
          {/*-------------------Risk group-----------------------------*/}
          <Route path="/riskgroup" element={<RiskGroupTable/>}/>
          <Route path="/riskgroupTable" element={<RiskGroupAddEdit/>}/>
          <Route path="/riskgroupupdate/:riskgroupid" element={<RiskGroupAddEdit/>}/>
          <Route path="/riskgroupView/:riskgroupid" element={<RiskGroupView/>}/>


            {/*-------------------Risk Severity-----------------------------*/}
          <Route path="/riskseverity" element={<RiskSeverityTable/>}/>
          <Route path="/riskseverityTable" element={<RiskSeverityAddEdit/>}/>
          <Route path="/riskseverityupdate/:riskseverityid" element={<RiskSeverityAddEdit/>}/>
          <Route path="/riskseverityView/:riskseverityid" element={<RiskSeverityView/>}/>
         
          
          {/*-------------------Risk -----------------------------*/}
          <Route path="/riskt" element={<Risk1/>}/>
          <Route path="/TableRisks" element={<TableRisk/>}/>
          <Route path="/risksupdate/:riskid" element={<TableRisk/>}/>
          <Route path="/Viewview/:riskid" element={<ViewRisk/>}/>
          <Route path="/controlupdate/:riskid" element={<ControlUpdate/>}/>
          <Route path="/risktassessmenttable/:riskcode" element={<ControlRiskTable/>}/>
          <Route path="/residualriskchart/:riskcode" element={<ResidualRiskChart/>}/>
          <Route path="/riskexposureheatmap" element={<RiskExposureHeatMap/>}/>
          <Route path="/tisk" element={<Task/>}/>


          {/*********************Risk Graph************************ */}
          <Route path ="/riskcategory" element={<RiskCategoryGraph/>}/>
          <Route path="/risksubcategory/:category" element={<RiskSubCategoryGraph/>}/>
          <Route path="/riskseveritygraph/:riskgroup" element={<RiskSeverityGraph />} />
          {/* <Route path="/combinedriskgraphs" element={<CombinedRiskGraphs />} /> */}
          <Route path="/riskgroupgraph/:subcategory" element={<RiskGroupGraph />} />
       {/*--------------------------------Company----------------------------------- */}

       <Route path="/company" element={<Company/>}/>
       <Route path="/addcompany" element={<AddEditCompany/>}/>
       <Route path="/editcompany/:companyid" element={<AddEditCompany/>}/>
       <Route path="/companyView/:companyid" element={<CompanyView/>}/>
       

        {/*--------------------------------Project ----------------------------------- */}

        <Route path="/project" element={<Project/>}/>
        <Route path="/addproject" element={<AddEditproject/>}/>
        <Route path="/projectedit/:projectid" element={<AddEditproject/>}/>
        

        {/*------------------------------AIMaster-------------------------------------------*/}
           <Route path="/aimaster" element={<AIMaster/>} />


           {/*------------------------Algorithm Inventory----------------------------*/}
           <Route path="/algorithminventory" element={<AlgorithmInventoryTable/>}/>
           <Route path="/addalgorithminventory" element={<AlgorithmInventoryAddEdit/>}/>
           <Route path="/algorithminventoryupdate/:algorithminventoryid" element={<AlgorithmInventoryAddEdit/>}/>
           <Route path="/algorithminventoryview/:algorithminventoryid" element={<AlgorithmInventoryView/>}/>
           <Route path="/governancereport" element={<GovernanceReport/>}/>
           <Route path="/assessmentaudit" element={<AssessmentAudit/>}/>


          {/*------------------------data lineage----------------------------*/}
          <Route path="/datalineage" element={<EvidenceTable/>}/>
          <Route path="/adddatalineage" element={<EvidenceAddEdit/>}/>
          <Route path="/datalineageupdate/:datalineageid" element={<EvidenceAddEdit/>}/>
          <Route path="/datalineageview/:datalineageid" element={<EvidenceView/>}/>



          {/*------------------------Dashboard----------------------------*/}

          <Route path="/dashboardtable" element={<DashBoardTable/>}/>

          {/*------------------------Theme Master----------------------------*/}

          <Route path="/thememaster" element={<ThemeTable/>}/>
          <Route path="/addthememaster" element={<ThemeAddEdit/>}/>
          <Route path="/thememasterupdate/:thememasterid" element={<ThemeAddEdit/>}/>
          <Route path="/thememasterview/:thememasterid" element={<ThemeView/>}/>


          {/*------------------------Activity Group----------------------------*/}
          <Route path="/activitygroup" element={<ActivityGroupTable/>}/>
          <Route path="/addactivitygroup" element={<ActivityGroupAddEdit/>}/>
          <Route path="/activitygroupupdate/:activitygroupid" element={<ActivityGroupAddEdit/>}/>
          <Route path="/activitygroupview/:activitygroupid" element={<ActivityGroupView/>}/>


           {/*------------------------Theme Activity----------------------------*/}
           <Route path="/themeactivity" element={<ThemeActivityTable/>}/>
           <Route path="/addthemeactivity" element={<ThemeActivityAddEdit/>}/>
           <Route path="/themeactivityupdate/:themeactivityid" element={<ThemeActivityAddEdit/>}/>
           <Route path="/themeactivityview/:themeactivityid" element={<ThemeActivityView/>}/>

            
           {/*------------------------Vendor Master----------------------------*/}
           <Route path="/vendormaster" element={<VendorMasterTable/>}/>
           <Route path="/addvendormaster" element={<VendorMasterAddEdit/>}/>
           <Route path="/vendormasterupdate/:vendorid" element={<VendorMasterAddEdit/>}/>
           <Route path="/vendormasterview/:vendorid" element={<VendorMasterView/>}/>

           {/*------------------------Technology----------------------------*/}
           <Route path="/technology" element={<TechnologyTable/>}/>
           <Route path="/addtechnology" element={<TechnologyAddEdit/>}/>
           <Route path="/addtechnologyupdate/:technologymasterid" element={<TechnologyAddEdit/>}/>
           <Route path="/technologyview/:technologymasterid" element={<TechnologyView/>}/>

            {/*------------------------Vulnerability----------------------------*/}
            <Route path="/vulnerability" element={<VulnerabilityTable/>}/>
            <Route path="/addvulnerability" element={<VulnerabilityAddEdit/>}/>
            <Route path="/vulnerabilityupdate/:vulnerabilityid" element={<VulnerabilityAddEdit/>}/>
            <Route path="/vulnerabilityView/:vulnerabilityid" element={<VulnerabilityView/>}/>


             {/*------------------------Resource----------------------------*/}
             <Route path="/resource" element={<ResourceTable/>}/>
             <Route path="/addresource" element={<ResourceAddEdit/>}/>
             <Route path="/resourceupdate/:resourceid" element={<ResourceAddEdit/>}/>
             <Route path="/resourceview/:resourceid" element={<ResourceView/>}/>
             

               {/*------------------------Framework----------------------------*/}
               <Route path="/framework" element={<Framework/>}/>
               <Route path="/thrustareagraph/:groupname" element={<ThrustArea/>}/>
               <Route path="/controlnamegraph/:thrustarea" element={<ControlName/>}/>
               <Route path="/subcontrolnamegraph/:subcontrolname" element={<SubControlName/>}/>
               <Route path="/assessmentstatusgraph/:controlname" element={<AssessmentStatus/>}/>
               <Route path="/auditstatusgraph/:assessmentstatus" element={<AuditStatus/>}/>

                 {/*------------------------Score Card----------------------------*/}
                 <Route path='/scorecard' element={<ScoreCardTable/>}/>


                 <Route path='/scorecardbargraph' element={<ScorecardBarGraph/>}/>

                 {/* <Route path='/scorecardsubcontrol' element={<ScoreCardSubControl/>}/> */}


                 {/*------------------------Check List----------------------------*/}
                 <Route path='/checklist' element={<Checklist/>}/>
                 <Route path="/ganttchart" element={<Gantt/>}/>

                  {/*------------------------Environment----------------------------*/}
                  <Route path='/environment' element={<EnvironmentTable/>}/>
                  <Route path="/addenvironment" element={<EnvironmentAddEdit/>}/>
                  <Route path="/environmentupdate/:environmentid" element={<EnvironmentAddEdit/>}/>
                  <Route path="/environmentview/:environmentid" element={<EnvironmentView/>}/>

                  {/*------------------------Environment Type----------------------------*/}
                  <Route path='/environmenttype' element={<EnvironmentTypeTable/>}/>
                  <Route path="/addenvironmenttype" element={<EnvironmentTypeAddEdit/>}/>
                  <Route path="/environmenttypeupdate/:environmenttypeid" element={<EnvironmentTypeAddEdit/>}/>
                  {/* <Route path="/environmenttypeview/:environmenttypeid" element={<EnvironmentView/>}/> */}

                  {/*------------------------Issue----------------------------*/}
                  <Route path="/issue" element={<IssueTable/>}/>
                  <Route path="/issueaddedit" element={<IssueAddEdit/>}/>
                  <Route path="/issueupdate/:issueid" element={<IssueAddEdit/>}/>
                  <Route path="/issueview/:issueid" element={<IssueView/>}/>
        </Routes>
      </Router>
  
    </div>
  )

}

export default App
