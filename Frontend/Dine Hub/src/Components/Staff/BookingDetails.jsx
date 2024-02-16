import React, { Component } from "react";
import "../../css/Style.css";
import axios from "axios";
class BookingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cust: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://localhost:7230/api/User/GetBookings")
      .then((response) => {
        this.setState({ cust: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid img-order">
          <header id="header" className="fixed-top d-flex align-items-cente">
            <div className="container-fluid container-xl">
              <nav id="nav" className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid ">
                  <a className="navbar-brand fs-2 colorWhite" href="/StaffHome">
                    DELICIOUS
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          aria-current="page"
                          href="/StaffHome"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="BookingDetails">
                          Booking Details
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="CustOrders">
                          Customer Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="SupOrders">
                          Supplier Orders
                        </a>
                      </li>
                      <li className="nav-item ms-2">
                        <a href="/AdminLogin">
                          <button className="btn btn-danger">LogOut</button>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </header>

          <div id="order-tb" className="container">
            <h4 className="colorWhite" align="center">
              Booked Tables
            </h4>
            <br></br>
            <table className="table table-striped table-borderless">
              <thead className="table-dark">
                <tr>
                  <th scope="col">User Id</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Booking Time</th>
                  <th scope="col">Total Members</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cust.map((item) => (
                  <tr key={item.id}>
                    <td>{item.userId}</td>
                    <td>{item.userName}</td>
                    <td>{item.bookingDate}</td>
                    <td>{item.bookingTime}</td>
                    <td>{item.totalMembers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookingDetails;
