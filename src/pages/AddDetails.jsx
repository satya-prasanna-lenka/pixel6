import { useEffect, useState } from "react";
import "../assets/details.css";
import axios from "axios";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const AddDetails = () => {
  // State to manage current step in the form
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState({ step: "", msg: "" });
  const [loading, setLoading] = useState(false);

  // State to manage customer data from local storage
  const [customerData, setCustomerData] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  // State to manage form input data
  const [inputData, setInputData] = useState({
    panNumber: "",
    fullName: "",
    email: "",
    mobile: "",
  });

  // State to manage address data
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    postCode: "",
    state: "",
    city: "",
  });

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate required fields
    if (
      !inputData.email ||
      !inputData.panNumber ||
      !inputData.fullName ||
      !inputData.mobile ||
      !address.line1 ||
      !address.postCode ||
      !address.state ||
      !address.city
    ) {
      toast.warn("* marked fields are required");
    } else if (inputData.panNumber.length < 10) {
      toast.error("PAN number must be of 10 digits");
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(inputData.email)
    ) {
      toast.error("Please enter a valid email address");
    } else if (
      customerData?.find((data) => data.panNumber == inputData.panNumber)
    ) {
      toast.error("This PAN number is already in use");
    } else {
      // Save data to local storage
      if (customerData?.length > 0) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify([
            ...customerData,
            {
              ...inputData,
              ...address,
            },
          ])
        );
      } else {
        localStorage.setItem(
          "userDetails",
          JSON.stringify([
            {
              ...inputData,
              ...address,
            },
          ])
        );
      }
      // Reset form input data
      setInputData({
        panNumber: "",
        fullName: "",
        email: "",
        mobile: "",
      });
      setAddress({
        line1: "",
        line2: "",
        postCode: "",
        state: "",
        city: "",
      });
      navigate("/");
      setStep(1);
      toast.success("Data saved");
    }
  };

  // Function to handle data update
  const handleUpdate = () => {
    const restData = customerData?.filter(
      (data) => data.panNumber != params.id
    );
    if (restData.length > 0) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify([{ ...inputData, ...address }, ...restData])
      );
    } else {
      localStorage.setItem(
        "userDetails",
        JSON.stringify([{ ...inputData, ...address }])
      );
    }
    toast.success("Updated");
    navigate("/");
  };

  // Function to verify PAN number
  const verifyPan = () => {
    setLoading(true);
    const url = "https://lab.pixel6.co/api/verify-pan.php";
    const bodyData = {
      panNumber: inputData.panNumber,
    };
    axios
      .post(url, bodyData)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setInputData({ ...inputData, fullName: res.data.fullName });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  // Function to verify Postcode
  const verifyPostCode = () => {
    setLoading(true);
    const url = "https://lab.pixel6.co/api/get-postcode-details.php";
    const bodyData = {
      postcode: address.postCode,
    };
    axios
      .post(url, bodyData)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setAddress({
            ...address,
            state: res.data.state[0].name,
            city: res.data.city[0].name,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  // Effect to verify PAN number as user types
  useEffect(() => {
    if (inputData.panNumber.length === 10) {
      setErrorMsg("");
      verifyPan();
    } else if (inputData.panNumber.length >= 7) {
      const timeoutID = setTimeout(() => {
        setErrorMsg({ step: 1, msg: "PAN number must be of 10 digits" });
      }, 1000);
      return () => clearTimeout(timeoutID);
    } else {
      setErrorMsg("");
    }
  }, [inputData.panNumber]);

  // Effect to verify Postcode as user types
  useEffect(() => {
    if (address.postCode.length === 6) {
      setErrorMsg("");
      verifyPostCode();
    } else if (address.postCode.length >= 3) {
      const timeoutID = setTimeout(() => {
        setErrorMsg({ step: 2, msg: "Postcode must be of 6 digits" });
      }, 1000);
      return () => clearTimeout(timeoutID);
    } else {
      setErrorMsg("");
    }
  }, [address.postCode]);

  // Effect to load customer data from local storage on component mount
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("userDetails"));
    setCustomerData(localData);
    if (params?.id) {
      setUpdateMode(true);
      const updateUserDetails = localData?.filter(
        (data) => data.panNumber === params.id
      );
      if (updateUserDetails.length > 0) {
        setInputData({
          panNumber: updateUserDetails[0].panNumber,
          fullName: updateUserDetails[0].fullName,
          email: updateUserDetails[0].email,
          mobile: updateUserDetails[0].mobile,
        });
        setAddress({
          line1: updateUserDetails[0].line1,
          line2: updateUserDetails[0]?.line2,
          postCode: updateUserDetails[0].postCode,
          state: updateUserDetails[0].state,
          city: updateUserDetails[0].city,
        });
      }
      console.log(updateUserDetails);
    }
  }, []);

  return (
    <div className="stepper">
      <div className="contaienr">
        <div className="progress-container">
          <div className="progress" id="progress"></div>
          <div
            onClick={() => setStep(1)}
            className={`circle ${step === 1 && "active"}`}
          >
            1
          </div>
          <div
            onClick={() => setStep(2)}
            className={`circle ${step === 2 && "active"}`}
          >
            2
          </div>
        </div>

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div>
            <h4>Personal Details</h4>
            <div className="row">
              <div className="col-md-6 ">
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add PAN Number *"
                    value={inputData.panNumber}
                    onChange={(e) => {
                      setInputData({
                        ...inputData,
                        panNumber: e.target.value.toUpperCase(),
                      });
                    }}
                    maxLength="10"
                    required
                    disabled={updateMode}
                  />{" "}
                  {loading && step === 1 && <Loading />}
                </div>
                <small className="text-danger">
                  {errorMsg.step === 1 && errorMsg.msg}
                </small>
              </div>
              <div className="col-md-6">
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name *"
                  required
                  value={inputData.fullName}
                  maxLength={140}
                  onChange={(e) =>
                    setInputData({ ...inputData, fullName: e.target.value })
                  }
                />{" "}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                {" "}
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email *"
                  required
                  maxLength={255}
                  value={inputData.email}
                  onChange={(e) =>
                    setInputData({ ...inputData, email: e.target.value })
                  }
                />{" "}
              </div>
              <div className="col-md-6 d-flex text-center align-items-center">
                <select
                  className="form-select"
                  style={{ width: "90px", textAlign: "center" }}
                  aria-label="Default select example"
                >
                  <option defaultValue={+91}>+91</option>
                </select>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mobile *"
                  required
                  maxLength={10}
                  value={inputData.mobile}
                  onChange={(e) =>
                    setInputData({ ...inputData, mobile: e.target.value })
                  }
                />{" "}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address Details */}
        {step === 2 && (
          <div>
            <h4>Address Details</h4>
            <div className="row">
              <div className="col-md-6">
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Line 1 *"
                  value={address.line1}
                  onChange={(e) =>
                    setAddress({ ...address, line1: e.target.value })
                  }
                  required
                />{" "}
              </div>
              <div className="col-md-6">
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Line 2"
                  value={address.line2}
                  onChange={(e) =>
                    setAddress({ ...address, line2: e.target.value })
                  }
                  required
                />{" "}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 d-flex">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Postcode *"
                  required
                  value={address.postCode}
                  onChange={(e) =>
                    setAddress({ ...address, postCode: e.target.value })
                  }
                />
                {loading && step === 2 && <Loading />}
              </div>
              <small className="text-danger">
                {errorMsg.step === 2 && errorMsg.msg}
              </small>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State *"
                  required
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City *"
                  required
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="btnArea mt-4">
          <button
            onClick={() => setStep((prevState) => prevState - 1)}
            className="btn"
            disabled={step === 1 && true}
          >
            Prev
          </button>
          {step === 2 ? (
            <>
              {updateMode ? (
                <button onClick={handleUpdate} className="btn btn-success">
                  Update
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn btn-success">
                  Submit
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => setStep((prevState) => prevState + 1)}
              className="btn"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDetails;
