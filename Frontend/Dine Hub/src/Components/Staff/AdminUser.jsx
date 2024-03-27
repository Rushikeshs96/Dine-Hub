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
class AdminUser extends Component {
  constructor() {
    super();

    this.state = {
      UserId: "",
      distributor: [],
      products: [],
      Category: "",
      ItemType: "",
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
      fetch("https://localhost:7230/api/UserOrders/SaveOrder", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        crossorigin: true,
        body: JSON.stringify({
          order_date: new Date().toLocaleString(),
          userId: this.state.UserId,
          distributor_name: this.state.selectedDistName,
          order_status: "Pending",
          orderDetails: this.state.orderData,
        }),
      })
        .then((Response) => Response.json())
        .then((result) => {
          alert(result.message);
          window.location = "/AdminUser";
        });
    }
  }
  onSubmit(event) {
    if (this.validation()) {
      event.preventDefault();
      debugger;
      const tempData = {
        productId: this.state.productTempData.id.toString(),
        productName: this.state.productTempData.menuName,
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

  onChangeName(e) {
    this.setState({
      Category: e.target.value,
      quantity: "",
    });
    axios
      .post(
        "https://localhost:7230/api/UserOrders/GetMenu?type=" +
          this.state.ItemType +
          "&category=" +
          e.target.value
      )
      .then((json) => {
        debugger;
        this.setState({ products: json.data });
      });
  }
  onProductChange(e) {
    this.setState({
      selectedProd: e.target.value,
      productTempData: [],
      quantity: "",
    });
    axios
      .get("https://localhost:7230/api/Menu/GetById/" + e.target.value)
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
              Place Order
            </h4>
            <Container>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <CardGroup>
                    <Card className="p-2 colorWhite">
                      <CardBody>
                        <Form className="form" onSubmit={this.onSubmit}>
                          <div className="row mb-3">
                            <label className="col-sm-4">Menu Type</label>
                            <div className="col-sm-8">
                              <select
                                className="form-select form-select-sm"
                                name="ItemType"
                                value={this.state.ItemType}
                                onChange={this.handleChange}
                              >
                                <option>Select Type</option>
                                <option value="Veg" key="Veg">
                                  Veg
                                </option>
                                <option value="Non Veg" key="Non Veg">
                                  Non Veg
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4">Category</label>
                            <div className="col-sm-8">
                              <select
                                className="form-select form-select-sm"
                                name="Category"
                                value={this.state.Category}
                                onChange={this.onChangeName}
                              >
                                <option>Select Category</option>
                                <option value="Starter" key="Starter">
                                  Starter
                                </option>
                                <option value="Chinese" key="Chinese">
                                  Chinese
                                </option>
                                <option value="Main Course" key="Main Course">
                                  Main Course
                                </option>
                                <option value="Deserts" key="Deserts">
                                  Deserts
                                </option>
                                <option value="Soft Drinks" key="Soft Drinks">
                                  Soft Drinks
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4">Item Name</label>
                            <div className="col-sm-8">
                              <select
                                className="form-select form-select-sm"
                                value={this.state.selectedProd}
                                onChange={this.onProductChange}
                              >
                                <option>Select Product</option>
                                {this.state.products.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.menuName}
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
                                Place Order
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

export default AdminUser;
