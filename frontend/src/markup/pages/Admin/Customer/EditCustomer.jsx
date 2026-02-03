import React from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu";
import EditCustomerForm from "../../../components/Admin/Customer/EditCustomerForm/EditCustomerForm";

function EditCustomer() {
  const { id } = useParams();
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditCustomerForm customerId={id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCustomer;
