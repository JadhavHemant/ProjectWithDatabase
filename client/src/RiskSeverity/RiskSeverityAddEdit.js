import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import * as API from "../endpoint";

const initialState = {
  subcategorytype: " ",
  subcategorytypedescription: " ",
  iconupload: " ",
  fileupload: " ",
  riskseverityvalue: " ",
};

const RiskSeverityAddEdit = () => {
  const [state, setState] = useState(initialState);

  const {
    riskseveritytype,
    riskseveritytypedescription,
    iconupload,
    fileupload,
    riskseverityvalue,
  } = state;

  const navigate = useNavigate();

  const { riskseverityid } = useParams();

  useEffect(() => {
    if (riskseverityid) {
      axios
        .get(API.GET_RISKGROUP_API)
        .then((resp) => setState({ ...resp.data[0] }));
    }
  }, [riskseverityid]);

  const handleRadioChange = (event) => {
    const radioValue = event.target.value;
    setState({ ...state, riskseverityvalue: radioValue });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    if (
      !riskseveritytype ||
      !riskseveritytypedescription ||
      !iconupload ||
      !fileupload ||
      !riskseverityvalue
    ) {
      toast.error("please provider value into each input field");
    } else {
      if (!riskseverityid) {
        axios
          .post(API.ADD_RISKSEVERIT_API, {
            riskseveritytype,
            riskseveritytypedescription,
            iconupload,
            fileupload,
            riskseverityvalue,
          })
          .then(() => {
            setState({
              subcategorytype: " ",
              subcategorytypedescription: " ",
              iconupload: " ",
              fileupload: " ",
              riskseverityvalue: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Object added successfully");
      } else {
        axios
          .put(API.UPDATE_RISKSEVERIT_API(riskseverityid), {
            riskseveritytype,
            riskseveritytypedescription,
            iconupload,
            fileupload,
            riskseverityvalue,
          })
          .then(() => {
            setState({
              riskseveritytype: " ",
              riskseveritytypedescription: " ",
              iconupload: " ",
              fileupload: " ",
              riskseverityvalue: " ",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("risk severity update successfully");
      }
      setTimeout(() => navigate("/riskseverity"), 500);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: " 100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handlSubmit}
      >
        <label htmlFor="riskseveritytype">Risk Severity Type</label>
        <input
          type="text"
          id="riskseveritytype"
          name="riskseveritytype"
          placeholder="Enter risk severity "
          value={riskseveritytype || " "}
          onChange={handleInputChange}
        />
        <label htmlFor="riskseveritytypedescription">
          Risk Severity Type Description
        </label>
        <input
          type="text"
          id="riskseveritytypedescription"
          name="riskseveritytypedescription"
          placeholder="Enter risk severity Type Description"
          value={riskseveritytypedescription || " "}
          onChange={handleInputChange}
        />

        {/*<label htmlFor="iconupload">Icon Upload</label>
                <input 
                type="text"
                id="iconupload" 
                name="iconupload"
                placeholder="Enter your Icon upload Link" 
                value={iconupload || " "}
                onChange={handleInputChange}
            />*/}
        <label>File Upload: </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <br />
          <input
            style={{ fontFamily: "Poppins", marginRight: "10px" }}
            type="text"
            id="fileupload"
            name="Fileupload"
            value={state.fileupload || ""}
            onChange={handleInputChange}
          />
          <div style={{ position: "relative" }}></div>
          <a
            href="http://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upload file here
          </a>
        </div>

        <label htmlFor="riskseverityvalue">Risk Severity</label>
        <div>
          <input
            type="radio"
            id="riskseverityvalue1"
            name="riskseverityvalue"
            value="1"
            checked={riskseverityvalue === "1"}
            onChange={handleRadioChange}
          />
          <label htmlFor="riskseverityvalue1">Very Low</label>
        </div>

        <div>
          <input
            type="radio"
            id="riskseverityvalue1"
            name="riskseverityvalue"
            value="2"
            checked={riskseverityvalue === "2"}
            onChange={handleRadioChange}
          />
          <label htmlFor="riskseverityvalue2">Low</label>
        </div>

        <div>
          <input
            type="radio"
            id="riskseverityvalue1"
            name="riskseverityvalue"
            value="3"
            checked={riskseverityvalue === "3"}
            onChange={handleRadioChange}
          />
          <label htmlFor="riskseverityvalue1">Medium</label>
        </div>

        <div>
          <input
            type="radio"
            id="riskseverityvalue1"
            name="riskseverityvalue"
            value="4"
            checked={riskseverityvalue === "4"}
            onChange={handleRadioChange}
          />
          <label htmlFor="riskseverityvalue1">High</label>
        </div>

        <div>
          <input
            type="radio"
            id="riskseverityvalue1"
            name="riskseverityvalue"
            value="5"
            checked={riskseverityvalue === "5"}
            onChange={handleRadioChange}
          />
          <label htmlFor="riskseverityvalue1">Very High</label>
        </div>

        <input type="submit" value={riskseverityid ? "update" : "Save"} />
        <Link to="/riskseverity">
          <input type="button" value="go back" />
        </Link>
      </form>
    </div>
  );
};

export default RiskSeverityAddEdit;

