import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu";
import AddCustomerForm from "../../../components/Admin/Customer/AddCustomerForm/AddCustomerForm";

export default function AddCustomer() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddCustomerForm />
          </div>
        </div>
      </div>
    </>
  );
}
