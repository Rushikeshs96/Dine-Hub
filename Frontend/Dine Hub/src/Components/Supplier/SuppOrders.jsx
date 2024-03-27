import React, { Component } from "react";
import "../../css/Style.css";
import axios from "axios";
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const url = "https://localhost:7230/api/";
class SuppOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: sessionStorage.getItem("sid"),
      prdData: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    axios
      .get("https://localhost:7230/api/Order/GetOrdersById/" + this.state.Id)
      .then((response) => {
        this.setState({ prdData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteClick(id) {
    axios
      .post("https://localhost:7230/api/Order/GetOrdersById/=" + parseInt(id))
      .then((json) => {
        alert(json.data.message);
        if (json.data.status == "Success") {
          window.location = "/SuppProducts";
        }
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
                  <a
                    className="navbar-brand fs-2 colorWhite"
                    href="/SupplierHome"
                  >
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
                        <a className="nav-link active" href="/SuppOrders">
                          Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/SuppliersProfile">
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
              Order Details
            </h4>

            <table className="table table-striped table-borderless">
              <thead className="table-dark">
                <tr>
                <th>Order Id</th>
                  <th>Order Date</th>
                  <th>Supplier Name</th>
                  <th>Order Status</th>
                  <th colSpan="4">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.prdData.map((item) => (
                  <tr key={item.id}>
                  <td>{item.orderId}</td>
                  <td>{item.orderDate}</td>
                  <td>{item.supplierName}</td>
                  <td>{item.orderStatus}</td>
                  <td>
                    <a
                      href={"/OrderAction?id=" + item.orderId+"&status="+item.orderStatus}
                      className="btn btn-success"
                    >
                      View
                    </a>
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

export default SuppOrders;
