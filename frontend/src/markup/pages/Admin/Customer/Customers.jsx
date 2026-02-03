import { useAuth } from "../../../../context/Auth";
import LoginForm from "../../../components/MainComponents/LoginForm/LoginForm";
import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu";
import CustomerList from "../../../components/Admin/Customer/CustomerList/CustomerList";

function Customers() {
  const { isAdmin, isLogged } = useAuth();

  if (isLogged) {
    if (isAdmin) {
      return (
        <>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <CustomerList />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div>
          <h1>Unauthorized</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      );
    }
  } else {
    return (
      <div>
        <h1>Login Required</h1>
        <p>You must be logged in to view this page.</p>
        <LoginForm />
      </div>
    );
  }
}

export default Customers;
