import React, { Component } from "react";
import "../../css/Style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const url = "https://localhost:7230/api/";
class OrderAction extends Component {
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    const term = queryParams.get("id");
    this.state = {
      Id: sessionStorage.getItem("uid"),
      orderId: term,
      departments: [],
      products: [],
      orderStatus: queryParams.get("status"),
    };
    this.approveOrder = this.approveOrder.bind(this);
    this.rejectOrder = this.rejectOrder.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  approveOrder() {
    axios
      .post(
        "https://localhost:7230/api/Order/updateOrder?id=" + this.state.orderId
      )
      .then((res) => {
        alert(res.data.message);
        if (res.data.status == "Success") {
          window.location = "/SuppOrders";
        }
      });
  }
  rejectOrder() {
    axios
      .post(
        "https://localhost:7230/api/Order/rejectOrder?id=" + this.state.orderId
      )
      .then((res) => {
        alert(res.data.message);
        if (res.data.status == "Success") {
          window.location = "/SuppOrders";
        }
      });
  }
  componentDidMount() {
    axios
      .get(
        "https://localhost:7230/api/Order/GetOrdersDetails/" +
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
                  <a
                    className="navbar-brand fs-2 colorWhite"
                    href="/SupplierHome"
                  >
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
                          href="/SupplierHome"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/SuppProducts">
                          Products
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="/SuppOrders">
                          Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/SuppliersProfile">
                          Profile
                        </a>
                      </li>
                      <li className="nav-item ms-2">
                        <a href="/SupplierLogin">
                          <button className="btn btn-danger">Logout</button>
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
              Order Details
            </h4>

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

            <div className="row">
                <Col sm={3}></Col>
                <Col sm={2}>
                  <Button
                    type="button"
                    id="btn_Submit"
                    color="success"
                    onClick={this.approveOrder}
                    disabled={
                      this.state.orderStatus == "Pending" ? false : true
                    }
                  >
                    Approve
                  </Button>
                </Col>
                <Col sm={2}>
                  <Button
                    type="button"
                    id="btn_Submit"
                    color="success"
                    onClick={this.rejectOrder}
                    disabled={
                      this.state.orderStatus == "Pending" ? false : true
                    }
                  >
                    Reject
                  </Button>
                </Col>
                <Col sm={2}>
                  <Link to={"/SuppOrders"} className="btn btn-danger">
                    Cancel
                  </Link>
                </Col>
                <Col sm={3}></Col>
              </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OrderAction;
