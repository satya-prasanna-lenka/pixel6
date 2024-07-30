import { useEffect, useState } from "react";
import "../assets/home.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
  const [customerData, setCustomerData] = useState([]);

  // Performing the delete operation
  const handleDelete = (panNumber) => {
    // Ask the user for confirmation before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (isConfirmed) {
      // If the user confirmed, proceed with the deletion
      const deletedData = customerData.filter(
        (data) => data.panNumber != panNumber
      );
      localStorage.setItem("userDetails", JSON.stringify(deletedData));
      setCustomerData(deletedData);
      toast.success("Deleted customer");
    } else {
      // If the user canceled, do nothing eat 5 star
      toast.info("Customer not deleted");
    }
  };

  // Fetching customer details from local storage
  useEffect(() => {
    setCustomerData(JSON.parse(localStorage.getItem("userDetails")));
  }, []);
  return (
    <>
      <div className="here_section">
        <div className="container bootstrap snippets bootdeys mt-3">
          <div className="row">
            {customerData?.length > 0 ? (
              customerData?.map((data, index) => {
                return (
                  <div key={index} className="col-md-4 col-sm-6 content-card">
                    <div className="card-big-shadow">
                      <div
                        className="card card-just-text"
                        data-background="color"
                        data-color="blue"
                        data-radius="none"
                      >
                        <div className="content">
                          <h6 className="category">{data.email}</h6>
                          <h4 className="title">{data.fullName}</h4>
                          <p className="description">Mobile: {data.mobile}</p>
                          <small className="description">
                            City: {data.city}
                          </small>
                          <br />
                          <small className="description">
                            State: {data.state}
                          </small>
                          <br />
                          <small className="description">
                            Post Code: {data.postCode}
                          </small>
                          <br />
                          <small className="description">
                            Line 1: {data.line1}
                          </small>
                          <br />
                          <small className="description">
                            {data.line2 && <> Line 2: {data.line2}</>}
                          </small>
                          <br />
                          <Link to={`/updateDetails/${data.panNumber}`}>
                            <button className="btn btn-primary">Edit</button>
                          </Link>
                          <button
                            className="btn btn-danger mx-3"
                            onClick={() => handleDelete(data.panNumber)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center">
                No data to show Please <Link to="addDetails">Add</Link>
              </h1>
            )}

            {/* <div className="col-md-4 col-sm-6 content-card">
              <div className="card-big-shadow">
                <div
                  className="card card-just-text"
                  data-background="color"
                  data-color="green"
                  data-radius="none"
                >
                  <div className="content">
                    <h6 className="category">Best cards</h6>
                    <h4 className="title">Green Card</h4>
                    <p className="description">
                      What all of these have in common is that they're pulling
                      information out of the app or the service and making it
                      relevant to the moment.{" "}
                    </p>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-3">Delete</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 content-card">
              <div className="card-big-shadow">
                <div
                  className="card card-just-text"
                  data-background="color"
                  data-color="yellow"
                  data-radius="none"
                >
                  <div className="content">
                    <h6 className="category">Best cards</h6>
                    <h4 className="title">Yellow Card</h4>
                    <p className="description">
                      What all of these have in common is that they're pulling
                      information out of the app or the service and making it
                      relevant to the moment.{" "}
                    </p>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-3">Delete</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 content-card">
              <div className="card-big-shadow">
                <div
                  className="card card-just-text"
                  data-background="color"
                  data-color="brown"
                  data-radius="none"
                >
                  <div className="content">
                    <h6 className="category">Best cards</h6>
                    <h4 className="title">Brown Card</h4>
                    <p className="description">
                      What all of these have in common is that they're pulling
                      information out of the app or the service and making it
                      relevant to the moment.{" "}
                    </p>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-3">Delete</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 content-card">
              <div className="card-big-shadow">
                <div
                  className="card card-just-text"
                  data-background="color"
                  data-color="purple"
                  data-radius="none"
                >
                  <div className="content">
                    <h6 className="category">Best cards</h6>
                    <h4 className="title">Purple Card</h4>
                    <p className="description">
                      What all of these have in common is that they're pulling
                      information out of the app or the service and making it
                      relevant to the moment.{" "}
                    </p>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-3">Delete</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 content-card">
              <div className="card-big-shadow">
                <div
                  className="card card-just-text"
                  data-background="color"
                  data-color="orange"
                  data-radius="none"
                >
                  <div className="content">
                    <h6 className="category">Best cards</h6>
                    <h4 className="title">Orange Card</h4>
                    <p className="description">
                      What all of these have in common is that they're pulling
                      information out of the app or the service and making it
                      relevant to the moment.{" "}
                    </p>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger mx-3">Delete</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
