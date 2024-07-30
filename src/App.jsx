import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import Home from "./pages/Home";
import AddDetails from "./pages/AddDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/addDetails" element={<AddDetails />} />
          <Route path="/updateDetails/:id" element={<AddDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
