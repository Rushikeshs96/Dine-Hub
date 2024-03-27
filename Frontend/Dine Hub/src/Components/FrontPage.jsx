import React, { Component } from "react";
import { Link } from "react-router-dom";

class FrontPage extends Component {
  render() {

    const activeSlide = 0;
    return (
      <div style={{ position: "fixed", width: "100%", zIndex: "999" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              DINE HUB
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ minWidth: "auto" }} 
                  >
                    Login
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end" 
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <Link className="dropdown-item" to="/userlogin">
                        User Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/adminlogin">
                        Admin Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/supplierlogin">
                        Supplier Login
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid img-login">
          
        </div>
      </div>
    );
  }
}

export default FrontPage;
