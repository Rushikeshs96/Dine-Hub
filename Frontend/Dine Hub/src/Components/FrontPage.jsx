import React, { Component } from "react";
import { Link } from "react-router-dom";

class FrontPage extends Component {
  render() {
    const Slides = [
      {
        src: "/images/slide1.jpg",
        content: {
          h2: "Slide 1 Heading",
          p: "Slide 1 Description"
        }
      },
      {
        src: "/images/slide2.jpg",
        content: {
          h2: "Slide 2 Heading",
          p: "Slide 2 Description"
        }
      },
      // Add more slides as needed
    ];

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
                    style={{ minWidth: "auto" }} // Set minimum width to prevent overflow
                  >
                    Login
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end" // Align dropdown to end (right side)
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

        <div className="container-fluid img-login"></div>
      </div>
    );
  }
}

export default FrontPage;
