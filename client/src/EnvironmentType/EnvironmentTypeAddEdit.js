import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../pages/header";
import Footer from "../pages/footer";
import * as API from "../endpoint";
const initialState = {
  environmenttypename: "",
  environmenttypedescription: "",
};
const EnvironmentTypeAddEdit = () => {
  const [state, setState] = useState(initialState);

  const { environmenttypename, environmenttypedescription } = state;

  const navigate = useNavigate();
  const { environmenttypeid } = useParams();
  useEffect(() => {
    if (environmenttypeid) {
      try {
        axios
          .get(API.VIEW_ENVIRONMENTTYPE_API(environmenttypeid))
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
  }, [environmenttypeid]);

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

    if (!environmenttypename) {
      toast.error("please provide the Input");
    } else {
      if (!environmenttypeid) {
        axios
          .post(API.ADD_ENVIRONMENTTYPE_API, {
            environmenttypename,
            environmenttypedescription,
          })
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Company Details added");
      } else {
        axios
          .put(API.UPDATE_ENVIRONMENTTYPE_API(environmenttypeid), {
            environmenttypename,
            environmenttypedescription,
          })
          .then(() => {
            setState({
                environmenttypename: "",
                environmenttypedescription: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Data Set Details Updated");
      }
      setTimeout(() => navigate("/environmenttype"), 500);
    }
  };
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <Header />
      <center><h1>Environment Type</h1></center>
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
            id="environmenttypename"
            name="environmenttypename"
            placeholder="Enter the environment Type Name"
            value={environmenttypename || ""}
            onChange={handleInputChange}
          />
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="environmenttypedescription"
            name="environmenttypedescription"
            placeholder="Enter the environment Type Description"
            value={environmenttypedescription || ""}
            onChange={handleInputChange}
          />

          <input type="submit" value={environmenttypeid ? "Update" : "Save"} />
          <Link to="/environmenttype">
            <input
              className="btn btn-edit"
              type="button"
              value="Go back"
            ></input>
          </Link>
        </form>
      </div>
      <Footer /> 
    </div>
  );
};

export default EnvironmentTypeAddEdit; 