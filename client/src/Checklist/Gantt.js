import React, { useEffect, useState } from 'react';
import { GanttComponent } from '@syncfusion/ej2-react-gantt';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-layouts/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-grids/styles/material.css';
import '@syncfusion/ej2-treegrid/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';
// ... Import other required stylesheets 
import * as API from '../endpoint';
import Footer from "../pages/footer";
import Header from "../pages/header";
import axios from 'axios';
import './Gantt.css'


// ... (Your other imports)

function Gantt() {
  const [data, setData] = useState([]);

  const taskSettings = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    cssClass: 'custom-orange-task', // Assign a class for styling
    child: 'subtasks',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API.GET_CHECKLIST_API);
        const formattedData = response.data.flatMap(item => {
          const planStartDate = item.planstartdate ? new Date(item.planstartdate) : new Date();
          const planEndDate = item.planenddate ? new Date(item.planenddate) : new Date();
          const actualStartDate = item.actualstartdate ? new Date(item.actualstartdate) : new Date();
          const actualEndDate = item.actualenddate ? new Date(item.actualenddate) : new Date();

          const planTask = {
            TaskID: item.TaskID || 0,
            TaskName: item.organization || '-Plan',
            StartDate: planStartDate,
            EndDate: planEndDate,
            Duration: Math.ceil((planEndDate - planStartDate) / (1000 * 60 * 60 * 24)), // Calculate duration in days
            Progress: 50, // You may adjust the Progress value for planned tasks
          };

          const actualTask = {
            TaskID: item.TaskID + 1 || 0,
            TaskName: item.organization + ' - Actual',
            StartDate: actualStartDate,
            EndDate: actualEndDate,
            Duration: Math.ceil((actualEndDate - actualStartDate) / (1000 * 60 * 60 * 24)), // Calculate duration in days
            Progress: 100,
            subtasks: [], // No subtasks added
          };

          return [planTask, actualTask];
        });

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  return (
    <div className="chart">
      <Header />
      <h1>Gantt Chart</h1>
      <GanttComponent dataSource={data} taskFields={taskSettings} height="400px" />
      <Footer />
    </div>
  );
}

export default Gantt;















// import React, { useEffect, useState } from 'react';
// import { GanttComponent } from '@syncfusion/ej2-react-gantt';
// import randomColor from 'randomcolor';  // Import the random color library
// import '@syncfusion/ej2-base/styles/material.css';
// import '@syncfusion/ej2-buttons/styles/material.css';
// import '@syncfusion/ej2-calendars/styles/material.css';
// import '@syncfusion/ej2-dropdowns/styles/material.css';
// import '@syncfusion/ej2-inputs/styles/material.css';
// import '@syncfusion/ej2-lists/styles/material.css';
// import '@syncfusion/ej2-layouts/styles/material.css';
// import '@syncfusion/ej2-navigations/styles/material.css';
// import '@syncfusion/ej2-popups/styles/material.css';
// import '@syncfusion/ej2-splitbuttons/styles/material.css';
// import '@syncfusion/ej2-grids/styles/material.css';
// import '@syncfusion/ej2-treegrid/styles/material.css';
// import '@syncfusion/ej2-react-gantt/styles/material.css';
// import * as API from '../endpoint';
// import axios from 'axios';
// import Footer from '../pages/footer';
// import Header from '../pages/header';

// function Gantt() {
//   const [data, setData] = useState([]);

//   const taskSettings = {
//     id: 'checklistid',
//     name: 'TaskName',
//     startDate: 'StartDate',
//     endDate: 'EndDate',
//     duration: 'Duration',
//     progress: 'Progress',
//     child: 'subtasks',
//   };

//   const generateTaskColor = (isActual) => {
//     if (isActual) {
//       return randomColor({ hue: '#228B22' }); // Green for actual tasks
//     } else {
//       return randomColor({ hue: '#7DF9FF' });  // Blue for planned tasks
//     }
//   };

   
  
//   const taskbarTemplate = (props) => {
//     const isPlanned = props.data && props.data.Status.toLowerCase() === 'planned';
  
//     // Set the color dynamically based on the task data
//     const color = isPlanned ? generateTaskColor(true) : generateTaskColor(true);
  
//     return (
//       <div className='custom-taskbar' style={{ backgroundColor: color, width: `${props.width}px`, height: '100%', borderRadius: '4px' }}>
//         {props.data && props.data.TaskName && <span className='e-task-label'>{props.data.TaskName}</span>}
//       </div>
//     );
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(API.GET_CHECKLIST_API);
//         const formattedData = response.data.flatMap(item => {
//           const planStartDate = item.planstartdate ? new Date(item.planstartdate) : new Date();
//           const planEndDate = item.planenddate ? new Date(item.planenddate) : new Date();
//           const actualStartDate = item.actualstartdate ? new Date(item.actualstartdate) : new Date();
//           const actualEndDate = item.actualenddate ? new Date(item.actualenddate) : new Date();

//           const planTask = {
//             checklistid: item.checklistid || 0,
//             TaskName: item.organization + '-plan',
//             StartDate: planStartDate,
//             EndDate: planEndDate,
//             Duration: Math.ceil((planEndDate - planStartDate) / (1000 * 60 * 60 * 24)),
//             Progress: 50,
//             Status: item.status || 'planned', // Add a 'status' property to the data
//           };

//           const actualTask = {
//             checklistid: item.checklistid + 1 || 0,
//             TaskName: item.organization + ' - actual',
//             StartDate: actualStartDate,
//             EndDate: actualEndDate,
//             Duration: Math.ceil((actualEndDate - actualStartDate) / (1000 * 60 * 60 * 24)),
//             Progress: 100,
//             Status: item.status || 'Actual',
//           };

//           return [planTask, actualTask];
//         });

//         setData(formattedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);  

//   return (
//     <div className="chart">
//       <Header />
//       <h1>Gantt Chart</h1>
//       <GanttComponent dataSource={data} taskFields={taskSettings} height="400px" taskbarTemplate={taskbarTemplate} />
//       <Footer />
//     </div>
//   );
// }

// export default Gantt;
