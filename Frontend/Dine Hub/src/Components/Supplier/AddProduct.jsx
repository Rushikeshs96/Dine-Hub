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
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SupplierId: sessionStorage.getItem("sid"),
      ProductName: "",
      Price: "",
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
      fetch(url + "Product/Add", {
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
            window.location = "/SuppProducts";
          }
          alert(result.message);
        });
    }
  }
  clear() {
    this.setState({
        ProductName: "",
        Price: "",
    });
  }
  validation() {
    if (this.state.ProductName == "") {
      alert("Please Product Name");
      return false;
    } else if (this.state.Price == "") {
      alert("Please enter the Price");
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
              Add Product
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
                              Product Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                id="form3Example1cg"
                                name="ProductName"
                                className="txtWidth"
                                value={this.state.ProductName}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-4 colorWhite">
                              Price
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                id="form3Example4cg"
                                name="Price"
                                className="txtWidth"
                                value={this.state.Price}
                                onChange={this.handleChange}
                              />
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
                                href={"/SuppProducts"}
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

export default AddProduct;
