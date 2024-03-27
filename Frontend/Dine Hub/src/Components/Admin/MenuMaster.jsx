import React, { Component } from "react";
import "../../css/Style.css";
import axios from "axios";
class MenuMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuData: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://localhost:7230/api/Admin/GetMenu")
      .then((response) => {
        this.setState({ menuData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  editClick(id) {
    window.location = "/EditMenu?id=" + id;
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
              Menu Items
            </h4>
            <a href={"/AddMenu"} className="btn btn-success btnAdd">
              Add
            </a>
            <table className="table table-striped table-borderless">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Menu Name</th>
                  <th scope="col">Menu Type</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th colSpan="4">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.menuData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.menuName}</td>
                    <td>{item.itemType}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-light mr-1"
                        onClick={() => this.editClick(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MenuMaster;
