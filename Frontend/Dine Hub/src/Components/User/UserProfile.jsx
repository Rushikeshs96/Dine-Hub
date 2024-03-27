import React, { Component } from "react";
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
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
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: sessionStorage.getItem("uid"),
      UserName: "",
      EmailId: "",
      Password: "",
      UserAddress: "",
      ContactNo: "",
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
      .get("https://localhost:7230/api/User/GetById/" + this.state.Id)
      .then((response) => {
        this.setState({
          UserName: response.data.userName,
          EmailId: response.data.emailId,
          UserAddress: response.data.userAddress,
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
        .post("https://localhost:7230/api/User/UpdateData", this.state)
        .then((res) => {
          alert(res.data.message);
        });
    }
  }
  validation() {
    if (this.state.UserName == "") {
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
    } else if (this.state.UserAddress == "") {
      alert("Please enter the Address");
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
      <React.Fragment>
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
                      <a className="nav-link" href="orders">
                        My Orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="userprofile">
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
        <div className="reg-img">
          <br></br>
          <div className="mask d-flex align-items-center h-100 gradient-custom-3 pt-5">
            <div id="reg-div" className="container h-20">
              <div className="row d-flex justify-content-center align-items-center h-50">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div>
                    <div className="p-5 mb-3 ">
                      <h2 className="text-uppercase text-center pt-5">
                        Profile
                      </h2>
                      <form>
                        <div className="form-outline mb-2">
                          <input
                            type="text"
                            id="form3Example1cg"
                            name="UserName"
                            value={this.state.UserName}
                            onChange={this.handleChange}
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1cg"
                          >
                            Your Name
                          </label>
                        </div>

                        <div className="form-outline mb-2">
                          <input
                            type="email"
                            id="form3Example3cg"
                            name="EmailId"
                            value={this.state.EmailId}
                            onChange={this.handleChange}
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3cg"
                          >
                            Your Email
                          </label>
                        </div>

                        <div className="form-outline mb-2">
                          <input
                            type="text"
                            id="form6Example3cg"
                            name="UserAddress"
                            value={this.state.UserAddress}
                            onChange={this.handleChange}
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form6Example3cg"
                          >
                            Address
                          </label>
                        </div>
                        <div className="form-outline mb-2">
                          <input
                            type="text"
                            id="form3Example4cdg"
                            name="ContactNo"
                            value={this.state.ContactNo}
                            onChange={this.handleChange}
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cdg"
                          >
                            Contact Number
                          </label>
                        </div>

                        <div className="form-outline mb-2">
                          <input
                            type="password"
                            id="form3Example4cg"
                            name="Password"
                            value={this.state.Password}
                            onChange={this.handleChange}
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Password
                          </label>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-1"></div>

                        <div className="d-flex justify-content-center">
                          <button
                            onClick={this.onSubmit}
                            type="button"
                            className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
