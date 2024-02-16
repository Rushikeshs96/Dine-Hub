import React, { Component } from "react";
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../../css/Style.css";
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const url = "https://localhost:7230/api/";
class UserReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  onSubmit(event) {
    if (this.validation()) {
      event.preventDefault();
      fetch(url + "User/Register", {
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
          }
          alert(result.message);
        });
    }
  }
  clear() {
    this.setState({
      UserName: "",
      EmailId: "",
      Password: "",
      UserAddress: "",
      ContactNo: "",
    });
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
    } else {
      return true;
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="reg-img">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div id="reg-div" className="container h-20 ">
              <div className="row d-flex justify-content-center align-items-center h-50">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div>
                    <div className="p-5 mb-3 mt-5">
                      <h2 className="text-uppercase text-center mb-5">
                        Create an account
                      </h2>
                      <form className="form">
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
                            Your Email Id
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
                            type="button"
                            onClick={this.onSubmit}
                            className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                          >
                            Register
                          </button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0 colorRed">
                          Have already an account?
                          <a
                            href="/"
                            className="linkColor link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                          >
                            Login Here
                          </a>
                        </p>
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

export default UserReg;
