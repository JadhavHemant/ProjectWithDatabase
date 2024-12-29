import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../pages/header";
import Footer from "../pages/footer";
import * as API from "../endpoint";
const initialState = {
  environmentname: "",
  environmentdescription: "",
};
const EnvironmentAddEdit = () => {
  const [state, setState] = useState(initialState);

  const { environmentname, environmentdescription } = state;

  const navigate = useNavigate();
  const { environmentid } = useParams();
  useEffect(() => {
    if (environmentid) {
      try {
        axios
          .get(API.VIEW_ENVIRONMENT_API(environmentid))
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
  }, [environmentid]);

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

    if (!environmentname) {
      toast.error("please provide the Input");
    } else {
      if (!environmentid) {
        axios
          .post(API.ADD_ENVIRONMENT_API, {
            environmentname,
            environmentdescription,
          })
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Company Details added");
      } else {
        axios
          .put(API.UPDATE_ENVIRONMENT_API(environmentid), {
            environmentname,
            environmentdescription,
          })
          .then(() => {
            setState({
                environmentname: "",
                environmentdescription: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Data Set Details Updated");
      }
      setTimeout(() => navigate("/environment"), 500);
    }
  };
  return (
    <div style={{ fontFamily: "Poppins" }}>
      <Header />
      <h1>Environment</h1>
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
            id="environmentname"
            name="environmentname"
            placeholder="Enter the environment Name"
            value={environmentname || ""}
            onChange={handleInputChange}
          />
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="environmentdescription"
            name="environmentdescription"
            placeholder="Enter the environment Description"
            value={environmentdescription || ""}
            onChange={handleInputChange}
          />

          <input type="submit" value={environmentid ? "Update" : "Save"} />
          <Link to="/environment">
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

export default EnvironmentAddEdit;