import React from "react";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import UpdateOrder from "../../../components/Admin/Order/UpdateOrder";

function UpdateOrderPage() {
  return (
    <div>
        <div>
              <div className="container-fluid admin-pages">
                  <div className="row">
                      <div className="col-md-3 admin-left-side">
                        <AdminMenu />
                      </div>
                      <div className="col-md-9 admin-right-side px-5">
                       <UpdateOrder/>
                      </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default UpdateOrderPage;