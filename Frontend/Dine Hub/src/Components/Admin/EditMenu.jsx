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
class EditMenu extends Component {
  constructor() {
    super();
    const queryParams = new URLSearchParams(window.location.search);
    const term = queryParams.get("id");
    this.state = {
      products: [],
      MenuName: "",
      ItemType: "",
      Category: "",
      Price: "",
      Id: term,
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
  }
  updateMenu() {
    if (this.validation()) {
        axios
        .post("https://localhost:7230/api/Menu/UpdateData", this.state)
        .then((res) => {
          alert(res.data.message); 
        });
    }
  }
  componentDidMount() {
    axios
      .get("https://localhost:7230/api/Menu/GetById/" + this.state.Id)
      .then((response) => {
        this.setState({
          MenuName: response.data.menuName,
          ItemType: response.data.itemType,
          Category: response.data.category,
          Price: response.data.price,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  validation() {
    return true;
  }
  clear() {
    this.setState({
      products: [],
      MenuName: "",
      ItemType: "",
      Category: "",
      Price: "",
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
                        <a className="nav-link active" href="/MenuMaster">
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
                        <a className="nav-link" href="/ViewOrders">
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
              Update Menu
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
                                onChange={this.handleChange}
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
                            <label className="col-sm-4">Menu Name </label>
                            <div className="col-sm-8">
                              <Input
                                name="MenuName"
                                type="text"
                                value={this.state.MenuName}
                                onChange={this.handleChange}
                                placeholder="Menu Name"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4">Menu Price </label>
                            <div className="col-sm-8">
                              <Input
                                name="Price"
                                type="text"
                                value={this.state.Price}
                                onChange={this.handleChange}
                                placeholder="Menu Price"
                              />
                            </div>
                          </div>

                          <div className="row">
                            <Col sm={3}></Col>
                            <Col sm={3}>
                              <Button
                                type="button"
                                id="btn_Submit"
                                color="success"
                                onClick={this.updateMenu}
                              >
                                Update
                              </Button>
                            </Col>
                            <Col sm={3}>
                              <a className="btn btn-danger" href="/MenuMaster">
                                Cancel
                              </a>
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

export default EditMenu;
