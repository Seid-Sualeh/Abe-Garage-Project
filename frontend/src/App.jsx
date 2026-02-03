import { Routes, Route } from "react-router-dom";
// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
// Import the custom css file
import "./assets/styles/custom.css";

// Import the pages
import Home from "./markup/pages/MainPge/HomePage/Home";
import About from "./markup/pages/MainPge/Aboutpage/AboutPage";
import Service from "./markup/pages/MainPge/ServicePge/Services";
import Contact from "./markup/pages/MainPge/ContactPage/Contact";
import AdminDashboard from "./markup/pages/admin/Admin/AdminDashboard";
import AddEmployee from "./markup/pages/admin/Employee/AddEmployee";
import AddCustomer from "./markup/pages/admin/Customer/AddCustomer";
import EditEmployee from "./markup/pages/admin/Employee/EditEmployee";
import EditCustomer from "./markup/pages/admin/Customer/EditCustomer";
import CustomerProfile from "./markup/pages/admin/Customer/CustomerProfile";
import Login from "./markup/pages/MainPge/LoginPage/Login";
import NewOrder from "./markup/pages/MainPge/NewOrder/NewOrder";
import Unauthorized from "./markup/pages/MainPge/UnauthorizedPage/Unauthorized";
import Orders from "./markup/pages/admin/Orders/AllOrdersPage";
import NewOrderAdmin from "./markup/pages/admin/Orders/NewOrder";
import SelectVehiclePage from "./markup/pages/admin/Orders/SelectVehiclePage";
import CreateNewOrderPage from "./markup/pages/admin/Orders/CreateNewOrderPage";
import Employees from "./markup/pages/admin/Employee/Employees";
import Customers from "./markup/pages/admin/Customer/Customers";
import ServicePage from "./markup/pages/admin/Service/ServicePage";
import NotFound from "./markup/pages/MainPge/404Page/NotFound";

// import the components
import Header from "./markup/components/MainComponents/Header/Header";
import Footer from "./markup/components/MainComponents/Footer/Footer";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        {/* protected admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <AdminDashboard />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/EditEmployee/:id"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/new-order"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <NewOrderAdmin />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order-single/:customerId"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <SelectVehiclePage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/new-order/:ID/:vID"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CreateNewOrderPage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/EditCustomer/:id"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/CustomerProfile/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerProfile />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[3]}>
              <ServicePage />
            </PrivateAuthRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
