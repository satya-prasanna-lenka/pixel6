import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-body-tertiary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            LOGO
          </Link>
          <div className="navbar-nav  flex-row">
            <Link className="nav-link active" to="/">
              Home
            </Link>
            <Link className="nav-link active mx-3" to="/addDetails">
              Add Details
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
