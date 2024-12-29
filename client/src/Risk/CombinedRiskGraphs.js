// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// import * as API from '../endpoint';

// const CombinedRiskGraphs = () => {
//   const [categoryData, setCategoryData] = useState([]);
//   const [subcategoryData, setSubcategoryData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryResponse = await axios.get(API.RISKCATEGORY_RISK_API);
//         setCategoryData(categoryResponse.data);
//       } catch (error) {
//         console.error('Error fetching category data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCategoryClick = async (category) => {
//     if (!category) {
//       console.warn('Invalid category value:', category);
//       return;
//     }

//     setSelectedCategory(category);

//     try {
//       const subcategoryResponse = await axios.get(API.RISKSUBCATEGORY_RISK_API(category));
//       setSubcategoryData(subcategoryResponse.data);
//     } catch (error) {
//       console.error('Error fetching subcategory data:', error);
//     }
//   };

//   const chartContainerStyle = {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%',
//   };

//   const chartStyle = {
//     flex: 1,
//     margin: '10px',
//     position: 'relative',
//   };

//   const categoryLabels = categoryData.map((item) => item.category_name);
//   const categoryCounts = categoryData.map((item) => item.category_count);

//   const categoryChartData = {
//     labels: categoryLabels,
//     datasets: [
//       {
//         label: 'Risk Categories',
//         data: categoryCounts,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const subcategoryLabels = subcategoryData.map((item) => item.subcategory);
//   const subcategoryCounts = subcategoryData.map((item) => item.subcategory_count);

//   const subcategoryChartData = {
//     labels: subcategoryLabels,
//     datasets: [
//       {
//         label: 'Subcategories',
//         data: subcategoryCounts,
//         backgroundColor: 'rgba(255,99,132,0.2)',
//         borderColor: 'rgba(255,99,132,1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: selectedCategory ? `Subcategories for ${selectedCategory}` : 'Risk Categories',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: selectedCategory ? 'Subcategory Count' : 'Category Count',
//         },
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>Risk Category Bar Graph</h2>
//       <div style={chartContainerStyle}>
//         <div
//           style={chartStyle}
//           onClick={(event) => {
//             const element = event.target;
//             const categoryIndex = element._index;

//             if (categoryIndex !== undefined) {
//               const clickedCategory = categoryLabels[categoryIndex];
//               handleCategoryClick(clickedCategory);
//             }
//           }}
//         >
//           <Bar data={categoryChartData} options={chartOptions} />
//         </div>
//         {selectedCategory && (
//           <div style={chartStyle}>
//             <h2>Subcategory Bar Graph</h2>
//             <Bar data={subcategoryChartData} options={chartOptions} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CombinedRiskGraphs;

















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { useNavigate } from 'react-router-dom';
// import * as API from '../endpoint';
// import './RiskCategoryGraph.css';
// import { Tooltip as ReactTooltip } from 'react-tooltip';


// const CombinedRiskGraphs = () => {
//   const [riskData, setRiskData] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const { category } = useParams();
//    const navigate = useNavigate();

//     useEffect(() => {
//      const fetchData = async () => {
//           try {
//             const response = await axios.get(API.RISKCATEGORY_RISK_API);
//             setRiskData(response.data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//       }, []);

//       useEffect(() => {
//         const fetchSubCategories = async () => {
//           try {
//             const response = await axios.get(API.RISKSUBCATEGORY_RISK_API(category));
//             setSubCategories(response.data);
//           } catch (error) {
//             console.error('Error fetching subcategories:', error);
//           }
//         };
    
//         fetchSubCategories();
//       }, [category]);
    


//       const labels = riskData.map((item) => item.category_name);
//       const data = riskData.map((item) => item.category_count);

//       const chartLabels = subCategories.map(subCategory => subCategory.subcategory);
//      const chartData = subCategories.map(subCategory => subCategory.subcategory_count);

//      const handleSubCategoryClick = (_, elements) => {
//       if (elements && elements.length > 0) {
//         const clickedIndex = elements[0].index;
//         const clickedSubCategory = chartLabels[clickedIndex];
//         console.log('Clicked Subcategory:', clickedSubCategory);
  
//         // Navigate to the new page with severity information
//         navigate(`/riskseveritygraph/${encodeURIComponent(clickedSubCategory)}`);
//       }
//     };


//     const chartDataConfig = {
//       labels: chartLabels,
//       datasets: [
//         {
//           label: 'Subcategory Count',
//           backgroundColor: 'rgba(75, 192, 192, 0.4)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
//           hoverBorderColor: 'rgba(75, 192, 192, 1)',
//           data: chartData,
//         },
//       ],
//     };

//     const options = {
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: 'Subcategories',
//           },
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Count',
//           },
//           suggestedMin: 25,
//         },
//       },
//       onClick: handleSubCategoryClick,
//     };
  
//       const chartData = {
//             labels,
//             datasets: [
//               {
//                 label: 'Risk Category Distribution',
//                 backgroundColor: 'rgba(75, 192, 192, 0.4)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//                 hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 hoverBorderColor: 'rgba(75, 192, 192, 1)',
//                 data,
//               },
//             ],
//           };
        
//           const options = {
//             scales: {
//               x: {
//                 title: {
//                   display: true,
//                   text: 'Risk Categories',
//                 },
//               },
//               y: {
//                 title: {
//                   display: true,
//                   text: 'Count',
//                 },
//                 suggestedMin: 25,
//               },
//             },
//             onClick: (_, elements) => {
//               if (elements.length > 0) {
//                 const clickedIndex = elements[0].index;
//                 handleCategoryClick(clickedIndex);
//               }
//             },
//           };



//           const handleCategoryClick = (index) => {
//                 const clickedCategory = labels[index];
//                 console.log('Bar clicked! Navigating to:', `/risksubcategory/${encodeURIComponent(clickedCategory)}`);
//                 //navigate(`/risksubcategory/${encodeURIComponent(clickedCategory)}`);
//               };
            
//               return (
//                     <div className="chart-container">
//                       <div className='category'>
//                       <h2>Risk Category Distribution</h2>
//                       <div className="centered-chart">
//                         <Bar data={chartData} options={options} width={500} height={500} plugins={[ReactTooltip]} />
//                       </div>
//                       </div>
//                       <div className='subcategory'>
//                       <h2>{`Subcategories for ${category}`}</h2>
//                     {subCategories.length > 0 ? (
//                       <div className="centered-chart">
//                         <Bar
//                           data={chartDataConfig}
//                           options={options}
//                           width={500} // Adjust the width as needed
//                           height={500} // Adjust the height as needed
//                           plugins={[ReactTooltip]}
//                         />
//                       </div>
//                     ) : (
//                       <p>No subcategories data available.</p>
//                     )}
//                       </div>
//                     </div>
//                   )
//                 };
            
//                 export default CombinedRiskGraphs;


















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import * as API from '../endpoint';
import './RiskCategoryGraph.css';

const CombinedRiskGraphs = () => {
  const [riskData, setRiskData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API.RISKCATEGORY_RISK_API);
        setRiskData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(API.RISKSUBCATEGORY_RISK_API(category));
        console.log('Subcategories API response:', response.data);
        setSubCategories(response.data || []); // Ensure that subCategories is an array even if the response is undefined
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubCategories([]); // Set subCategories to an empty array in case of an error
      }
    };

    fetchSubCategories();
  }, [category]);

  const labels = riskData.map((item) => item.category_name);
  const data = riskData.map((item) => item.category_count);

  const chartLabels = subCategories.map((subCategory) => subCategory.subcategory);
  const chartData = subCategories.map((subCategory) => subCategory.subcategory_count);

  const handleCategoryClick = (index) => {
    const clickedCategory = labels[index];
    console.log('Bar clicked! Displaying subcategories for:', clickedCategory);
    // You can update the state or perform any other actions to display subcategories beside the category graph.
  };

  const chartDataCategory = {
    labels,
    datasets: [
      {
        label: 'Risk Category Distribution',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data,
      },
    ],
  };

  const optionsCategory = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Risk Categories',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        suggestedMin: 25,
      },
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        handleCategoryClick(clickedIndex);
      }
    },
  };

  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Subcategory Count',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: chartData,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Subcategories',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        suggestedMin: 25,
      },
    },
    onClick: (_, elements) => {
      // You can handle subcategory clicks here if needed.
    },
  };

  return (
    <div className="chart-container">
      <div className="category">
        <h2>Risk Category Distribution</h2>
        <div className="centered-chart">
          <Bar data={chartDataCategory} options={optionsCategory} width={500} height={500} plugins={[ReactTooltip]} />
        </div>
      </div>
      <div className="subcategory">
        <h2>{`Subcategories for ${category}`}</h2>
        {subCategories.length > 0 ? (
          <div className="centered-chart">
            <Bar data={chartDataConfig} options={options} width={500} height={500} plugins={[ReactTooltip]} />
          </div>
        ) : (
          <p>No subcategories data available.</p>
        )}
      </div>
    </div>
  );
};

export default CombinedRiskGraphs;
