import React, { Component } from "react";
import "../../css/Style.css";
const url = "https://localhost:7230/api/";
class BookTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: sessionStorage.getItem("uid"),
      UserName: "",
      BookingDate: "",
      BookingTime: "",
      TotalMembers: "",
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
      fetch(url + "User/Booking", {
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
      BookingDate: "",
      BookingTime: "",
      TotalMembers: "",
    });
  }
  validation() {
    if (this.state.BookingDate == "") {
      alert("Please enter Booking Date");
      return false;
    } else if (this.state.BookingTime == "") {
      alert("Please enter the Booking Time");
      return false;
    } else if (this.state.TotalMembers == "") {
      alert("Please enter the Total Members");
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid img-table">
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
                        <a className="nav-link active" href="BookTable">
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
                        <a className="nav-link" href="userprofile">
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

          <div className="container ">
            <form id="form2">
              <h1 className="d-flex justify-content-center mb-4">
                Table Reservation
              </h1>

              <div class="form-outline mb-4">
                <input
                  type="date"
                  id="form1Example2"
                  class="form-control"
                  name="BookingDate"
                  value={this.state.BookingDate}
                  onChange={this.handleChange}
                />
                <label class="form-label" for="form1Example2">
                  Date
                </label>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="time"
                  id="form1Example2"
                  class="form-control"
                  name="BookingTime"
                  value={this.state.BookingTime}
                  onChange={this.handleChange}
                />
                <label class="form-label" for="form1Example2">
                  Time
                </label>
              </div>
              <div class="form-outline mb-4 ">
                <input
                  type="text"
                  id="form1Example1"
                  class="form-control"
                  name="TotalMembers"
                  value={this.state.TotalMembers}
                  onChange={this.handleChange}
                />
                <label class="form-label" for="form1Example1">
                  Total Members
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn btn-warning btn-block d"
                  onClick={this.onSubmit}
                >
                  Book Table
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookTable;
