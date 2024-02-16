import React, { Component } from 'react';
import '../../css/Style.css';

class UserHome extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid img">
          <header id='header' className='fixed-top d-flex align-items-cente'>
            <div className='container-fluid container-xl'>
              <nav id='nav' className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid ">
                  <a className="navbar-brand fs-2 colorWhite" href="/UserHome">DELICIOUS</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/UserHome">Home</a>
                      </li>
                      <li className='nav-item'>
                        <a className="nav-link" href='BookTable'>Book Table</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="Placeorder">Place Order</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="orders">My Orders</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="userprofile">Profile</a>
                      </li>
                      <li className="nav-item ms-2">
                        <a href="/">
                          <button className="btn btn-danger">LogOut</button>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </header>
          {/* Hero Section */}
          <div id="hero" className="d-flex align-items-center">
            <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
              <div className="row">
                <div className="col-lg-8">
                  <h1>Welcome to <span>Delicious</span></h1>
                  <h2>Delivering great food for more than 18 years!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default UserHome