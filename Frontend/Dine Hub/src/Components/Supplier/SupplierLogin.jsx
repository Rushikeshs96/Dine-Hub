import React, { Component } from "react";
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../../css/Style.css";
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const url = "https://localhost:7230/api/";
class SupplierLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailId: "",
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
      fetch(url + "Supplier/Login", {
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
            sessionStorage.setItem("sid",result.message)
            window.location = "/SupplierHome";
          } else {
            this.clear();
            alert(result.message);
          }
        });
    }
  }
  clear() {
    this.setState({
      EmailId: "",
      Password: "",
    });
  }
  validation() {
    if (this.state.EmailId == "") {
      alert("Please enter Email Id");
      return false;
    } else if (!isEmail(this.state.EmailId)) {
      alert("Please enter valid Email Id");
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
          <h1 className="text-center mb-4 headerText">Supplier Login</h1>
          <form id="form-lg" className="mx-auto">
            <div className="mb-3 row ">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label col-5 fs-4 "
              >
                Email
              </label>
              <div className="col-7">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="EmailId"
                  value={this.state.EmailId}
                  onChange={this.handleChange}
                  aria-describedby="emailHelp"
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
            </div>
            <br/>
           <div style={{display:"flex", justifyContent:"space-around" }}>
            <button
                type="button"
                onClick={this.goBack}
                className="btn btn-primary"
              >
                 Home
              </button>
              <button
              style={{marginLeft:"150px"}}
                type="button"
                onClick={() => window.location.href="userreg"}
                className="btn btn-primary"
              >
                Register
              </button>
            </div>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default SupplierLogin;
