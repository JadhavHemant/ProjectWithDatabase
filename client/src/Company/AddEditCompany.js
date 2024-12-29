import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  companyname: "",
  contactname: "",
  contactemail: "",
  contactphone: "",
};
const AddEditCompany = () => {
  const [state, setState] = useState(initialState);

  const { companyname, contactname, contactemail, contactphone } = state;

  const navigate = useNavigate();
  const { companyid } = useParams();
  useEffect(() => {
    if (companyid) {
      try {
        axios
          .get(`http://localhost:5000/companyget/api/${companyid}`)
          .then((resp) => setState({ ...resp.data[0] }))
          .catch((error) => {
            console.error(
              "An error occurred while fetching the Company Details:",
              error
            );
          });
      } catch (error) {
        console.error(
          "An error occurred while fetching the Company Details:",
          error
        );
      }
    }
  }, [companyid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    try {
      setState({ ...state, [name]: value });
    } catch (error) {
      console.error("Error updating Company Details:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyname || !contactname || !contactemail || !contactphone) {
      toast.error("please provide the Input");
    } else {
      if (!companyid) {
        axios
          .post("http://localhost:5000/companyadd/api", {
            companyname,
            contactname,
            contactemail,
            contactphone,
          })
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Company Details added");
      } else {
        axios
          .put(`http://localhost:5000/updatecompany/api/${companyid}`, {
            companyname,
            contactname,
            contactemail,
            contactphone,
          })
          .then(() => {
            setState({
              companyname: "",
              contactname: "",
              contactemail: "",
              contactphone: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Company Details Updated");
      }
      setTimeout(()=> navigate("/company"),500);
    }
  };
  return (
    <div>
      
      <center><h1>Company Details</h1></center>
      <div style={{ marginTop: "auto" }}>
        <form
          style={{
            fontFamily: "Poppins",
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="companyname"
            name="companyname"
            placeholder="Enter the Company Name"
            value={companyname || ""}
            onChange={handleInputChange}
          />
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="contactname"
            name="contactname"
            placeholder="Enter the Contact Name"
            value={contactname || ""}
            onChange={handleInputChange}
          />
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="contactemail"
            name="contactemail"
            placeholder="Enter the Contact Email"
            value={contactemail || ""}
            onChange={handleInputChange}
          />
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="contactphone"
            name="contactphone"
            placeholder="Enter the Contact Phone"
            value={contactphone || ""}
            onChange={handleInputChange}
          />
          <input type="submit" value={companyid ? "Update" : "Save"} />
          <Link to="/company">
            <input
              style={{ fontFamily: "Poppins", backgroundColor: "#3386ff" }}
              type="button"
              value="Go back"
            ></input>
          </Link>
        </form>
      </div>
     
    </div>
  );
};

export default AddEditCompany;
