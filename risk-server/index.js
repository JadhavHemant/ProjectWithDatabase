const express = require('express');
const app = express();
const bodyParser= require("body-parser");
const cors =require("cors");
//const mysql= require("mysql2");
const axios = require('axios');
const pg = require('pg');
const db = new pg.Pool({
    user: "postgres",
    host: "34.71.87.187",
    database: "airegulation_dev",
    password: "India@5555",
    port: 5432,
  });

// const db=new pg.Pool({
//     user:"postgres",
//     host: "localhost",
//     password:"sql1234",
//     database:"passioninfotech",
//     port:5432,
// });



// app.get('/api/barGraphData', async (req, res) => {
//     try {
//       const query = 'SELECT objecttype, COUNT(*) FROM p_object_type GROUP BY objecttype';
//       const { rows } = await pool.query(query);
  
//       const labels = rows.map((row) => row.objecttype);
//       const data = rows.map((row) => row.count);
  
//       const chartData = {
//         labels,
//         data,
//       };
  
//       res.json(chartData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//     }
//   });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
/******add objectid p_object_type Table*******/
app.get("/node-api/api/get", (req, res) => {
  const sqlGet= "SELECT * from ai.p_object_type";
  db.query(sqlGet,(error,result)=>{
      res.json(result.rows);
  }
  );
});


/******add objectid p_object_type Table*******/
app.post("/node-api/api/post", (req, res) => {
      const {objecttype,objecttypedescription,iconupload,fileupload} = req.body;
      const sqlInsert="INSERT INTO ai.p_object_type (objecttype,objecttypedescription,iconupload,fileupload) values($1, $2, $3, $4)";
      const values=[objecttype,objecttypedescription,iconupload,fileupload];
      db.query(sqlInsert ,values,(error,result)=>{
          if (error) {
              console.error("error intersting object type",error);
              res.status(500).json({error:"internal server error"})
          }else{
              res.status(200).json({message:"object type inserted sucessfully"});
          }
      } );
});


/******delete objectid p_object_type Table*******/
app.delete("/node-api/api/delete/:objectid", (req, res) => {
  const {objectid} = req.params;
  const sqlRemove="Delete from ai.p_object_type where objectid=$1";
  db.query(sqlRemove ,[objectid],(error,result)=>{
      if(error) {
          console.log(error);
          return res.status(500).send("an error occurred while deleting object type")
      }
      res.send("object type deleted successfully")
  } );
});



app.get("/node-api/api/get/:objectid", async(req, res) => {
  try{
  const {objectid} = req.params;
  const sqlGet= "SELECT * FROM ai.p_object_type WHERE objectid=$1";
 const result= await db.query(sqlGet,[objectid]);
 res.send(result.rows);
}catch(error){
  console.error(error);
  res.status(500).send("an error occurred while fectching the object type");
}
});


/******Edit objectid p_object_type Table*******/
app.put("/node-api/api/update/:objectid", (req, res) => {
  const {objectid} = req.params;
  const {objecttype,objecttypedescription,iconupload,fileupload} = req.body;
   
  const sqlUpdate="UPDATE ai.p_object_type SET objecttype=$1,objecttypedescription=$2,iconupload=$3,fileupload=$4 WHERE objectid=$5";
  db.query(sqlUpdate,[objecttype,objecttypedescription,iconupload,fileupload,objectid],(error,result)=>{
      if (error) {
          console.error("error inserting object type",error);
         return res.status(500).send("an error occurred while updating the object type");
  }
      res.send("object type updated sucessfully");
});
});

/*-------------------------------------------p_object_name table---------------------------------------------------------------------------------------------*/


/***************add nameid p_object_name Table******************/
app.get("/node-api/api/add", (req, res) => {
    const sqlGet= "SELECT * from ai.p_object_name";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});

/***************add nameid p_object_name Table******************/
app.post("/node-api/api/save", (req, res) => {
    const {objecttype,objectcode,objectdescription,dependentobjectcode,iconupload,fileupload} = req.body;
    const sqlInsert="INSERT INTO ai.p_object_name (objecttype,objectcode,objectdescription,dependentobjectcode,iconupload,fileupload) values($1, $2, $3, $4, $5, $6)";
   const values=[objecttype,objectcode,objectdescription,dependentobjectcode,iconupload,fileupload];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting object type",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"object name inserted sucessfully"});
        }
    } );
});


/***************delete nameid p_object_name Table******************/
app.delete("/node-api/api/remove/:nameid", (req, res) => {
    const {nameid} = req.params;
    const sqlRemove="Delete from ai.p_object_name where nameid=$1";
    db.query(sqlRemove ,[nameid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting object name")
        }
        res.send("object name deleted successfully")
    } );
});


app.get("/node-api/api/add/:nameid", async(req, res) => {
    try{
    const {nameid} = req.params;
    const sqlGet= "SELECT * FROM ai.p_object_name WHERE nameid=$1";
    const result= await db.query(sqlGet,[nameid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the object name");
}
});


/***************Edit nameid p_object_name Table******************/
app.put("/node-api/api/edit/:nameid", (req, res) => {
    const {nameid} = req.params;
    const {objecttype,objectcode,objectdescription,dependentobjectcode,iconupload,fileupload} = req.body;
     
    const sqlUpdate="UPDATE ai.p_object_name SET objecttype=$1,objectcode=$2,objectdescription=$3,dependentobjectcode=$4,iconupload=$5,fileupload=$6 WHERE nameid=$7";
    
    db.query(sqlUpdate,[objecttype,objectcode,objectdescription,dependentobjectcode,iconupload,fileupload,nameid],(error,result)=>{
            
        if (error) {
            console.error("error inserting object type",error);
           return res.status(500).send("an error occurred while updating the object name");
    }
        res.send("object name updated sucessfully");
});
});


/*---------------------------------------Responsibility_Group-------------------------------------------------------------------------------*/

/***************add responsibilityid responsibility_group Table******************/
app.get("/node-api/api/in", (req, res) => {
    const sqlGet= "SELECT * from ai.responsibility_group";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});

/***************add responsibilityid responsibility_group Table******************/

app.post("/node-api/api/display", (req, res) => {
    const {responsibilitytype,responsibilitytypedescription,iconupload,fileupload} = req.body;
    const sqlInsert="INSERT INTO ai.responsibility_group (responsibilitytype,responsibilitytypedescription,iconupload,fileupload) values($1, $2, $3, $4)";
    const values=[responsibilitytype,responsibilitytypedescription,iconupload,fileupload];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting object type",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"Responsibility Group inserted sucessfully"});
        }
    } );
});


/***************delete responsibilityid responsibility_group Table******************/

app.delete("/node-api/api/dremoves/:responsibilityid", (req, res) => {
    const {responsibilityid} = req.params;
    const sqlRemove="Delete from ai.responsibility_group where responsibilityid=$1";
    db.query(sqlRemove ,[responsibilityid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting Responsibility Group")
        }
        res.send("Responsibility Group deleted successfully")
    } );
});



app.get("/node-api/api/in/:responsibilityid", async(req, res) => {
    try{
    const {responsibilityid} = req.params;
    const sqlGet= "SELECT * FROM ai.responsibility_group WHERE responsibilityid=$1";
   const result= await db.query(sqlGet,[responsibilityid]);
   res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the Responsibility Group");
}
});


/***************Edit responsibilityid responsibility_group Table******************/

app.put("/node-api/api/change/:responsibilityid", (req, res) => {
    const {responsibilityid} = req.params;
    const {responsibilitytype,responsibilitytypedescription,iconupload,fileupload} = req.body;
     
    const sqlUpdate="UPDATE ai.responsibility_group SET responsibilitytype=$1,responsibilitytypedescription=$2,iconupload=$3,fileupload=$4 WHERE responsibilityid=$5";
    db.query(sqlUpdate,[responsibilitytype,responsibilitytypedescription,iconupload,fileupload,responsibilityid],(error,result)=>{
        if (error) {
            console.error("error inserting object type",error);
           return res.status(500).send("an error occurred while updating the Responsibility Group");
    }
        res.send("Responsibility Group updated sucessfully");
});
});

/*-------------------------------------------------------Responsibility_Center-------------------------------------------------------------------------*/


/***************add responsibilitynameid Responsibility_Center Table******************/

app.get("/node-api/api/adding", (req, res) => {
    const sqlGet= "SELECT * from ai.responsibility_center";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});

/***************add responsibilitynameid Responsibility_Center Table******************/
app.post("/node-api/api/saving", (req, res) => {
    const {responsibilitytype,responsibilitycode,responsibilitydescription,dependentresponsibilitycode,iconupload,fileupload} = req.body;
    const sqlInsert="INSERT INTO ai.responsibility_center (responsibilitytype,responsibilitycode,responsibilitydescription,dependentresponsibilitycode,iconupload,fileupload) values($1, $2, $3, $4, $5, $6)";
   const values=[responsibilitytype,responsibilitycode,responsibilitydescription,dependentresponsibilitycode,iconupload,fileupload];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting object type",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"Responsibility Center inserted sucessfully"});
        }
    } );
});



/***************delete responsibilitynameid Responsibility_Center Table******************/
app.delete("/node-api/api/deleted/:responsibilitynameid", (req, res) => {
    const {responsibilitynameid} = req.params;
    const sqlRemove="Delete from ai.responsibility_center where responsibilitynameid=$1";
    db.query(sqlRemove ,[responsibilitynameid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting Responsibility Center")
        }
        res.send("term deleted successfully")
    } );
});




app.get("/node-api/api/adding/:responsibilitynameid", async (req, res) => {
    try {
      const { responsibilitynameid } = req.params;
      const sqlGet = "SELECT * FROM ai.responsibility_center WHERE responsibilitynameid=$1";
      const result = await db.query(sqlGet, [responsibilitynameid]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the responsibility center");
    }
  });
  

/***************Edit responsibilitynameid Responsibility_Center Table******************/
  app.put("/node-api/api/convert/:responsibilitynameid", (req, res) => {
    const { responsibilitynameid } = req.params;
    const {
        responsibilitytype,responsibilitycode, responsibilitydescription, dependentresponsibilitycode,iconupload,fileupload } = req.body;

    const sqlUpdate = ` UPDATE ai.responsibility_center  SET 
            responsibilitytype = $1, 
            responsibilitycode = $2, 
            responsibilitydescription = $3, 
            dependentresponsibilitycode = $4, 
            iconupload = $5, 
            fileupload = $6 
        WHERE responsibilitynameid = $7`;

    db.query(sqlUpdate, [responsibilitytype,responsibilitycode,responsibilitydescription, dependentresponsibilitycode, iconupload, fileupload, responsibilitynameid ], (error, result) => {
        if (error) {
            console.error("Error updating object type", error);
            return res.status(500).send("An error occurred while updating the Responsibility Center");
        }
        res.send("Responsibility Center updated successfully");
    });
});



/*---------------------------------------------------------Parameter Category------------------------------------------------------------------------------------------*/

/***************add categoryid parameter_category Table******************/
app.get("/node-api/api/parameteradd", (req, res) => {
    const sqlGet= "SELECT * from ai.parameter_category";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});


/***************add categoryid parameter_category Table******************/
app.post("/node-api/api/parametersaving", (req, res) => {
    const { categorycode, categoryname, fileupload,categorytype,checkbox,radiobutton,date,continuetext, continuenumber} = req.body;
    const sqlInsert="INSERT INTO ai.parameter_category ( categorycode, categoryname, fileupload,categorytype,checkbox,radiobutton,date,continuetext, continuenumber) values($1, $2, $3, $4, $5, $6,$7,$8,$9)";
   const values=[ categorycode, categoryname, fileupload,categorytype,checkbox,radiobutton,date,continuetext, continuenumber];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting object type",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"Parameter Category inserted sucessfully"});
        }
    } );
});


/***************post categoryid parameter_category Table******************/
app.delete("/node-api/api/parameterdeleted/:categoryid", async (req, res) => {
    try {
        const { categoryid } = req.params;
        const sqlRemove = "DELETE FROM ai.parameter_category WHERE categoryid = $1";
        const result = await db.query(sqlRemove, [categoryid]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Parameter not found" });
        }

        res.json({ message: "Parameter Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the parameter category" });
    }
});


app.get("/node-api/api/parameteradd/:categoryid", async (req, res) => {
    try {
      const { categoryid } = req.params;
      const sqlGet = "SELECT * FROM ai.parameter_category WHERE categoryid = $1";
      const result = await db.query(sqlGet, [categoryid]);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the parameter category");
    }
  });

  /***************Edit categoryid parameter_category Table******************/
  
  app.put("/node-api/api/parameterupdate/:categoryid", async (req, res) => {
    try {
      const { categoryid } = req.params;
      const { categorycode, categoryname, fileupload, categorytype, checkbox, radiobutton, date, continuetext, continuenumber } = req.body;
  
      const sqlUpdate = "UPDATE ai.parameter_category SET categorycode = $1, categoryname = $2, fileupload = $3, categorytype = $4, checkbox = $5, radiobutton = $6, date = $7, continuetext = $8, continuenumber = $9 WHERE categoryid = $10";
      const values = [categorycode, categoryname, fileupload, categorytype, checkbox, radiobutton, date, continuetext, continuenumber, categoryid];
  
      await db.query(sqlUpdate, values);
      res.send("Parameter updated successfully");
    } catch (error) {
      console.error("Error updating Parameter Category:", error);
      res.status(500).send("An error occurred while updating the Parameter Category");
    }
  });
  


/*-------------------------------------------------------------------------parameter------------------------------------------------------------------------------------------------------------*/



/***************add parameterid parameter Table******************/
app.get("/node-api/api/parget", (req, res) => {
    const sqlGet= "SELECT * from ai.parameter";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});

/***************add parameterid parameter Table******************/
app.post("/node-api/api/parpost", (req, res) => {
    const {categorycode,parametercode,evidence,fileupload} = req.body;
    const sqlInsert="INSERT INTO ai.parameter (categorycode,parametercode,evidence,fileupload) values($1, $2, $3, $4)";
   const values=[categorycode,parametercode,evidence,fileupload];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting object type",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"parameter inserted sucessfully"});
        }
    } );
});


/***************deleted parameterid parameter Table******************/
app.delete("/node-api/api/pardelete/:parameterid", (req, res) => {
    const {parameterid} = req.params;
    const sqlRemove="Delete from ai.parameter where parameterid=$1";
    db.query(sqlRemove ,[parameterid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting parameter")
        }
        res.send("parameter deleted successfully")
    } );
});


app.get("/node-api/api/parget/:parameterid", async(req, res) => {
    try{
    const {parameterid} = req.params;
    const sqlGet= "SELECT * FROM ai.parameter WHERE parameterid=$1";
    const result= await db.query(sqlGet,[parameterid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the parameter");
}
});


/***************Edit parameterid parameter Table******************/
app.put("/node-api/api/parput/:parameterid", (req, res) => {
    const {parameterid} = req.params;
    const {categorycode,parametercode,evidence,fileupload} = req.body;
     
    const sqlUpdate="UPDATE ai.parameter SET categorycode=$1,parametercode=$2,evidence=$3,fileupload=$4 WHERE parameterid=$5 ";
    
    db.query(sqlUpdate,[categorycode,parametercode,evidence,fileupload,parameterid],(error,result)=>{
            
        if (error) {
            console.error("error inserting object type",error);
           return res.status(500).send("an error occurred while updating the parameter");
    }
        res.send("parameter updated sucessfully");
});
});





/*------------------------------------------------------risk_category-----------------------------------------------------------------------------------*/


/***************add riskcategoryid risk_category Table******************/
app.get("/node-api/api/riskadd", (req, res) => {
    const sqlGet= "SELECT * from ai.risk_category";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});



/***************add riskcategoryid risk_category Table******************/
app.post("/node-api/api/risksaving", (req, res) => {
    const { categorycode, categoryname, fileupload,categorytype,checkbox,radiobutton,date,continuetext, continuenumber,weigth} = req.body;
    const sqlInsert="INSERT INTO ai.risk_category ( categorycode, categoryname, fileupload,categorytype,checkbox,radiobutton,date,continuetext, continuenumber,weigth) values($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)";
   const values=[ categorycode, categoryname, fileupload,categorytype,checkbox,radiobutton,date,continuetext, continuenumber,weigth];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting object type",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"Risk Category inserted sucessfully"});
        }
    } );
});



/***************deleted riskcategoryid risk_category Table******************/
app.delete("/node-api/api/riskdeleted/:riskcategoryid", async (req, res) => {
    try {
        const { riskcategoryid } = req.params;
        const sqlRemove = "DELETE FROM ai.risk_category WHERE riskcategoryid = $1";
        const result = await db.query(sqlRemove, [riskcategoryid]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Parameter not found" });
        }

        res.json({ message: "Parameter deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the Risk Category" });
    }
});


app.get("/node-api/api/riskadd/:riskcategoryid", async (req, res) => {
    try {
      const { riskcategoryid } = req.params;
      const sqlGet = "SELECT * FROM ai.risk_category WHERE riskcategoryid = $1";
      const result = await db.query(sqlGet, [riskcategoryid]);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the Risk Category");
    }
  });
  

  
/***************Edit riskcategoryid risk_category Table******************/
  app.put("/node-api/api/riskupdate/:riskcategoryid", async (req, res) => {
    try {
      const { riskcategoryid } = req.params;
      const { categorycode, categoryname, fileupload, categorytype, checkbox, radiobutton, date, continuetext, continuenumber ,weigth } = req.body;
  
      const sqlUpdate = "UPDATE ai.risk_category SET categorycode = $1, categoryname = $2, fileupload = $3, categorytype = $4, checkbox = $5, radiobutton = $6, date = $7, continuetext = $8, continuenumber = $9 , weigth=$10 WHERE riskcategoryid = $11";
      const values = [categorycode, categoryname, fileupload, categorytype, checkbox, radiobutton, date, continuetext, continuenumber,weigth, riskcategoryid];
  
      await db.query(sqlUpdate, values);
      res.send("Parameter updated successfully");
    } catch (error) {
      console.error("Error updating Risk Category:", error);
      res.status(500).send("An error occurred while updating the Risk Category");
    }
  });
  

/*-------------------------------------------------------------subcategory---------------------------------------------------------------------------*/



/***************add subcategoryid subcategory Table******************/
app.get("/node-api/api/subget", (req, res) => {
    const sqlGet= "SELECT * from ai.subcategory";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});


/***************add subcategoryid subcategory Table******************/
app.post("/node-api/api/subpost", (req, res) => {
        const {subcategorytype,subcategorytypedescription,iconupload,fileupload} = req.body;
        const sqlInsert="INSERT INTO ai.subcategory (subcategorytype,subcategorytypedescription,iconupload,fileupload) values($1, $2, $3, $4)";
        const values=[subcategorytype,subcategorytypedescription,iconupload,fileupload];
        db.query(sqlInsert ,values,(error,result)=>{
            if (error) {
                console.error("error intersting object type",error);
                res.status(500).json({error:"internal server error"})
            }else{
                res.status(200).json({message:"SubCategory inserted sucessfully"});
            }
        } );
});


/***************deleted subcategoryid subcategory Table******************/
app.delete('/api/subdelete/:subcategoryid', async (req, res) => {
    const { subcategoryid } = req.params;
  
    try {
      const sqlDelete = "DELETE FROM ai.subcategory WHERE subcategoryid = $1";
      await db.query(sqlDelete,[subcategoryid]);
  
      res.json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the SubCategory' });
    }
  });
  


app.get("/node-api/api/subget/:subcategoryid", async(req, res) => {
    try{
    const {subcategoryid} = req.params;
    const sqlGet= "SELECT * FROM ai.subcategory WHERE subcategoryid=$1";
   const result= await db.query(sqlGet,[subcategoryid]);
   res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the SubCategory");
}
});


/***************Edit subcategoryid subcategory Table******************/
app.put("/node-api/api/subupdate/:subcategoryid", (req, res) => {
    const {subcategoryid} = req.params;
    const {subcategorytype,subcategorytypedescription,iconupload,fileupload} = req.body;
     
    const sqlUpdate="UPDATE ai.subcategory SET subcategorytype=$1,subcategorytypedescription=$2,iconupload=$3,fileupload=$4 WHERE subcategoryid=$5";
    db.query(sqlUpdate,[subcategorytype,subcategorytypedescription,iconupload,fileupload,subcategoryid],(error,result)=>{
        if (error) {
            console.error("error inserting SubCategory",error);
           return res.status(500).send("an error occurred while updating the SubCategory");
    }
        res.send("SubCategory updated sucessfully");
});
});



/*--------------------------------------------------risk_group---------------------------------------------------------------*/



/***************add riskgroupid risk_group Table******************/
app.get("/node-api/api/riskgroupadd", (req, res) => {
    const sqlGet= "SELECT * from ai.risk_group";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});


/***************add riskgroupid risk_group Table******************/
app.post("/node-api/api/riskgroupsaving", (req, res) => {
    const { riskgroupcode, riskgroupname, fileupload,riskgrouptype,checkbox,radiobutton,date,continuetext, continuenumber ,weigth} = req.body;
    const sqlInsert="INSERT INTO ai.risk_group ( riskgroupcode, riskgroupname, fileupload,riskgrouptype,checkbox,radiobutton,date,continuetext, continuenumber,weigth) values($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)";
   const values=[ riskgroupcode, riskgroupname, fileupload,riskgrouptype,checkbox,radiobutton,date,continuetext, continuenumber,weigth];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting  Risk Group",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"Risk Group inserted sucessfully"});
        }
    } );
});


/**************deleted riskgroupid risk_group Table******************/
app.delete("/node-api/api/riskgroupdeleted/:riskgroupid", async (req, res) => {
    try {
        const { riskgroupid } = req.params;
        const sqlRemove = "DELETE FROM ai.risk_group WHERE riskgroupid = $1";
        const result = await db.query(sqlRemove, [riskgroupid]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Risk Group not found" });
        }

        res.json({ message: "Risk Group deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the Risk Group" });
    }
});


app.get("/node-api/api/riskgroupadd/:riskgroupid", async (req, res) => {
    try {
      const { riskgroupid } = req.params;
      const sqlGet = "SELECT * FROM ai.risk_group WHERE riskgroupid = $1";
      const result = await db.query(sqlGet, [riskgroupid]);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the Risk Group");
    }
  });
  

  /***************Edit riskgroupid risk_group Table******************/
  app.put("/node-api/api/riskgroupupdate/:riskgroupid", async (req, res) => {
    try {
      const { riskgroupid } = req.params;
      const { riskgroupcode, riskgroupname, fileupload, riskgrouptype, checkbox, radiobutton, date, continuetext, continuenumber ,weigth} = req.body;
  
      const sqlUpdate = "UPDATE risk_group SET riskgroupcode = $1, riskgroupname = $2, fileupload = $3, riskgrouptype = $4, checkbox = $5, radiobutton = $6, date = $7, continuetext = $8, continuenumber = $9 ,weigth=$10 WHERE riskgroupid = $11";
      const values = [riskgroupcode, riskgroupname, fileupload, riskgrouptype, checkbox, radiobutton, date, continuetext, continuenumber,weigth,riskgroupid];
  
      await db.query(sqlUpdate, values);
      res.send("Risk Group updated successfully");
    } catch (error) {
      console.error("Error updating Risk Group:", error);
      res.status(500).send("An error occurred while updating the Risk Group");
    }
  });


/*---------------------------------------------------risk_severit-----------------------------------------------------------------*/




/***************add riskseverityid risk_severit Table******************/
app.get("/node-api/api/riskseverityget", (req, res) => {
    const sqlGet= "SELECT * from ai.risk_severity";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});


/***************add riskseverityid risk_severit Table******************/
app.post("/node-api/api/riskseveritypost", (req, res) => {
        const {riskseveritytype,riskseveritytypedescription,iconupload,fileupload,riskseverityvalue} = req.body;
        const sqlInsert="INSERT INTO ai.risk_severity (riskseveritytype,riskseveritytypedescription,iconupload,fileupload,riskseverityvalue) values($1, $2, $3, $4, $5)";
        const values=[riskseveritytype,riskseveritytypedescription,iconupload,fileupload,riskseverityvalue];
        db.query(sqlInsert ,values,(error,result)=>{
            if (error) {
                console.error("error intersting risk severity",error);
                res.status(500).json({error:"internal server error"})
            }else{
                res.status(200).json({message:"Risk Severity inserted sucessfully"});
            }
        } );
});


/***************deleted riskseverityid risk_severit Table******************/
app.delete('/api/riskseveritydelete/:riskseverityid', async (req, res) => {
    const { riskseverityid } = req.params;
  
    try {
      const sqlDelete = "DELETE FROM ai.risk_severity WHERE riskseverityid = $1";
      await db.query(sqlDelete,[riskseverityid]);
  
      res.json({ message: 'Risk Severity deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the Risk Severity' });
    }
  });
  


app.get("/node-api/api/riskseverityget/:riskseverityid", async(req, res) => {
    try{
    const {riskseverityid} = req.params;
    const sqlGet= "SELECT * FROM ai.risk_severity WHERE riskseverityid=$1";
   const result= await db.query(sqlGet,[riskseverityid]);
   res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the Risk Severity");
}
});


/***************Edit riskseverityid risk_severit Table******************/
app.put("/node-api/api/riskseverityupdate/:riskseverityid", (req, res) => {
    const {riskseverityid} = req.params;
    const {riskseveritytype,riskseveritytypedescription,iconupload,fileupload,riskseverityvalue} = req.body;
     
    const sqlUpdate="UPDATE ai.risk_severity SET riskseveritytype=$1,riskseveritytypedescription=$2,iconupload=$3,fileupload=$4,riskseverityvalue=$5 WHERE riskseverityid=$6";
    db.query(sqlUpdate,[riskseveritytype,riskseveritytypedescription,iconupload,fileupload,riskseverityvalue,riskseverityid],(error,result)=>{
        if (error) {
            console.error("error inserting risk severity",error);
           return res.status(500).send("an error occurred while updating the Risk Severity");
    }
        res.send("Risk Severityupdated sucessfully");
});
});


/*----------------------------------------------------Risk Table-------------------------------------------------------------------------*/


/***************riskid table ******************/

app.get("/node-api/api/risksget", (req, res) => {
    const sqlGet= "SELECT * from ai.risk";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});




/***************add riskid******************/

app.post("/node-api/api/riskspost", (req, res) => {
    // Destructure the data from the request body
    const {
        organization, responsibilitygroup, responsibilitycenter, riskdate, project, object,
        riskname, riskcode, category, severity, riskgroup, subcategory, description, owner,
        actionplan, assigned, status, expectedcompletiondate, actualcompletiondate, complianceimplication,
        fileupload, vulnerability, threat, availability, integrity, probability, impact, riskexposure, objectname,
        newvalue, oldvalue, residualrisk, confidentiality, controlowner, mitigationstrategy, contingencystrategy,
        groupname, thrustarea, control, controlweigth, subcontrol, subcontrolweigth, remark, updatedate } = req.body;

    // Define the SQL query for inserting data into the database
    const sqlInsert = `
        INSERT INTO ai.risk(
            organization, responsibilitygroup, responsibilitycenter, riskdate, project, object,
            riskname, riskcode, category, severity, riskgroup, subcategory, description, owner,
            actionplan, assigned, status, expectedcompletiondate, actualcompletiondate, complianceimplication,
            fileupload, vulnerability, threat, availability, integrity, probability, impact, riskexposure, objectname,
            newvalue, oldvalue, residualrisk, confidentiality, controlowner, mitigationstrategy, contingencystrategy,
            groupname, thrustarea, control, controlweigth, subcontrol, subcontrolweigth, remark, updatedate ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
            $41, $42, $43, $44
        )`;

    // Define an array of values to be inserted into the database
    const values = [
        organization, responsibilitygroup, responsibilitycenter, riskdate, project, object,
        riskname, riskcode, category, severity, riskgroup, subcategory, description, owner,
        actionplan, assigned, status, expectedcompletiondate, actualcompletiondate, complianceimplication,
        fileupload, vulnerability, threat, availability, integrity, probability, impact, riskexposure, objectname,
        newvalue, oldvalue, residualrisk, confidentiality, controlowner, mitigationstrategy, contingencystrategy,
        groupname, thrustarea, control, controlweigth, subcontrol, subcontrolweigth, remark, updatedate];

    // Execute the SQL query and handle the result
    db.query(sqlInsert, values, (error, result) => {
        if (error) {
            console.error("Error inserting risk", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            console.log("Successfully inserted risk:", result); // Log the result
            res.status(200).json({ message: "Risk inserted successfully" });
        }
    });
});




/***************delete riskid******************/


app.delete('/api/risksdelete/:riskid', async (req, res) => {
    const { riskid } = req.params;

    try {
        const sqlDelete = "DELETE FROM ai.risk WHERE riskid = $1"; // Use the correct column name, assuming it's 'riskid'.
        await db.query(sqlDelete, [riskid]);

        res.json({ message: 'Risk deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the Risk' });
    }
});


/***************add riskid******************/


  app.get("/node-api/api/risksget/:riskid", async(req, res) => {
    try{
    const {riskid} = req.params;
    const sqlGet= "SELECT * FROM ai.risk WHERE riskid=$1";
   const result= await db.query(sqlGet,[riskid]);
   res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the Risk");
}
});


/*/******************add riskcode risk table************************/
app.get("/node-api/api/riskcodeget/:riskcode", async(req, res) => {
    try{
    const {riskcode} = req.params;
    const sqlGet= "SELECT * FROM ai.risk WHERE riskcode=$1";
   const result= await db.query(sqlGet,[riskcode]);
   res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the Risk");
}
});

/***************min risk exposure******************/

app.get("/node-api/api/riskexposure", async (req, res) => {
    try {
        const sqlGet = "SELECT riskcode, MIN(riskexposure) AS min_exposure FROM ai.risk GROUP BY riskcode ORDER BY min_exposure ASC;"; 
        const result = await db.query(sqlGet);
        res.send(result.rows);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the Risk");
      }
    });      





/************** risk category******************/

app.get('/node-api/api/riskcategory', async (req, res) => {
    try {
      const sqlGet = `
        SELECT DISTINCT category as category_name, COUNT(*) as category_count 
        FROM ai.risk 
        GROUP BY category;
      `; 
      const result = await db.query(sqlGet);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });



  


  /************** risk subcategory******************/

  app.get('/node-api/api/risksubcategory/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const sqlGet = `
      SELECT subcategory, COUNT(*) AS subcategory_count
      FROM ai.risk
      WHERE category =$1
      GROUP BY subcategory;
      `;
  
      const result = await db.query(sqlGet, [category]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });
  
  
  /************** risk RiskGroup******************/

  app.get('/node-api/api/riskgroupgraph/:subcategory', async (req, res) => {
    try {
      const { subcategory } = req.params;
      const sqlGet = `
      SELECT riskgroup, COUNT(*) AS riskgroup_count
      FROM ai.risk
      WHERE subcategory =$1
      GROUP BY riskgroup;
      `;
  
      const result = await db.query(sqlGet, [subcategory]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  }); 


/************** risk severity******************/

app.get('/node-api/api/riskseveritygraph/:riskgroup', async (req, res) => {
    try {
      const { riskgroup } = req.params;
      const sqlGet = `
      SELECT severity
      FROM ai.risk
      WHERE riskgroup =$1
      GROUP BY severity;
      `;
  
      const result = await db.query(sqlGet, [riskgroup]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });
  
/************** risk subcategory Report******************/

app.get('/node-api/api/risksubcategoryreport/:category', async (req, res) => {
    const{ category}= req.params;
    try {
          const sqlGet = `
    SELECT organization, responsibilitygroup, responsibilitycenter, 
    riskdate, project, object, riskname, riskcode, severity, 
    riskgroup, subcategory, racitype, risktype
	FROM ai.risk WHERE category=$1;
      `;
  
      const result = await db.query(sqlGet,[category]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });
  

/************** risk RiskGroup Report******************/

app.get('/node-api/api/riskgroupreport/:subcategory', async (req, res) => {
    const{ subcategory}= req.params;
    try {
          const sqlGet = `
    SELECT organization, responsibilitygroup, responsibilitycenter, 
    riskdate, project, object, riskname, riskcode, severity, 
    riskgroup, subcategory, racitype, risktype
	FROM ai.risk WHERE subcategory=$1;
      `;
  
      const result = await db.query(sqlGet,[subcategory]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });



  /************** risk Riskseverity Report******************/

app.get('/node-api/api/riskseverityreport/:riskgroup', async (req, res) => {
    const{ riskgroup}= req.params;
    try {
          const sqlGet = `
    SELECT organization, responsibilitygroup, responsibilitycenter, 
    riskdate, project, object, riskname, riskcode, severity, 
    riskgroup, subcategory, racitype, risktype
	FROM ai.risk WHERE riskgroup=$1;
      `;
  
      const result = await db.query(sqlGet,[riskgroup]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });



/***************Edit the riskid******************/

app.put("/node-api/api/riskadd", async (req, res) => {
    try {
        
        const {
            organization,responsibilitygroup,responsibilitycenter, riskdate,project,object,
            riskname,riskcode, category,severity,riskgroup,subcategory,description,owner,actionplan,assigned,
            status,expectedcompletiondate,actualcompletiondate,complianceimplication,fileupload,vulnerability,
            threat, confidentiality, availability, integrity,
            probability, impact, riskexposure,objectname, newvalue,oldvalue,residualrisk,
            controlowner, mitigationstrategy,contingencystrategy,updatedate,groupname,thrustarea,
            control,controlweigth,subcontrol,subcontrolweigth,remark,} = req.body;

            const sqlInsert = `
            INSERT INTO ai.risk(
                organization, responsibilitygroup, responsibilitycenter, riskdate, project, object,
                riskname, riskcode, category, severity, riskgroup, subcategory, description, owner,
                actionplan, assigned, status, expectedcompletiondate, actualcompletiondate, complianceimplication,
                fileupload, vulnerability, threat, availability, integrity, probability, impact, riskexposure, objectname,
                newvalue, oldvalue, residualrisk, confidentiality, controlowner, mitigationstrategy, contingencystrategy,
                groupname, thrustarea, control, controlweigth, subcontrol, subcontrolweigth, remark, updatedate ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
                $41, $42, $43, $44
            )`;

        const result = await db.query(sqlInsert, [
            organization, responsibilitygroup, responsibilitycenter, riskdate, project, object,
            riskname, riskcode, category, severity, riskgroup, subcategory, description, owner,
            actionplan, assigned, status, expectedcompletiondate, actualcompletiondate, complianceimplication,
            fileupload, vulnerability, threat, availability, integrity, probability, impact, riskexposure, objectname,
            newvalue, oldvalue, residualrisk, confidentiality, controlowner, mitigationstrategy, contingencystrategy,
            groupname, thrustarea, control, controlweigth, subcontrol, subcontrolweigth, remark, updatedate ]);
        

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Risk not found or not updated.' });
        }

        res.json({ message: 'Risk updated successfully' });
    } catch (error) {
        console.error('Error updating risk:', error);
        res.status(500).json({ error: 'An error occurred while updating the Risk' });
    }
});

/***************Edit riskid risk Table******************/

app.put("/node-api/api/risksupdate/:riskid", async (req, res) => {
    try {
        const { riskid } = req.params;
        const {
            organization,responsibilitygroup,  responsibilitycenter,riskdate,project, object,
            riskname, riskcode, category, severity, riskgroup, subcategory, description, owner, 
            actionplan, assigned, status, expectedcompletiondate, actualcompletiondate, complianceimplication, 
            fileupload, vulnerability, threat, availability, integrity, probability, impact, riskexposure, objectname,
             newvalue, oldvalue, residualrisk, confidentiality,controlowner,mitigationstrategy,contingencystrategy,
             groupname,thrustarea,control,controlweigth,subcontrol,subcontrolweigth,remark,updatedate} = req.body;

        const sqlUpdate = `
            UPDATE ai.risk
            SET
            organization=$1,
            responsibilitygroup=$2, 
            responsibilitycenter=$3,
            riskdate=$4, 
            project=$5, 
            object=$6, 
            riskname=$7, 
            riskcode=$8, 
            category=$9, 
            severity=$10,
            riskgroup=$11,
            subcategory=$12, 
            description=$13,
            owner=$14, 
            actionplan=$15, 
            assigned=$16,
            status=$17, 
            expectedcompletiondate=$18,
             actualcompletiondate=$19,
            complianceimplication=$20,
            fileupload=$21,
            vulnerability=$22, 
            threat=$23, 
            availability=$24, 
            integrity=$25,
            probability=$26,
            impact=$27,
            riskexposure=$28,
             objectname=$29,
            newvalue=$30,
            oldvalue=$31,
            residualrisk=$32,
            confidentiality=$33,
            controlowner=$34,
            mitigationstrategy=$35,
            contingencystrategy=$36,
            groupname=$37,
            thrustarea=$38,
            control=$39,
            controlweigth=$40,
            subcontrol=$41,
            subcontrolweigth=$42,
            remark=$43,
            updatedate=$44
            WHERE riskid = $45`;

        const result = await db.query(sqlUpdate, [
            organization,responsibilitygroup,  responsibilitycenter,riskdate,project, object,
            riskname, riskcode, category, severity, riskgroup, subcategory, description, owner, 
            actionplan, assigned, status, expectedcompletiondate, actualcompletiondate, complianceimplication, 
            fileupload, vulnerability, threat, availability, integrity, probability, impact, riskexposure, objectname,
             newvalue, oldvalue, residualrisk, confidentiality,controlowner,mitigationstrategy,contingencystrategy,
             groupname,thrustarea,control,controlweigth,subcontrol,subcontrolweigth,remark,updatedate,riskid ]);
        

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Risk not found or not updated.' });
        }

        res.json({ message: 'Risk updated successfully' });
    } catch (error) {
        console.error('Error updating risk:', error);
        res.status(500).json({ error: 'An error occurred while updating the Risk' });
    }
});






 

/*-----------------------------------------------------Company--------------------------------------------------------------------------------*/


app.get("/node-api/companyget/api", (req, res) => {
    const sqlGet= "SELECT * from ai.company";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});



app.post("/node-api/companyadd/api", (req, res) => {
        const {companyname,contactname,contactemail,contactphone} = req.body;
        const sqlInsert="INSERT INTO ai.company (companyname,contactname,contactemail,contactphone) values($1, $2, $3, $4)";
        const values=[companyname,contactname,contactemail,contactphone];
        db.query(sqlInsert ,values,(error,result)=>{
            if (error) {
                console.error("error intersting object type",error);
                res.status(500).json({error:"internal server error"})
            }else{
                res.status(200).json({message:"company inserted sucessfully"});
            }
        } );
});



app.delete('/companyremove/api/:companyid', async (req, res) => {
    const { companyid } = req.params;
  
    try {
      const sqlDelete = "DELETE FROM ai.company WHERE companyid = $1";
      await db.query(sqlDelete,[companyid]);
  
      res.json({ message: 'company deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the company' });
    }
  });
  


app.get("/node-api/companyget/api/:companyid", async(req, res) => {
    try{
    const {companyid} = req.params;
    const sqlGet= "SELECT * FROM ai.company WHERE companyid=$1";
   const result= await db.query(sqlGet,[companyid]);
   res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the company");
}
});



app.put("/node-api/updatecompany/api/:companyid", (req, res) => {
    const {companyid} = req.params;
    const {companyname,contactname,contactemail,contactphone} = req.body;
     
    const sqlUpdate="UPDATE ai.company SET companyname=$1,contactname=$2,contactemail=$3,contactphone=$4 WHERE companyid=$5";
    db.query(sqlUpdate,[companyname,contactname,contactemail,contactphone,companyid],(error,result)=>{
        if (error) {
            console.error("error inserting SubCategory",error);
           return res.status(500).send("an error occurred while updating the company");
    }
        res.send("company updated sucessfully");
});
});

/*------------------------------------Project--------------------------------------------------*/
//for adding a new Project
app.post("/node-api/projectadd/api/:companyid", (req, res) => {
  const { projectname, fromdate, todate } = req.body;
  const { companyid } = req.params;
  const sqlInsert =
    "INSERT INTO ai.project (projectname,fromdate,todate, companyid) VALUES ($1, $2,$3,$4)";
  db.query(
    sqlInsert,
    [projectname, fromdate, todate, companyid],
    (error, result) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json({ message: "Project  inserted successfully" });
      }
    }
  );
});

//for deleting the Project
app.delete("/node-api/projectRemove/:projectid", (req, res) => {
  const { projectid } = req.params;
  const sqlRemove = "DELETE FROM ai.project WHERE projectid = $1";

  db.query(sqlRemove, [projectid], (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while deleting the Project Details.");
    }

    res.send("Project details deleted successfully.");
  });
});

/* */
// for viewing the list of Projects
app.get("/node-api/projectgetapi", (req, res) => {
  const sqlGet = "SELECT * FROM ai.project ";

  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while fetching the Project Details.");
    }

    res.send(result.rows);
  });
});
/*************** */
// for viewing the list of Projects using companyid
app.get("/node-api/projectgetApi/:companyid", (req, res) => {
  const { companyid } = req.params;
  const sqlGet = "SELECT * FROM ai.project WHERE companyid = $1";

  db.query(sqlGet, [companyid], (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while fetching the Project Details.");
    }

    res.send(result.rows);
  });
});

//viewing the specific PROJECT
app.get("/node-api/projectApiGet/:projectid/:companyid", (req, res) => {
  const { projectid, companyid } = req.params;
  const sqlGet =
    "SELECT * FROM ai.project WHERE projectid = $1 AND companyid = $2";

  db.query(sqlGet, [projectid, companyid], (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while fetching the Project Details.");
    }

    if (result.rows.length === 0) {
      return res.status(404).send("Details not found.");
    }

    res.send(result.rows);
  });
});
/************** */
app.get("/node-api/specificproject/:projectid", (req, res) => {
  const { projectid } = req.params;
  const sqlGet = "SELECT * FROM ai.project WHERE projectid = $1 ";

  db.query(sqlGet, [projectid], (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while fetching the Project Details.");
    }

    if (result.rows.length === 0) {
      return res.status(404).send("Details not found.");
    }

    res.send(result.rows);
  });
});
/***For Viewing the Name of the project with Project id***** */
app.get("/node-api/namespecificproject/:projectid", (req, res) => {
  const { projectid } = req.params;
  const sqlGet = "SELECT ai.projectname FROM project WHERE projectid = $1 ";

  db.query(sqlGet, [projectid], (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while fetching the Project Details.");
    }

    if (result.rows.length === 0) {
      return res.status(404).send("Details not found.");
    }

    res.send(result.rows);
  });
});

//updating the project
app.put("/node-api/projectUpdate/api/:projectid/:companyid", (req, res) => {
  const { projectid, companyid } = req.params;
  const { projectname, fromdate, todate } = req.body;
  const sqlUpdateTerms =
    "UPDATE ai.project SET projectname=$1,fromdate=$2,todate=$3 WHERE projectid = $4 AND companyid = $5";

  db.query(
    sqlUpdateTerms,
    [projectname, fromdate, todate, projectid, companyid],
    (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send("An error occurred while updating the Project Details.");
      }

      res.send("Project Details updated successfully.");
    }
  );
});
/*------------------------------------------------------Algorithm Inventory-----------------------------------------------------------------------------------*/
app.get("/node-api/api/algorithminventoryget", (req, res) => {
    const sqlGet= "SELECT * from ai.algorithm_inventory";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});



app.post("/node-api/api/algorithminventorypost", (req, res) => {
    // Destructure the data from the request body
    const {
        organization,
        responsibilitygroup,
        responsibilitycenter,
        algorithminventorydate,
        project,
        projectcode,
        algorithminventorytime,
        algorithm,
        algorithmremark,
        dataset,
        dataremark,
        codevulnerability,
        codevulnerabilityremark,
        privacydata, 
        privacydataremark,
        algorithmbias,
        databias, 
        codevulnerabilitybias,
        privacydatabias,
        algorithmtestoutputurl,
        datasettestoutputurl,
        codevulnerabilitytestoutputurl,
        privacytestoutputurl,
        datasetstatus,
        algorithmstatus,
        codevulnerabilitystatus,
         privacydatastatus,
         explanability,
         transparency,
         fairness,
         ethics,
         robustness,
         reliability,
         codename,
          algorithmversiondate,
         datasetversiondate,
        codevulnerabilityversiondate,
        privacyversiondate,
        bias, 
        security,
        algorithmversionno,
        datasetversionno,
        codevulnerabilityversionno,
        privacyversionno,
        robustnessremark,
        explanabilityremark,
        transparencyremark,
        fairnessremark,
        biasremark, 
        ethicsremark,
        reliabilityremark,
        securityremark,
        performance,
        accountability,
        privacy,
        privacyremark,
        performanceremark,
        accountabilityremark,
        assessmentremark,
        assessmentfile,
        assessmentdate,
        auditremark,
        auditfile,
        auditdate
    } = req.body;

    // Define the SQL query for inserting data into the database
    const sqlInsert = `
        INSERT INTO ai.algorithm_inventory(
            organization,
            responsibilitygroup,
            responsibilitycenter,
            algorithminventorydate,
            project,
            projectcode,
            algorithminventorytime,
            algorithm,
            algorithmremark,
            dataset,
            dataremark,
            codevulnerability,
            codevulnerabilityremark,
            privacydata, 
            privacydataremark,
            algorithmbias,
            databias, 
            codevulnerabilitybias,
            privacydatabias,
            algorithmtestoutputurl,
            datasettestoutputurl,
            codevulnerabilitytestoutputurl,
            privacytestoutputurl,
            datasetstatus,
            algorithmstatus,
          codevulnerabilitystatus,
           privacydatastatus,
           explanability,
         transparency,
         fairness,
         ethics,
         robustness,
         reliability,
         codename,
         algorithmversiondate,
         datasetversiondate,
        codevulnerabilityversiondate,
        privacyversiondate,
        bias,
        security,
        algorithmversionno,
        datasetversionno,
        codevulnerabilityversionno,
        privacyversionno,
        robustnessremark,
        explanabilityremark,
        transparencyremark,
        fairnessremark,
        biasremark, 
        ethicsremark,
        reliabilityremark,
        securityremark,
        performance,
        accountability,
        privacy,
        privacyremark,
        performanceremark,
        accountabilityremark,
        assessmentremark,
        assessmentfile,
        assessmentdate,
        auditremark,
        auditfile,
        auditdate
         ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
             $18, $19, $20, $21, $22, $23, $24, $25 ,$26, $27 ,$28 ,$29, $30, $31, $32, $33 ,$34,
             $35 ,$36, $37, $38, $39, $40, $41, $42, $43, $44 ,$45, $46, $47, $48,
             $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64        )`;

    // Define an array of values to be inserted into the database
    const values = [
        organization,
        responsibilitygroup,
        responsibilitycenter,
        algorithminventorydate,
        project,
        projectcode,
        algorithminventorytime,
        algorithm,
        algorithmremark,
        dataset,
        dataremark,
        codevulnerability,
        codevulnerabilityremark,
        privacydata, 
        privacydataremark,
        algorithmbias,
        databias, 
        codevulnerabilitybias,
        privacydatabias ,
        algorithmtestoutputurl,
        datasettestoutputurl,
        codevulnerabilitytestoutputurl,
        privacytestoutputurl,
        datasetstatus,
        algorithmstatus,
        codevulnerabilitystatus,
        privacydatastatus,
        explanability,
        transparency,
        fairness,
        ethics,
        robustness,
        reliability,
        codename,
        algorithmversiondate,
        datasetversiondate,
       codevulnerabilityversiondate,
       privacyversiondate,
       bias, 
       security,
       algorithmversionno,
       datasetversionno,
       codevulnerabilityversionno,
       privacyversionno,
       robustnessremark,
       explanabilityremark,
       transparencyremark,
       fairnessremark,
       biasremark, 
       ethicsremark,
       reliabilityremark,
       securityremark,
       performance,
       accountability,
       privacy,
       privacyremark,
       performanceremark,
       accountabilityremark,
       assessmentremark,
       assessmentfile,
       assessmentdate,
       auditremark,
       auditfile,
       auditdate];

    // Execute the SQL query and handle the result
    db.query(sqlInsert, values, (error, result) => {
        if (error) {
            console.error("Error inserting risk", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            console.log("Successfully inserted risk:", result); // Log the result
            res.status(200).json({ message: "Risk inserted successfully" });
        }
    });
});


app.delete('/api/algorithminventorydelete/:algorithminventoryid', async (req, res) => {
    const { algorithminventoryid } = req.params;

    try {
        const sqlDelete = "DELETE FROM ai.algorithm_inventory WHERE algorithminventoryid = $1"; // Use the correct column name, assuming it's 'riskid'.
        await db.query(sqlDelete, [algorithminventoryid]);

        res.json({ message: 'Risk deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the Risk' });
    }
});


app.get("/node-api/api/algorithminventoryget/:algorithminventoryid", async(req, res) => {
    try{
    const {algorithminventoryid} = req.params;
    const sqlGet= "SELECT * FROM ai.algorithm_inventory WHERE algorithminventoryid=$1";
   const result= await db.query(sqlGet,[algorithminventoryid]);
   res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching the Risk");
}
});


app.put("/node-api/api/algorithminventoryupdate/:algorithminventoryid", async (req, res) => {
    try {
        const { algorithminventoryid } = req.params;
        const {
            organization,
            responsibilitygroup,
            responsibilitycenter,
            algorithminventorydate,
            project,
            projectcode,
            algorithminventorytime,
            algorithm,
            algorithmremark,
            dataset,
            dataremark,
            codevulnerability,
            codevulnerabilityremark,
            privacydata, 
            privacydataremark,
            algorithmbias,
            databias, 
            codevulnerabilitybias,
            privacydatabias,
            algorithmtestoutputurl,
            datasettestoutputurl,
            codevulnerabilitytestoutputurl,
            privacytestoutputurl,
            datasetstatus,
            algorithmstatus,
            codevulnerabilitystatus,
            privacydatastatus,
            explanability,
            transparency,
            fairness,
            ethics,
            robustness,
            reliability,
            codename,
            algorithmversiondate,
            datasetversiondate,
           codevulnerabilityversiondate,
           privacyversiondate,
           bias,
            security,
            algorithmversionno,
            datasetversionno,
            codevulnerabilityversionno,
            privacyversionno,
            robustnessremark,
            explanabilityremark,
            transparencyremark,
            fairnessremark,
            biasremark, 
            ethicsremark,
            reliabilityremark,
            securityremark,
            performance,
            accountability,
            privacy,
            privacyremark,
            performanceremark,
            accountabilityremark,
            assessmentremark,
            assessmentfile,
            assessmentdate,
            auditremark,
            auditfile,
            auditdate} = req.body;

        const sqlUpdate = `
            UPDATE ai.algorithm_inventory
            SET
            organization=$1,
            responsibilitygroup=$2,
            responsibilitycenter=$3,
            algorithminventorydate=$4,
            project=$5,
            projectcode=$6,
            algorithminventorytime=$7,
            algorithm=$8,
            algorithmremark=$9,
            dataset=$10,
            dataremark=$11,
            codevulnerability=$12,
            codevulnerabilityremark=$13,
            privacydata=$14,
            privacydataremark=$15,
            algorithmbias=$16,
            databias=$17,
            229999933codevulnerabilitybias=$18,
            privacydatabias=$19,
            algorithmtestoutputurl=$20,
            datasettestoutputurl=$21,
            codevulnerabilitytestoutputurl=$22,
            privacytestoutputurl=$23,
            datasetstatus=$24,
            algorithmstatus=$25,
            codevulnerabilitystatus=$26,
            privacydatastatus=$27,
            explanability=$28,
            transparency=$29,
            fairness=$30,
            ethics=$31,
            robustness=$32,
            reliability=$33,
            codename=$34,
            algorithmversiondate=$35,
            datasetversiondate=$36,
            codevulnerabilityversiondate=$37,
            privacyversiondate=$38,
            bias=$39,
            security=$40,
            algorithmversionno=$41,
            datasetversionno=$42,
            codevulnerabilityversionno=$43,
            privacyversionno=$44,
            robustnessremark=$45,
            explanabilityremark=$46,
            transparencyremark=$47,
            fairnessremark=$48,
            biasremark=$49, 
            ethicsremark=$50,
            reliabilityremark=$51,
            securityremark=$52,
            performance=$53,
            accountability=$54,
            privacy=$55,
            privacyremark=$56,
            performanceremark=$57,
            accountabilityremark=$58,
            assessmentremark=$59,
            assessmentfile=$60,
            assessmentdate=$61,
            auditremark=$62,
            auditfile=$63,
            auditdate=$64
            WHERE algorithminventoryid = $65`;

        const result = await db.query(sqlUpdate, [
            organization,
            responsibilitygroup,
            responsibilitycenter,
            algorithminventorydate,
            project,
            projectcode,
            algorithminventorytime,
            algorithm,
            algorithmremark,
            dataset,
            dataremark,
            codevulnerability,
            codevulnerabilityremark,
            privacydata, 
            privacydataremark,
            algorithmbias,
            databias, 
            codevulnerabilitybias,
            privacydatabias,
            algorithmtestoutputurl,
            datasettestoutputurl,
            codevulnerabilitytestoutputurl,
            privacytestoutputurl,
            datasetstatus,
            algorithmstatus,
            codevulnerabilitystatus,
            privacydatastatus,
            explanability,
            transparency,
            fairness,
            ethics,
            robustness,
            reliability,
            codename,
            algorithmversiondate,
            datasetversiondate,
            codevulnerabilityversiondate,
            privacyversiondate,
            bias,
            security,
            algorithmversionno,
            datasetversionno,
            codevulnerabilityversionno,
            privacyversionno,
            robustnessremark,
            explanabilityremark,
            transparencyremark,
            fairnessremark,
            biasremark, 
            ethicsremark,
            reliabilityremark,
            securityremark,
            performance,
            accountability,
            privacy,
            privacyremark,
            performanceremark,
            accountabilityremark,
            assessmentremark,
            assessmentfile,
            assessmentdate,
            auditremark,
            auditfile,
            auditdate,
            algorithminventoryid
            ]);
        

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Risk not found or not updated.' });
        }

        res.json({ message: 'Risk updated successfully' });
    } catch (error) {
        console.error('Error updating risk:', error);
        res.status(500).json({ error: 'An error occurred while updating the Risk' });
    }
});


/*-------------------------------data lineage--------------------------------------------------*/

app.get("/node-api/api/datalineageget", (req, res) => {
    const sqlGet = "SELECT * from ai.datalineage";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            // Check if result is defined and has 'rows' property
            if (result && result.rows) {
                res.json(result.rows);
            } else {
                res.status(500).json({ error: "Unexpected result format" });
            }
        }
    });
});


app.post("/node-api/datalineagepost/api", (req, res) => {
    const {companyname,projectname,responsibilitygroup,responsibilitycenter,
        objecttype,objectcode,evidencereferencelink,evidenceremark,evidenceupload,
        evidencestatus,controlname,subcontrolname,thrustarea } = req.body;
    const sqlInsert =
      "INSERT INTO ai.datalineage (companyname,projectname,responsibilitygroup,responsibilitycenter,objecttype,objectcode,evidencereferencelink,evidenceremark,evidenceupload,evidencestatus,controlname,subcontrolname,thrustarea) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)";
      const values=[companyname,projectname,responsibilitygroup,responsibilitycenter,objecttype,objectcode,evidencereferencelink,evidenceremark,evidenceupload,evidencestatus,controlname,subcontrolname,thrustarea ];
      db.query(sqlInsert ,values,(error,result)=>{
          if (error) {
              console.error("error intersting object type",error);
              res.status(500).json({error:"internal server error"})
          }else{
              res.status(200).json({message:"company inserted sucessfully"});
          }
      } );
});

app.delete("/node-api/api/datalineagedelete/:datalineageid", (req, res) => {
    const {datalineageid} = req.params;
    const sqlRemove="Delete from ai.datalineage where datalineageid=$1";
    db.query(sqlRemove ,[datalineageid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting Responsibility Center")
        }
        res.send("term deleted successfully")
    } );
});

app.get("/node-api/api/datalineageget/:datalineageid", async (req, res) => {
    try {
      const { datalineageid } = req.params;
      const sqlGet = "SELECT * FROM ai.datalineage WHERE datalineageid=$1";
      const result = await db.query(sqlGet, [datalineageid]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the responsibility center");
    }
  });
  


  app.put("/node-api/api/datalineageupdate/:datalineageid", (req, res) => {
    const { datalineageid } = req.params;
    const {
        companyname,projectname,responsibilitygroup,responsibilitycenter,objecttype,
        objectcode,evidencereferencelink,evidenceremark,evidenceupload,evidencestatus,
        controlname,subcontrolname,thrustarea } = req.body;

    const sqlUpdate = ` UPDATE ai.datalineage  SET 
    companyname= $1,
    projectname= $2,
    responsibilitygroup= $3,
    responsibilitycenter= $4,
    objecttype= $5,
    objectcode= $6,
    evidencereferencelink= $7,
    evidenceremark= $8,
    evidenceupload= $9,
    evidencestatus= $10,
    controlname= $11,
    subcontrolname= $12,
    thrustarea = $13
    WHERE datalineageid = $14`;

    db.query(sqlUpdate, [companyname,projectname,responsibilitygroup,responsibilitycenter,
        objecttype,objectcode,evidencereferencelink,evidenceremark,evidenceupload,
        evidencestatus,controlname,subcontrolname,thrustarea,datalineageid], (error, result) => {
        if (error) {
            console.error("Error updating object type", error);
            return res.status(500).send("An error occurred while updating the Responsibility Center");
        }
        res.send("Responsibility Center updated successfully");
    });
});



/*-------------------------------Governance--------------------------------------------------*/

app.get("/node-api/resultGovernanceget/api/:resultid", async (req, res) => {
    try {
      const { resultid } = req.params;
  
      // Check if resultid is provided and is a valid integer
      if (!resultid || isNaN(resultid)) {
        return res.status(400).send("Invalid resultid provided.");
      }
  
      const sqlGet = "SELECT * FROM ai.governancetestresult WHERE resultid = $1";
  
      const result = await db.query(sqlGet, [resultid]);
  
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the Result.");
    }
  });
  



app.get("/node-api/resultGovernanceget/api", (req, res) => {
    const sqlGet = "SELECT * from ai.governancetestresult";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            // Check if result is defined and has 'rows' property
            if (result && result.rows) {
                res.json(result.rows);
            } else {
                res.status(500).json({ error: "Unexpected result format" });
            }
        }
    });
});




app.post("/node-api/evidence/:projectid/:companyid", async (req, res) => {
    const { projectid, companyid } = req.params;
    const {
      groupid,
      groupname,
      thrustid,
      thrustarea,
      controlid,
      controlname,
      controlwt,
      subcontrolid,
      subcontrolname,
      subcontrolwt,
      evidence,
      // object,
      // objecttype,
      evidencereferencelink,
      evidenceremark,
      evidenceupload,
      evidencestatus,
    } = req.body;
  
    try {
      const sqlAdd = `
        INSERT INTO ai.governancetestresult (
          companyid, projectid, groupid, groupname, thrustid, thrustarea,
          controlid, controlname, controlwt, subcontrolid, subcontrolname,
          subcontrolwt,evidence, evidencereferencelink, evidenceremark, evidenceupload,
           evidencestatus
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,$17)
      `;
  
      const values = [
        companyid,
        projectid,
        groupid,
        groupname,
        thrustid,
        thrustarea,
        controlid,
        controlname,
        controlwt,
  
        subcontrolid,
        subcontrolname,
        subcontrolwt,
        // object,
        //objecttype,
        evidencereferencelink,
        evidenceremark,
        evidenceupload,
        evidencestatus,
      ];
  
      const result = await db.query(sqlAdd, values);
  
      res.status(200).json({ message: "Evidence inserted successfully" });
    } catch (error) {
      console.error("Error inserting Evidence:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });





  app.get("/node-api/api/companyprojectget", async (req, res) => {
    try {
      console.log("Request received");
      const { projectname } = req.query;
      
      console.log("projectname:", projectname);
  
      const sqlGet = `
        SELECT * FROM ai.governancetestresult
        WHERE projectname = $1;
      `;
  
      const result = await db.query(sqlGet, [projectname]);
      console.log("Result:", result.rows);
  
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the data");
    }
  });
 
  app.get("/node-api/api/groupnameget/:groupname", async (req, res) => {
    try {
      console.log("Request received");
      const { groupname } = req.params;
      
      console.log("groupname:", groupname);
  
      const sqlGet = `
        SELECT * FROM ai.governancetestresult
        WHERE groupname = $1;
      `;
  
      const result = await db.query(sqlGet, [groupname]);
      console.log("Result:", result.rows);
  
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the data");
    }
  });


  app.get("/node-api/api/thrustareaget/:thrustarea", async (req, res) => {
    try {
      const { thrustarea } = req.query;
      const sqlGet = `
        SELECT groupname FROM ai.governancetestresult
        WHERE thrustarea = $1;
      `;
      const result = await db.query(sqlGet, [thrustarea]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the data");
    }
  });
  


  /*-------------------------------Theme Master-------------------------------------------------*/

  app.get("/node-api/api/thememasterget", (req, res) => {
    const sqlGet= "SELECT * from ai.thememaster";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});



app.post("/node-api/api/thememasterpost", (req, res) => {
    const {themecode,themename} = req.body;
    const sqlInsert="INSERT INTO ai.thememaster (themecode,themename) values($1, $2)";
   const values=[themecode,themename];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting thememaster",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"thememaster inserted sucessfully"});
        }
    } );
});



app.delete("/node-api/api/thememasterdelete/:thememasterid", (req, res) => {
    const {thememasterid} = req.params;
    const sqlRemove="Delete from ai.thememaster where thememasterid=$1";
    db.query(sqlRemove ,[thememasterid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting thememaster")
        }
        res.send("thememaster deleted successfully")
    } );
});


app.get("/node-api/api/thememasterget/:thememasterid", async(req, res) => {
    try{
    const {thememasterid} = req.params;
    const sqlGet= "SELECT * FROM ai.thememaster WHERE thememasterid=$1";
    const result= await db.query(sqlGet,[thememasterid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching thethememaster");
}
});


app.put("/node-api/api/thememasterupdate/:thememasterid", (req, res) => {
    const {thememasterid} = req.params;
    const {themecode,themename} = req.body;
     
    const sqlUpdate="UPDATE ai.thememaster SET themecode=$1,themename=$2 WHERE thememasterid=$3";
    db.query(sqlUpdate,[themecode,themename,thememasterid],(error,result)=>{
        if (error) {
            console.error("error inserting object type",error);
           return res.status(500).send("an error occurred while updating the object type");
    }
        res.send("object type updated sucessfully");
});
});




  /*-------------------------------Activity Group-------------------------------------------------*/

  app.get("/node-api/api/activitygroupget", (req, res) => {
    const sqlGet= "SELECT * from ai.activitygroup";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});



app.post("/node-api/api/activitygrouppost", (req, res) => {
    const {groupactivity,theme,phase} = req.body;
    const sqlInsert="INSERT INTO ai.activitygroup (groupactivity,theme,phase) values($1, $2 ,$3)";
   const values=[groupactivity,theme,phase];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting activity group",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:"activity group inserted sucessfully"});
        }
    } );
});


app.delete("/node-api/api/activitygroupdelete/:activitygroupid", (req, res) => {
    const {activitygroupid} = req.params;
    const sqlRemove="Delete from ai.activitygroup where activitygroupid=$1";
    db.query(sqlRemove ,[activitygroupid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting activity group")
        }
        res.send("activity group deleted successfully")
    } );
});



app.get("/node-api/api/activitygroupget/:activitygroupid", async(req, res) => {
    try{
    const {activitygroupid} = req.params;
    const sqlGet= "SELECT * FROM ai.activitygroup WHERE activitygroupid=$1";
    const result= await db.query(sqlGet,[activitygroupid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching activity group");
}
});


app.put("/node-api/api/activitygroupupdate/:activitygroupid", (req, res) => {
    const {activitygroupid} = req.params;
    const {groupactivity,theme,phase} = req.body;
     
    const sqlUpdate="UPDATE ai.activitygroup SET groupactivity=$1,theme=$2 ,phase=$3 WHERE activitygroupid=$4";
    db.query(sqlUpdate,[groupactivity,theme,phase,activitygroupid],(error,result)=>{
        if (error) {
            console.error("error inserting object type",error);
           return res.status(500).send("an error occurred while updating ");
    }
        res.send(" updated sucessfully");
});
});


/*-----------------------------------Theme Activity---------------------------------------*/


app.get("/node-api/api/themeactivityget", (req, res) => {
    const sqlGet= "SELECT * from ai.themeactivity";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});


app.post("/node-api/api/themeactivitypost", (req, res) => {
    const {theme,phase,activitygroup,activity} = req.body;
    const sqlInsert="INSERT INTO ai.themeactivity (theme,phase,activitygroup,activity) values($1, $2 ,$3 ,$4)";
   const values=[theme,phase,activitygroup,activity];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting ",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:" inserted sucessfully"});
        }
    } );
});



app.delete("/node-api/api/themeactivitydelete/:themeactivityid", (req, res) => {
    const {themeactivityid} = req.params;
    const sqlRemove="Delete from ai.themeactivity where themeactivityid=$1";
    db.query(sqlRemove ,[themeactivityid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting ")
        }
        res.send(" deleted successfully")
    } );
});


app.get("/node-api/api/themeactivityget/:themeactivityid", async(req, res) => {
    try{
    const {themeactivityid} = req.params;
    const sqlGet= "SELECT * FROM ai.themeactivity WHERE themeactivityid=$1";
    const result= await db.query(sqlGet,[themeactivityid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching ");
}
});


app.put("/node-api/api/themeactivityupdate/:themeactivityid", (req, res) => {
    const { themeactivityid } = req.params;
    const { theme, phase, activitygroup, activity } = req.body;
     
    const sqlUpdate = "UPDATE ai.themeactivity SET theme=$1, phase=$2, activitygroup=$3, activity=$4 WHERE themeactivityid=$5";
    db.query(sqlUpdate, [theme, phase, activitygroup, activity, themeactivityid], (error, result) => {
        if (error) {
            console.error("Error updating theme activity:", error);
            return res.status(500).send("An error occurred while updating");
        }
        res.send("Updated successfully");
    });
});



/*-----------------------------------Vendor Master---------------------------------------*/

app.get("/node-api/api/vendormasterget", (req, res) => {
    const sqlGet= "SELECT * from ai.vendormaster";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});

app.post("/node-api/api/vendormasterpost", (req, res) => {
    const {vendorname,vendorcontact,vendoremail} = req.body;
    const sqlInsert="INSERT INTO ai.vendormaster (vendorname,vendorcontact,vendoremail) values($1, $2 ,$3)";
   const values=[vendorname,vendorcontact,vendoremail];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting ",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:" inserted sucessfully"});
        }
    } );
});



app.delete("/node-api/api/vendormasterdelete/:vendorid", (req, res) => {
    const {vendorid} = req.params;
    const sqlRemove="Delete from ai.vendormaster where vendorid=$1";
    db.query(sqlRemove ,[vendorid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting ")
        }
        res.send(" deleted successfully")
    } );
});


app.get("/node-api/api/vendormasterget/:vendorid", async(req, res) => {
    try{
    const {vendorid} = req.params;
    const sqlGet= "SELECT * FROM ai.vendormaster WHERE vendorid=$1";
    const result= await db.query(sqlGet,[vendorid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching ");
}
});



app.put("/node-api/api/vendormasterupdate/:vendorid", (req, res) => {
    const { vendorid } = req.params;
    const { vendorname,vendorcontact,vendoremail } = req.body;
     
    const sqlUpdate = "UPDATE ai.vendormaster SET vendorname=$1, vendorcontact=$2, vendoremail=$3 WHERE vendorid=$4";
    db.query(sqlUpdate, [vendorname,vendorcontact,vendoremail, vendorid], (error, result) => {
        if (error) {
            console.error("Error updating theme activity:", error);
            return res.status(500).send("An error occurred while updating");
        }
        res.send("Updated successfully");
    });
});



/*-----------------------------------Technology---------------------------------------*/


app.get("/node-api/api/technologyget", (req, res) => {
    const sqlGet= "SELECT * from ai.technology";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});



app.post("/node-api/api/technologypost", (req, res) => {
    const {technologyname,technologyversion} = req.body;
    const sqlInsert="INSERT INTO ai.technology (technologyname,technologyversion) values($1, $2 )";
   const values=[technologyname,technologyversion];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting ",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:" inserted sucessfully"});
        }
    } );
});



app.delete("/node-api/api/technologydelete/:technologymasterid", (req, res) => {
    const {technologymasterid} = req.params;
    const sqlRemove="Delete from ai.technology where technologymasterid=$1";
    db.query(sqlRemove ,[technologymasterid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting ")
        }
        res.send(" deleted successfully")
    } );
});


app.get("/node-api/api/technologyget/:technologymasterid", async(req, res) => {
    try{
    const {technologymasterid} = req.params;
    const sqlGet= "SELECT * FROM ai.technology WHERE technologymasterid=$1";
    const result= await db.query(sqlGet,[technologymasterid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching ");
}
});


app.put("/node-api/api/technologyupdate/:technologymasterid", (req, res) => {
    const { technologymasterid } = req.params;
    const { technologyname,technologyversion} = req.body;
     
    const sqlUpdate = "UPDATE ai.technology SET technologyname=$1, technologyversion=$2 WHERE technologymasterid=$3";
    db.query(sqlUpdate, [technologyname,technologyversion,technologymasterid], (error, result) => {
        if (error) {
            console.error("Error updating theme activity:", error);
            return res.status(500).send("An error occurred while updating");
        }
        res.send("Updated successfully");
    });
});


/*-----------------------------------vulnerability---------------------------------------*/


app.get("/node-api/api/vulnerabilityget", (req, res) => {
    const sqlGet= "SELECT * from ai.vulnerability";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});


app.post("/node-api/api/vulnerabilitypost", (req, res) => {
    const {vulnerabilityname,threat,mitigationstrategy,contigencyplan} = req.body;
    const sqlInsert="INSERT INTO ai.vulnerability (vulnerabilityname,threat,mitigationstrategy,contigencyplan) values($1 ,$2, $3, $4)";
   const values=[vulnerabilityname,threat,mitigationstrategy,contigencyplan];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting ",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:" inserted sucessfully"});
        }
    } );
});


app.delete("/node-api/api/vulnerabilitydelete/:vulnerabilityid", (req, res) => {
    const {vulnerabilityid} = req.params;
    const sqlRemove="Delete from ai.vulnerability where vulnerabilityid=$1";
    db.query(sqlRemove ,[vulnerabilityid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting ")
        }
        res.send(" deleted successfully")
    } );
});


app.get("/node-api/api/vulnerabilityget/:vulnerabilityid", async(req, res) => {
    try{
    const {vulnerabilityid} = req.params;
    const sqlGet= "SELECT * FROM ai.vulnerability WHERE vulnerabilityid=$1";
    const result= await db.query(sqlGet,[vulnerabilityid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching ");
}
});


app.put("/node-api/api/vulnerabilityupdate/:vulnerabilityid", (req, res) => {
    const { vulnerabilityid } = req.params;
    const { vulnerabilityname,threat,mitigationstrategy,contigencyplan} = req.body;
     
    const sqlUpdate = "UPDATE ai.vulnerability SET vulnerabilityname=$1,threat=$2,mitigationstrategy=$3,contigencyplan=$4 WHERE vulnerabilityid=$5";
    db.query(sqlUpdate, [vulnerabilityname,threat,mitigationstrategy,contigencyplan,vulnerabilityid], (error, result) => {
        if (error) {
            console.error("Error updating theme activity:", error);
            return res.status(500).send("An error occurred while updating");
        }
        res.send("Updated successfully");
    });
});

/*-----------------------------------Resource---------------------------------------*/

app.get("/node-api/api/resourceget", (req, res) => {
    const sqlGet= "SELECT * from ai.resourcemaster";
    db.query(sqlGet,(error,result)=>{
        res.json(result.rows);
    }
    );
});



app.post("/node-api/api/resourcepost", (req, res) => {
    const {resourcename,designation,status} = req.body;
    const sqlInsert="INSERT INTO ai.resourcemaster (resourcename,designation,status) values($1 ,$2, $3)";
   const values=[resourcename,designation,status];
    db.query(sqlInsert ,values,(error,result)=>{
        if (error) {
            console.error("error intersting ",error);
            res.status(500).json({error:"internal server error"})
        }else{
            res.status(200).json({message:" inserted sucessfully"});
        }
    } );
});


app.delete("/node-api/api/resourcedelete/:resourceid", (req, res) => {
    const {resourceid} = req.params;
    const sqlRemove="Delete from ai.resourcemaster where resourceid=$1";
    db.query(sqlRemove ,[resourceid],(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(500).send("an error occurred while deleting ")
        }
        res.send(" deleted successfully")
    } );
});



app.get("/node-api/api/resourceget/:resourceid", async(req, res) => {
    try{
    const {resourceid} = req.params;
    const sqlGet= "SELECT * FROM ai.resourcemaster WHERE resourceid=$1";
    const result= await db.query(sqlGet,[resourceid]);
    res.send(result.rows);
}catch(error){
    console.error(error);
    res.status(500).send("an error occurred while fectching ");
}
});



app.put("/node-api/api/resourceupdate/:resourceid", (req, res) => {
    const { resourceid } = req.params;
    const { resourcename,designation,status} = req.body;
     
    const sqlUpdate = "UPDATE ai.resourcemaster SET resourcename=$1,designation=$2,status=$3 WHERE resourceid=$4";
    db.query(sqlUpdate, [resourcename,designation,status,resourceid], (error, result) => {
        if (error) {
            console.error("Error updating theme activity:", error);
            return res.status(500).send("An error occurred while updating");
        }
        res.send("Updated successfully");
    });
});

/*-------------------------------Governance--------------------------------------------------*/

/************** Governance Group name Graph******************/

app.get('/node-api/api/groupname', async (req, res) => {
    try {
      const sqlGet = `
        SELECT DISTINCT groupname as groupname_name, COUNT(*) as groupname_count 
        FROM ai.governancegroup 
        GROUP BY groupname;
      `; 
      const result = await db.query(sqlGet);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });

  /************** Governance Thurst Area Graph******************/

  app.get('/node-api/api/thrustareagraph/:groupname', async (req, res) => {
    const{ groupname}= req.params;
    try {
          const sqlGet = `
          SELECT thrustarea, COUNT(*) AS thrustarea_count
          FROM ai.thrustarea
          WHERE groupname =$1
          GROUP BY thrustarea;
      `;
  
      const result = await db.query(sqlGet,[groupname]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });
  


    /************** Governance Control Name Graph******************/

    app.get('/node-api/api/controlnamegraph/:thrustarea', async (req, res) => {
        const{ thrustarea}= req.params;
        try {
              const sqlGet = `
              SELECT  subcontrolname,assessmentscore,auditscore,evidenceremark, COUNT(*) AS subcontrolname_count
              FROM ai.governancetestresult
              WHERE thrustarea =$1
              GROUP BY subcontrolname,assessmentscore,auditscore,evidenceremark;
          `;
      
          const result = await db.query(sqlGet,[thrustarea]);
          res.send(result.rows);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while fetching the Risk');
        }
      });







      app.get('/node-api/api/controlnamereport/:thrustarea', async (req, res) => {
        const{ thrustarea}= req.params;
        try {
              const sqlGet = `
        SELECT companyname, responsibilitygroup, responsibilitycenter, 
         object,objecttype,projectname,groupname
        FROM ai.governancetestresult WHERE thrustarea=$1;
          `;
      
          const result = await db.query(sqlGet,[thrustarea]);
          res.send(result.rows);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while fetching the Risk');
        }
      });


        /************** Governance SubControl Name Graph******************/

        app.get('/node-api/api/subcontrolnamegraph/:subcontrolname', async (req, res) => {
            const { subcontrolname } = req.params;
            try {
                const sqlGet = `
                    SELECT controlname, COUNT(*) AS controlname_count
                    FROM ai.governancetestresult
                    WHERE subcontrolname = $1
                    GROUP BY controlname;
                `;
        
                const result = await db.query(sqlGet, [subcontrolname]);
                res.send(result.rows);
            } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred while fetching the Risk');
            }
        });



        app.get('/node-api/api/subcontrolnamereport/:subcontrolname', async (req, res) => {
            const{ subcontrolname}= req.params;
            try {
                  const sqlGet = `
            SELECT companyname, responsibilitygroup, responsibilitycenter, 
              object,objecttype,projectname,groupname
            FROM ai.governancetestresult WHERE subcontrolname=$1;
              `;
          
              const result = await db.query(sqlGet,[subcontrolname]);
              res.send(result.rows);
            } catch (error) {
              console.error(error);
              res.status(500).send('An error occurred while fetching the Risk');
            }
          });
    
        

              /************** Governance Assessmenent Status Graph******************/

    app.get('/node-api/api/assessmentstatusgraph/:controlname', async (req, res) => {
        const{ controlname}= req.params;
        try {
              const sqlGet = `
              SELECT assessmentstatus, COUNT(*) AS assessmentstatus_count
              FROM ai.governancetestresult
              WHERE controlname =$1
              GROUP BY assessmentstatus;
          `;
      
          const result = await db.query(sqlGet,[controlname]);
          res.send(result.rows);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while fetching the Risk');
        }
      });


      
              /************** Governance audit Status Graph******************/

    app.get('/node-api/api/auditstatusgraph/:assessmentstatus', async (req, res) => {
        const{ assessmentstatus}= req.params;
        try {
              const sqlGet = `
              SELECT auditstatus, COUNT(*) AS auditstatus_count
              FROM ai.governancetestresult
              WHERE assessmentstatus =$1
              GROUP BY auditstatus;
          `;
      
          const result = await db.query(sqlGet,[assessmentstatus]);
          res.send(result.rows);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while fetching the Risk');
        }
      });


             

              /**************Score Card******************/

                   
            //  app.get("/node-api/api/scorecard", async (req, res) => {
            //     const {
            //       companyname,
            //       responsibilitygroup,
            //       responsibilitycenter,
            //       project,
            //       object,
            //       objecttype,
            //       groupname,
            //     } = req.query;
              
            //     try {
            //       const sqlGet = `
            //         SELECT * FROM ai.governancetestresult
            //         WHERE
            //         (companyname = $1 OR companyname IS NULL)
            //         OR (responsibilitygroup = $2 OR responsibilitygroup IS NULL)
            //         OR (responsibilitycenter = $3 OR responsibilitycenter IS NULL)
            //         OR (projectname =$4 OR projectname IS NULL)
            //         OR (object = $5 OR object IS NULL)
            //         OR (objecttype =$6 OR objecttype IS NULL)
            //         OR (groupname =$7 OR groupname IS NULL)
                   
            //       `;
              
            //       const result = await db.query(sqlGet, [
            //         companyname,
            //         responsibilitygroup,
            //         responsibilitycenter,
            //         project,
            //         object,
            //         objecttype,
            //         groupname,
            //       ]);
            //       res.send(result.rows);
            //     } catch (error) {
            //       console.error(error);
            //       res.status(500).send("An error occurred while fetching the data");
            //     }
            //   });









            app.get("/node-api/api/scorecard", (req, res) => {
              const {
                groupname,
                companyname,
                projectname,
                responsibilitygroup,
                responsibilitycenter,
                objecttype,
                object,
              } = req.query;
            
              const conditions = [];
              const values = [];
            
              // Add conditions for each provided parameter
              if (groupname) {
                conditions.push("groupname = $" + (values.length + 1));
                values.push(groupname);
              }
              if (companyname) {
                conditions.push("companyname = $" + (values.length + 1));
                values.push(companyname);
              }
              if (projectname) {
                conditions.push("projectname = $" + (values.length + 1));
                values.push(projectname);
              }
              if (responsibilitygroup) {
                conditions.push("responsibilitygroup = $" + (values.length + 1));
                values.push(responsibilitygroup);
              }
              if (responsibilitycenter) {
                conditions.push("responsibilitycenter = $" + (values.length + 1));
                values.push(responsibilitycenter);
              }
              if (objecttype) {
                conditions.push("objecttype = $" + (values.length + 1));
                values.push(objecttype);
              }
              if (object) {
                conditions.push("object = $" + (values.length + 1));
                values.push(object);
              }
            
              let sqlQuery = "SELECT * FROM ai.governancetestresult";
            
              // Add WHERE clause if conditions are provided
              if (conditions.length > 0) {
                sqlQuery += " WHERE " + conditions.join(" AND ");
              }
            
              // console.log("Generated SQL query:", sqlQuery); // Log the generated SQL query
            
              // Execute the SQL query with the provided parameters
              db.query(sqlQuery, values, (err, results) => {
                if (err) {
                  console.error("Error executing SQL query:", err);
                  res.status(500).send("Internal Server Error");
                  return;
                }
            
                // Send the results as JSON
                res.json(results.rows);
              });
            });
            
            // /**************** */
            // app.get("/node-api/api/governancemultigraph", async (req, res) => {
            //   try {
            //     const {
            //       companyname,
            //       projectname,
            //       responsibilitygroup,
            //       responsibilitycenter,
            //       objecttype,
            //       object,
            //     } = req.query;
            
            //     const conditions = [];
            //     const values = [];
            
            //     // Add conditions for each provided parameter
            //     if (companyname) {
            //       conditions.push("companyname = $" + (values.length + 1));
            //       values.push(companyname);
            //     }
            //     if (projectname) {
            //       conditions.push("projectname = $" + (values.length + 1));
            //       values.push(projectname);
            //     }
            //     if (responsibilitygroup) {
            //       conditions.push("responsibilitygroup = $" + (values.length + 1));
            //       values.push(responsibilitygroup);
            //     }
            //     if (responsibilitycenter) {
            //       conditions.push("responsibilitycenter = $" + (values.length + 1));
            //       values.push(responsibilitycenter);
            //     }
            //     if (objecttype) {
            //       conditions.push("objecttype = $" + (values.length + 1));
            //       values.push(objecttype);
            //     }
            //     if (object) {
            //       conditions.push("object = $" + (values.length + 1));
            //       values.push(object);
            //     }
            
            //     let sqlQuery = `
            //     SELECT 
            //     thrustarea,
            //             COUNT(DISTINCT assessmentscore) as assessmentscore_count,
            //             COUNT(DISTINCT auditscore) as auditscore_count,
            //             COUNT(DISTINCT evidenceremark) as evidenceremark_count
            //           FROM ai.governancetestresult
            //           GROUP BY thrustarea`;
              
            
            
            //     // Add WHERE clause if conditions are provided
            //     if (conditions.length > 0) {
            //       sqlQuery += " WHERE " + conditions.join(" AND ");
            //     }
           
            //     // Execute the SQL query with the provided parameters
            //     const countResult = await db.query(sqlQuery, values);
            
            //     res.json(countResult.rows[0]); // Assuming the result is a single row
            //   } catch (error) {
            //     console.error(error);
            //     res.status(500).send("An error occurred while fetching the data");
            //   }
            // });



//            /**************multiple graph by using thrustarea******************/

app.get('/node-api/api/governancemultigraph', async (req, res) => {
    try {
      const sqlGet = `
        SELECT 
				thrustarea,
        COUNT(DISTINCT assessmentscore) as assessmentscore_count,
        COUNT(DISTINCT auditscore) as auditscore_count,
        COUNT(DISTINCT evidenceremark) as evidenceremark_count
      FROM ai.governancetestresult
      GROUP BY thrustarea
      `; 
      const result = await db.query(sqlGet);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the Risk');
    }
  });











//               /************************CheckList***********************************/
            /********GEt THE Checklist**************** */
            app.get("/node-api/api/checklist", (req, res) => {
                const sqlGet = "SELECT * from ai.checklist";
                db.query(sqlGet, (error, result) => {
                    if (error) {
                        console.error('Error executing SQL query:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else if (result && result.rows) {
                        res.json(result.rows);
                    } else {
                        console.error('Unexpected result structure:', result);
                        res.status(500).json({ error: 'Internal Server Error' });
                    }
                });
            });
            




            

            // app.get('/node-api/api/ganttchart', async (req, res) => {
            //     try {
            //       const sqlGet = `
            //       SELECT planstartdate, planenddate ,actualstartdate, actualenddate
            //       FROM ai.checklist
               
            //       `; 
            //       const result = await db.query(sqlGet);
            //       res.send(result.rows);
            //     } catch (error) {
            //       console.error(error);
            //       res.status(500).send('An error occurred while fetching the Risk');
            //     }
            //  });



            
//             /************Insert the Checklist***************** */
//             app.post("/node-api/api/addchecklist", (req, res) => {
//                 // Extract data from the request body
//     const {
//       organization,
//       project,
//       projectcode,
//       responsibilitygroup,
//       responsibilitycenter,
//       objecttype,
//       object,
//       codename,
//       phase,
//       theme,
//       activitygroup,
//       activity,
//       expectedevidence,
//       remark,
//       percentagecompletion,
//       actualevidence,
//       status,
//       planstartdate,
//       planenddate,
//       actualstartdate,
//       actualenddate,
//       activitycode,
//       algorithminventoryid,
//     } = req.body;
  
//     // Define the SQL query with placeholders
//     const sqlInsert = `
//       INSERT INTO ai.checklist (
//         organization, project, projectcode, responsibilitygroup, responsibilitycenter,
//         objecttype, object, codename, phase, theme, activitygroup, activity,
//         expectedevidence, remark, percentagecompletion, actualevidence, status,
//          planstartdate, planenddate, actualstartdate, actualenddate, activitycode,algorithminventoryid
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22,$23)
//     `;
  
//     // Set up an array of parameterized values
//     const values = [
//       organization,
//       project,
//       projectcode,
//       responsibilitygroup,
//       responsibilitycenter,
//       objecttype,
//       object,
//       codename,
//       phase,
//       theme,
//       activitygroup,
//       activity,
//       expectedevidence,
//       remark,
//       percentagecompletion,
//       actualevidence,
//       status,
  
//       planstartdate,
//       planenddate,
//       actualstartdate,
//       actualenddate,
//       activitycode,
//       algorithminventoryid,
//     ];
  
//     // Execute the SQL query
//     db.query(sqlInsert, values, (error, result) => {
//       // Handle the result or error
//       if (error) {
//         console.error("Error inserting data:", error);
//         res.status(500).json({ error: "Internal server error" });
//       } else {
//         console.log("Data inserted successfully");
//         res.status(200).json({ message: "Inserted successfully" });
//       }
//     });
//   });
  



/**********Environment*************/

app.get("/node-api/api/environmentget", (req, res) => {
    const sqlGet = "SELECT * from ai.environment";
    db.query(sqlGet, (error, result) => {
      res.json(result.rows);
    });
  });
  
  app.post("/node-api/api/environmentpost", (req, res) => {
    const { environmentname, environmentdescription } = req.body;
    const sqlInsert =
      "INSERT INTO ai.environment(environmentname,environmentdescription) values($1 ,$2)";
    const values = [environmentname, environmentdescription];
    db.query(sqlInsert, values, (error, result) => {
      if (error) {
        console.error("error intersting ", error);
        res.status(500).json({ error: "internal server error" });
      } else {
        res.status(200).json({ message: " Dataset Inserted sucessfully" });
      }
    });
  });
  
  app.delete("/node-api/api/environmentdelete/:environmentid", (req, res) => {
    const { environmentid } = req.params;
    const sqlRemove = "Delete from ai.environment where environmentid=$1";
    db.query(sqlRemove, [environmentid], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("an error occurred while deleting ");
      }
      res.send(" deleted successfully");
    });
  });
  
  app.get("/node-api/api/environmentset/:environmentid", async (req, res) => {
    try {
      const { environmentid } = req.params;
      const sqlGet = "SELECT * FROM ai.environment WHERE environmentid=$1";
      const result = await db.query(sqlGet, [environmentid]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("an error occurred while fectching ");
    }
  });
  
  app.put("/node-api/api/environmentupdate/:environmentid", (req, res) => {
    const { environmentid } = req.params;
    const { environmentname, environmentdescription } = req.body;
  
    const sqlUpdate =
      "UPDATE ai.environment SET environmentname=$1, environmentdescription=$2 WHERE environmentid=$3";
    db.query(
      sqlUpdate,
      [environmentname, environmentdescription, environmentid],
      (error, result) => {
        if (error) {
          console.error("Error updating theme activity:", error);
          return res.status(500).send("An error occurred while updating");
        }
        res.send("Updated successfully");
      }
    );
  });



  
/**********Environment Type*************/

app.get("/node-api/api/environmenttypeget", (req, res) => {
    const sqlGet = "SELECT * from ai.environmenttype";
    db.query(sqlGet, (error, result) => {
      res.json(result.rows);
    });
  });
  
  app.post("/node-api/api/environmenttypepost", (req, res) => {
    const { environmenttypename, environmenttypedescription } = req.body;
    const sqlInsert =
      "INSERT INTO ai.environmenttype(environmenttypename,environmenttypedescription) values($1 ,$2)";
    const values = [environmenttypename, environmenttypedescription];
    db.query(sqlInsert, values, (error, result) => {
      if (error) {
        console.error("error intersting ", error);
        res.status(500).json({ error: "internal server error" });
      } else {
        res.status(200).json({ message: " Dataset Inserted sucessfully" });
      }
    });
  });
  
  app.delete("/node-api/api/environmenttypedelete/:environmenttypeid", (req, res) => {
    const { environmenttypeid } = req.params;
    const sqlRemove = "Delete from ai.environmenttype where environmenttypeid=$1";
    db.query(sqlRemove, [environmenttypeid], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("an error occurred while deleting ");
      }
      res.send(" deleted successfully");
    });
  });
  
  app.get("/node-api/api/environmenttypeset/:environmenttypeid", async (req, res) => {
    try {
      const { environmenttypeid } = req.params;
      const sqlGet = "SELECT * FROM ai.environmenttype WHERE environmenttypeid=$1";
      const result = await db.query(sqlGet, [environmenttypeid]);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("an error occurred while fectching ");
    }
  });
  
  app.put("/node-api/api/environmenttypeupdate/:environmenttypeid", (req, res) => {
    const { environmenttypeid } = req.params;
    const { environmenttypename, environmenttypedescription } = req.body;
  
    const sqlUpdate =
      "UPDATE ai.environmenttype SET environmenttypename=$1, environmenttypedescription=$2 WHERE environmenttypeid=$3";
    db.query(
      sqlUpdate,
      [environmenttypename, environmenttypedescription, environmenttypeid],
      (error, result) => {
        if (error) {
          console.error("Error updating theme activity:", error);
          return res.status(500).send("An error occurred while updating");
        }
        res.send("Updated successfully");
      }
    );
  });




/**********Issue*************/


app.get("/node-api/api/issueget", (req, res) => {
  const sqlGet = "SELECT * from ai.issue";
  db.query(sqlGet, (error, result) => {
    res.json(result.rows);
  });
});

app.post("/node-api/api/issuepost", (req, res) => {
  const {processissue,codingissue,resourceissue,dataissue,infrastructureissue,modelissue,performanceissue,resolution } = req.body;
  const sqlInsert =
    "INSERT INTO ai.issue(processissue,codingissue,resourceissue,dataissue,infrastructureissue,modelissue,performanceissue,resolution) values($1 ,$2,$3,$4,$5,$6,$7,$8)";
  const values = [processissue,codingissue,resourceissue,dataissue,infrastructureissue,modelissue,performanceissue,resolution];
  db.query(sqlInsert, values, (error, result) => {
    if (error) {
      console.error("error intersting ", error);
      res.status(500).json({ error: "internal server error" });
    } else {
      res.status(200).json({ message: " Dataset Inserted sucessfully" });
    }
  });
});

app.delete("/node-api/api/issuedelete/:issueid", (req, res) => {
  const { issueid } = req.params;
  const sqlRemove = "Delete from ai.issue where issueid=$1";
  db.query(sqlRemove, [issueid], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("an error occurred while deleting ");
    }
    res.send(" deleted successfully");
  });
});

app.get("/node-api/api/issueget/:issueid", async (req, res) => {
  try {
    const { issueid } = req.params;
    const sqlGet = "SELECT * FROM ai.issue WHERE issueid=$1";
    const result = await db.query(sqlGet, [issueid]);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("an error occurred while fectching ");
  }
});

app.put("/node-api/api/issueupdate/:issueid", (req, res) => {
  const { issueid } = req.params;
  const {processissue,codingissue,resourceissue,dataissue,infrastructureissue,modelissue,performanceissue,resolution} = req.body;

  const sqlUpdate =
    "UPDATE ai.issue SET processissue=$1,codingissue=$2,resourceissue=$3,dataissue=$4,infrastructureissue=$5,modelissue=$6,performanceissue=$7,resolution=$8  WHERE issueid=$9";
  db.query(
    sqlUpdate,
    [processissue,codingissue,resourceissue,dataissue,infrastructureissue,modelissue,performanceissue,resolution,issueid],
    (error, result) => {
      if (error) {
        console.error("Error updating theme activity:", error);
        return res.status(500).send("An error occurred while updating");
      }
      res.send("Updated successfully");
    }
  );
});







app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})