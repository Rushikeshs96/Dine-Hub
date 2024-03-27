import React, { Component } from "react";
import "../../css/Style.css";
import axios from "axios";
import { Link } from "react-router-dom";
class ViewMyOrder extends Component {
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    const term = queryParams.get("id");
    this.state = {
      Id: sessionStorage.getItem("uid"),
      orderId: term,
      orderData: [],
      products: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://localhost:7230/api/UserOrders/GetOrdersDetails/" +
          this.state.orderId
      )
      .then((response) => {
        this.setState({ products: response.data });
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
                  <a className="navbar-brand fs-2 colorWhite" href="/UserHome">
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
                          href="/UserHome"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="BookTable">
                          Book Table
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="Placeorder">
                          Place Order
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="orders">
                          My Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="userprofile">
                          Profile
                        </a>
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

          <div id="order-tb" className="container">
          <table className="table table-striped table-borderless">
              <thead className="table-dark">
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <center>
              <Link to={"/Orders"} className="btn btn-danger">
                Cancel
              </Link>
            </center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewMyOrder;
