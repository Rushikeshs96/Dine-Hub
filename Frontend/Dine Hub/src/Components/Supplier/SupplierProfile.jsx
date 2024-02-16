import React, { Component } from "react";
import "../../css/Style.css";
import axios from "axios";
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
class SuppliersProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: sessionStorage.getItem("sid"),
      SupplierName: "",
      EmailId: "",
      Password: "",
      SuppAddress: "",
      ContactNo: "",
      GSTNo: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    axios
      .get("https://localhost:7230/api/Supplier/GetById/" + this.state.Id)
      .then((response) => {
        this.setState({
          SupplierName: response.data.supplierName,
          EmailId: response.data.emailId,
          SuppAddress: response.data.suppAddress,
          GSTNo: response.data.gstNo,
          ContactNo: response.data.contactNo,
          Password: response.data.password,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSubmit(event) {
    if (this.validation()) {
      event.preventDefault();
      axios
      .post("https://localhost:7230/api/Supplier/UpdateData", this.state)
      .then((res) => {
        alert(res.data.message); 
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
    if (this.state.SupplierName == "") {
      alert("Please enter Name");
      return false;
    } else if (this.state.EmailId == "") {
      alert("Please enter Email Id");
      return false;
    } else if (!isEmail(this.state.EmailId)) {
      alert("Please enter valid Email Id");
      return false;
    } else if (this.state.ContactNo == "") {
      alert("Please enter the Contact Number");
      return false;
    } else if (this.state.Password == "") {
      alert("Please enter the Password");
      return false;
    } else if (this.state.SuppAddress == "") {
      alert("Please enter the Address");
      return false;
    } else if (this.state.GSTNo == "") {
      alert("Please enter the GST No");
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
                        <a className="nav-link" href="/SuppOrders">
                          Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="/SuppliersProfile">
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
              Supplier Details
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
                              Supplier Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                id="form3Example1cg"
                                name="SupplierName"
                                className="txtWidth"
                                value={this.state.SupplierName}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-4 colorWhite">
                              Email Id
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="email"
                                id="form3Example3cg"
                                name="EmailId"
                                value={this.state.EmailId}
                                onChange={this.handleChange}
                                className="txtWidth"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4 colorWhite">
                              Address
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                id="form6Example3cg"
                                name="SuppAddress"
                                value={this.state.SuppAddress}
                                onChange={this.handleChange}
                                className="txtWidth"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4 colorWhite">
                              Contact Number
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                id="form3Example4cdg"
                                name="ContactNo"
                                value={this.state.ContactNo}
                                onChange={this.handleChange}
                                className="txtWidth"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-4 colorWhite">
                              GST No
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                id="form31Example4cg"
                                name="GSTNo"
                                value={this.state.GSTNo}
                                onChange={this.handleChange}
                                className="txtWidth"
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
                                id="form31Examplse4cg"
                                name="Password"
                                value={this.state.Password}
                                onChange={this.handleChange}
                                className="txtWidth"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <Col sm={4}></Col>
                            <Col sm={4}>
                              <Button
                                type="button"
                                color="success"
                                onClick={this.onSubmit}
                              >
                                Submit
                              </Button>
                            </Col>
                            <Col sm={4}></Col>
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

export default SuppliersProfile;
