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
class AddOrder extends Component {
  constructor() {
    super();

    this.state = {
      distributor: [],
      products: [],
      selectedDist: "",
      selectedDistName: "",
      selectedProd: "",
      orderData: [],
      quantity: "",
      productTempData: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
    //this.addProduct = this.addProduct.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateOrder = this.generateOrder.bind(this);
    // this.validation = this.validation.bind(this);
  }
  generateOrder() {
    debugger;
    if (this.validation()) {
      fetch("https://localhost:7230/api/Order/SaveOrder", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        crossorigin: true,
        body: JSON.stringify({
          order_date: new Date().toLocaleString(),
          supp_id: this.state.selectedDist,
          distributor_name: this.state.selectedDistName,
          order_status: "Pending",
          orderDetails: this.state.orderData,
        }),
      })
        .then((Response) => Response.json())
        .then((result) => {
          alert(result.message);
          window.location = "/vieworders";
        });
    }
  }
  onSubmit(event) {
    if (this.validation()) {
      event.preventDefault();
      debugger;
      const tempData = {
        productId: this.state.productTempData.id.toString(),
        productName: this.state.productTempData.productName,
        quantity: this.state.quantity,
        price: (
          parseInt(this.state.productTempData.price) *
          parseInt(this.state.quantity)
        ).toString(),
      };
      let { orderData } = this.state;
      orderData.push(tempData);
      this.setState({ orderData: orderData, quantity: "", selectedProd: "" });
    }
  }
  validation() {
    return true;
  }
  componentDidMount() {
    axios
      .get("https://localhost:7230/api/Admin/GetSuppliers")
      .then((response) => {
        this.setState({ distributor: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      selectedDist: e.target.value,
      selectedDistName: e.target.value,
      products: [],
      orderData: [],
      quantity: "",
    });
    axios
      .get(
        "https://localhost:7230/api/Product/GetProductByDid/" + e.target.value
      )
      .then((response) => {
        debugger;
        this.setState({ products: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onProductChange(e) {
    this.setState({
      selectedProd: e.target.value,
      productTempData: [],
      quantity: "",
    });
    axios
      .get(
        "https://localhost:7230/api/Product/GetProductById/" + e.target.value
      )
      .then((response) => {
        this.setState({ productTempData: response.data, quantity: "" });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
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
                  <a className="navbar-brand fs-2 colorWhite" href="#">
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
                          href="/AdminHome"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/StaffMaster">
                          Staffs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/MenuMaster">
                          Menu
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/Customers">
                          Customers
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/Suppliers">
                          Suppliers
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="/ViewOrders">
                          Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/Reports">
                          Reports
                        </a>
                      </li>
                      <li className="nav-item ms-2">
                        <a href="/AdminLogin">
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
              Add Order
            </h4>
            <Container>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <CardGroup>
                    <Card className="p-2 colorWhite">
                      <CardBody>
                        <Form className="form" onSubmit={this.onSubmit}>
                          
                          <div className="row mb-3">
                            <label className="col-sm-4">Supplier Name</label>
                            <div className="col-sm-8">
                              <select
                                className="form-select form-select-sm"
                                value={this.state.selectedDist}
                                onChange={this.onChangeName}
                              >
                                <option>Select Supplier</option>
                                {this.state.distributor.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.supplierName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4">Product Name</label>
                            <div className="col-sm-8">
                              <select
                                className="form-select form-select-sm"
                                value={this.state.selectedProd}
                                onChange={this.onProductChange}
                              >
                                <option>Select Product</option>
                                {this.state.products.map((item) => (
                                  <option
                                    value={item.id}
                                    key={item.id}
                                  >
                                    {item.productName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4">Total Quantity </label>
                            <div className="col-sm-8">
                              <Input
                                name="quantity"
                                type="text"
                                value={this.state.quantity}
                                onChange={this.handleChange}
                                placeholder="Total Quantity"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <Col sm={3}></Col>
                            <Col sm={6}>
                              <center>
                                <Button type="submit" color="success">
                                  Add
                                </Button>
                              </center>
                            </Col>
                            <Col sm={3}></Col>
                          </div>
                          <div className="row">
                            <Col sm={12}>
                              <table
                                className="table table-striped"
                                style={{ marginTop: 10 }}
                              >
                                <thead className="table-dark tblHeader">
                                  <tr>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Product Quantity</th>
                                    <th>Total Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.orderData.map((item) => (
                                    <tr key={item.productId}>
                                      <td>{item.productId}</td>
                                      <td>{item.productName}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </Col>
                          </div>
                          <div className="row">
                            <Col sm={3}></Col>
                            <Col sm={4}>
                              <Button
                                type="button"
                                id="btn_Submit"
                                color="success"
                                onClick={this.generateOrder}
                              >
                                Generate Order
                              </Button>
                            </Col>
                            <Col sm={3}>
                              <Link
                                to={"/ViewOrders"}
                                className="btn btn-danger"
                              >
                                Cancel
                              </Link>
                            </Col>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddOrder;
