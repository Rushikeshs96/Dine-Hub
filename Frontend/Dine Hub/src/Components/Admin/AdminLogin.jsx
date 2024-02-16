import React, { Component } from "react";
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../../css/Style.css";
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const url = "https://localhost:7230/api/";
class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Password: "",
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
      fetch(url + "Admin/ALogin", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        crossorigin: true,
        body: JSON.stringify(this.state),
      })
        .then((Response) => Response.json())
        .then((result) => {
          if (result.status == "User" || result.status == "Waiter") {
            window.location = "/AdminUser";
          } else if (result.status == "Staff") {
            window.location = "/StaffHome";
          } else if (result.status == "Admin") {
            window.location = "/AdminHome";
          } else {
            this.clear();
            alert(result.message);
          }
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
      alert("Please enter User Name");
      return false;
    } else if (this.state.Password == "") {
      alert("Please enter the Password");
      return false;
    } else {
      return true;
    }
  }

  goBack() {
    window.history.back();
  }

  render() {
    return (
      <React.Fragment>
        <div id="userlog" className="container-fluid img-login">
          <h1 className="text-center mb-4 headerText">Admin Login</h1>
          <form id="form-lg" className="mx-auto">
            <div className="mb-3 row ">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label col-5 fs-4 "
              >
                User Name
              </label>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="UserName"
                  value={this.state.UserName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label col-5 fs-4"
              >
                Password
              </label>
              <div className="col-7">
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  value={this.state.Password}
                  onChange={this.handleChange}
                  id="exampleInputPassword1"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-warning "
              >
                Login
              </button>
              <button
              style={{marginLeft:"175px"}}
                type="button"
                onClick={this.goBack}
                className="btn btn-primary"
              >
                Home
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminLogin;
