import SideBar from "./Components/SideBar/SideBar";
import { useState } from "react";
import HomePage from "./Pages/HomePage/HomePage";
import AllOrders from "./Pages/AllOrders/AllOrders";
import AllOrdersPage3 from "./Pages/AllOrdersPage3/AllOrdersPage3";
import AllNurseries from "./Pages/AllNurseries/AllNurseries";
import OrdersReports from "./Pages/OrdersReports/OrderReports";
import SalesReport from "./Pages/SalesReport/SalesReport";
import MyCustomers from "./Pages/MyCustomers/MyCutomers";
import AllProducts from "./Pages/AllProducts/AllProducts";
import Categories from "./Pages/Categories/Categories";
import VerifyOTP from "./Pages/verifyOTP/VerifyOTP";
import Login from "./Pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddCategory from "./Pages/AddCategory/AddCategory";
import AddProducts from "./Pages/Products/AddProducts";
import EditProducts from "./Pages/Products/EditProducts";
import Analystics from "./Pages/Analytics/Analytics";
import CustomerSupport from "./Pages/CustomerSupport/CustomerSupport";
import CustomerName from "./Pages/CustomerName/CustomerName";
import PageNotFound from "./Components/SideBar/PageNotFound";
import Coupon from "./Pages/Coupon/Coupon";
import CouponList from "./Pages/Coupon/CouponList";


function App() {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <SideBar show={show} toggle={toggle} />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verifyotp" element={<VerifyOTP />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/couponlist" element={<CouponList />} />
          <Route path="*" element={<PageNotFound toggle={toggle} />} />
          <Route path="/products" element={<AllProducts toggle={toggle} />} />
          <Route path="/dashboard" element={<HomePage toggle={toggle} />} />
          <Route path="/orders" element={<AllOrders toggle={toggle} />} />
          <Route
            path="/orders/:id"
            element={<AllOrdersPage3 toggle={toggle} />}
          />
          <Route
            path="/allnurseries"
            element={<AllNurseries toggle={toggle} />}
          />
          <Route
            path="/ordersreport"
            element={<OrdersReports toggle={toggle} />}
          />
          <Route
            path="/salesreport"
            element={<SalesReport toggle={toggle} />}
          />
          <Route path="/catagories" element={<Categories toggle={toggle} />} />
          <Route path="/customers" element={<MyCustomers toggle={toggle} />} />
          <Route path="/customer" element={<CustomerName toggle={toggle} />} />
          <Route
            path="/category/new"
            element={<AddCategory toggle={toggle} />}
          />
          <Route
            path="/product/new"
            element={<AddProducts toggle={toggle} />}
          />
          <Route path="/analystics" element={<Analystics toggle={toggle} />} />
          <Route
            path="/support"
            element={<CustomerSupport toggle={toggle} />}
          />
          <Route
            path="/customer/:id"
            element={<CustomerName toggle={toggle} />}
          />
          <Route
            path="/product/edit/:id"
            element={<EditProducts show={show} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
