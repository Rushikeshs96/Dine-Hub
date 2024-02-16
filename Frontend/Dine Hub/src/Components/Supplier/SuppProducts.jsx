import React, { Component } from "react";
import "../../css/Style.css";
import axios from "axios";
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const url = "https://localhost:7230/api/";
class SuppProducts extends Component {
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
      .get("https://localhost:7230/api/Supplier/GetProducts/" + this.state.Id)
      .then((response) => {
        this.setState({ prdData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteClick(id) {
    axios
      .post(
        "https://localhost:7230/api/Product/DeleteProduct?distId=" +
          parseInt(id)
      )
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
                        <a className="nav-link active" href="/SuppProducts">
                          Products
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/SuppOrders">
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
              Product Details
            </h4>
            <a href={"/addProduct"} className="btn btn-success btnAdd">
              Add
            </a>
            <table className="table table-striped table-borderless">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th colSpan="4">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.prdData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                    {
                      <td>
                        <button
                          type="button"
                          className="btn btn-light mr-1"
                          onClick={() => this.deleteClick(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </td>
                    }
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

export default SuppProducts;
