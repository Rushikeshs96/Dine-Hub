import React, { Component } from "react";
import "../../css/Style.css";
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
const url = "https://localhost:7230/api/";
class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Password: "",
      Role: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onSubmit(event) {
    if (this.validation()) {
      event.preventDefault();
      fetch(url + "Admin/AddStaff", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        crossorigin: true,
        body: JSON.stringify(this.state),
      })
        .then((Response) => Response.json())
        .then((result) => {
          if (result.status == "Succuss") {
            this.clear();
            window.location = "/StaffMaster";
          }
          alert(result.message);
        });
    }
  }
  clear() {
    this.setState({
      UserName: "",
      Password: "",
    });
  }
  validation() {
    if (this.state.UserName == "") {
      alert("Please User Name");
      return false;
    } else if (this.state.Password == "") {
      alert("Please enter the Password");
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid img-order">
          <header id="header" className="fixed-top d-flex align-items-cente">
            <div className="container-fluid container-xl">
              <nav id="nav" className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid ">
                  <a className="navbar-brand fs-2 colorWhite" href="/AdminHome">
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
                        <a className="nav-link active" href="/StaffMaster">
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
              Add Staff
            </h4>
            <Container>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <CardGroup>
                    <Card className="p-2">
                      <CardBody>
                        <form className="form">
                          <div className="row mb-3">
                            <label className="col-sm-4 colorWhite">
                              User Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                id="form3Example1cg"
                                name="UserName"
                                className="txtWidth"
                                value={this.state.UserName}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-4 colorWhite">
                              Password
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="password"
                                id="form3Example4cg"
                                name="Password"
                                className="txtWidth"
                                value={this.state.Password}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4 colorWhite">Role</label>
                            <div className="col-sm-8">
                              <select
                                className="form-select form-select-sm"
                                value={this.state.Role}
                                name="Role"
                                onChange={this.handleChange}
                              >
                                <option>Select Role</option>
                                <option value="Staff" key="Staff">
                                  Staff
                                </option>
                                <option value="User" key="Waiter">
                                  Waiter
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <Col sm={4}></Col>
                            <Col sm={3}>
                              <Button
                                type="button"
                                color="success"
                                onClick={this.onSubmit}
                              >
                                Submit
                              </Button>
                            </Col>
                            <Col sm={3}>
                              <a
                                href={"/StaffMaster"}
                                className="btn btn-danger"
                              >
                                Cancel
                              </a>
                            </Col>
                          </div>
                        </form>
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

export default AddStaff;
