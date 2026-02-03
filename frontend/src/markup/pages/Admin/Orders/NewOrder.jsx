import React from "react";
import AdminMenu from "../../../components/Admin/Admin/AdminMenu/AdminMenu";
import CreateOrder from "../../../components/Admin/Order/CreateOrder";

function NewOrder() {
  return (
    <div>
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side ">
              <CreateOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
