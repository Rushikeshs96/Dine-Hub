import React, { Component } from "react";
import { Link } from "react-router-dom";

class FrontPage extends Component {
  render() {

    const activeSlide = 0;
    return (
      <div style={{ position: "fixed", width: "100%", zIndex: "999" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" style={{color:"orange"}}>
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
                    style={{ minWidth: "auto"}} 

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
        <div id="hero1" className="d-flex align-items-center">
            <div
              className="container position-relative text-center text-lg-start"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="row">
                <div className="col-lg-8">
                  <h1>
                    Welcome to <span>DineHub</span>
                  </h1>
                  <h2>Delivering great food for more than 18 years!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPage;
