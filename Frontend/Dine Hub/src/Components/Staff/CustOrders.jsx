import React, { Component } from "react";
import "../../css/Style.css";
import axios from "axios";
import { Link } from "react-router-dom";
class CustOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserId: sessionStorage.getItem("uid"),
      orderData: [],
    };
  }
  componentDidMount() {
    axios
      .post(
        "https://localhost:7230/api/UserOrders/GetAllOrders"
      )
      .then((json) => {
        this.setState({ orderData: json.data });
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
                  DineHub
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
                        <a className="nav-link" href="BookingDetails">
                          Booking Details
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="CustOrders">
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
            <table className="table table-striped table-borderless">
              <thead className="table-dark">
                <tr>
                  <th>Order Id</th>
                  <th>Order Date</th>
                  <th colSpan="4">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orderData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.orderId}</td>
                    <td>{item.orderDate}</td>
                    <td>
                      <Link
                        to={"/ViewSOrder?id=" + item.orderId}
                        className="btn btn-success"
                      >
                        View
                      </Link>
                    </td>
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

export default CustOrders;
