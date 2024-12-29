import React ,{useState,useEffect}from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../endpoint";


const initialState = {
   vendorname:" ",
   vendorcontact:" ",
   vendoremail:" "
};

const VendorMasterAddEdit = () => {
    const [state,setState]= useState(initialState);
    console.log(API.GET_VENDORMASTER_API)

    const {vendorname,vendorcontact,vendoremail}=state;
    
    const navigate=useNavigate();
    
    const {vendorid}= useParams();
  

    useEffect(() => {
      if(vendorid){
      axios.get(API.VIEW_VENDORMASTER_API(vendorid))
        .then((resp)=>setState({...resp.data[0]}));}

    },[vendorid])

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!vendorname){
        toast.error("please provider value into each input field");
    }else{
        if(!vendorid){
          axios.post(API.ADD_VENDORMASTER_API,{
            vendorname,vendorcontact,vendoremail
        }).then(()=>{
          setState({ vendorname:" ",
          vendorcontact:" ",
          vendoremail:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success(" added successfully");
        }
        else{
          
          axios.put(API.UPDATE_VENDORMASTER_API(vendorid),{
            vendorname,vendorcontact,vendoremail
        }).then(()=>{
          setState({ vendorname:" ",
          vendorcontact:" ",
          vendoremail:" "})
        }).catch((err)=>toast.error(err.response.data));
        toast.success("update successfully");
        }
        setTimeout(()=> navigate("/vendormaster"),500);
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
                <label htmlFor="vendorname">Vendor Name</label>
                <input 
                type="text"
                id="vendorname"
                name="vendorname"
                placeholder="Enter vendor name" 
                value={vendorname || " "}
                onChange={handleInputChange}
                />
                <label htmlFor="vendorcontact">Vendor Contact</label>
                <input 
                type="text"
                id="vendorcontact"
                name="vendorcontact"
                placeholder="Enter vendor contact" 
                value={vendorcontact || " "}
                onChange={handleInputChange}
                />
                

                <label htmlFor="vendoremail">Vendor Email</label>
                <input 
                type="text"
                id="vendoremail"
                name="vendoremail"
                placeholder="Enter vendor email" 
                value={vendoremail || " "}
                onChange={handleInputChange}
                />


                <input type="submit" value={vendorid ? "update": "Save"}/>
                <Link to="/vendormaster">
                    <input type="button" value="go back"/>
                </Link>
              </form>
    </div>
  )
}

export default VendorMasterAddEdit