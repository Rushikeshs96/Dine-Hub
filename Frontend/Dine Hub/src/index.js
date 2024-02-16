import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserLogin from "./Components/User/UserLogin";
import UserReg from "./Components/User/UserReg";
import UserProfile from "./Components/User/UserProfile";
import BookTable from "./Components/User/BookTable";
import UserHome from "./Components/User/UserHome";
import Orders from "./Components/User/Orders";
import "./css/Style.css";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHome from "./Components/Admin/AdminHome";
import ViewOrders from "./Components/Admin/ViewOrders";
import Customers from "./Components/Admin/Customers";
import Suppliers from "./Components/Admin/Suppliers";
import StaffMaster from "./Components/Admin/StaffMaster";
import Reports from "./Components/Admin/Reports";
import AddStaff from "./Components/Admin/AddStaff";
import SupplierReg from "./Components/Supplier/SupplierReg";
import SupplierLogin from "./Components/Supplier/SupplierLogin";
import SupplierHome from "./Components/Supplier/SupplierHome";
import SuppliersProfile from "./Components/Supplier/SupplierProfile";
import SuppProducts from "./Components/Supplier/SuppProducts";
import AddProduct from "./Components/Supplier/AddProduct";
import SuppOrders from "./Components/Supplier/SuppOrders";
import AddOrder from "./Components/Admin/AddOrder";
import OrderDetails from "./Components/Admin/OrderDetails";
import OrderAction from "./Components/Supplier/OrderAction";
import AddMenu from "./Components/Admin/AddMenu";
import MenuMaster from "./Components/Admin/MenuMaster";
import EditMenu from "./Components/Admin/EditMenu";
import PlaceOrder from "./Components/User/Placeorder";
import ViewMyOrder from "./Components/User/ViewMyOrder";
import StaffHome from "./Components/Staff/StaffHome";
import AdminUser from "./Components/Staff/AdminUser";
import BookingDetails from "./Components/Staff/BookingDetails";
import CustOrders from "./Components/Staff/CustOrders";
import ViewSOrder from "./Components/Staff/ViewSOrder";
import SupOrders from "./Components/Staff/SupOrders";
import StaffSupOrderDetails from "./Components/Staff/StaffSupOrderDetails";
import FrontPage from "./Components/FrontPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
window.$url = "https://localhost:7230/api/";
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FrontPage/>} />
      <Route path="userlogin" element={<UserLogin />} />
      <Route path="booktable" element={<BookTable />} />
      <Route path="userhome" element={<UserHome />} />
      <Route path="orders" element={<Orders />} />
      <Route path="userreg" element={<UserReg />} />
      <Route path="userprofile" element={<UserProfile />} />
      <Route path="adminlogin" element={<AdminLogin />} />
      <Route path="adminhome" element={<AdminHome />} />
      <Route path="vieworders" element={<ViewOrders />} />
      <Route path="Customers" element={<Customers />} />
      <Route path="Suppliers" element={<Suppliers />} />
      <Route path="StaffMaster" element={<StaffMaster />} />
      <Route path="Reports" element={<Reports />} />
      <Route path="AddStaff" element={<AddStaff />} />
      <Route path="supplierreg" element={<SupplierReg />} />
      <Route path="SupplierLogin" element={<SupplierLogin />} />
      <Route path="SupplierHome" element={<SupplierHome />} />
      <Route path="SuppliersProfile" element={<SuppliersProfile />} />
      <Route path="SuppProducts" element={<SuppProducts />} />
      <Route path="AddProduct" element={<AddProduct />} />
      <Route path="SuppOrders" element={<SuppOrders />} />
      <Route path="AddOrder" element={<AddOrder />} />
      <Route path="OrderDetails" element={<OrderDetails />} />
      <Route path="OrderAction" element={<OrderAction />} />
      <Route path="AddMenu" element={<AddMenu />} />
      <Route path="MenuMaster" element={<MenuMaster />} />
      <Route path="EditMenu" element={<EditMenu />} />
      <Route path="PlaceOrder" element={<PlaceOrder />} />
      <Route path="ViewMyOrder" element={<ViewMyOrder />} />
      <Route path="StaffHome" element={<StaffHome />} />
      <Route path="AdminUser" element={<AdminUser />} />
      <Route path="BookingDetails" element={<BookingDetails />} />
      <Route path="CustOrders" element={<CustOrders />} />
      <Route path="ViewSOrder" element={<ViewSOrder />} />
      <Route path="SupOrders" element={<SupOrders />} />
      <Route path="StaffSupOrderDetails" element={<StaffSupOrderDetails />} />
      
    </Routes>
  </BrowserRouter>
);


reportWebVitals();
