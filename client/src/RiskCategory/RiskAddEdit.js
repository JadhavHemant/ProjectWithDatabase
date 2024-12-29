import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
    categorycode:" ",
    categoryname:" ",
    fileupload:" ",
    categorytype:" ",
    checkbox:false,
    radiobutton:" ",
    date:" ",
    continuetext:" ",
    continuenumber:" ",
    weigth:" ",
};



const RiskAddEdit = () => {
    const [state,setState]= useState(initialState);

    const { categorycode, categoryname, fileupload,categorytype,checkbox,radiobutton,date,continuetext, continuenumber , weigth}=state;
    
    const navigate=useNavigate();
    
    const {riskcategoryid}= useParams();

    // const handleDateChange = (event) => {
    //     setState({ ...state, date: event.target.value }); 
    //   };

    useEffect(() => {
      if(riskcategoryid){
      axios.get(API.VIEW_RISKCATEGORY_API(riskcategoryid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[riskcategoryid])

     
    // const handleRadioChange = (event) => {
    //     const radioValue = event.target.value;
    //     setState({ ...state, radiobutton: radioValue });
    //   };

    //   const handleRadioChange1 = (event) => {
    //     const radioValue = event.target.value;
    //     setState({ ...state, weigth: radioValue });
    //   };


    

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!categorycode){
        toast.error("please provider value into each input field");
    }else{
        if(!riskcategoryid){
          const checkboxValue = checkbox ? true : false;
          axios.post(API.ADD_RISKCATEGORY_API,{
            categorycode, 
            categoryname, 
            fileupload,
            categorytype,
            checkbox: checkboxValue,
            radiobutton,
            date,
            continuetext, 
            continuenumber,
            weigth,
        }).then(()=>{
          setState({ categorycode:" ",categoryname:" ", fileupload:" ", categorytype:" ", checkbox:" ", radiobutton:" ", date:" ",continuetext:" ", continuenumber:" " ,weigth:""})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("parameter added successfully");
        }
        else{
          const checkboxValue = checkbox ? true : false;
          axios.put(API.UPDATE_RISKCATEGORY_API (riskcategoryid),{
            categorycode, 
            categoryname, 
            fileupload,
            categorytype,
            checkbox: checkboxValue,
            radiobutton,
            date,
            continuetext, 
            continuenumber,
            weigth,

        }).then(()=>{
          setState({categorycode:" ",categoryname:" ", fileupload:" ", categorytype:" ", checkbox:" ", radiobutton:" ", date:" ",continuetext:" ", continuenumber:" ", weigth:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("Paramter update successfully");
        }
        setTimeout(()=> navigate("/risk"),500);
    }
  }; 
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
   
    const newValue = type === 'checkbox' ? e.target.checked : value;

    setState({
      ...state,
      [name]: newValue,
    });
  };
  return (


    <div style={{marginTop:" 100px"}}>
            <form style={{ 
                    margin:"auto",
                    padding:"15px",
                    maxWidth: "600px",
                    alignContent:"center"
              } }
                onSubmit={handlSubmit}
                >
                <label htmlFor="categorycode">Category Code</label>
                <input 
                type="text"
                id="categorycode"
                name="categorycode"
                placeholder="Enter category code" 
                value={categorycode || " "}
                onChange={handleInputChange}
                />


               <label htmlFor="categoryname">category name</label>
                <input 
                type="text"
                id="categoryname"
                name="categoryname"
                placeholder="Enter category name" 
                value={categoryname || " "}
                onChange={handleInputChange}
                />

             <label> File Upload</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px" }}
              type="text"
              id="fileupload"
              name="fileupload"
              placeholder="Enter the file upload link"
              value={state.fileupload || ""}
              onChange={handleInputChange}
            />
            <div style={{ position: "relative" }}></div>
            <a
              href="https://drive.google.com/drive/folders/18xEFIS66wqfRQWjcAzJnE19-l39gFZIT?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Upload file here
            </a>
          </div>

                <label htmlFor="categorytype">Category Type</label>
                <input 
                type="text"
                id="categorytype"
                name="categorytype"
                placeholder="Enter category type" 
                value={categorytype || " "}
                onChange={handleInputChange}
                />

                    {/* <label htmlFor="checkbox">Check Box</label>
                            <input
                            type="checkbox"
                            id="checkbox"
                            name="checkbox"
                            checked={checkbox}
                            onChange={handleInputChange}
                            />

                <br></br>
                <label htmlFor="radiobutton">Radio</label>
                 <div>
                <input
                    type="radio"
                    id="radiobutton1"
                    name="radiobutton"
                    value="Option 1"
                    checked={radiobutton === 'Option 1'}
                    onChange={handleRadioChange}
                />
                <label htmlFor="radiobutton1">Option 1</label>
                </div>

                <div>
                <input
                    type="radio"
                    id="radiobutton2"
                    name="radiobutton"
                    value="Option 2"
                    checked={radiobutton === 'Option 2'}
                    onChange={handleRadioChange}
                />
                <label htmlFor="radiobutton2">Option 2</label>
                </div>


                <label htmlFor="date">Date</label>
                    <input
                    type="date"
                    id="date"
                    name="date"
                    value={date} 
                    onChange={handleDateChange}
                    />
                    <br></br>
                <label htmlFor="continuetext">Continue Text</label>
                <input 
                type="text"
                id="continuetext"
                name="continuetext"
                placeholder="Enter your file continue text" 
                value={continuetext|| " "}
                onChange={handleInputChange}
                />
                <label htmlFor="continuenumber">continue Number</label>
                <input 
                type="text"
                id="continuenumber"
                name="continuenumber"
                placeholder="Enter your file continue number" 
                value={continuenumber|| " "}
                onChange={handleInputChange}
                />



               <label htmlFor="weigth">Weigth</label>
                 <div>
                <input
                    type="radio"
                    id="weigth1"
                    name="weigth"
                    value="1"
                    checked={weigth === '1'}
                    onChange={handleRadioChange1}
                />
                <label htmlFor="weigth1">Very Low</label>
                </div>

                <div>
                <input
                    type="radio"
                    id="weigth1"
                    name="weigth"
                    value="2"
                    checked={weigth === '2'}
                    onChange={handleRadioChange1}
                />
                <label htmlFor="weigth2">Low</label>
                </div>

                <div>
                <input
                    type="radio"
                    id="weigth3"
                    name="weigth"
                    value="3"
                    checked={weigth === '3'}
                    onChange={handleRadioChange1}
                />
                <label htmlFor="weigth1">Medium</label>
                </div>

                <div>
                <input
                    type="radio"
                    id="weigth1"
                    name="weigth"
                    value="4"
                    checked={weigth === '4'}
                    onChange={handleRadioChange1}
                />
                <label htmlFor="weigth1">High</label>
                </div>

                  <div>
                <input
                    type="radio"
                    id="weigth1"
                    name="weigth"
                    value="5"
                    checked={weigth === '5'}
                    onChange={handleRadioChange1}
                />
                <label htmlFor="weigth1">Very High</label>
                </div> */}


                <input type="submit" value={riskcategoryid ? "update": "Save"}/>
                <Link to="/risk">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default RiskAddEdit;